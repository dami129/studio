
"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { generateQuoteAction } from "@/app/actions/generate-quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Bot, Loader2 } from "lucide-react";
import { PersonalizedQuoteInput } from "@/ai/flows/personalized-motivational-quotes";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import React from "react";
import { useLanguage } from "@/hooks/use-language";

type QuoteCardProps = {
  user: {
    name: string;
    hospital: string;
    ward: string;
    monthlyGoal: string;
  };
  initialAiState: {
    quote: string | null;
    error: string | null;
  };
  recentActivities: { value: string; label: string, icon: React.ReactNode }[];
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      {t('generate_my_quote')}
    </Button>
  );
}

export function QuoteCard({ user, initialAiState, recentActivities }: QuoteCardProps) {
  const { t } = useLanguage();
  const [state, formAction] = useActionState(generateQuoteAction, initialAiState);
  const [recentActivity, setRecentActivity] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bot className="w-5 h-5 text-primary" />
          <span>{t('your_daily_motivation')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {state.quote ? (
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <p className="text-lg md:text-xl font-semibold text-accent-foreground/90">
              "{state.quote}"
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-center">
            {t('get_personalized_quote_prompt')}
          </p>
        )}

        {state.error && (
            <Alert variant="destructive">
                <AlertTitle>{t('error')}</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="nurseName" value={user.name} />
          <input type="hidden" name="hospital" value={user.hospital} />
          <input type="hidden" name="ward" value={user.ward} />
          <input type="hidden" name="monthlyGoal" value={user.monthlyGoal} />
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:flex-1">
              <Select name="recentActivity" onValueChange={setRecentActivity} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('recent_shift_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {recentActivities.map((activity) => (
                    <SelectItem key={activity.value} value={activity.value}>
                       <div className="flex items-center">
                        {activity.icon}
                        {activity.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
