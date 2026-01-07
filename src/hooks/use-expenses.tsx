'use client';

import * as React from 'react';
import type { Expense } from '@/lib/types';
import { useUser } from '@/firebase';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  updateDoc as firestoreUpdateDoc,
  writeBatch,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { mockExpenses } from '@/lib/data';

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  updateExpense: (
    id: string,
    updatedExpense: Partial<Omit<Expense, 'id'>>
  ) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
};

const ExpensesContext = React.createContext<ExpensesContextType | undefined>(
  undefined
);

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const expensesRef = React.useMemo(() => user && firestore ? collection(firestore, 'users', user.uid, 'expenses') : null, [user, firestore]);

  React.useEffect(() => {
    if (!expensesRef) {
      setExpenses([]);
      return;
    }

    const unsubscribe = onSnapshot(expensesRef, (snapshot) => {
        const expensesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense));
        if (expensesData.length === 0) {
            // One-time write for mock data if the collection is empty
            const batch = writeBatch(firestore);
            mockExpenses.forEach((expense) => {
                const { id, ...rest } = expense;
                const docRef = doc(expensesRef);
                batch.set(docRef, rest);
            });
            batch.commit();
        } else {
            expensesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setExpenses(expensesData);
        }
    });

    return () => unsubscribe();
}, [expensesRef, firestore]);


  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    if (!expensesRef) return;
    await addDoc(expensesRef, expense);
  };

  const updateExpense = async (
    id: string,
    updatedExpense: Partial<Omit<Expense, 'id'>>
  ) => {
    if (!expensesRef) return;
    const docRef = doc(expensesRef, id);
    await firestoreUpdateDoc(docRef, updatedExpense);
  };

  const deleteExpense = async (id: string) => {
    if (!expensesRef) return;
    const docRef = doc(expensesRef, id);
    await deleteDoc(docRef);
  };

  const value = { expenses, addExpense, updateExpense, deleteExpense };

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
