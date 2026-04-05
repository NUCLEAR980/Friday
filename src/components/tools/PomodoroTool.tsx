import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Target, Coffee } from "lucide-react";

export function PomodoroTool() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Switch mode
      if (mode === "work") {
        setMode("break");
        setSeconds(5 * 60);
      } else {
        setMode("work");
        setSeconds(25 * 60);
      }
      
      new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3").play().catch(() => {});
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds, mode]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const reset = () => {
    setIsActive(false);
    setSeconds(mode === "work" ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => { setMode("work"); setSeconds(25 * 60); setIsActive(false); }}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${
            mode === "work" ? "bg-red-50 text-red-600 border-2 border-red-200" : "bg-gray-50 text-gray-400"
          }`}
        >
          <Target className="w-5 h-5" /> Focus
        </button>
        <button 
          onClick={() => { setMode("break"); setSeconds(5 * 60); setIsActive(false); }}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${
            mode === "break" ? "bg-green-50 text-green-600 border-2 border-green-200" : "bg-gray-50 text-gray-400"
          }`}
        >
          <Coffee className="w-5 h-5" /> Break
        </button>
      </div>

      <div className={`text-8xl font-mono font-bold tracking-tighter tabular-nums ${
        mode === "work" ? "text-red-600" : "text-green-600"
      }`}>
        {formatTime(seconds)}
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isActive ? "bg-gray-100 text-gray-600" : (mode === "work" ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "bg-green-600 text-white shadow-lg shadow-green-600/20")
          }`}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <button 
          onClick={reset}
          className="w-16 h-16 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        {mode === "work" ? "Time to focus on your task!" : "Take a short break and recharge."}
      </p>
    </div>
  );
}
