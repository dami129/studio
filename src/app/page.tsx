
"use client";

import React from "react";
import { DutyCard } from "@/components/dashboard/duty-card";
import { BudgetCard } from "@/components/dashboard/budget-card";
import { GoalCard } from "@/components/dashboard/goal-card";
import { QuoteCard } from "@/components/dashboard/quote-card";
import { Frown, Smile, Users } from "lucide-react";
import { useDuties } from "@/hooks/use-duties";
import { useIncome } from "@/hooks/use-income";
import { useExpenses } from "@/hooks/use-expenses";
import { isBefore, parseISO, startOfToday, isSameMonth, setHours, setMinutes, setSeconds, isAfter, addDays } from "date-fns";
import type { Duty, ShiftType } from "@/lib/types";
import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import NurseSunriseCard from "@/components/motivation/nurse-sunrise-card";

const shiftTimes: Record<ShiftType, { start: { hour: number, minute: number }, end: { hour: number, minute: number, dayOffset?: number } } | null> = {
  'Morning': { start: { hour: 7, minute: 0 }, end: { hour: 13, minute: 0 } },
  'Evening': { start: { hour: 13, minute: 0 }, end: { hour: 19, minute: 0 } },
  'Night': { start: { hour: 19, minute: 0 }, end: { hour: 7, minute: 0, dayOffset: 1 } },
  'Overtime (Morning)': { start: { hour: 7, minute: 0 }, end: { hour: 13, minute: 0 } },
  'Overtime (Evening)': { start: { hour: 13, minute: 0 }, end: { hour: 19, minute: 0 } },
  'Overtime (Night)': { start: { hour: 19, minute: 0 }, end: { hour: 7, minute: 0, dayOffset: 1 } },
  'Training': { start: { hour: 8, minute: 0 }, end: { hour: 17, minute: 0 } },
  'Leave (CL/VL/SL)': null,
  'Off (Day Off)': null,
};

function getSchedule(duties: Duty[]) {
  const now = new Date();
  const today = startOfToday();

  const upcomingDuties = duties
    .map(d => {
        const dutyDate = parseISO(d.date);
        const shiftInfo = shiftTimes[d.type];

        if (!shiftInfo) {
            // Handle full-day events like 'Leave' or 'Off'
            const startDateTime = setHours(setMinutes(setSeconds(dutyDate, 0), 0), 0);
            const endDateTime = setHours(setMinutes(setSeconds(dutyDate, 59), 59), 23);
            return { ...d, startDateTime, endDateTime };
        }

        const startDateTime = setHours(setMinutes(dutyDate, shiftInfo.start.minute), shiftInfo.start.hour);
        let endDateTime = setHours(setMinutes(dutyDate, shiftInfo.end.minute), shiftInfo.end.hour);

        if (shiftInfo.end.dayOffset) {
            endDateTime = addDays(endDateTime, shiftInfo.end.dayOffset);
        }
        
        return { ...d, startDateTime, endDateTime };
    })
    .filter(d => isAfter(d.endDateTime, now)) // Filter out duties that have already ended
    .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()); // Sort by the actual start time

  const pastDuties = duties
    .map(d => ({ ...d, dateObj: parseISO(d.date) }))
    .filter(d => isBefore(d.dateObj, today))
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
  
  return {
    next: upcomingDuties.length > 0 ? { type: upcomingDuties[0].type, date: upcomingDuties[0].date } : null,
    previous: pastDuties.length > 0 ? { type: pastDuties[0].type, date: pastDuties[0].date } : null,
  };
}


export default function Home() {
  const { t } = useLanguage();
  const { duties } = useDuties();
  const { totalIncome } = useIncome();
  const { expenses } = useExpenses();
  const { user, updateUser } = useProfile();
  const { toast } = useToast();

  React.useEffect(() => {
    if (user.notifications.dailyMotivation) {
      // Set a timeout to allow the main page to render first
      const timer = setTimeout(() => {
        toast({
          title: t('daily_motivation_title'),
          description: t('daily_motivation_desc'),
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user.notifications.dailyMotivation, toast, t]);
  
  const schedule = getSchedule(duties);
  
  const currentMonth = new Date();
  const monthlyExpenses = expenses.filter(expense => isSameMonth(parseISO(expense.date), currentMonth));
  const totalExpenses = monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);

  const budget = {
    income: totalIncome,
    expenses: totalExpenses,
  };

  const feelingOptions = [
    { value: 'teamwork', label: t('feeling_teamwork'), icon: <Users className="w-4 h-4 mr-2" /> },
    { value: 'tired', label: t('feeling_tired'), icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'stressed', label: t('feeling_stressed'), icon: <Smile className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
          {t('welcome_back')}, {user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('dashboard_subtitle')}
        </p>
      </div>

      <div className="lg:col-span-3">
        <NurseSunriseCard />
      </div>

      <DutyCard schedule={schedule} />
      <BudgetCard budget={budget} />
      <GoalCard goal={user.monthlyGoal} onGoalChange={(newGoal) => updateUser({ monthlyGoal: newGoal })} />
      
      <div className="md:col-span-2 lg:col-span-3">
        <QuoteCard 
          feelingOptions={feelingOptions}
        />
      </div>
    </div>
  );
}
