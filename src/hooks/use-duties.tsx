'use client';

import * as React from 'react';
import type { Duty } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';
import { mockDuties } from '@/lib/data';

type DutiesContextType = {
  duties: Duty[];
  setDuties: (duties: Duty[]) => void;
  updateDuty: (date: string, type: Duty['type']) => void;
};

const DutiesContext = React.createContext<DutiesContextType | undefined>(
  undefined
);

export function DutiesProvider({ children }: { children: React.ReactNode }) {
  const [duties, setDuties] = useLocalStorage<Duty[]>('duties', mockDuties);

  const sortedDuties = React.useMemo(() => {
    return [...duties].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [duties]);

  const updateDuty = (date: string, type: Duty['type']) => {
    const dutyId = `${date}_${type}`;
    const dutyExists = duties.some((d) => d.id === dutyId);

    let newDuties: Duty[];
    if (dutyExists) {
      newDuties = duties.filter((d) => d.id !== dutyId);
    } else {
      newDuties = [...duties, { id: dutyId, date, type }];
    }
    setDuties(newDuties);
  };

  const value = { duties: sortedDuties, setDuties, updateDuty };

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
