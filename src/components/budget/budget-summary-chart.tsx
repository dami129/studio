"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"

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
  bills: {
    label: "Bills",
    color: "hsl(var(--chart-3))",
  },
  shopping: {
    label: "Shopping",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function BudgetSummaryChart({ expenses }: { expenses: Expense[] }) {
  const chartData = React.useMemo(() => {
    const dataMap = new Map<string, number>()
    expenses.forEach(expense => {
      const key = expense.category.toLowerCase().replace(/\s+/g, '')
      const chartKey = (key in chartConfig) ? key : 'other'
      dataMap.set(chartKey, (dataMap.get(chartKey) || 0) + expense.amount)
    })
    return Array.from(dataMap.entries()).map(([name, value]) => ({
      name,
      value,
      fill: (chartConfig[name as keyof typeof chartConfig] as any).color,
    }));
  }, [expenses]);

  const totalExpenses = React.useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0)
  }, [expenses])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending Overview</CardTitle>
        <CardDescription>Breakdown by category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
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
                          Total Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
