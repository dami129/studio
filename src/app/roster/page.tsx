"use client";

import * as React from "react";
import { RosterCalendar } from "@/components/roster/roster-calendar";
import { RosterSummary } from "@/components/roster/roster-summary";
import type { ShiftType, ShiftColors } from "@/lib/types";
import { RosterSettings } from "@/components/roster/roster-settings";
import { getDaysInMonth, startOfMonth, getDay } from "date-fns";
import { useDuties } from "@/hooks/use-duties";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLanguage } from "@/hooks/use-language";
import FloatingCalculator from "@/components/calculator/floating-calculator";

export default function RosterPage() {
  const { t } = useLanguage();
  const { duties, setDuties } = useDuties();
  const [shiftColors, setShiftColors] = React.useState<ShiftColors>({
    Morning: "bg-blue-200 text-blue-800 hover:bg-blue-200/80",
    Evening: "bg-orange-200 text-orange-800 hover:bg-orange-200/80",
    Night: "bg-indigo-200 text-indigo-800 hover:bg-indigo-200/80",
    'Overtime (Morning)': "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80",
    'Overtime (Evening)': "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80",
    'Overtime (Night)': "bg-yellow-300 text-yellow-900 hover:bg-yellow-300/80",
    Training: "bg-green-200 text-green-800 hover:bg-green-200/80",
    'Leave (CL/VL/SL)': "bg-purple-200 text-purple-800 hover:bg-purple-200/80",
    'Off (Day Off)': "bg-gray-200 text-gray-800 hover:bg-gray-200/80",
  });

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const handleUpdateDuty = (date: string, type: ShiftType) => {
    setDuties(prevDuties => {
      const dutyExists = prevDuties.some(d => d.date === date && d.type === type);

      if (dutyExists) {
        // Remove the duty if it already exists
        return prevDuties.filter(d => !(d.date === date && d.type === type));
      } else {
        // Add the new duty
        let newDuties = [...prevDuties];
        const isNormalShift = ['Morning', 'Evening', 'Night'].includes(type);

        if (isNormalShift) {
          // If adding a normal shift, remove any other normal shifts on the same day
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
  const startDay = getDay(month);
  const emptyCells = Array(startDay).fill(undefined);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const captureCalendar = async () => {
    if (!calendarRef.current) return null;
    const canvas = await html2canvas(calendarRef.current);
    return canvas;
  };

  const handleExportPdf = async () => {
    const canvas = await captureCalendar();
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('duty-roster.pdf');
  };

  const handleShareImage = async () => {
    const canvas = await captureCalendar();
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'duty-roster.png', { type: 'image/png' })] })) {
          await navigator.share({
            files: [new File([blob], 'duty-roster.png', { type: 'image/png' })],
            title: 'Duty Roster',
            text: 'Here is my duty roster for the month.'
          });
        } else {
          alert('Sharing is not supported on your browser, or there was an error.');
        }
      } catch (error) {
        console.error('Error sharing:', error);
        alert('An error occurred while trying to share.');
      }
    }, 'image/png');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
            {t('duty_roster_title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('duty_roster_subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPdf}><Download className="w-4 h-4 mr-2" /> {t('export_pdf')}</Button>
            <Button variant="outline" onClick={handleShareImage}><Share2 className="w-4 h-4 mr-2" /> {t('share_image')}</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <RosterCalendar
            ref={calendarRef}
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
      <FloatingCalculator />
    </div>
  );
}
