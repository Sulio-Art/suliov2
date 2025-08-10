"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Users, Calendar, Receipt } from "lucide-react";
import SummaryCard from "../../Components/admin/dashboard/SummaryCard";
import RecentTransactions from "../../Components/admin/dashboard/RecentTransactions";
import LiveEvents from "../../Components/admin/dashboard/LiveEvents";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboardClient() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchStats = async () => {
        try {
          const response = await fetch(`${BACKEND_API_URL}/admin/dashboard-stats`, {
            headers: { 'Authorization': `Bearer ${session.backendToken}` }
          });
          if (!response.ok) throw new Error("Failed to fetch admin data.");
          const data = await response.json();
          setStats(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchStats();
    }
  }, [status, session]);

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-10 w-10 animate-spin" /></div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Active Customers"
          value={`${stats?.activeCustomers || 0}/${stats?.totalCustomers || 0}`}
          icon={<Users className="text-blue-500" />}
        />
        <SummaryCard 
          title="Active Events"
          value={`${stats?.activeEvents || 0}/${stats?.totalEvents || 0}`}
          icon={<Calendar className="text-green-500" />}
        />
        <SummaryCard 
          title="Total Transactions"
          value={stats?.totalTransactions || 0}
          icon={<Receipt className="text-yellow-500" />}
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
            <RecentTransactions transactions={stats?.recentTransactions || []} />
        </div>
        <div className="lg:col-span-2">
            <LiveEvents events={stats?.liveEvents || []} />
        </div>
      </div>
    </div>
  );
}