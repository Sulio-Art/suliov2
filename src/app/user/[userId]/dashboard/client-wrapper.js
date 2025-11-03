"use client";

import { useSelector } from "react-redux";
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
import {
  useGetOnboardingStatusQuery,
  useGetDashboardStatsQuery,
} from "@/redux/Dashboard/dashboardApi";
import { selectBackendToken, selectCurrentUser } from "@/redux/auth/authSlice";

const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex flex-col gap-8 animate-pulse">
    <div className="h-9 bg-gray-200 rounded w-1/4"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {" "}
      {/* Changed lg:grid-cols-4 to lg:grid-cols-3 */}
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
    {/* --- THIS IS THE CORRECTED 3-CARD LAYOUT --- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      {/* The incorrect "Placeholder" card has been removed. */}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CountryStats stats={dashboardData?.countryStats ?? []} />
        <AgeDonut data={dashboardData?.ageGroups ?? []} />
      </div>
      <SentimentScore score={dashboardData?.sentimentScore ?? "0.00"} />
    </div>
    <RecentTransactions
      transactions={dashboardData?.recentTransactions ?? []}
      userId={userId}
    />
  </div>
);

export default function ClientWrapper() {
  const token = useSelector(selectBackendToken);
  const user = useSelector(selectCurrentUser);
  const userId = user?._id;

  const { data: onboardingStatus, isLoading: isOnboardingLoading } =
    useGetOnboardingStatusQuery(undefined, { skip: !token });

  const { data: dashboardData, isLoading: isStatsLoading } =
    useGetDashboardStatsQuery(undefined, {
      skip: !token,
    });

  const isOnboardingComplete =
    onboardingStatus?.hasUploadedArtwork &&
    onboardingStatus?.isChatbotConfigured;

  if (isOnboardingLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isOnboardingComplete) {
    return <Onboarding onboardingStatus={onboardingStatus} userId={userId} />;
  }

  if (isStatsLoading || !dashboardData) {
    return <DashboardSkeleton />;
  }

  return <FullDashboard dashboardData={dashboardData} userId={userId} />;
}
