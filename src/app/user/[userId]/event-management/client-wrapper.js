"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Plus, Loader2, CalendarX2 } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import EventStats from "../../../Components/event-management/EventStats";
import EventsTable from "../../../Components/event-management/EventsTable";
import { toast } from "react-hot-toast";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const NoDataPlaceholder = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg text-gray-500 bg-gray-50/50">
    <CalendarX2 className="h-12 w-12 mb-4 text-gray-400" />
    <p className="font-medium">{message}</p>
  </div>
);

const processEventData = (data) => {
  if (!data || !data.events) {
    return { live: [], previous: [] };
  }
  const now = new Date();
  const validEvents = (data.events || []).filter((event) => {
    const eventDateValue = event.startTime || event.date;
    return eventDateValue && !isNaN(new Date(eventDateValue));
  });
  const live = validEvents.filter(
    (event) => new Date(event.startTime || event.date) >= now
  );
  const previous = validEvents.filter(
    (event) => new Date(event.startTime || event.date) < now
  );
  return { live, previous };
};

export default function ClientWrapper({ initialData }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { live: initialLiveEvents, previous: initialPreviousEvents } =
    processEventData(initialData);

  const [liveEvents, setLiveEvents] = useState(initialLiveEvents);
  const [previousEvents, setPreviousEvents] = useState(initialPreviousEvents);
  const [allEventsCount, setAllEventsCount] = useState(
    initialData?.totalEvents || 0
  );
  const [totalEngagement, setTotalEngagement] = useState(
    initialData?.totalEngagement || 0
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialData?.error || null);

  const fetchEvents = async () => {
    if (!session?.backendToken) return;
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/events?limit=all`, {
        headers: { Authorization: `Bearer ${session.backendToken}` },
      });
      if (!response.ok)
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      const data = await response.json();
      const { live, previous } = processEventData(data);
      setLiveEvents(live);
      setPreviousEvents(previous);
      setAllEventsCount(data.totalEvents || 0);
      setTotalEngagement(data.totalEngagement || 0);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.backendToken}` },
      });
      if (!response.ok) throw new Error("Failed to delete event.");
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Event Management</h1>
        {userId && (
          <Link href={`/user/${userId}/event-management/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New Event
            </Button>
          </Link>
        )}
      </div>

      <EventStats
        totalEvents={allEventsCount}
        totalEngagement={totalEngagement}
        upcomingEvents={liveEvents.length}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Live Events</h2>
        {liveEvents.length > 0 ? (
          <EventsTable
            events={liveEvents}
            userId={userId}
            onDelete={handleDeleteEvent}
          />
        ) : (
          <NoDataPlaceholder message="No live events to display." />
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Events</h2>
        {previousEvents.length > 0 ? (
          <EventsTable
            events={previousEvents}
            userId={userId}
            onDelete={handleDeleteEvent}
          />
        ) : (
          <NoDataPlaceholder message="No previous events to display." />
        )}
      </div>
    </div>
  );
}