"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "../../../Components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/ui/select";
import TransactionsTable from "../../../Components/transaction-management/TransactionsTable";
import PaginationControls from "../../../Components/Reuseable/PaginationControls";
import UpgradePlanPrompt from "../../../Components/Reuseable/UpgradePlanprompt.js";

export default function ClientWrapper({
  isForbidden,
  initialTransactions,
  initialTotalPages,
  initialPage,
  initialSearch,
  initialStatus,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  const [statusFilter, setStatusFilter] = useState(initialStatus || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      params.set("page", "1");
      if (searchTerm) {
        params.set("search", searchTerm);
      }
      if (statusFilter) {
        params.set("status", statusFilter);
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, statusFilter, pathname, router]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    if (statusFilter) {
      params.set("status", statusFilter);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value === "all" ? "" : value);
  };

  if (isForbidden) {
    return <UpgradePlanPrompt featureName="Transaction and sales tracking" />;
  }

  return (
    <div className="flex-1 p-8 bg-gray-50 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transaction Management</h1>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by ID or Status..."
              className="w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TransactionsTable transactions={initialTransactions} />
        <PaginationControls
          currentPage={initialPage}
          totalPages={initialTotalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}