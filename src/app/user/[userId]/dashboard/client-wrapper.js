"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  MessageCircle,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import SummaryCard from "../../../Components/dashboard/SummaryCard";
import CountryStats from "../../../Components/dashboard/CountryStats";
import AgeDonut from "../../../Components/dashboard/AgeDonut";
import SentimentScore from "../../../Components/dashboard/SentimentScore";
import RecentTransactions from "../../../Components/dashboard/RecentTransactions";
import Onboarding from "../../../Components/dashboard/Onboarding";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex flex-col gap-8 animate-pulse">
    <div className="h-9 bg-gray-200 rounded w-1/4"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="h-20 bg-gray-200 rounded-xl"></div>
      <div className="h-20 bg-gray-200 rounded-xl"></div>
      <div className="h-20 bg-gray-200 rounded-xl"></div>
      <div className="h-20 bg-gray-200 rounded-xl"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-gray-200 rounded-xl"></div>
        <div className="h-48 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="h-48 bg-gray-200 rounded-xl"></div>
    </div>
    <div className="h-64 bg-gray-200 rounded-xl"></div>
  </div>
);

const FullDashboard = ({ dashboardData, userId }) => (
  <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex flex-col gap-8">
    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        icon={<Users className="h-6 w-6 text-blue-600" />}
        label="Total Events"
        value={dashboardData?.totalEvents ?? 0}
      />
      <SummaryCard
        icon={<MessageCircle className="h-6 w-6 text-green-600" />}
        label="Messages Sent"
        value={dashboardData?.messagesSent ?? 0}
      />
      <SummaryCard
        icon={<ImageIcon className="h-6 w-6 text-purple-600" />}
        label="Artwork Sold Today"
        value={dashboardData?.artworkSoldToday ?? 0}
      />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CountryStats stats={dashboardData?.countryStats ?? []} />
        <AgeDonut data={dashboardData?.ageGroups ?? []} />
      </div>
      <SentimentScore score={dashboardData?.sentimentScore ?? 0} />
    </div>
    <RecentTransactions
      transactions={dashboardData?.recentTransactions ?? []}
      userId={userId}
    />
  </div>
);

export default function ClientWrapper() {
  const { data: session, status } = useSession();
  const [onboardingStatus, setOnboardingStatus] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = session?.user?.id;

  useEffect(() => {
    if (status === "authenticated") {
      const checkOnboarding = async () => {
        try {
          const statusRes = await fetch(
            `${BACKEND_API_URL}/api/dashboard/onboarding-status`,
            {
              headers: { Authorization: `Bearer ${session.backendToken}` },
            }
          );
          if (!statusRes.ok)
            throw new Error("Could not check onboarding status.");
          const statusData = await statusRes.json();
          setOnboardingStatus(statusData);

          if (statusData.hasUploadedArtwork && statusData.isChatbotConfigured) {
            const dataRes = await fetch(
              `${BACKEND_API_URL}/api/dashboard/stats`,
              {
                headers: { Authorization: `Bearer ${session.backendToken}` },
              }
            );
            if (!dataRes.ok) throw new Error("Failed to fetch dashboard data.");
            const data = await dataRes.json();
            setDashboardData(data);
          }
        } catch (error) {
          console.error(error);
          setDashboardData({});
        } finally {
          setIsLoading(false);
        }
      };
      checkOnboarding();
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, session]);

  if (isLoading || !onboardingStatus) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const isOnboardingComplete =
    onboardingStatus.hasUploadedArtwork && onboardingStatus.isChatbotConfigured;

  return (
    <>
      {isOnboardingComplete ? (
        dashboardData ? (
          <FullDashboard dashboardData={dashboardData} userId={userId} />
        ) : (
          <DashboardSkeleton />
        )
      ) : (
        <Onboarding onboardingStatus={onboardingStatus} userId={userId} />
      )}
    </>
  );
}