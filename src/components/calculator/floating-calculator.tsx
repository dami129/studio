
"use client";
import { useState } from "react";
import Calculator from "./calculator";
import { X } from "lucide-react";

export default function FloatingCalculator() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-24 right-6 bg-primary text-primary-foreground p-4 h-14 w-14 flex items-center justify-center text-2xl rounded-full shadow-lg z-40 transition-transform hover:scale-110"
        aria-label="Open Calculator"
        title="Open Calculator"
      >
        🧮
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground rounded-full p-1 z-10"
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
