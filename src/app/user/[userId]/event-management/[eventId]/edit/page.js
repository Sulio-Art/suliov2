"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import CreateEventForm from "../../../../../Components/event-management/CreateEventForm";
import { Loader2 } from "lucide-react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditEventPage() {
  const { data: session } = useSession();
  const params = useParams();
  const { eventId } = params;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.backendToken && eventId) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`${BACKEND_API_URL}/api/events/${eventId}`, {
            headers: {
              Authorization: `Bearer ${session.backendToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch event data.");
          }
          const data = await response.json();
          setEventData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [session, eventId]);

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
    <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
      
      <CreateEventForm eventData={eventData} />
    </div>
  );
}