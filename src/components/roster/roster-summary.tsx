
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Duty } from "@/lib/types"
import { isSameMonth, parseISO } from "date-fns"
import React from "react"
import { useLanguage } from "@/hooks/use-language";

function calculateMonthlySummary(duties: Duty[], currentMonth: Date) {
  if (!currentMonth || !(currentMonth instanceof Date) || isNaN(currentMonth.getTime())) {
    return {
      totalDuties: 0,
      overtimeCount: 0,
      offDaysCount: 0,
    };
  }
  
  const monthlyDuties = duties.filter(d =>
    isSameMonth(parseISO(d.date), currentMonth)
  );

  const normalDuties = monthlyDuties.filter(d =>
    ['Morning', 'Evening', 'Night'].includes(d.type)
  );

  const overtimeDuties = monthlyDuties.filter(d =>
    d.type.startsWith('Overtime')
  );

  const offDays = monthlyDuties.filter(d => d.type === 'Off (Day Off)');

  return {
    totalDuties: normalDuties.length,
    overtimeCount: overtimeDuties.length,
    offDaysCount: offDays.length,
  };
}


export function RosterSummary({ duties, month }: { duties: Duty[], month: Date }) {
    const { t } = useLanguage();
    const summary = React.useMemo(() => calculateMonthlySummary(duties, month), [duties, month]);

    const summaryItems = [
        { label: "total_duties", value: summary.totalDuties, emoji: "🩺" },
        { label: "overtime", value: summary.overtimeCount, emoji: "💪" },
        { label: "off_days", value: summary.offDaysCount, emoji: "😌" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('monthly_summary_title')}</CardTitle>
                <CardDescription>{t('monthly_summary_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {summaryItems.map(item => (
                    <div key={item.label} className="flex flex-col items-center p-4 rounded-lg bg-secondary">
                        <span className="text-3xl">{item.emoji}</span>
                        <p className="text-2xl font-bold mt-2">{item.value}</p>
                        <p className="text-xs text-muted-foreground text-center">{t(item.label)}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
