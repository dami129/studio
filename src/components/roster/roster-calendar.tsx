
"use client";

import * as React from "react";
import type { Duty, ShiftType, ShiftColors } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  format,
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
import { useLanguage } from "@/hooks/use-language";

const normalShifts: ShiftType[] = ["Morning", "Evening", "Night"];
const specialShifts: ShiftType[] = ["Training", "Leave (CL/VL/SL)", "Off (Day Off)"];
const overtimeShifts: ShiftType[] = ["Overtime (Morning)", "Overtime (Evening)", "Overtime (Night)"];


const RosterCalendar = React.forwardRef<
  HTMLDivElement,
  {
    duties: Duty[];
    onUpdateDuty: (date: string, type: ShiftType) => void;
    shiftColors: ShiftColors;
    month: Date;
    calendarDays: number[];
    weekDays: string[];
    emptyCells: undefined[]
  }
>(({
  duties,
  onUpdateDuty,
  shiftColors,
  month,
  calendarDays,
  weekDays,
  emptyCells
}, ref) => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [showOvertimeOptions, setShowOvertimeOptions] = React.useState(false);


  const dutiesByDate = React.useMemo(() => {
    const map = new Map<string, ShiftType[]>();
    duties.forEach(duty => {
      const dutyDate = new Date(duty.date + 'T00:00:00');
      const localDateStr = format(dutyDate, "yyyy-MM-dd");
      if (!map.has(localDateStr)) {
        map.set(localDateStr, []);
      }
      map.get(localDateStr)!.push(duty.type);
    });
    return map;
  }, [duties]);

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(month.getFullYear(), month.getMonth(), day));
    setShowOvertimeOptions(false); // Reset on new date selection
  };

  const handleCloseDialog = () => {
    setSelectedDate(null);
    setShowOvertimeOptions(false);
  }

  const handleShiftSelection = (type: ShiftType) => {
    if (selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd");
      onUpdateDuty(dateString, type);
    }
  }
  
  const handleOvertimeButtonClick = (shift: ShiftType) => {
    handleShiftSelection(shift);
  }

  const selectedDateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const shiftsForSelectedDate = dutiesByDate.get(selectedDateString) || [];

  const getTranslationKey = (shift: ShiftType): string => {
    const key = `shift_${shift.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    if (shift.startsWith('Overtime')) {
        return `${key}_short`;
    }
    return key;
  }
  
  const getBadgeTranslationKey = (shift: ShiftType): string => {
     const key = `shift_${shift.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
     return key;
  }


  return (
    <>
      <div ref={ref} className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{month instanceof Date && !isNaN(month.getTime()) ? format(month, "MMMM yyyy") : 'Loading...'}</h2>
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
                        variant="default"
                      >
                        {t(getBadgeTranslationKey(shift))}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Dialog open={!!selectedDate} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t('manage_duty_for')} {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </DialogTitle>
            <DialogDescription>
              {t('manage_duty_desc')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold mb-2">{t('normal_duties')}</h4>
              <div className="flex flex-wrap gap-2">
                {normalShifts.map(shift => (
                  <Button
                    key={shift}
                    onClick={() => handleShiftSelection(shift)}
                    variant={shiftsForSelectedDate.includes(shift) ? "default" : "outline"}
                    className={cn({
                      [shiftColors[shift]]: shiftsForSelectedDate.includes(shift),
                      'ring-2 ring-offset-2 ring-ring': shiftsForSelectedDate.includes(shift)
                    })}
                  >
                    {t(getTranslationKey(shift))}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t('shift_overtime')}</h4>
                <Button variant="outline" onClick={() => setShowOvertimeOptions(!showOvertimeOptions)}>{t('add_overtime')}</Button>
                {showOvertimeOptions && (
                    <div className="mt-2 flex flex-col gap-2">
                        {overtimeShifts.map(shift => (
                           <button
                                key={shift}
                                onClick={() => handleOvertimeButtonClick(shift)}
                                className={cn(`w-full text-left px-4 py-3 rounded-xl border transition`,
                                    shiftsForSelectedDate.includes(shift)
                                    ? "bg-blue-100 border-blue-400 text-blue-700"
                                    : "bg-white border-gray-300 text-gray-700"
                                )}
                            >
                                {t(getTranslationKey(shift))}
                            </button>
                        ))}
                    </div>
                )}
            </div>
             <div>
              <h4 className="font-semibold mb-2">{t('other_shift_types')}</h4>
              <div className="flex flex-wrap gap-2">
                {specialShifts.map(shift => (
                  <Button
                    key={shift}
                    onClick={() => handleShiftSelection(shift)}
                    variant={shiftsForSelectedDate.includes(shift) ? "default" : "outline"}
                    className={cn({
                      [shiftColors[shift]]: shiftsForSelectedDate.includes(shift),
                       'bg-purple-100 border-purple-400 text-purple-700': shiftsForSelectedDate.includes(shift) && shift.startsWith('Leave'),
                       'bg-gray-100 border-gray-400 text-gray-700': shiftsForSelectedDate.includes(shift) && shift.startsWith('Off'),
                    })}
                  >
                    {t(getTranslationKey(shift))}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

RosterCalendar.displayName = 'RosterCalendar';
export { RosterCalendar };
