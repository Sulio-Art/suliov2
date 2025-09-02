"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Plus, Loader2, CalendarX2 } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import EventStats from "../../../Components/event-management/EventStats";
import EventsTable from "../../../Components/event-management/EventsTable";
import { toast } from "react-hot-toast";
import {
  useGetEventsQuery,
  useDeleteEventMutation,
} from "@/redux/Event/eventApi";
// --- ADD THESE IMPORTS ---
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

const NoDataPlaceholder = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg text-gray-500 bg-gray-50/50">
    <CalendarX2 className="h-12 w-12 mb-4 text-gray-400" />
    <p className="font-medium">{message}</p>
  </div>
);

const processEventData = (data) => {
  if (!data || !data.events) return { live: [], previous: [] };
  const now = new Date();
  const live = data.events.filter(
    (event) => new Date(event.startTime || event.date) >= now
  );
  const previous = data.events.filter(
    (event) => new Date(event.startTime || event.date) < now
  );
  return { live, previous };
};

export default function ClientWrapper() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // --- ADD THIS LINE to get the token ---
  const token = useSelector(selectBackendToken);

  // --- UPDATE THIS HOOK with the `skip` option ---
  const {
    data: eventData,
    isLoading,
    isError,
    error,
  } = useGetEventsQuery(undefined, { skip: !token });

  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const handleDeleteEvent = async (eventId) => {
    toast.promise(deleteEvent(eventId).unwrap(), {
      loading: "Deleting event...",
      success: "Event deleted successfully!",
      error: (err) => err.data?.message || "Failed to delete event.",
    });
  };

  // --- The rest of the component remains the same ---
  if (isLoading) {
    return (
      <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex-1 p-8 bg-gray-50 text-center text-red-500">
        Error: {error.data?.message || "Failed to load events."}
      </div>
    );
  }

  const { live, previous } = processEventData(eventData);

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
        totalEvents={eventData?.totalEvents || 0}
        totalEngagement={eventData?.totalEngagement || 0}
        upcomingEvents={live.length}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Live Events</h2>
        {live.length > 0 ? (
          <EventsTable
            events={live}
            userId={userId}
            onDelete={handleDeleteEvent}
          />
        ) : (
          <NoDataPlaceholder message="No live events to display." />
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Events</h2>
        {previous.length > 0 ? (
          <EventsTable
            events={previous}
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