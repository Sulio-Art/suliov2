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

// Import the new RTK Query hook
import { useGetMyTransactionsQuery } from "@/redux/Transaction/transactionApi";

export default function ClientWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get state directly from the URL's search parameters for synchronization
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  // Local state for controlled inputs (e.g., the search bar text)
  const [searchTerm, setSearchTerm] = useState(search);
  const [statusFilter, setStatusFilter] = useState(status);

  // Call the RTK Query hook. It handles all fetching, loading, and error states.
  // The hook will automatically re-fetch data whenever page, search, or status changes.
  const {
    data, // Contains the API response: { transactions, totalPages, currentPage }
    isLoading,
    isError,
    error, // Contains error details, including status code
  } = useGetMyTransactionsQuery({ page, search, status });

  // Check for the specific 403 Forbidden error from the hook's result
  const isForbidden = error?.status === 403;

  // This useEffect updates the URL when the user types in the search box or changes the filter.
  // The change in the URL's search params will trigger the RTK Query hook to re-fetch automatically.
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1"); // Reset to page 1 on any new filter or search

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
    }, 500); // Debounce to avoid firing on every keystroke

    return () => clearTimeout(handler);
  }, [searchTerm, statusFilter, pathname, router]);

  // Handler for the pagination component to change the page number in the URL
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handler for the status filter dropdown
  const handleStatusChange = (value) => {
    // Setting the state will trigger the useEffect above to update the URL
    setStatusFilter(value === "all" ? "" : value);
  };

  // Render the "Upgrade Plan" prompt if the API returned a 403 Forbidden error
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

        {/* Conditionally render a loading spinner or the table with data */}
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