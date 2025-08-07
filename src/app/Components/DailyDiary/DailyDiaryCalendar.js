"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { cn } from "@/lib/utils";

const DiaryTag = ({ type, children }) => {
  const baseStyle =
    "text-xs px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap";
  const styles = {
    task: "bg-red-100 text-red-700",
    note: "bg-sky-100 text-sky-700",
    special: "bg-purple-100 text-purple-700",
    extra: "bg-purple-100 text-purple-700",
  };
  return <div className={cn(baseStyle, styles[type])}>{children}</div>;
};

export default function DailyDiaryCalendar() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: session } = useSession();

  const today = new Date();
  const userId = session?.user?.id;

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const totalEntriesThisMonth = diaryEntries.filter((entry) =>
    isSameMonth(new Date(entry.date), currentMonth)
  ).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daily Diary</h1>
          <p className="text-gray-500 mt-1">
            Our AI chatbot will use the diary contents to reply to the potential
            customers
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
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
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

        <div className="grid grid-cols-7">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}

          {days.map((day) => {
            const entriesForDay = diaryEntries.filter((entry) =>
              isSameDay(new Date(entry.date), day)
            );
            const dayHasOverflow = entriesForDay.length > 2;

            return (
              <div
                key={day.toString()}
                className="h-32 border-t border-l border-gray-200 p-2 flex flex-col"
              >
                <span
                  className={cn(
                    "self-end text-sm",
                    !isSameMonth(day, currentMonth) && "text-gray-300",
                    isSameDay(day, today) &&
                      "h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center"
                  )}
                >
                  {format(day, "d")}
                </span>

                <div className="flex flex-col gap-1 overflow-hidden mt-1">
                  {dayHasOverflow ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="space-y-1 cursor-pointer">
                          {entriesForDay.slice(0, 2).map((entry, index) => (
                            <DiaryTag key={index} type={entry.type}>
                              {entry.text}
                            </DiaryTag>
                          ))}
                          <DiaryTag type="extra">
                            +{entriesForDay.length - 2}
                          </DiaryTag>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto p-3" align="start">
                        <div className="flex flex-col gap-2">
                          {entriesForDay.map((entry, index) => (
                            <DiaryTag key={index} type={entry.type}>
                              {entry.text}
                            </DiaryTag>
                          ))}
                          <button className="mt-2 self-end w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    entriesForDay.map((entry, index) => (
                      <DiaryTag key={index} type={entry.type}>
                        {entry.text}
                      </DiaryTag>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
