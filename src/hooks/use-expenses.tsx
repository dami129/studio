"use client";

import * as React from "react";
import type { Expense } from "@/lib/types";
import { mockExpenses } from "@/lib/data";

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
};

const ExpensesContext = React.createContext<ExpensesContextType | undefined>(undefined);

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = React.useState<Expense[]>(mockExpenses);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const savedExpenses = localStorage.getItem('expenses');
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error("Failed to parse expenses from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
        ...expense,
        id: new Date().toISOString() + Math.random().toString(), // simple unique id
    };
    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
  };


  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = React.useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within a ExpensesProvider");
  }
  return context;
}
