"use client";

import { useSubscription } from "@/hooks/useSubscription";
import UpgradePlanPrompt from "./UpgradePlanprompt";
import { Loader2 } from "lucide-react";

export default function SubscriptionGuard({ children }) {
  const { entitlements, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isLoading && !entitlements.isActive) {
    return (
      <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        <UpgradePlanPrompt featureName="the AI Artist Platform" />
      </div>
    );
  }

  return <>{children}</>;
}
