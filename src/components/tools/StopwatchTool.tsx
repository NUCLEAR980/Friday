import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Timer as TimerIcon } from "lucide-react";

export function StopwatchTool() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([time, ...laps]);
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <div className="text-6xl font-mono font-bold tracking-tighter mb-8 tabular-nums">
          {formatTime(time)}
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isRunning ? "bg-orange-100 text-orange-600" : "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
            }`}
          >
            {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          <button 
            onClick={reset}
            className="w-16 h-16 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button 
            onClick={addLap}
            disabled={!isRunning}
            className="w-16 h-16 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-30"
          >
            <TimerIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-auto pr-2">
        {laps.map((lap, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs font-bold opacity-40">LAP {laps.length - idx}</span>
            <span className="font-mono font-bold">{formatTime(lap)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
