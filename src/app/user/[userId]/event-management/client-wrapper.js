"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "../../../../Components/ui/button";
import EventStats from "../../../../Components/event-management/EventStats";
import EventsTable from "../../../../Components/event-management/EventsTable";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ClientWrapper() {
  const { data: session } = useSession();
  const [liveEvents, setLiveEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (session?.backendToken) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`${BACKEND_API_URL}/api/events`, {
            headers: {
              Authorization: `Bearer ${session.backendToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }

          const events = await response.json();
          const now = new Date();
          const live = events.filter((event) => new Date(event.date) >= now);
          const previous = events.filter((event) => new Date(event.date) < now);

          setLiveEvents(live);
          setPreviousEvents(previous);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
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
      <div className="flex-1 p-8 bg-gray-50 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  const allEvents = [...liveEvents, ...previousEvents];

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Link href={`/user/${userId}/event-management/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Event
          </Button>
        </Link>
      </div>

      <EventStats
        totalEvents={allEvents.length}
        liveEventsCount={liveEvents.length}
        totalEngagement={0}
        upcomingEvents={0}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Live Events</h2>

        <EventsTable events={liveEvents} userId={userId} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Events</h2>

        <EventsTable events={previousEvents} userId={userId} />
      </div>
    </div>
  );
}
