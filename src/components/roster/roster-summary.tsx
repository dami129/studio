
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Duty } from "@/lib/types"
import { Download, Share2 } from "lucide-react"
import { Button } from "../ui/button"
import { isSameMonth, parseISO } from "date-fns"
import React from "react"

export function RosterSummary({ duties, month }: { duties: Duty[], month: Date }) {

    const summary = React.useMemo(() => {
        const monthlyDuties = duties.filter(d => isSameMonth(parseISO(d.date), month));
        
        const totalDuties = monthlyDuties.filter(d => ['Morning', 'Evening', 'Night'].includes(d.type)).length;
        const overtimeDuties = monthlyDuties.filter(d => d.type.startsWith('Overtime')).length;
        const offDays = monthlyDuties.filter(d => d.type === 'Off').length;

        return { totalDuties, overtimeDuties, offDays };
    }, [duties, month]);

    const summaryItems = [
        { label: "Total Duties", value: summary.totalDuties, emoji: "🩺" },
        { label: "Overtime", value: summary.overtimeDuties, emoji: "💪" },
        { label: "Off Days", value: summary.offDays, emoji: "😌" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>Your work-life balance at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {summaryItems.map(item => (
                    <div key={item.label} className="flex flex-col items-center p-4 rounded-lg bg-secondary">
                        <span className="text-3xl">{item.emoji}</span>
                        <p className="text-2xl font-bold mt-2">{item.value}</p>
                        <p className="text-xs text-muted-foreground text-center">{item.label}</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button className="w-full" variant="outline"><Download className="w-4 h-4 mr-2" /> Export PDF</Button>
                <Button className="w-full" variant="outline"><Share2 className="w-4 h-4 mr-2" /> Share Image</Button>
            </CardFooter>
        </Card>
    )
}
