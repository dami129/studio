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
import { useLanguage } from "@/hooks/use-language";

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
  "Others",
]

export function AddExpenseForm() {
  const { addExpense } = useExpenses();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState<ExpenseCategory | "">("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) {
        setError(t('add_expense_error_required'));
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
        title: t('expense_added_title'),
        description: t('expense_added_desc', { description: description || category }),
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
                <CardTitle>{t('add_new_expense')}</CardTitle>
                <PlusCircle className="w-6 h-6 text-primary" />
            </CardHeader>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('add_new_expense_title')}</SheetTitle>
          <SheetDescription>
            {t('add_new_expense_desc')}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              {t('amount')}
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
              {t('category')}
            </Label>
            <Select onValueChange={(value: ExpenseCategory) => setCategory(value)} value={category} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={t('select_category_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {t(`category_${cat.toLowerCase().replace(/ /g, '_')}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              {t('description')}
            </Label>
            <Input 
                id="description" 
                placeholder={t('description_placeholder')}
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-destructive text-sm text-center col-span-4">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit">{t('add_expense_button')}</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
