"use client";

// TODO need to delete this file

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export function useSubscription() {
  const { data: session, status: sessionStatus } = useSession();
  const backendToken = session?.backendToken;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (!backendToken || sessionStatus !== "authenticated") {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/mine`, {
      headers: {
        Authorization: `Bearer ${backendToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw { status: res.status, body };
        }
        return res.json();
      })
      .then((json) => {
        if (mounted) {
          setData(json);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [backendToken, sessionStatus]);

  const hasAccess = (featureKey) => {
    if (!data?.entitlements?.features) return false;
    return !!data.entitlements.features[featureKey];
  };

  return {
    plan: data?.plan || "free",
    status: data?.status || null,
    entitlements: data?.entitlements || null,
    daysRemaining: data?.daysRemaining ?? null,
    isLoading,
    error,
    hasAccess,
    raw: data,
  };
}
