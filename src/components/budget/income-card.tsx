"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIncome } from "@/hooks/use-income";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { IncomeSource } from "@/lib/types";
import { Check, Edit } from "lucide-react";

const incomeSources: { id: IncomeSource; label: string }[] = [
    { id: "jobSalary", label: "Job Salary" },
    { id: "sideIncome", label: "Side Income" },
    { id: "privatePractice", label: "Private Practice" },
    { id: "others", label: "Others" },
];


export function IncomeCard() {
    const { income, updateIncome, totalIncome } = useIncome();
    const [isEditing, setIsEditing] = React.useState(false);
    const [localIncome, setLocalIncome] = React.useState(income);

    React.useEffect(() => {
        setLocalIncome(income);
    }, [income]);

    const handleInputChange = (source: IncomeSource, value: string) => {
        const amount = parseFloat(value) || 0;
        setLocalIncome(prev => ({...prev, [source]: amount}));
    };

    const handleSave = () => {
        (Object.keys(localIncome) as IncomeSource[]).forEach(source => {
            updateIncome(source, localIncome[source]);
        });
        setIsEditing(false);
    };
    
    const formatter = new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                    {isEditing ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    <span className="sr-only">{isEditing ? "Save" : "Edit"}</span>
                </Button>
            </CardHeader>
            <CardContent>
                {!isEditing ? (
                     <div className="text-2xl font-bold">{formatter.format(totalIncome)}</div>
                ) : (
                    <div className="space-y-4 pt-2">
                        {incomeSources.map(source => (
                            <div key={source.id} className="space-y-1">
                                <Label htmlFor={source.id} className="text-xs">{source.label}</Label>
                                <div className="flex items-center gap-2">
                                     <span className="text-sm text-muted-foreground">LKR</span>
                                    <Input
                                        id={source.id}
                                        type="number"
                                        placeholder="0.00"
                                        value={localIncome[source.id] || ""}
                                        onChange={(e) => handleInputChange(source.id, e.target.value)}
                                        className="h-8"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
