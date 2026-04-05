import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface FridayAvatarProps {
  isConnected: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  mjVolume: number;
  userVolume: number;
  theme: 'dark' | 'light';
  onClick?: () => void;
}

export function FridayAvatar({
  isConnected,
  isConnecting,
  isSpeaking,
  isListening,
  mjVolume,
  userVolume,
  theme,
  onClick
}: FridayAvatarProps) {
  // Smooth out volumes for less jittery animation
  const [smoothMjVol, setSmoothMjVol] = useState(0);
  const [smoothUserVol, setSmoothUserVol] = useState(0);

  const targetMjVol = useRef(0);
  const targetUserVol = useRef(0);

  useEffect(() => {
    targetMjVol.current = mjVolume;
    targetUserVol.current = userVolume;
  }, [mjVolume, userVolume]);

  useEffect(() => {
    let animationFrameId: number;
    
    const updateVolumes = () => {
      setSmoothMjVol(prev => {
        const diff = targetMjVol.current - prev;
        const factor = diff > 0 ? 0.3 : 0.05;
        return Math.abs(diff) < 0.001 ? targetMjVol.current : prev + diff * factor;
      });
      setSmoothUserVol(prev => {
        const diff = targetUserVol.current - prev;
        const factor = diff > 0 ? 0.3 : 0.05;
        return Math.abs(diff) < 0.001 ? targetUserVol.current : prev + diff * factor;
      });
      animationFrameId = requestAnimationFrame(updateVolumes);
    };

    animationFrameId = requestAnimationFrame(updateVolumes);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Base scales
  const mjScale = 1 + smoothMjVol * 1.2;
  const userScale = 1 + smoothUserVol * 1.2;

  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ${!isConnected && !isConnecting ? 'cursor-pointer group hover:scale-105 active:scale-95' : ''}`}
      onClick={onClick}
      style={{ willChange: 'transform' }}
    >
      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {isConnected ? (
        <div className="relative w-full h-full flex items-center justify-center scale-[0.65] sm:scale-90 md:scale-100">
          {/* Tactical Rings (Background) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-0 border rounded-full ${theme === 'dark' ? 'border-white/5' : 'border-indigo-500/10'}`}
            style={{ willChange: 'transform' }}
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-8 border rounded-full border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-cyan-500/20'}`}
            style={{ willChange: 'transform' }}
          />

          {/* User Input Ring */}
          <motion.div 
            className={`absolute inset-[-10px] sm:inset-[-40px] rounded-full border-2 ${theme === 'dark' ? 'border-white/10' : 'border-indigo-500/30'}`}
            animate={{ 
              scale: isListening ? userScale : 0.95,
              opacity: isListening ? 0.6 : 0,
              borderColor: isListening 
                ? (theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(99,102,241,0.4)') 
                : 'transparent',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ willChange: 'transform, opacity' }}
          />
          
          {/* Outer Glow */}
          <motion.div
            animate={{
              scale: isSpeaking ? mjScale * 1.3 : [1, 1.02, 1],
              opacity: isSpeaking ? 0.2 + smoothMjVol * 0.2 : 0.03,
            }}
            transition={{ 
              scale: isSpeaking ? { type: 'spring', stiffness: 200, damping: 25 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.8 }
            }}
            className={`absolute inset-10 rounded-full blur-[60px] sm:blur-[80px] ${theme === 'dark' ? 'bg-white/10' : 'bg-indigo-500'}`}
          />
          
          {/* Inner Core with Gooey Effect */}
          <motion.div
            animate={{
              scale: isSpeaking ? mjScale : [1, 1.02, 1],
              y: isSpeaking ? 0 : [0, -2, 0, 2, 0],
              x: isSpeaking ? 0 : [0, 1, 0, -1, 0],
            }}
            transition={{ 
              scale: isSpeaking ? { type: 'spring', stiffness: 300, damping: 30 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center"
            style={{ filter: 'url(#goo)', willChange: 'transform, border-radius' }}
          >
            {/* Dynamic Blobs */}
            <motion.div
              animate={{
                rotate: isSpeaking ? 360 : [0, 180, 360],
                scale: isSpeaking ? 1 + smoothMjVol * 0.6 : 1,
                borderRadius: isSpeaking 
                  ? ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"] 
                  : ["45% 55% 45% 55% / 55% 45% 55% 45%", "55% 45% 55% 45% / 45% 55% 45% 55%", "45% 55% 45% 55% / 55% 45% 55% 45%"]
              }}
              transition={{ 
                rotate: { duration: isSpeaking ? 3 : 20, repeat: Infinity, ease: "linear" }, 
                borderRadius: { duration: isSpeaking ? 1.5 : 8, repeat: Infinity, ease: "easeInOut" }, 
                scale: { type: "spring", stiffness: 200, damping: 20 } 
              }}
              className={`absolute inset-0 blur-md mix-blend-screen ${theme === 'dark' ? 'bg-gradient-to-tr from-neutral-700 to-neutral-500' : 'bg-gradient-to-tr from-indigo-500 to-cyan-400'}`}
            />

            <motion.div
              animate={{
                rotate: isSpeaking ? -360 : [360, 180, 0],
                scale: isSpeaking ? 1 + smoothMjVol * 0.4 : 0.95,
                borderRadius: isSpeaking 
                  ? ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%"] 
                  : ["55% 45% 60% 40% / 40% 60% 45% 55%", "40% 60% 45% 55% / 55% 45% 60% 40%", "55% 45% 60% 40% / 40% 60% 45% 55%"]
              }}
              transition={{ 
                rotate: { duration: isSpeaking ? 4 : 25, repeat: Infinity, ease: "linear" }, 
                borderRadius: { duration: isSpeaking ? 2 : 10, repeat: Infinity, ease: "easeInOut" }, 
                scale: { type: "spring", stiffness: 200, damping: 20 } 
              }}
              className={`absolute inset-0 blur-lg mix-blend-screen ${theme === 'dark' ? 'bg-gradient-to-bl from-neutral-900 to-neutral-700' : 'bg-gradient-to-bl from-indigo-400 to-blue-500'}`}
            />

            {/* Center Solid Core */}
            <motion.div
              animate={{
                scale: isSpeaking ? 1 + smoothMjVol * 0.2 : [0.85, 0.87, 0.85],
              }}
              transition={{
                scale: isSpeaking ? { type: "spring", stiffness: 300, damping: 25 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className={`absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full z-10 ${theme === 'dark' ? 'bg-white shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.1)]' : 'bg-rose-50 shadow-[0_0_30px_rgba(255,240,245,1),0_0_60px_rgba(79,70,229,0.4)]'}`}
            />
          </motion.div>
        </div>
      ) : (
        <div className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border flex items-center justify-center group transition-all duration-1000 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}>
          {isConnecting ? (
            <Loader2 className={`w-10 h-10 sm:w-12 sm:h-12 animate-spin ${theme === 'dark' ? 'text-white/40' : 'text-indigo-500/50'}`} />
          ) : (
            <div className="relative flex items-center justify-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-700 ${theme === 'dark' ? 'bg-white/20 group-hover:bg-white group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]' : 'bg-black/20 group-hover:bg-indigo-500 group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.8)]'}`} />
              <div className="absolute inset-[-30px] sm:inset-[-40px] rounded-full border border-white/0 group-hover:border-white/20 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-[-60px] sm:inset-[-80px] rounded-full border border-white/0 group-hover:border-white/10 group-hover:scale-125 transition-all duration-1500" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
