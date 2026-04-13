"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  disabled = false,
  className,
}: TimePickerProps) {
  const [hours, setHours] = React.useState(value ? value.split(":")[0] : "09");
  const [minutes, setMinutes] = React.useState(
    value ? value.split(":")[1] : "00",
  );

  const handleTimeChange = (newHours: string, newMinutes: string) => {
    const formattedTime = `${newHours.padStart(2, "0")}:${newMinutes.padStart(2, "0")}`;
    onChange?.(formattedTime);
  };

  const handleHourChange = (newHours: string) => {
    setHours(newHours);
    handleTimeChange(newHours, minutes);
  };

  const handleMinuteChange = (newMinutes: string) => {
    setMinutes(newMinutes);
    handleTimeChange(hours, newMinutes);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal h-9",
            !value && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Hours</label>
            <select
              value={hours}
              onChange={(e) => handleHourChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-white px-3 py-1 text-sm"
            >
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <option key={hour} value={hour.toString().padStart(2, "0")}>
                  {hour.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center pt-6">
            <span className="text-2xl font-bold">:</span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Minutes</label>
            <select
              value={minutes}
              onChange={(e) => handleMinuteChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-white px-3 py-1 text-sm"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <option key={minute} value={minute.toString().padStart(2, "0")}>
                  {minute.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
