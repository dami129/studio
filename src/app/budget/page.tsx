"use client";

import { AddExpenseForm } from "@/components/budget/add-expense-form";
import { BudgetSummaryChart } from "@/components/budget/budget-summary-chart";
import { RecentExpenses } from "@/components/budget/recent-expenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/hooks/use-expenses";
import { useIncome } from "@/hooks/use-income";
import { IncomeCard } from "@/components/budget/income-card";
import { isSameMonth, parseISO } from "date-fns";

export default function BudgetPage() {
  const { expenses } = useExpenses();
  const { totalIncome } = useIncome();

  const currentMonth = new Date();
  const monthlyExpenses = expenses.filter(expense => isSameMonth(parseISO(expense.date), currentMonth));
  
  const totalExpenses = monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalIncome - totalExpenses;

  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
          Budget Manager
        </h1>
        <p className="text-muted-foreground mt-1">
          Keep track of your income and expenses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <IncomeCard />
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <span className="text-sm text-muted-foreground">LKR</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatter.format(totalExpenses)}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                <span className="text-sm text-muted-foreground">LKR</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-primary">{formatter.format(remaining)}</div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <RecentExpenses expenses={monthlyExpenses} />
        </div>
        <div className="space-y-6">
            <BudgetSummaryChart expenses={monthlyExpenses} />
            <AddExpenseForm />
        </div>
      </div>
    </div>
  );
}
