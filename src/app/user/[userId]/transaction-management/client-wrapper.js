"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "../../../Components/ui/input";
import { SlidersHorizontal, Loader2 } from "lucide-react";
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

// FIX: Import useSelector and the token selector
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";
import { useGetMyTransactionsQuery } from "@/redux/Transaction/transactionApi";

export default function ClientWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // FIX: Get the authentication token from the Redux store
  const token = useSelector(selectBackendToken);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const [searchTerm, setSearchTerm] = useState(search);
  const [statusFilter, setStatusFilter] = useState(status);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetMyTransactionsQuery(
    { page, search, status },
    // FIX: Add the skip option. The query will not run if there is no token.
    { skip: !token }
  );

  const isForbidden = error?.status === 403;

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      if (statusFilter) {
        params.set("status", statusFilter);
      } else {
        params.delete("status");
      }

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, statusFilter, pathname, router]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
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

        {/* This logic now works correctly. When the query is skipped, isLoading is false and data is undefined, showing an empty table briefly. */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            <TransactionsTable transactions={data?.transactions || []} />
            <PaginationControls
              currentPage={data?.currentPage || 1}
              totalPages={data?.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}