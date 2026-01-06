
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Bot } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useLanguage } from "@/hooks/use-language";

const QUOTES: Record<string, string[]> = {
  teamwork: [
    "Great teamwork turns long shifts into shared victories.",
    "Together, nurses achieve more than any one alone.",
    "Strong teams save lives — including each other."
  ],
  tired: [
    "Your strength shows even on the hardest days.",
    "Rest when you can — your care matters.",
    "Even quiet resilience makes a difference."
  ],
  stressed: [
    "Take one breath at a time — you are doing your best.",
    "Pressure builds diamonds — and strong nurses.",
    "You are stronger than this moment."
  ]
};

type QuoteCardProps = {
  feelingOptions: { value: string; label: string, icon: React.ReactNode }[];
};

export function QuoteCard({ feelingOptions }: QuoteCardProps) {
  const { t } = useLanguage();
  const [feeling, setFeeling] = useState("teamwork");
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!feeling || !QUOTES[feeling]) {
      setError(t('quote_error_feeling'));
      return;
    }

    const quotesForFeeling = QUOTES[feeling];
    const randomIndex = Math.floor(Math.random() * quotesForFeeling.length);
    setQuote(quotesForFeeling[randomIndex]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bot className="w-5 h-5 text-primary" />
          <span>{t('your_daily_motivation')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {quote ? (
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <p className="text-lg md:text-xl font-semibold text-accent-foreground/90">
              "{quote}"
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-center">
            {t('get_personalized_quote_prompt')}
          </p>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertTitle>{t('error')}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <form onSubmit={handleGenerateQuote} className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:flex-1">
              <Select name="recentActivity" onValueChange={setFeeling} value={feeling} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('recent_shift_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {feelingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                       <div className="flex items-center">
                        {option.icon}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <Sparkles className="mr-2 h-4 w-4" />
              {t('generate_my_quote')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
