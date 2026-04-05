import React, { useState } from "react";
import { Calculator, Delete, RotateCcw, Equal } from "lucide-react";

export function CalculatorTool() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    if (display === "0") setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation("");
    } catch (e) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-3xl border border-[#E7E5E4] shadow-sm">
      <div className="mb-6 text-right">
        <div className="text-sm text-muted-foreground h-6">{equation}</div>
        <div className="text-4xl font-bold tracking-tight truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className="col-span-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" /> Clear
        </button>
        <button onClick={() => setDisplay(display.slice(0, -1) || "0")} className="p-4 bg-gray-50 text-gray-600 rounded-2xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center">
          <Delete className="w-5 h-5" />
        </button>
        <button onClick={() => handleOperator("/")} className="p-4 bg-orange-50 text-orange-600 rounded-2xl font-bold hover:bg-orange-100 transition-colors">/</button>

        {["7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+"].map(btn => (
          <button 
            key={btn}
            onClick={() => isNaN(parseInt(btn)) ? handleOperator(btn) : handleNumber(btn)}
            className={`p-4 rounded-2xl font-bold transition-colors ${
              isNaN(parseInt(btn)) ? "bg-orange-50 text-orange-600 hover:bg-orange-100" : "bg-gray-50 text-gray-900 hover:bg-gray-100"
            }`}
          >
            {btn}
          </button>
        ))}

        <button onClick={() => handleNumber("0")} className="col-span-2 p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-colors">0</button>
        <button onClick={() => handleNumber(".")} className="p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-colors">.</button>
        <button onClick={calculate} className="p-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-colors flex items-center justify-center">
          <Equal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
