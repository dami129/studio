
"use client";

import * as React from "react";
import type { Duty, ShiftType, ShiftColors } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  addDays,
  format,
  getDaysInMonth,
  getDay,
  startOfMonth,
  isSameMonth,
  getDate,
  isToday,
} from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const normalShifts: ShiftType[] = ["Morning", "Evening", "Night"];
const specialShifts: ShiftType[] = ["Overtime", "Training", "Leave", "Off"];

export function RosterCalendar({
  duties,
  onUpdateDuty,
  shiftColors,
}: {
  duties: Duty[];
  onUpdateDuty: (date: string, type: ShiftType) => void;
  shiftColors: ShiftColors;
}) {
  const [month, setMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const dutiesByDate = React.useMemo(() => {
    const map = new Map<string, ShiftType[]>();
    duties.forEach(duty => {
      const dutyDate = new Date(duty.date);
      const localDateStr = format(dutyDate, "yyyy-MM-dd");
      if (!map.has(localDateStr)) {
        map.set(localDateStr, []);
      }
      map.get(localDateStr)!.push(duty.type);
    });
    return map;
  }, [duties]);

  const firstDayOfMonth = startOfMonth(month);
  const daysInMonth = getDaysInMonth(month);
  const startingDayOfWeek = getDay(firstDayOfMonth);

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: startingDayOfWeek });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(month.getFullYear(), month.getMonth(), day));
  };

  const selectedDateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const shiftsForSelectedDate = dutiesByDate.get(selectedDateString) || [];

  return (
    <>
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{format(month, "MMMM yyyy")}</h2>
            {/* Add month navigation buttons here if needed */}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div
                key={day}
                className="text-center font-semibold text-muted-foreground text-sm pb-2 border-b"
              >
                {day}
              </div>
            ))}
            {emptyCells.map((_, i) => (
              <div key={`empty-${i}`} className="border-r border-b"></div>
            ))}
            {calendarDays.map(day => {
              const date = new Date(month.getFullYear(), month.getMonth(), day);
              const dateString = format(date, "yyyy-MM-dd");
              const dayShifts = dutiesByDate.get(dateString);
              const isCurrentDay = isToday(date);

              return (
                <div
                  key={day}
                  className={cn(
                    "p-2 h-28 border-r border-b relative cursor-pointer hover:bg-accent/50 transition-colors",
                    {
                      "bg-primary/10": isCurrentDay,
                    }
                  )}
                  onClick={() => handleDateClick(day)}
                >
                  <div
                    className={cn("font-semibold", {
                      "text-primary font-bold": isCurrentDay,
                    })}
                  >
                    {day}
                  </div>
                  <div className="mt-1 flex flex-col gap-1 overflow-y-auto">
                    {dayShifts?.map((shift, i) => (
                      <Badge
                        key={i}
                        className={cn(
                          "text-xs font-bold justify-center",
                          shiftColors[shift]
                        )}
                      >
                        {shift}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Manage Duty for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </DialogTitle>
            <DialogDescription>
              Select the duties that apply to this day.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold mb-2">Normal Duties</h4>
              <div className="flex flex-wrap gap-2">
                {normalShifts.map(shift => (
                  <Button
                    key={shift}
                    onClick={() => onUpdateDuty(selectedDateString, shift)}
                    className={cn(shiftColors[shift], {
                      'ring-2 ring-offset-2 ring-ring': shiftsForSelectedDate.includes(shift)
                    })}
                  >
                    {shift}
                  </Button>
                ))}
              </div>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Other Shift Types</h4>
              <div className="flex flex-wrap gap-2">
                {specialShifts.map(shift => (
                  <Button
                    key={shift}
                    onClick={() => onUpdateDuty(selectedDateString, shift)}
                    className={cn(shiftColors[shift], {
                      'ring-2 ring-offset-2 ring-ring': shiftsForSelectedDate.includes(shift)
                    })}
                  >
                    {shift}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
