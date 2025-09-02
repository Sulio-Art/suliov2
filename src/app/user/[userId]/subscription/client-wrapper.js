"use client";

// --- Imports for auth token ---
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

import { useGetMySubscriptionQuery } from "@/redux/Subscription/subscriptionApi";
import SubscriptionDetails from "../../../Components/subscription/SubscriptionDetails";
import NoSubscription from "../../../Components/subscription/NoSubscription";
import { Loader2 } from "lucide-react";

export default function ClientWrapper() {
  // --- Get the token from the Redux store ---
  const token = useSelector(selectBackendToken);

  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useGetMySubscriptionQuery(
    undefined,
    // --- Pass the skip option to the hook ---
    // This query will not run until the token exists.
    { skip: !token }
  );

  // The isLoading state will now only be true when the token exists AND
  // the network request is actually in flight.
  if (isLoading) {
    return (
      <div className="flex-1 p-4 md:p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>
        <div className="flex items-center justify-center pt-16">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 p-4 md:p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-md">
          <p>We couldn't load your subscription details.</p>
          <p className="text-sm mt-1">
            {error?.data?.message || "Please try refreshing the page."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>
      {subscription ? (
        <SubscriptionDetails subscription={subscription} />
      ) : (
        <NoSubscription />
      )}
    </div>
  );
}