
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContactSubmission } from "@/types/admin";

interface ContactSubmissionsTableProps {
  submissions: ContactSubmission[];
  formatDate: (dateString: string) => string;
}

export const ContactSubmissionsTable = ({ submissions, formatDate }: ContactSubmissionsTableProps) => {
  return (
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
            {submissions.map((submission) => (
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
  );
};
