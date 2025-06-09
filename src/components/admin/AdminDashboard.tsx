
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, MessageSquare, Calendar, Mail, List } from "lucide-react";

interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface AITalkRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organization: string;
  event_date: string;
  audience_size?: string;
  topic: string;
  additional_info?: string;
}

interface ConsultationRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company?: string;
  topic: string;
  message?: string;
}

interface WaitlistEntry {
  id: string;
  created_at: string;
  name?: string;
  email: string;
}

interface NewsletterSubscription {
  id: number;
  created_at: string;
  email: string;
}

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [aiTalkRequests, setAITalkRequests] = useState<AITalkRequest[]>([]);
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Access Denied",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Check if user is admin by testing if they can read contact submissions
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('count(*)')
        .limit(1);

      if (error) {
        console.error("Admin access check failed:", error);
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to view this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadAllData();
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast({
        title: "Error",
        description: "Failed to verify admin access.",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    try {
      // Load contact submissions
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;
      setContactSubmissions(contacts || []);

      // Load AI talk requests
      const { data: aiTalks, error: aiTalksError } = await supabase
        .from('ai_talk_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (aiTalksError) throw aiTalksError;
      setAITalkRequests(aiTalks || []);

      // Load consultation requests
      const { data: consultations, error: consultationsError } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (consultationsError) throw consultationsError;
      setConsultationRequests(consultations || []);

      // Load waitlist entries
      const { data: waitlist, error: waitlistError } = await supabase
        .from('mediwallet_waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (waitlistError) throw waitlistError;
      setWaitlistEntries(waitlist || []);

      // Load newsletter subscriptions
      const { data: newsletter, error: newsletterError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (newsletterError) throw newsletterError;
      setNewsletterSubscriptions(newsletter || []);

    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load admin data.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactSubmissions.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Talk Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiTalkRequests.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultationRequests.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Waitlist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitlistEntries.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsletterSubscriptions.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Contact Forms
          </TabsTrigger>
          <TabsTrigger value="ai-talks" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            AI Talk Requests
          </TabsTrigger>
          <TabsTrigger value="consultations" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Consultations
          </TabsTrigger>
          <TabsTrigger value="waitlist" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Waitlist
          </TabsTrigger>
          <TabsTrigger value="newsletter" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Newsletter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>{formatDate(submission.created_at)}</TableCell>
                      <TableCell>{submission.name}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.subject || 'N/A'}</TableCell>
                      <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-talks">
          <Card>
            <CardHeader>
              <CardTitle>AI Talk Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Event Date</TableHead>
                    <TableHead>Topic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiTalkRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{formatDate(request.created_at)}</TableCell>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.organization}</TableCell>
                      <TableCell>{request.event_date}</TableCell>
                      <TableCell>{request.topic}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultations">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Topic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultationRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{formatDate(request.created_at)}</TableCell>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.company || 'N/A'}</TableCell>
                      <TableCell>{request.topic}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waitlist">
          <Card>
            <CardHeader>
              <CardTitle>MediWallet Waitlist</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlistEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{formatDate(entry.created_at)}</TableCell>
                      <TableCell>{entry.name || 'N/A'}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="newsletter">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newsletterSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>{formatDate(subscription.created_at)}</TableCell>
                      <TableCell>{subscription.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button onClick={() => loadAllData()}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
