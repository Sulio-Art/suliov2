import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pencil, Trash2 } from "lucide-react"; 
import { Button } from "../ui/button";


export default function EventsTable({ events, userId }) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Event Type</TableHead>
          <TableHead>Engagements</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event._id}>
            <TableCell>{event.title}</TableCell>
            <TableCell>{"N/A"}</TableCell>
            <TableCell>{event.participants?.length || 0}</TableCell>
            <TableCell>{event.location || "N/A"}</TableCell>
            <TableCell>{formatDate(event.date)}</TableCell>
            <TableCell className="flex space-x-2">
             
              <Link href={`/user/${userId}/event-management/${event._id}/edit`}>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
