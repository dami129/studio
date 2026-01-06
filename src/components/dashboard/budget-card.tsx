import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Budget } from "@/lib/types";
import { Wallet } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function BudgetCard({ budget }: { budget: Budget }) {
  const { t } = useLanguage();
  const { income, expenses } = budget;
  const remaining = income - expenses;
  const percentageSpent = income > 0 ? (expenses / income) * 100 : 0;
  
  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
  });

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Wallet className="w-5 h-5 text-primary" />
          <span>{t('monthly_budget')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{t('remaining')}</p>
          <p className="text-3xl font-bold">{formatter.format(remaining)}</p>
        </div>
        <div className="space-y-2">
          <Progress value={percentageSpent} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatter.format(expenses)} {t('spent')}</span>
            <span>{t('of')} {formatter.format(income)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
