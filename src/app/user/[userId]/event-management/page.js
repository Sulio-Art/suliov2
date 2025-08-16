import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ClientWrapper from "./client-wrapper";
import ClientSideWrapper from "@/app/Components/Reuseable/ClientSideWrapper";
import SubscriptionGuard from "@/app/Components/Reuseable/SubscitpionGuard";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getEvents(token) {
  if (!token) {
    return {
      events: [],
      totalEvents: 0,
      totalEngagement: 0,
      error: "Authentication token not found.",
    };
  }

  try {
    const response = await fetch(`${BACKEND_API_URL}/api/events?limit=all`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (response.status === 204) {
      return { events: [], totalEvents: 0, totalEngagement: 0, error: null };
    }

    if (!response.ok) {
      return {
        events: [],
        totalEvents: 0,
        totalEngagement: 0,
        error: `Failed to fetch events: ${response.statusText}`,
      };
    }

    return response.json();
  } catch (error) {
    console.error("Server-side fetch failed:", error);
    return {
      events: [],
      totalEvents: 0,
      totalEngagement: 0,
      error: "An error occurred while fetching data.",
    };
  }
}

export default async function EventManagementPage() {
  const session = await getServerSession(authOptions);
  const initialData = await getEvents(session?.backendToken);

  return (
    <ClientSideWrapper>
      <SubscriptionGuard>
        <ClientWrapper initialData={initialData} />
      </SubscriptionGuard>
    </ClientSideWrapper>
  );
}