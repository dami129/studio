
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language";

type SummaryItem = {
  label: string;
  emoji: string;
  value: number;
};

export function RosterSummary({
  items,
}: {
  items: SummaryItem[];
}) {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="bg-secondary h-6 w-32 rounded-md"></CardTitle>
                <CardDescription className="bg-secondary h-4 w-48 rounded-md"></CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center p-4 rounded-lg bg-secondary h-24">
                    </div>
                ))}
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>{t('monthly_summary_title')}</CardTitle>
            <CardDescription>{t('monthly_summary_desc')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
            {items.map((item) => (
                <div
                key={item.label}
                className="flex flex-col items-center p-4 rounded-lg bg-secondary"
                >
                <span className="text-3xl">{item.emoji}</span>
                <p className="text-2xl font-bold mt-2">{item.value}</p>
                <p className="text-xs text-muted-foreground text-center">
                    {t(item.label)}
                </p>
                </div>
            ))}
        </CardContent>
    </Card>
  );
}
