'use client';

import * as React from 'react';
import type { Income, IncomeSource } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';
import { mockIncome } from '@/lib/data';

type IncomeContextType = {
  income: Income;
  updateIncome: (source: IncomeSource, amount: number) => void;
  totalIncome: number;
};

const IncomeContext = React.createContext<IncomeContextType | undefined>(
  undefined
);

export function IncomeProvider({ children }: { children: React.ReactNode }) {
  const [income, setIncome] = useLocalStorage<Income>('income', mockIncome);

  const updateIncome = (source: IncomeSource, amount: number) => {
    setIncome((prev) => ({
      ...prev,
      [source]: amount,
    }));
  };

  const totalIncome = React.useMemo(() => {
    return Object.values(income).reduce(
      (sum, amount) => sum + (Number(amount) || 0),
      0
    );
  }, [income]);

  const value = { income, updateIncome, totalIncome };

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  );
}

export function useIncome() {
  const context = React.useContext(IncomeContext);
  if (context === undefined) {
    throw new Error('useIncome must be used within an IncomeProvider');
  }
  return context;
}
