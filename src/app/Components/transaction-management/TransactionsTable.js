"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";
import { FileSearch } from "lucide-react"; 

const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    sold: "bg-blue-100 text-blue-800",
  };
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium",
        statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800"
      )}
    >
      {formattedStatus}
    </span>
  );
};

export default function TransactionsTable({ transactions }) {
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleString("en-US", options)
      .replace(",", "");
  };

  const formatId = (id) => id.substring(0, 8).toUpperCase();

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg text-gray-500 bg-gray-50/50">
        <FileSearch className="h-12 w-12 mb-4 text-gray-400" />
        <p className="font-medium">No transactions found.</p>
        <p className="text-sm text-gray-400 mt-1">
          When you make a transaction, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tnx ID</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t) => (
          <TableRow key={t._id}>
            <TableCell>{formatId(t._id)}</TableCell>
            <TableCell>{formatDate(t.createdAt)}</TableCell>

            <TableCell>${t.amount.toFixed(2)}</TableCell>
            <TableCell>
              <StatusBadge status={t.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}