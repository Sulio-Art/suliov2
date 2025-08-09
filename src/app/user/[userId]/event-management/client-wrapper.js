"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Plus, Loader2, CalendarX2 } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import EventStats from "../../../Components/event-management/EventStats";
import EventsTable from "../../../Components/event-management/EventsTable";
import PaginationControls from "../../../Components/Reuseable/PaginationControls";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const NoDataPlaceholder = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg text-gray-500 bg-gray-50/50">
    <CalendarX2 className="h-12 w-12 mb-4 text-gray-400" />
    <p className="font-medium">{message}</p>
  </div>
);

export default function ClientWrapper() {
  const { data: session } = useSession();
  const [liveEvents, setLiveEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allEventsCount, setAllEventsCount] = useState(0);

  const userId = session?.user?.id;

  useEffect(() => {
    if (session?.backendToken) {
      setLoading(true);
      const fetchEvents = async () => {
        try {
          const response = await fetch(
            `${BACKEND_API_URL}/api/events?page=${currentPage}`,
            {
              headers: { Authorization: `Bearer ${session.backendToken}` },
            }
          );

          if (!response.ok) throw new Error("Failed to fetch events");

          const data = await response.json();
          const now = new Date();

          setLiveEvents(
            data.events.filter((event) => new Date(event.date) >= now)
          );
          setPreviousEvents(
            data.events.filter((event) => new Date(event.date) < now)
          );
          setAllEventsCount(data.totalEvents || data.events.length);
          setTotalPages(data.totalPages);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchEvents();
    }
  }, [session, currentPage]);

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
        <Link href={`/user/${userId}/event-management/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Event
          </Button>
        </Link>
      </div>

      <EventStats
        totalEvents={allEventsCount}
        liveEventsCount={liveEvents.length}
        totalEngagement={0}
        upcomingEvents={0}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Live Events</h2>
        {liveEvents.length > 0 ? (
          <EventsTable events={liveEvents} userId={userId} />
        ) : (
          <NoDataPlaceholder message="No live events to display." />
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Events</h2>
        {previousEvents.length > 0 ? (
          <EventsTable events={previousEvents} userId={userId} />
        ) : (
          <NoDataPlaceholder message="No previous events to display." />
        )}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}