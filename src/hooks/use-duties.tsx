"use client";

import * as React from "react";
import type { Duty } from "@/lib/types";
import { mockDuties } from "@/lib/data";

type DutiesContextType = {
  duties: Duty[];
  setDuties: React.Dispatch<React.SetStateAction<Duty[]>>;
};

const DutiesContext = React.createContext<DutiesContextType | undefined>(undefined);

export function DutiesProvider({ children }: { children: React.ReactNode }) {
  const [duties, setDuties] = React.useState<Duty[]>(() => {
    if (typeof window !== 'undefined') {
      const savedDuties = localStorage.getItem('duties');
      return savedDuties ? JSON.parse(savedDuties) : mockDuties;
    }
    return mockDuties;
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('duties', JSON.stringify(duties));
    }
  }, [duties]);

  return (
    <DutiesContext.Provider value={{ duties, setDuties }}>
      {children}
    </DutiesContext.Provider>
  );
}

export function useDuties() {
  const context = React.useContext(DutiesContext);
  if (context === undefined) {
    throw new Error("useDuties must be used within a DutiesProvider");
  }
  return context;
}
