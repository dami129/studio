"use client"

import * as React from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { ExpenseForm } from "./expense-form";

export function AddExpenseForm() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <>
      <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => setIsSheetOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Add New Expense</CardTitle>
              <PlusCircle className="w-6 h-6 text-primary" />
          </CardHeader>
      </Card>
      <ExpenseForm isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  )
}
