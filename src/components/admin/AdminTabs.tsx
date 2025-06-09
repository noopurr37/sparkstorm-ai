
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Calendar, Users, List, Mail } from "lucide-react";
import { ContactSubmissionsTable } from "./tables/ContactSubmissionsTable";
import { AITalkRequestsTable } from "./tables/AITalkRequestsTable";
import { ConsultationRequestsTable } from "./tables/ConsultationRequestsTable";
import { WaitlistTable } from "./tables/WaitlistTable";
import { NewsletterTable } from "./tables/NewsletterTable";
import type { AdminData } from "@/types/admin";

interface AdminTabsProps {
  data: AdminData;
  formatDate: (dateString: string) => string;
}

export const AdminTabs = ({ data, formatDate }: AdminTabsProps) => {
  return (
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
        <ContactSubmissionsTable 
          submissions={data.contactSubmissions} 
          formatDate={formatDate} 
        />
      </TabsContent>

      <TabsContent value="ai-talks">
        <AITalkRequestsTable 
          requests={data.aiTalkRequests} 
          formatDate={formatDate} 
        />
      </TabsContent>

      <TabsContent value="consultations">
        <ConsultationRequestsTable 
          requests={data.consultationRequests} 
          formatDate={formatDate} 
        />
      </TabsContent>

      <TabsContent value="waitlist">
        <WaitlistTable 
          entries={data.waitlistEntries} 
          formatDate={formatDate} 
        />
      </TabsContent>

      <TabsContent value="newsletter">
        <NewsletterTable 
          subscriptions={data.newsletterSubscriptions} 
          formatDate={formatDate} 
        />
      </TabsContent>
    </Tabs>
  );
};
