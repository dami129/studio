"use client";

import * as React from "react";
import type { Expense } from "@/lib/types";
import { mockExpenses } from "@/lib/data";

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, updatedExpense: Partial<Omit<Expense, 'id'>>) => void;
  deleteExpense: (id: string) => void;
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
    setExpenses(prevExpenses => [newExpense, ...prevExpenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const updateExpense = (id: string, updatedExpense: Partial<Omit<Expense, 'id'>>) => {
    setExpenses(prevExpenses => 
      prevExpenses.map(exp => 
        exp.id === id ? { ...exp, ...updatedExpense } : exp
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== id));
  };


  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
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
