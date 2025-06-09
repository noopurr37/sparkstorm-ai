
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AITalkRequest } from "@/types/admin";

interface AITalkRequestsTableProps {
  requests: AITalkRequest[];
  formatDate: (dateString: string) => string;
}

export const AITalkRequestsTable = ({ requests, formatDate }: AITalkRequestsTableProps) => {
  return (
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
            {requests.map((request) => (
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
  );
};
