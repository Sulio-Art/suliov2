"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input } from "../../../Components/ui/input";
import { Button } from "../../../Components/ui/button";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import TransactionsTable from "../../../Components/transaction-management/TransactionsTable";
import PaginationControls from "../../../Components/Reuseable/PaginationControls";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ClientWrapper() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (session?.backendToken) {
      setLoading(true);
      const fetchTransactions = async () => {
        try {
          const response = await fetch(
            `${BACKEND_API_URL}/api/transactions/me?page=${currentPage}`,
            {
              headers: {
                Authorization: `Bearer ${session.backendToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch transactions.");
          }
          const data = await response.json();
          setTransactions(data.transactions);
          setTotalPages(data.totalPages);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchTransactions();
    }
  }, [session, currentPage]);

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 bg-gray-50 text-center text-red-500">
        Error: {error}
      </div>
    );
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
            <Input placeholder="Search" className="w-64" />
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </div>
        <TransactionsTable transactions={transactions} />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
