"use client";

import { useGetMySubscriptionQuery } from "@/redux/Subscription/subscriptionApi";
import UpgradePlanPrompt from "./UpgradePlanprompt";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

export default function SubscriptionGuard({ children }) {

  const token = useSelector(selectBackendToken);

  
  const { data: subscription, isLoading } = useGetMySubscriptionQuery(
    undefined,
    {
      skip: !token,
    }
  );

  const isVerifying = isLoading || !token;

  if (isVerifying) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isVerifying && !subscription?.entitlements?.isActive) {
    return (
      <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        <UpgradePlanPrompt featureName="the AI Artist Platform" />
      </div>
    );
  }

  return <>{children}</>;
}