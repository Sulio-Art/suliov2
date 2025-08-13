import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import ClientWrapper from "./client-wrapper";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getSubscription(token) {
  if (!token) {
    return null;
  }
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/subscriptions/mine`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store", // Always fetch latest subscription info
    });

    // A 404 is not an error, it just means no subscription exists
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      // For other errors, log them
      console.error("Failed to fetch subscription", await response.text());
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching subscription:", err);
    return null;
  }
}

export default async function SubscriptionPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const initialSubscription = await getSubscription(session.backendToken);

  return <ClientWrapper initialSubscription={initialSubscription} />;
}
