
"use client";

import React from "react";
import { DutyCard } from "@/components/dashboard/duty-card";
import { BudgetCard } from "@/components/dashboard/budget-card";
import { GoalCard } from "@/components/dashboard/goal-card";
import { QuoteCard } from "@/components/dashboard/quote-card";
import { Frown } from "lucide-react";
import { useDuties } from "@/hooks/use-duties";
import { useIncome } from "@/hooks/use-income";
import { useExpenses } from "@/hooks/use-expenses";
import { isAfter, isBefore, parseISO, startOfToday, isSameMonth } from "date-fns";
import type { Duty } from "@/lib/types";
import { useProfile } from "@/hooks/use-profile";

function getSchedule(duties: Duty[]) {
  const today = startOfToday();
  
  const upcomingDuties = duties
    .map(d => ({...d, dateObj: parseISO(d.date)}))
    .filter(d => isAfter(d.dateObj, today) || d.dateObj.getTime() === today.getTime())
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  const pastDuties = duties
    .map(d => ({...d, dateObj: parseISO(d.date)}))
    .filter(d => isBefore(d.dateObj, today))
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

  return {
    next: upcomingDuties.length > 0 ? { type: upcomingDuties[0].type, date: upcomingDuties[0].date } : null,
    previous: pastDuties.length > 0 ? { type: pastDuties[0].type, date: pastDuties[0].date } : null,
  };
}


export default function Home() {
  const { duties } = useDuties();
  const { totalIncome } = useIncome();
  const { expenses } = useExpenses();
  const { user, updateUser } = useProfile();
  
  const schedule = getSchedule(duties);
  
  const currentMonth = new Date();
  const monthlyExpenses = expenses.filter(expense => isSameMonth(parseISO(expense.date), currentMonth));
  const totalExpenses = monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);

  const budget = {
    income: totalIncome,
    expenses: totalExpenses,
  };

  const initialAiState = {
    quote: null,
    error: null,
  };

  const recentActivities = [
    { value: 'long-shift', label: 'Had a long and tiring shift', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'difficult-patient', label: 'Dealt with a difficult patient interaction', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'feeling-unmotivated', label: 'Feeling a bit unmotivated lately', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'great-teamwork', label: 'Experienced great teamwork with colleagues', icon: <Frown className="w-4 h-4 mr-2" /> },
    { value: 'patient-recovery', label: 'Witnessed a heartwarming patient recovery', icon: <Frown className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here’s your daily overview. Stay strong and inspired.
        </p>
      </div>

      <DutyCard schedule={schedule} />
      <BudgetCard budget={budget} />
      <GoalCard goal={user.monthlyGoal} onGoalChange={(newGoal) => updateUser({ monthlyGoal: newGoal })} />
      
      <div className="md:col-span-2 lg:col-span-3">
        <QuoteCard 
          user={user}
          initialAiState={initialAiState}
          recentActivities={recentActivities}
        />
      </div>
    </div>
  );
}
