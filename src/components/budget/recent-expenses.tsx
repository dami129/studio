"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Expense, ExpenseCategory } from "@/lib/types"
import { format, parseISO } from "date-fns"
import { ShoppingCart, Bus, Utensils, Heart, BookOpen, Tag, Smartphone, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { useExpenses } from "@/hooks/use-expenses"
import { useToast } from "@/hooks/use-toast"
import { ExpenseForm } from "./expense-form"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"

const categoryIcons: Record<ExpenseCategory, React.ReactNode> = {
    'Food': <Utensils className="h-5 w-5 text-muted-foreground" />,
    'Transport': <Bus className="h-5 w-5 text-muted-foreground" />,
    'Mobile bills': <Smartphone className="h-5 w-5 text-muted-foreground" />,
    'Groceries': <ShoppingCart className="h-5 w-5 text-muted-foreground" />,
    'Health': <Heart className="h-5 w-5 text-muted-foreground" />,
    'Education': <BookOpen className="h-5 w-5 text-muted-foreground" />,
    'Shopping': <Tag className="h-5 w-5 text-muted-foreground" />,
    'Salon': <Tag className="h-5 w-5 text-muted-foreground" />,
    'Card payments': <Tag className="h-5 w-5 text-muted-foreground" />,
    'Others': <Tag className="h-5 w-5 text-muted-foreground" />,
};


export function RecentExpenses({ expenses }: { expenses: Expense[] }) {
  const { t } = useLanguage();
  const { deleteExpense } = useExpenses();
  const { toast } = useToast();

  const [editingExpense, setEditingExpense] = React.useState<Expense | undefined>(undefined);
  const [deletingExpense, setDeletingExpense] = React.useState<Expense | undefined>(undefined);
  
  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  });

  const handleDelete = () => {
    if (deletingExpense) {
      deleteExpense(deletingExpense.id);
      toast({
        title: "Expense Deleted",
        description: `${deletingExpense.description || deletingExpense.category} has been removed.`,
      });
      setDeletingExpense(undefined);
    }
  };


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_expenses_title')}</CardTitle>
          <CardDescription>{t('recent_expenses_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('category')}</TableHead>
                <TableHead className="hidden sm:table-cell">{t('description')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead className="text-right">{t('amount')}</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    {t('no_expenses_month')}
                  </TableCell>
                </TableRow>
              ) : (
                expenses.slice(0, 10).map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary p-2 rounded-md hidden sm:block">
                            {categoryIcons[expense.category] || <Tag className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <span className="font-medium">{t(`category_${expense.category.toLowerCase().replace(/ /g, '_')}`)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{expense.description}</TableCell>
                    <TableCell>{format(parseISO(expense.date), "MMM d")}</TableCell>
                    <TableCell className="text-right">{formatter.format(expense.amount)}</TableCell>
                     <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingExpense(expense)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletingExpense(expense)} className="text-destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <ExpenseForm 
        isOpen={!!editingExpense}
        onOpenChange={(isOpen) => !isOpen && setEditingExpense(undefined)}
        expenseToEdit={editingExpense}
      />

      <ConfirmDeleteDialog
        isOpen={!!deletingExpense}
        onOpenChange={(isOpen) => !isOpen && setDeletingExpense(undefined)}
        onConfirm={handleDelete}
        itemName={deletingExpense?.description || deletingExpense?.category || 'this expense'}
      />
    </>
  )
}
