"use client";

import { useParams } from "next/navigation";
import CreateEventForm from "../../../../../Components/event-management/CreateEventForm";
import { Loader2 } from "lucide-react";
import { useGetEventByIdQuery } from "@/redux/Event/eventApi";

export default function EditEventPage() {
  const params = useParams();
  const { eventId } = params;

  const {
    data: eventData,
    isLoading,
    isError,
    error,
  } = useGetEventByIdQuery(eventId);

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
        Error: {error.data?.message || "Failed to fetch event data."}
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
      <CreateEventForm eventData={eventData} />
    </div>
  );
}