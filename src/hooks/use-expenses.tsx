'use client';

import * as React from 'react';
import type { Expense } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';
import { mockExpenses } from '@/lib/data';

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (
    id: string,
    updatedExpense: Partial<Omit<Expense, 'id'>>
  ) => void;
  deleteExpense: (id: string) => void;
};

const ExpensesContext = React.createContext<ExpensesContextType | undefined>(
  undefined
);

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    'expenses',
    mockExpenses
  );

  const sortedExpenses = React.useMemo(() => {
     return [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: new Date().toISOString() };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (
    id: string,
    updatedExpense: Partial<Omit<Expense, 'id'>>
  ) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExpense } : exp
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const value = { expenses: sortedExpenses, addExpense, updateExpense, deleteExpense };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = React.useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within a ExpensesProvider');
  }
  return context;
}
