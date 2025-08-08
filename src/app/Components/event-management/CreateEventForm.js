"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
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
import { Loader2 } from "lucide-react";
import { DatePicker } from "../ui/date-picker";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateEventForm({ eventData }) {
  const router = useRouter();
  const { data: session } = useSession();

  const isEditMode = !!eventData;

  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const eventDate = new Date(eventData.date);
      const startTime = eventDate.toTimeString().slice(0, 5);

      setDate(eventDate);
      setFormData({
        title: eventData.title || "",
        description: eventData.description || "",
        location: eventData.location || "",
        startTime: startTime,
        
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

  const formatDateForAPI = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !date) {
      toast.error("Event Name and Event Date are required.");
      setIsSubmitting(false);
      return;
    }

    const formattedDate = formatDateForAPI(date);
    const eventDateTime = `${formattedDate}T${formData.startTime || "00:00"}:00`;

    const payload = {
      title: formData.title,
      description: formData.description,
      date: eventDateTime,
      location: formData.location,
    };

    const url = isEditMode
      ? `${BACKEND_API_URL}/api/events/${eventData._id}`
      : `${BACKEND_API_URL}/api/events`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.backendToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Failed to ${isEditMode ? "update" : "create"} event.`
        );
      }

      toast.success(
        `Event ${isEditMode ? "updated" : "created"} successfully!`
      );
      setTimeout(() => {
        router.push(`/user/${session?.user?.id}/event-management`);
        router.refresh();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Card className="w-full max-w-2xl">
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
                  onValueChange={(value) =>
                    handleSelectChange("timezone", value)
                  }
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
                <DatePicker
                  date={date}
                  setDate={setDate}
                  fromDate={new Date()}
                />
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
                <Label>Invitation Time</Label>
                <RadioGroup
                  defaultValue="Offline"
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
                placeholder="your@email.com"
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
                "Next"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
