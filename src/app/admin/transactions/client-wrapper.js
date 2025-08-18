"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import PaginationControls from "../../Components/Reuseable/PaginationControls";
import AdminTransactionsTable from "../../Components/admin/transactions/AdminTransactionsTable";
import { useGetAllTransactionsQuery } from "@/redux/Admin/adminApi";

export default function TransactionsClient() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllTransactionsQuery(currentPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Transaction Management
      </h1>
      <div className="bg-white p-5 rounded-lg shadow-sm">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <AdminTransactionsTable transactions={data?.transactions || []} />
            <PaginationControls
              currentPage={data?.currentPage || 1}
              totalPages={data?.totalPages || 1}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}