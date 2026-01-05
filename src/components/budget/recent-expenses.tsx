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
import { ShoppingCart, Bus, Utensils, Heart, BookOpen, Film, Tag, Smartphone } from "lucide-react"

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
  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>A list of your transactions for this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="hidden sm:table-cell">Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No expenses recorded for this month.
                </TableCell>
              </TableRow>
            ) : (
              expenses.slice(0, 5).map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary p-2 rounded-md hidden sm:block">
                          {categoryIcons[expense.category] || <Tag className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <span className="font-medium">{expense.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{expense.description}</TableCell>
                  <TableCell>{format(parseISO(expense.date), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">{formatter.format(expense.amount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
