"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Duty, ShiftType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { addDays, format, isValid } from "date-fns"
import { Button } from "../ui/button"
import { Edit } from "lucide-react"

const shiftColors: Record<ShiftType, string> = {
    Morning: "bg-blue-200/50 border-blue-300 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-200",
    Evening: "bg-orange-200/50 border-orange-300 text-orange-800 dark:bg-orange-900/50 dark:border-orange-700 dark:text-orange-200",
    Night: "bg-indigo-200/50 border-indigo-300 text-indigo-800 dark:bg-indigo-900/50 dark:border-indigo-700 dark:text-indigo-200",
    Off: "bg-gray-200/50 border-gray-300 text-gray-800 dark:bg-gray-800/50 dark:border-gray-600 dark:text-gray-200",
    Leave: "bg-purple-200/50 border-purple-300 text-purple-800 dark:bg-purple-900/50 dark:border-purple-700 dark:text-purple-200",
    Overtime: "bg-yellow-200/50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-700 dark:text-yellow-200",
};

export function RosterCalendar({ duties }: { duties: Duty[] }) {
    const [month, setMonth] = React.useState(new Date());

    const dutiesByDate = React.useMemo(() => {
        const map = new Map<string, ShiftType>();
        duties.forEach(duty => {
            const dutyDate = new Date(duty.date);
            // Adjust for timezone differences
            const localDate = addDays(dutyDate, 1);
            map.set(format(localDate, 'yyyy-MM-dd'), duty.type);
        });
        return map;
    }, [duties]);

    const DayWithShift = ({ date }: { date: Date }) => {
        if (!date || !isValid(date)) {
            return null;
        }

        const dateString = format(date, 'yyyy-MM-dd');
        const shift = dutiesByDate.get(dateString);

        if (shift) {
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <div className={cn("w-full h-full flex items-center justify-center rounded-md cursor-pointer", shiftColors[shift])}>
                            {date.getDate()}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold">{format(date, 'EEE, MMM d')} - {shift}</span>
                            <Button size="sm" variant="outline"><Edit className="w-3 h-3 mr-2" /> Edit Shift</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            );
        }
        return (
            <div className="w-full h-full flex items-center justify-center">
                {date.getDate()}
            </div>
        );
    };

    return (
        <Card>
            <CardContent className="p-2 md:p-4">
                <Calendar
                    mode="single"
                    month={month}
                    onMonthChange={setMonth}
                    className="w-full"
                    classNames={{
                        cell: "h-12 w-14 lg:h-16 lg:w-20 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-full w-full p-1 rounded-md",
                    }}
                    components={{
                        Day: ({ date }) => <DayWithShift date={date} />,
                    }}
                />
            </CardContent>
        </Card>
    )
}
