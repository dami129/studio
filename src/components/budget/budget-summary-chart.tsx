"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Expense } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"

const chartConfig = {
  expenses: {
    label: "Expenses",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  transport: {
    label: "Transport",
    color: "hsl(var(--chart-2))",
  },
  mobile_bills: {
    label: "Mobile Bills",
    color: "hsl(var(--chart-3))",
  },
  shopping: {
    label: "Shopping",
    color: "hsl(var(--chart-4))",
  },
  groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-5))",
  },
  health: {
    label: "Health",
    color: "hsl(var(--chart-1))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-2))",
  },
  salon: {
    label: "Salon",
    color: "hsl(var(--chart-3))",
  },
  card_payments: {
    label: "Card Payments",
    color: "hsl(var(--chart-4))",
  },
  others: {
    label: "Others",
    color: "hsl(var(--muted))",
  },
}

export function BudgetSummaryChart({ expenses }: { expenses: Expense[] }) {
  const { t } = useLanguage();

  const chartData = React.useMemo(() => {
    const dataMap = new Map<string, number>()
    expenses.forEach(expense => {
      const key = expense.category.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/ /g, '_');
      const chartKey = (key in chartConfig) ? key : 'others'
      dataMap.set(chartKey, (dataMap.get(chartKey) || 0) + expense.amount)
    })
    return Array.from(dataMap.entries()).map(([name, value]) => ({
      name,
      value,
      fill: (chartConfig[name as keyof typeof chartConfig] as any)?.color || 'hsl(var(--muted))',
    }));
  }, [expenses]);
  
  const localizedChartConfig = React.useMemo(() => {
      const newConfig: any = {};
      for (const key in chartConfig) {
          if (Object.prototype.hasOwnProperty.call(chartConfig, key)) {
              const typedKey = key as keyof typeof chartConfig;
              newConfig[typedKey] = {
                  ...chartConfig[typedKey],
                  label: t(`category_${key}`),
              }
          }
      }
      return newConfig;
  }, [t]);

  const totalExpenses = React.useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0)
  }, [expenses])

  return (
    <Card className="flex flex-col h-[350px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t('spending_overview')}</CardTitle>
        <CardDescription>{t('spending_overview_desc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length > 0 ? (
          <ChartContainer
            config={localizedChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalExpenses.toLocaleString("en-LK", { style: 'currency', currency: 'LKR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace('LKR', '').trim()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {t('total_spent')}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground">
            {t('no_expenses_to_display')}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
