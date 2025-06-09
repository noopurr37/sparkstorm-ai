
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminData } from "@/types/admin";

interface AdminStatsProps {
  data: AdminData;
}

export const AdminStats = ({ data }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.contactSubmissions.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AI Talk Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.aiTalkRequests.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.consultationRequests.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Waitlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.waitlistEntries.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.newsletterSubscriptions.length}</div>
        </CardContent>
      </Card>
    </div>
  );
};
