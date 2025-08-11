"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import PaginationControls from "../../Components/Reuseable/PaginationControls";
import AdminTransactionsTable from "../../Components/admin/transactions/AdminTransactionsTable";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TransactionsClient() {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true);
      const fetchTransactions = async () => {
        try {
          const response = await fetch(
            `${BACKEND_API_URL}/transactions?page=${currentPage}`,
            {
              headers: { Authorization: `Bearer ${session.backendToken}` },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch transactions.");
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTransactions();
    }
  }, [status, session, currentPage]);

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
