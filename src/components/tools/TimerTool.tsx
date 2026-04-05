import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Bell } from "lucide-react";

export function TimerTool() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("5");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Play sound or notification
      new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3").play().catch(() => {});
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isActive && seconds === 0) {
      setSeconds(parseInt(inputMinutes) * 60);
    }
    setIsActive(true);
  };

  const reset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      {!isActive && seconds === 0 ? (
        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Set Duration (Minutes)</div>
          <input 
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            className="text-6xl font-bold text-center w-full bg-transparent outline-none focus:text-orange-600 transition-colors"
          />
        </div>
      ) : (
        <div className="text-8xl font-mono font-bold tracking-tighter tabular-nums">
          {formatTime(seconds)}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button 
          onClick={isActive ? () => setIsActive(false) : startTimer}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isActive ? "bg-orange-100 text-orange-600" : "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
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

      <div className="flex justify-center gap-2">
        {[1, 5, 10, 15, 30].map(m => (
          <button 
            key={m}
            onClick={() => { setInputMinutes(m.toString()); setSeconds(m * 60); }}
            className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold hover:border-orange-600 transition-colors"
          >
            {m}m
          </button>
        ))}
      </div>
    </div>
  );
}
