"use client";

import * as React from "react";
import type { Income, IncomeSource } from "@/lib/types";
import { mockIncome } from "@/lib/data";

type IncomeContextType = {
  income: Income;
  updateIncome: (source: IncomeSource, amount: number) => void;
  totalIncome: number;
};

const IncomeContext = React.createContext<IncomeContextType | undefined>(undefined);

export function IncomeProvider({ children }: { children: React.ReactNode }) {
  const [income, setIncome] = React.useState<Income>(mockIncome);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const savedIncome = localStorage.getItem('income');
      if (savedIncome) {
        const parsedIncome = JSON.parse(savedIncome);
        // Ensure all keys are present, falling back to mockIncome defaults
        const validatedIncome = { ...mockIncome, ...parsedIncome };
        setIncome(validatedIncome);
      }
    } catch (error) {
      console.error("Failed to parse income from localStorage", error);
      setIncome(mockIncome);
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('income', JSON.stringify(income));
    }
  }, [income, isLoaded]);

  const updateIncome = (source: IncomeSource, amount: number) => {
    setIncome(prevIncome => ({
      ...prevIncome,
      [source]: amount,
    }));
  };

  const totalIncome = React.useMemo(() => {
    return Object.values(income).reduce((sum, amount) => sum + (Number(amount) || 0), 0);
  }, [income]);

  return (
    <IncomeContext.Provider value={{ income, updateIncome, totalIncome }}>
      {children}
    </IncomeContext.Provider>
  );
}

export function useIncome() {
  const context = React.useContext(IncomeContext);
  if (context === undefined) {
    throw new Error("useIncome must be used within an IncomeProvider");
  }
  return context;
}
