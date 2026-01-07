'use client';

import * as React from 'react';
import type { Duty } from '@/lib/types';
import { useUser } from '@/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { mockDuties } from '@/lib/data';

type DutiesContextType = {
  duties: Duty[];
  setDuties: (duties: Duty[]) => Promise<void>;
  updateDuty: (date: string, type: Duty['type']) => Promise<void>;
};

const DutiesContext = React.createContext<DutiesContextType | undefined>(
  undefined
);

export function DutiesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [duties, setDutiesState] = React.useState<Duty[]>([]);
  const dutiesRef = React.useMemo(() => user && firestore ? collection(firestore, 'users', user.uid, 'duties') : null, [user, firestore]);

  React.useEffect(() => {
    if (!dutiesRef) {
      setDutiesState([]);
      return;
    };

    const unsubscribe = onSnapshot(dutiesRef, (snapshot) => {
      const dutiesData = snapshot.docs.map(doc => doc.data() as Duty);
      if (dutiesData.length === 0) {
        // One-time write for mock data if the collection is empty
        const batch = writeBatch(firestore);
        mockDuties.forEach((duty) => {
          const docRef = doc(dutiesRef, duty.date);
          batch.set(docRef, duty);
        });
        batch.commit();
      } else {
        dutiesData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setDutiesState(dutiesData);
      }
    });

    return () => unsubscribe();
  }, [dutiesRef, firestore]);

  const setDuties = async (newDuties: Duty[]) => {
    if (!dutiesRef) return;
    const batch = writeBatch(firestore);
    
    // First, delete all existing duties for the user
    const existingDutiesSnapshot = await getDocs(dutiesRef);
    existingDutiesSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Now, add the new duties
    newDuties.forEach((duty) => {
      const docRef = doc(dutiesRef, duty.date);
      batch.set(docRef, duty);
    });

    await batch.commit();
  };

  const updateDuty = async (date: string, type: Duty['type']) => {
    if (!dutiesRef) return;
  
    const dutyDocRef = doc(dutiesRef, `${date}_${type}`);
    const existingDuty = duties.find(d => d.id === `${date}_${type}`);

    if (existingDuty) {
      await deleteDoc(dutyDocRef);
    } else {
      const newDuty = { id: `${date}_${type}`, date, type };
      await setDoc(dutyDocRef, newDuty);
    }
  };


  const value = { duties, setDuties, updateDuty };

  return (
    <DutiesContext.Provider value={value}>{children}</DutiesContext.Provider>
  );
}

export function useDuties() {
  const context = React.useContext(DutiesContext);
  if (context === undefined) {
    throw new Error('useDuties must be used within a DutiesProvider');
  }
  return context;
}
