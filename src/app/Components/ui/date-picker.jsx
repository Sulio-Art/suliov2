"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/app/Components/ui/button";
import { Calendar } from "@/app/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/Components/ui/popover";

export function DatePicker({ date, setDate, fromDate }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            setIsOpen(false);
          }}
          fromDate={fromDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
