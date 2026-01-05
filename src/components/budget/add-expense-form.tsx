"use client"

import * as React from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { useExpenses } from "@/hooks/use-expenses";
import type { Expense, ExpenseCategory } from "@/lib/types";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const expenseCategories: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Mobile bills",
  "Groceries",
  "Health",
  "Education",
  "Shopping",
  "Salon",
  "Card payments",
]

export function AddExpenseForm() {
  const { addExpense } = useExpenses();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState<ExpenseCategory | "">("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) {
        setError("Amount and category are required.");
        return;
    }

    const newExpense: Omit<Expense, 'id'> = {
        date: format(new Date(), "yyyy-MM-dd"),
        amount: parseFloat(amount),
        category,
        description,
    };
    
    addExpense(newExpense);

    toast({
        title: "Expense Added",
        description: `${description || category} has been added to your expenses.`,
    });

    // Reset form
    setAmount("");
    setCategory("");
    setDescription("");
    setError("");
    setOpen(false); // Close sheet
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Add New Expense</CardTitle>
                <PlusCircle className="w-6 h-6 text-primary" />
            </CardHeader>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a New Expense</SheetTitle>
          <SheetDescription>
            Quickly log a new transaction to keep your budget up to date.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input 
                id="amount" 
                type="number" 
                placeholder="0.00" 
                className="col-span-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select onValueChange={(value: ExpenseCategory) => setCategory(value)} value={category} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input 
                id="description" 
                placeholder="e.g., Lunch with colleagues" 
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-destructive text-sm text-center col-span-4">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
