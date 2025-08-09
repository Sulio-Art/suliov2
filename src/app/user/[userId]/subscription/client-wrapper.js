"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, ShieldAlert } from "lucide-react";
import SubscriptionDetails from "../../../Components/subscription/SubscriptionDetails";
import NoSubscription from "../../../Components/subscription/NoSubscription";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ClientWrapper() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.backendToken) {
      const fetchSubscription = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${BACKEND_API_URL}/api/subscriptions/mine`,
            {
              headers: {
                Authorization: `Bearer ${session.backendToken}`,
              },
            }
          );

          if (response.status === 404) {
            setSubscription(null);
            return;
          }

          if (!response.ok) {
            throw new Error("Failed to fetch your subscription details.");
          }

          const data = await response.json();
          setSubscription(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSubscription();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 bg-gray-50 text-center flex flex-col items-center justify-center">
        <ShieldAlert className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-600">
          An Error Occurred
        </h2>
        <p className="text-gray-500">{error}</p>
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
