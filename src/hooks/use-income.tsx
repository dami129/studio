'use client';

import * as React from 'react';
import type { Income, IncomeSource } from '@/lib/types';
import { useUser } from '@/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
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
  const { user } = useUser();
  const firestore = useFirestore();
  const [income, setIncome] = React.useState<Income>(mockIncome);
  const incomeDocRef = React.useMemo(() => user && firestore ? doc(firestore, 'users', user.uid, 'data', 'income') : null, [user, firestore]);

  React.useEffect(() => {
    if (!incomeDocRef) {
        setIncome(mockIncome);
        return
    };

    const unsubscribe = onSnapshot(incomeDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const validatedIncome = { ...mockIncome, ...docSnap.data() };
        setIncome(validatedIncome);
      } else {
        // One-time write for mock data if the document doesn't exist
        setDoc(incomeDocRef, mockIncome);
        setIncome(mockIncome);
      }
    });

    return () => unsubscribe();
  }, [incomeDocRef]);


  const updateIncome = (source: IncomeSource, amount: number) => {
    if (!incomeDocRef) return;
    const newIncome = { ...income, [source]: amount };
    setDoc(incomeDocRef, newIncome, { merge: true });
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
