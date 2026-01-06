
"use client";
import { useState } from "react";

type Operator = "+" | "-" | "*" | "/";

const Btn = ({ children, onClick, className }: {children: React.ReactNode, onClick: () => void, className?: string}) => (
    <button
      onClick={onClick}
      className={`rounded-lg py-3 text-xl transition-colors ${className}`}
    >
      {children}
    </button>
  );

export default function Calculator() {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operator, setOperator] = useState<Operator | null>(null);

  const inputNumber = (num: string) => {
    if (num === "." && current.includes(".")) return;
    setCurrent((prev) => (prev === "0" && num !== "." ? num : prev + num));
  };

  const inputOperator = (op: Operator) => {
    if (current === "" && previous === "") return;

    if (current !== "" && previous !== "" && operator) {
        calculate();
        setPrevious(current); // Use the new result for the next operation
    } else if (current !== "") {
        setPrevious(current);
    }
    
    setCurrent("");
    setOperator(op);
  };

  const calculate = () => {
    if (!previous || !current || !operator) return;

    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result = 0;

    switch (operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "*": result = a * b; break;
      case "/": result = b !== 0 ? a / b : 0; break;
    }

    setCurrent(result.toString());
    setPrevious("");
    setOperator(null);
  };

  const clear = () => {
    setCurrent("");
    setPrevious("");
    setOperator(null);
  };
  
  const backspace = () => {
    setCurrent(prev => prev.slice(0, -1));
  }

  return (
    <div className="bg-card text-card-foreground rounded-2xl p-4 w-80 shadow-2xl border">
      <div className="text-right text-4xl mb-4 font-mono bg-secondary/50 p-4 rounded-lg min-h-[60px] break-all">
        {current || previous || "0"}
        <span className="text-primary ml-2">{operator}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Btn onClick={clear} className="col-span-2 bg-destructive/80 text-destructive-foreground hover:bg-destructive">Clear</Btn>
        <Btn onClick={backspace} className="bg-secondary hover:bg-secondary/80">⌫</Btn>
        <Btn onClick={() => inputOperator("/")} className="bg-primary/80 text-primary-foreground hover:bg-primary">÷</Btn>

        {["7","8","9"].map(n => (
          <Btn key={n} onClick={() => inputNumber(n)} className="bg-secondary hover:bg-secondary/80">{n}</Btn>
        ))}
        <Btn onClick={() => inputOperator("*")} className="bg-primary/80 text-primary-foreground hover:bg-primary">×</Btn>

        {["4","5","6"].map(n => (
          <Btn key={n} onClick={() => inputNumber(n)} className="bg-secondary hover:bg-secondary/80">{n}</Btn>
        ))}
        <Btn onClick={() => inputOperator("-")} className="bg-primary/80 text-primary-foreground hover:bg-primary">−</Btn>

        {["1","2","3"].map(n => (
          <Btn key={n} onClick={() => inputNumber(n)} className="bg-secondary hover:bg-secondary/80">{n}</Btn>
        ))}
        <Btn onClick={() => inputOperator("+")} className="bg-primary/80 text-primary-foreground hover:bg-primary">+</Btn>
        
        <Btn onClick={() => inputNumber("0")} className="col-span-2 bg-secondary hover:bg-secondary/80">0</Btn>
        <Btn onClick={() => inputNumber(".")} className="bg-secondary hover:bg-secondary/80">.</Btn>
        <Btn onClick={calculate} className="bg-primary text-primary-foreground hover:bg-primary/90">=</Btn>

      </div>
    </div>
  );
}
