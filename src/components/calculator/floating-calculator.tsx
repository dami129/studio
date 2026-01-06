"use client";
import { useState } from "react";
import { Calculator as CalculatorIcon, X } from "lucide-react";
import Calculator from "./calculator";

export default function FloatingCalculator() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Calculator Button - TOP RIGHT */}
      <button
        onClick={() => setOpen(true)}
        title="Calculator"
        className="fixed top-24 right-6 z-40
                   bg-card border
                   text-primary
                   p-3 rounded-full
                   shadow-md hover:shadow-lg
                   hover:scale-105 transition"
      >
        <CalculatorIcon size={22} />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 
                         bg-destructive text-destructive-foreground
                         rounded-full p-1 z-10"
              aria-label="Close Calculator"
            >
              <X className="w-4 h-4" />
            </button>
            <Calculator />
          </div>
        </div>
      )}
    </>
  );
}
