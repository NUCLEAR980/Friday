import React, { useState } from "react";
import { Wind, Music, Volume2, VolumeX, Play, Pause } from "lucide-react";

interface Sound {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
}

const SOUNDS: Sound[] = [
  { id: "rain", name: "Rain", icon: <Wind className="w-5 h-5" />, url: "https://assets.mixkit.co/active_storage/sfx/2516/2516-preview.mp3" },
  { id: "waves", name: "Ocean Waves", icon: <Wind className="w-5 h-5" />, url: "https://assets.mixkit.co/active_storage/sfx/1188/1188-preview.mp3" },
  { id: "forest", name: "Forest Birds", icon: <Wind className="w-5 h-5" />, url: "https://assets.mixkit.co/active_storage/sfx/2443/2443-preview.mp3" },
  { id: "white-noise", name: "White Noise", icon: <Wind className="w-5 h-5" />, url: "https://assets.mixkit.co/active_storage/sfx/2514/2514-preview.mp3" },
];

export function RelaxModeTool() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleSound = (sound: Sound) => {
    if (activeSound === sound.id) {
      audioRef.current?.pause();
      setActiveSound(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(sound.url);
      audioRef.current.loop = true;
      audioRef.current.play();
      setActiveSound(sound.id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">Relax Mode</h3>
        <p className="text-sm text-muted-foreground">Calm your mind with soothing background sounds.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SOUNDS.map(sound => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound)}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${
              activeSound === sound.id 
                ? "bg-orange-50 border-orange-600 text-orange-600 shadow-lg shadow-orange-600/10" 
                : "bg-white border-gray-100 hover:border-orange-200"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              activeSound === sound.id ? "bg-orange-600 text-white" : "bg-gray-50 text-gray-400"
            }`}>
              {activeSound === sound.id ? <Pause className="w-6 h-6" /> : sound.icon}
            </div>
            <span className="font-bold text-sm">{sound.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-orange-50 p-6 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-orange-900">
              {activeSound ? SOUNDS.find(s => s.id === activeSound)?.name : "No sound playing"}
            </div>
            <div className="text-xs text-orange-700 opacity-70">
              {activeSound ? "Playing on loop" : "Select a sound to start"}
            </div>
          </div>
        </div>
        {activeSound && (
          <button 
            onClick={() => { audioRef.current?.pause(); setActiveSound(null); }}
            className="p-3 bg-white text-orange-600 rounded-xl hover:bg-orange-100 transition-colors"
          >
            <VolumeX className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
