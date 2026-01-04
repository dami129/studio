

"use client";

import * as React from "react";
import { RosterCalendar } from "@/components/roster/roster-calendar";
import { RosterSummary } from "@/components/roster/roster-summary";
import { mockDuties } from "@/lib/data";
import type { Duty, ShiftType, ShiftColors } from "@/lib/types";
import { RosterSettings } from "@/components/roster/roster-settings";
import { getDaysInMonth, startOfMonth, format, getDay } from "date-fns";

export default function RosterPage() {
  const [duties, setDuties] = React.useState<Duty[]>(mockDuties);
  const [shiftColors, setShiftColors] = React.useState<ShiftColors>({
    Morning: "bg-blue-200 text-blue-800 hover:bg-blue-200/80",
    Evening: "bg-orange-200 text-orange-800 hover:bg-orange-200/80",
    Night: "bg-indigo-200 text-indigo-800 hover:bg-indigo-200/80",
    'Overtime (Morning)': "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80",
    'Overtime (Evening)': "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80",
    'Overtime (Night)': "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80",
    Training: "bg-green-200 text-green-800 hover:bg-green-200/80",
    Leave: "bg-purple-200 text-purple-800 hover:bg-purple-200/80",
    Off: "bg-gray-200 text-gray-800 hover:bg-gray-200/80",
  });

  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handleUpdateDuty = (date: string, type: ShiftType) => {
    setDuties(prevDuties => {
      const isPresent = prevDuties.some(d => d.date === date && d.type === type);

      if (isPresent) {
        // If duty exists, remove it
        return prevDuties.filter(d => !(d.date === date && d.type === type));
      } else {
        // Duty does not exist, so add it
        let newDuties = [...prevDuties];
        const isNormalShift = ['Morning', 'Evening', 'Night'].includes(type);

        if (isNormalShift) {
          // If adding a normal shift, first remove any other normal shifts for that day
          const otherNormalShifts: ShiftType[] = ['Morning', 'Evening', 'Night'];
          newDuties = newDuties.filter(d => !(d.date === date && otherNormalShifts.includes(d.type)));
        }
        
        newDuties.push({ date, type });
        return newDuties;
      }
    });
  };

  const handleColorChange = (shiftType: ShiftType, colorClass: string) => {
    setShiftColors(prev => ({ ...prev, [shiftType]: colorClass }));
  };

  const month = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(month);
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const startDay = getDay(month); // 0 (Sun) - 6 (Sat)
  const emptyCells = Array(startDay).fill(undefined);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
          Duty Roster
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is your schedule. Click on a date to add or edit a shift.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <RosterCalendar
            duties={duties}
            onUpdateDuty={handleUpdateDuty}
            shiftColors={shiftColors}
            month={month}
            calendarDays={calendarDays}
            weekDays={weekDays}
            emptyCells={emptyCells}
          />
        </div>
        <div className="space-y-6">
          <RosterSummary duties={duties} month={month} />
          <RosterSettings 
            shiftColors={shiftColors}
            onColorChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}


