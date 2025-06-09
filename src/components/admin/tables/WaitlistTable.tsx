
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WaitlistEntry } from "@/types/admin";

interface WaitlistTableProps {
  entries: WaitlistEntry[];
  formatDate: (dateString: string) => string;
}

export const WaitlistTable = ({ entries, formatDate }: WaitlistTableProps) => {
  return (
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
            {entries.map((entry) => (
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
  );
};
