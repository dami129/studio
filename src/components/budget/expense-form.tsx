"use client"

import * as React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useExpenses } from "@/hooks/use-expenses";
import type { Expense, ExpenseCategory } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

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
];

type ExpenseFormProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    expenseToEdit?: Expense;
};

export function ExpenseForm({ isOpen, onOpenChange, expenseToEdit }: ExpenseFormProps) {
  const { addExpense, updateExpense } = useExpenses();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [date, setDate] = React.useState<Date | undefined>();
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState<ExpenseCategory | "">("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (expenseToEdit) {
      setDate(parseISO(expenseToEdit.date));
      setAmount(String(expenseToEdit.amount));
      setCategory(expenseToEdit.category);
      setDescription(expenseToEdit.description);
    } else {
      // Reset form for adding new expense
      setDate(new Date());
      setAmount("");
      setCategory("");
      setDescription("");
    }
    setError("");
  }, [expenseToEdit, isOpen]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) {
        setError(t('add_expense_error_required'));
        return;
    }

    const expenseData = {
        date: format(date, "yyyy-MM-dd"),
        amount: parseFloat(amount),
        category,
        description,
    };

    if (expenseToEdit) {
        updateExpense(expenseToEdit.id, expenseData);
        toast({
            title: "Expense Updated",
            description: "Your expense has been successfully updated.",
        });
    } else {
        addExpense(expenseData);
        toast({
            title: t('expense_added_title'),
            description: t('expense_added_desc', { description: description || category }),
        });
    }

    onOpenChange(false);
  };

  const title = expenseToEdit ? "Edit Expense" : t('add_new_expense_title');
  const desc = expenseToEdit ? "Update the details of your expense." : t('add_new_expense_desc');
  const buttonLabel = expenseToEdit ? "Save Changes" : t('add_expense_button');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
             <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                </PopoverContent>
            </Popover>
          </div>
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
            <Button type="submit">{buttonLabel}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
