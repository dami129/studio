"use client"

import * as React from "react"
import type { Duty, ShiftType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { addDays, format, getDaysInMonth, getDay, startOfMonth, isSameMonth, getDate, isToday } from "date-fns"
import { Badge } from "@/components/ui/badge"

const shiftColors: Record<ShiftType, string> = {
    Morning: "bg-blue-200 text-blue-800 hover:bg-blue-200/80",
    Evening: "bg-orange-200 text-orange-800 hover:bg-orange-200/80",
    Night: "bg-indigo-200 text-indigo-800 hover:bg-indigo-200/80",
    Off: "bg-gray-200 text-gray-800 hover:bg-gray-200/80",
    Leave: "bg-purple-200 text-purple-800 hover:bg-purple-200/80",
    Overtime: "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80",
    Training: "bg-green-200 text-green-800 hover:bg-green-200/80"
};

export function RosterCalendar({ duties }: { duties: Duty[] }) {
    const [month, setMonth] = React.useState(new Date());

    const dutiesByDate = React.useMemo(() => {
        const map = new Map<string, ShiftType[]>();
        duties.forEach(duty => {
            const dutyDate = new Date(duty.date);
            const localDateStr = format(dutyDate, 'yyyy-MM-dd');
            if (!map.has(localDateStr)) {
                map.set(localDateStr, []);
            }
            map.get(localDateStr)!.push(duty.type);
        });
        return map;
    }, [duties]);

    const firstDayOfMonth = startOfMonth(month);
    const daysInMonth = getDaysInMonth(month);
    const startingDayOfWeek = getDay(firstDayOfMonth); // 0 (Sun) to 6 (Sat)

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyCells = Array.from({ length: startingDayOfWeek });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return (
        <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{format(month, 'MMMM yyyy')}</h2>
                    {/* Add month navigation buttons here if needed */}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {weekDays.map(day => (
                        <div key={day} className="text-center font-semibold text-muted-foreground text-sm pb-2 border-b">
                            {day}
                        </div>
                    ))}
                    {emptyCells.map((_, i) => (
                        <div key={`empty-${i}`} className="border-r border-b"></div>
                    ))}
                    {calendarDays.map(day => {
                        const date = new Date(month.getFullYear(), month.getMonth(), day);
                        const dateString = format(date, 'yyyy-MM-dd');
                        const dayShifts = dutiesByDate.get(dateString);
                        const isCurrentDay = isToday(date);
                        
                        return (
                            <div key={day} className={cn("p-2 h-28 border-r border-b relative", {
                                "bg-primary/10": isCurrentDay
                            })}>
                                <div className={cn("font-semibold", {
                                    "text-primary font-bold": isCurrentDay
                                })}>
                                  {day}
                                </div>
                                <div className="mt-1 flex flex-col gap-1">
                                    {dayShifts?.map((shift, i) => (
                                        <Badge key={i} className={cn("text-xs font-bold justify-center", shiftColors[shift])}>
                                            {shift}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
