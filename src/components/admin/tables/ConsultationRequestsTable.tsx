
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ConsultationRequest } from "@/types/admin";

interface ConsultationRequestsTableProps {
  requests: ConsultationRequest[];
  formatDate: (dateString: string) => string;
}

export const ConsultationRequestsTable = ({ requests, formatDate }: ConsultationRequestsTableProps) => {
  return (
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
            {requests.map((request) => (
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
  );
};
