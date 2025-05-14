
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, FileText, Calendar, Activity, Settings, User, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth", {
          state: {
            redirectTo: "/dashboard",
            message: "Please log in to access your dashboard",
          },
        });
        return;
      }
      
      setUser(session.user);
      setLoading(false);
      
      // Display welcome toast when dashboard loads
      toast({
        title: "Welcome to your dashboard!",
        description: "Your profile and medical information are synced and up to date.",
        variant: "default",
      });
    };
    
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate("/auth");
        }
        setUser(session?.user || null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, toast]);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  const userName = user?.user_metadata?.full_name || "User";
  const userEmail = user?.email || "";
  const userInitials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
    
  // Get additional profile info from metadata
  const userPhone = user?.user_metadata?.phone_number || "Not set";
  const userAddress = user?.user_metadata?.address 
    ? `${user.user_metadata.address}, ${user.user_metadata.city || ''} ${user.user_metadata.state || ''}`
    : "Not set";
  const userDOB = user?.user_metadata?.date_of_birth || "Not set";
  const avatarUrl = user?.user_metadata?.avatar_url || "";

  const handleEditProfile = () => {
    navigate("/profile");
    toast({
      title: "Profile Settings",
      description: "Update your personal information, preferences, and privacy settings.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Dashboard | MediWallet</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback className="bg-primary text-xl text-white">{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome, {userName.split(' ')[0]}</h1>
              <p className="text-gray-500">{userEmail}</p>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2 md:mt-0">
            <Button onClick={handleEditProfile}>
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile completeness indicator */}
        <div className="mb-6">
          <Card className="border-primary/10 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Complete your profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Your profile information helps us provide better medical services. 
                    Visit your profile settings to add missing information.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Phone Number:</span>
                      <span className="font-medium">{userPhone !== "Not set" ? userPhone : "⚠️ Not set"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Address:</span>
                      <span className="font-medium">{userAddress !== "Not set" ? userAddress : "⚠️ Not set"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Date of Birth:</span>
                      <span className="font-medium">{userDOB !== "Not set" ? userDOB : "⚠️ Not set"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="overview">
              <Activity className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Medical Summary</CardTitle>
                  <CardDescription>Your health at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last checkup</span>
                      <span className="font-medium">April 15, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next appointment</span>
                      <span className="font-medium">June 10, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Documents</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your latest health records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-100 p-1">
                      <FileText className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Blood Test Results</p>
                      <p className="text-xs text-muted-foreground">Added on May 2, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1">
                      <Calendar className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Appointment Scheduled</p>
                      <p className="text-xs text-muted-foreground">Dentist on June 5, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-purple-100 p-1">
                      <User className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile Updated</p>
                      <p className="text-xs text-muted-foreground">Changed emergency contact</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    See All Activities
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Health Statistics</CardTitle>
                  <CardDescription>Your health indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm font-medium">Blood Pressure</span>
                        <span className="text-sm text-muted-foreground">120/80</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm font-medium">Heart Rate</span>
                        <span className="text-sm text-muted-foreground">72 bpm</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm font-medium">Body Mass Index</span>
                        <span className="text-sm text-muted-foreground">22.5</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-indigo-500" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    View Health Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Medical Documents</CardTitle>
                <CardDescription>Your medical records and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No documents yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload your medical documents to keep them secure and accessible.</p>
                  <Button>Upload Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Manage your medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No upcoming appointments</h3>
                  <p className="text-sm text-muted-foreground mb-4">Schedule medical appointments to keep track of your healthcare needs.</p>
                  <Button>Schedule Appointment</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
