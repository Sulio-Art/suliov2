"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/redux/Event/eventApi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Loader2, X } from "lucide-react";
import { DatePicker } from "../ui/date-picker";

export default function CreateEventForm({ eventData }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isEditMode = !!eventData;

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const isSubmitting = isCreating || isUpdating;

  const [date, setDate] = useState();
  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    timezone: "",
    startTime: "",
    endTime: "",
    description: "",
    invitationType: "Offline",
    location: "",
    externalLink: "",
  });

  useEffect(() => {
    if (isEditMode && eventData) {
      const eventDateValue = eventData.startTime || eventData.date;
      const eventStartDate = eventDateValue
        ? new Date(eventDateValue)
        : undefined;

      const startTime = eventStartDate
        ? eventStartDate.toTimeString().slice(0, 5)
        : "";
      const endTime = eventData.endTime
        ? new Date(eventData.endTime).toTimeString().slice(0, 5)
        : "";

      setDate(eventStartDate);
      setFormData({
        title: eventData.title || "",
        eventType: eventData.eventType || "",
        description: eventData.description || "",
        location: eventData.location || "",
        startTime: startTime,
        endTime: endTime,
        timezone: eventData.timezone || "",
        invitationType: eventData.invitationType || "Offline",
        externalLink: eventData.externalLink || "",
      });
    }
  }, [isEditMode, eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, invitationType: value }));
  };

  const combineDateAndTime = (dateObj, timeStr) => {
    if (!dateObj || !timeStr) return null;
    const [hours, minutes] = timeStr.split(":");
    const newDate = new Date(dateObj);
    newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return newDate.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !date || !formData.startTime) {
      toast.error("Event Name, Date, and Start Time are required.");
      return;
    }
    if (formData.endTime && formData.startTime > formData.endTime) {
      toast.error("End time cannot be before the start time.");
      return;
    }

    const payload = {
      ...formData,
      startTime: combineDateAndTime(date, formData.startTime),
      endTime: combineDateAndTime(date, formData.endTime),
    };

    try {
      if (isEditMode) {
        await updateEvent({ id: eventData._id, ...payload }).unwrap();
        toast.success("Event updated successfully!");
      } else {
        await createEvent(payload).unwrap();
        toast.success("Event created successfully!");
      }

      router.push(`/user/${session?.user?.id}/event-management`);
    } catch (error) {
      toast.error(
        error.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} event.`
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => router.back()}
      >
        <X className="h-5 w-5" />
      </Button>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isEditMode ? "Edit Event" : "Create New Event"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Name</Label>
            <Input
              id="title"
              name="title"
              placeholder="Type Event Name"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Type of event</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("eventType", value)
                }
                value={formData.eventType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Select timezone</Label>
              <Select
                onValueChange={(value) => handleSelectChange("timezone", value)}
                value={formData.timezone}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt">GMT</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="date">Event Date</Label>
              <DatePicker date={date} setDate={setDate} fromDate={new Date()} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Event Activity Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Write down the description in 500 letters"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <Label>Invitation Type</Label>
              <RadioGroup
                defaultValue="Offline"
                value={formData.invitationType}
                onValueChange={handleRadioChange}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Offline" id="offline" />
                  <Label htmlFor="offline">Offline</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Online" id="online" />
                  <Label htmlFor="online">Online</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Event Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Search Location"
                value={formData.location}
                onChange={handleChange}
                disabled={formData.invitationType === "Online"}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="externalLink">External Website Link</Label>
            <Input
              id="externalLink"
              name="externalLink"
              placeholder="https://example.com"
              value={formData.externalLink}
              onChange={handleChange}
              disabled={formData.invitationType === "Offline"}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}