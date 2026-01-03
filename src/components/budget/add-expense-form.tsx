"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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

const expenseCategories = [
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
  return (
    <Sheet>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input id="amount" type="number" placeholder="0.00" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" placeholder="e.g., Lunch with colleagues" className="col-span-3" />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Expense</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
