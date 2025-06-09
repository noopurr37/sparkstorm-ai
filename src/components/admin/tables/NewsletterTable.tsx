
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NewsletterSubscription } from "@/types/admin";

interface NewsletterTableProps {
  subscriptions: NewsletterSubscription[];
  formatDate: (dateString: string) => string;
}

export const NewsletterTable = ({ subscriptions, formatDate }: NewsletterTableProps) => {
  return (
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
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{formatDate(subscription.created_at)}</TableCell>
                <TableCell>{subscription.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
