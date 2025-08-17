"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  isAfter,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Pencil,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  useGetMyDiaryEntriesQuery,
  useDeleteDiaryEntryMutation,
} from "../../../redux/Diary/diaryApi";
import CalendarSkeleton from "./CalendarSkeleton";

const DiaryDetailCard = ({ entry, onEdit, onDelete }) => (
  <div className="group/item relative flex flex-col gap-2 p-2">
    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
      <Button
        onClick={onEdit}
        variant="outline"
        size="icon"
        className="h-6 w-6"
      >
        <Pencil className="h-3 w-3" />
      </Button>
      <Button
        onClick={onDelete}
        variant="destructive"
        size="icon"
        className="h-6 w-6"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
    {entry.artworkPhotos && entry.artworkPhotos[0] && (
      <div className="relative w-full h-32 rounded-md overflow-hidden">
        <Image
          src={entry.artworkPhotos[0].url}
          alt={entry.subject || "Artwork"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    )}
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-semibold">
        {entry.subject || "Diary Entry"}
      </h4>
      <span className="text-xs text-white px-2 py-1 rounded-full bg-blue-500">
        {entry.category}
      </span>
    </div>
    {entry.description && (
      <p className="text-xs text-gray-600">{entry.description}</p>
    )}
  </div>
);

const DiaryTag = ({ category, subject }) => (
  <div
    className={cn(
      "text-xs px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap",
      category === "For Sale"
        ? "bg-red-100 text-red-700"
        : "bg-sky-100 text-sky-700"
    )}
  >
    {subject || "Diary Entry"}
  </div>
);

export default function DailyDiaryCalendar() {
  const { data: diaryEntries = [], isLoading } = useGetMyDiaryEntriesQuery();
  const [deleteDiaryEntry, { isLoading: isDeleting }] =
    useDeleteDiaryEntryMutation();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const today = new Date();

  const openDeleteDialog = (entry) => {
    setEntryToDelete(entry);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!entryToDelete) return;
    try {
      await deleteDiaryEntry(entryToDelete._id).unwrap();
      toast.success("Diary entry deleted!");
    } catch (err) {
      toast.error(err.data?.message || "Failed to delete entry.");
    } finally {
      setIsConfirmOpen(false);
      setEntryToDelete(null);
    }
  };

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const totalEntriesThisMonth = diaryEntries.filter((entry) =>
    isSameMonth(parseISO(entry.date), currentMonth)
  ).length;
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Daily Diary</h1>
            <p className="text-gray-500 mt-1">
              Our AI chatbot will use the diary contents to reply to the
              potential customers.
            </p>
          </div>
          <Link href={userId ? `/user/${userId}/daily-diary/new` : "#"}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Diary
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex-shrink-0 flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-700">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg">
              This month: {totalEntriesThisMonth}
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full z-20 pointer-events-none grid grid-cols-7">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="h-7 flex items-end justify-center text-xs font-medium text-gray-500 bg-white"
                  style={{ borderBottom: "1px solid #e5e7eb" }}
                >
                  {day}
                </div>
              ))}
            </div>
            <div
              className="grid grid-cols-7 grid-rows-6 border-l border-gray-200"
              style={{ paddingTop: "1.75rem", minHeight: "420px" }}
            >
              {days.map((day) => {
                const dayStr = format(day, "yyyy-MM-dd");
                const entriesForDay = diaryEntries.filter((entry) =>
                  isSameDay(parseISO(entry.date), day)
                );
                const dayHasEntries = entriesForDay.length > 0;
                const hasMultipleEntries = entriesForDay.length > 1;
                const isPast = isAfter(today, day) && !isSameDay(today, day);
                return (
                  <HoverCard key={dayStr} openDelay={100} closeDelay={150}>
                    <HoverCardTrigger asChild>
                      <div
                        className={cn(
                          "p-2 flex flex-col items-start border-r border-b border-gray-200 relative group cursor-pointer hover:bg-gray-50 transition-colors h-full"
                        )}
                        style={{ background: "white" }}
                      >
                        <span
                          className={cn(
                            "text-sm",
                            !isSameMonth(day, currentMonth) && "text-gray-300",
                            isSameDay(day, today) &&
                              "h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center"
                          )}
                        >
                          {format(day, "d")}
                        </span>
                        {!isPast && (
                          <Link
                            href={`/user/${userId}/daily-diary/new?date=${dayStr}`}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {dayHasEntries && (
                          <div className="space-y-1 mt-1">
                            <DiaryTag
                              category={entriesForDay[0].category}
                              subject={entriesForDay[0].subject}
                            />
                            {hasMultipleEntries && (
                              <div className="text-xs text-purple-700 font-semibold">
                                + {entriesForDay.length - 1} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </HoverCardTrigger>
                    {dayHasEntries && (
                      <HoverCardContent className="w-auto p-2" align="start">
                        {hasMultipleEntries ? (
                          <div className="flex flex-col gap-1">
                            {entriesForDay.map((entry) => (
                              <HoverCard key={entry._id} openDelay={200}>
                                <HoverCardTrigger asChild>
                                  <div className="text-sm font-medium p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                    {entry.subject || "Diary Entry"}
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent
                                  className="w-80"
                                  side="right"
                                  align="start"
                                >
                                  <DiaryDetailCard
                                    entry={entry}
                                    onEdit={() =>
                                      router.push(
                                        `/user/${userId}/daily-diary/${entry._id}/edit`
                                      )
                                    }
                                    onDelete={() => openDeleteDialog(entry)}
                                  />
                                </HoverCardContent>
                              </HoverCard>
                            ))}
                          </div>
                        ) : (
                          <div className="w-80">
                            <DiaryDetailCard
                              entry={entriesForDay[0]}
                              onEdit={() =>
                                router.push(
                                  `/user/${userId}/daily-diary/${entriesForDay[0]._id}/edit`
                                )
                              }
                              onDelete={() =>
                                openDeleteDialog(entriesForDay[0])
                              }
                            />
                          </div>
                        )}
                      </HoverCardContent>
                    )}
                  </HoverCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              diary entry and its images from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}