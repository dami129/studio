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
  const [duties, setDuties] = React.useState<Duty[]>(mockDuties);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const savedDuties = localStorage.getItem('duties');
      if (savedDuties) {
        setDuties(JSON.parse(savedDuties));
      }
    } catch (error) {
      console.error("Failed to parse duties from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('duties', JSON.stringify(duties));
    }
  }, [duties, isLoaded]);

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
