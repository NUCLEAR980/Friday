import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, MonitorUp, Video, VideoOff, Power, Loader2, Send, SwitchCamera, MonitorOff, BrainCircuit, Trash2, Settings, X, Moon, Sun, Music, LayoutGrid, User, Zap, Shield, Activity, Briefcase, Clock, Timer, Calculator, CheckSquare, Edit3, Wind, Headphones, History, Receipt, Signature, Contact2, SearchCode, Languages, MessageCircle, Mail, Type, AlarmClock, Hourglass, CalendarPlus, RefreshCw, Ruler, Globe2, BookMarked, Library, Volume2, FileText, Table, FileEdit, Presentation, GitGraph, TimerReset, Ban } from 'lucide-react';
import Markdown from 'react-markdown';
import { useMJ } from './hooks/useMJ';
import { MaxAvatar } from './components/MaxAvatar';
import { JarvisAvatar } from './components/JarvisAvatar';
import { QuickActions } from './components/QuickActions';
import { DataVisualizer } from './components/DataVisualizer';

const VOICE_PERSONAS = [
  { id: 'Kore', name: 'Kore', desc: 'Female • Warm & Friendly', icon: <User className="w-4 h-4" />, color: 'from-orange-500/20 to-red-500/20' },
  { id: 'Zephyr', name: 'Zephyr', desc: 'Female • Smooth & Professional', icon: <Briefcase className="w-4 h-4" />, color: 'from-purple-500/20 to-fuchsia-500/20' },
  { id: 'Fenrir', name: 'Fenrir', desc: 'Male • Deep & Authoritative', icon: <User className="w-4 h-4" />, color: 'from-blue-500/20 to-indigo-500/20' },
  { id: 'Charon', name: 'Charon', desc: 'Male • Calm & Analytical', icon: <User className="w-4 h-4" />, color: 'from-cyan-500/20 to-blue-500/20' },
  { id: 'ElevenLabs', name: 'ElevenLabs', desc: 'Female • Best AI Voice', icon: <Zap className="w-4 h-4" />, color: 'from-pink-500/20 to-rose-500/20' },
];

export default function App() {
  const [showChat, setShowChat] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [todos, setTodos] = useState<string[]>([]);
  const [contacts, setContacts] = useState<{name: string, phone: string}[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [persona, setPersona] = useState<'max' | 'jarvis'>('max');
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [systemAction, setSystemAction] = useState<string | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (systemAction) {
      timeout = setTimeout(() => {
        setSystemAction(null);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [systemAction]);

  useEffect(() => {
    const checkKey = async () => {
      if ((window as any).aistudio && typeof (window as any).aistudio.hasSelectedApiKey === 'function') {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
    // Check periodically or on focus
    const interval = setInterval(checkKey, 5000);
    return () => clearInterval(interval);
  }, []);

  const {
    isConnected,
    isConnecting,
    isSpeaking,
    isListeningForWakeWord,
    wakeWordEnabled,
    setWakeWordEnabled,
    memories,
    clearMemories,
    error,
    activeVideoSource,
    userVolume,
    mjVolume,
    messages,
    sendText,
    connect,
    disconnect,
    toggleCamera,
    toggleScreen,
    flipCamera,
    videoRef,
    canvasRef,
    generatedSong,
    setGeneratedSong,
    activeChart,
    setActiveChart,
    appVolume,
    voice,
    setVoice,
    testVoice,
    isScreenShareSupported
  } = useMJ({
    setShowChat,
    setShowMemories,
    setTheme,
    setSystemAction
  });

  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (showQuickActions || activeChart || showSettings || showMemories || showTools) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showQuickActions, activeChart, showSettings, showMemories]);

  // Mutual exclusivity logic
  useEffect(() => {
    if (showQuickActions) {
      setShowSettings(false);
      setShowMemories(false);
      setShowChat(false);
      setShowTools(false);
    }
  }, [showQuickActions]);

  useEffect(() => {
    if (showTools) {
      setShowQuickActions(false);
      setShowSettings(false);
      setShowMemories(false);
    }
  }, [showTools]);

  useEffect(() => {
    if (showSettings) {
      setShowQuickActions(false);
      setShowMemories(false);
    }
  }, [showSettings]);

  useEffect(() => {
    if (showMemories) {
      setShowQuickActions(false);
      setShowSettings(false);
    }
  }, [showMemories]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendText(chatInput);
    setChatInput('');
  };

  const isActuallySpeaking = isSpeaking || mjVolume > 0.01;
  const isListening = userVolume > 0.05 && !isActuallySpeaking;

  return (
    <div className={`min-h-screen font-sans overflow-hidden relative flex flex-col items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white selection:bg-white/20' : 'bg-gray-50 text-gray-900 selection:bg-black/20'}`}>
      
      {/* OS System Action Toast / Simulated Mobile Action */}
      <AnimatePresence>
        {systemAction && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 32, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(10px)' }}
            className={`fixed top-0 z-[200] max-w-sm w-11/12 mx-auto flex items-center gap-4 px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-xl border ${theme === 'dark' ? 'bg-max-cyan/10 border-max-cyan/30 text-max-cyan' : 'bg-indigo-600 border-indigo-500 text-white'}`}
          >
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-max-cyan/20 text-max-cyan' : 'bg-white/20 text-white'}`}>
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 font-mono">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">OS Override</p>
              <p className="text-sm font-medium leading-tight mt-0.5">{systemAction}</p>
            </div>
            <div className="flex gap-1 items-end h-4">
               <div className={`w-1 bg-current animate-pulse delay-75 h-full`} />
               <div className={`w-1 bg-current animate-pulse delay-150 h-2/3`} />
               <div className={`w-1 bg-current animate-pulse delay-300 h-1/2`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Background - Dynamic Black */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-100' : 'opacity-20'}`}>
          <div className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vw] bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/3 w-[60vw] h-[60vw] rounded-full blur-[120px] bg-neutral-800/20" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/3 w-[50vw] h-[50vw] rounded-full blur-[100px] bg-neutral-700/10" 
          />
        </div>
        {/* Subtle Shimmer Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)', backgroundSize: '200% 200%', animation: 'shimmer 15s linear infinite' }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-between w-full h-full px-4 md:px-6 py-6 md:py-8 lg:justify-center overflow-hidden">
        
        {/* Header - Minimal & Refined */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-start z-50">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <h1 className={`text-lg md:text-xl font-display font-light tracking-[0.3em] md:tracking-[0.5em] uppercase ${theme === 'dark' ? 'text-white/60' : 'text-gray-800'}`}>
              MAX
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <button 
              onClick={() => setShowMemories(!showMemories)}
              className={`p-2 md:p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 z-[60] ${showMemories ? 'bg-white/10 text-white' : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white'}`}
              title="View Memory"
            >
              <BrainCircuit className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 md:p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 z-[60] ${showSettings ? 'bg-white/10 text-white' : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white'}`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Central Orb / Visualizer */}
        <div className="relative w-full max-w-[280px] md:max-w-[400px] lg:max-w-[500px] aspect-square flex items-center justify-center cursor-pointer mt-20 md:mt-0 flex-shrink-0" onClick={() => { if (!isConnected && !isConnecting) connect(); }}>
          <AnimatePresence mode="wait">
            {persona === 'max' ? (
              <motion.div key="max" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MaxAvatar
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                  mjVolume={mjVolume}
                  userVolume={userVolume}
                  theme={theme}
                />
              </motion.div>
            ) : (
              <motion.div key="jarvis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <JarvisAvatar
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                  mjVolume={mjVolume}
                  userVolume={userVolume}
                  theme={theme}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Glass Pill Button Overlay */}
          {!isConnected && !isConnecting && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-20 md:h-28 liquid-glass rounded-[40px] md:rounded-[56px] flex items-center justify-center pointer-events-none border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
            >
              <span className="text-2xl md:text-3xl font-light tracking-[0.3em] text-white/80">WAKE</span>
            </motion.div>
          )}
        </div>

        {/* Status Text */}
        <div className="mt-8 h-6 text-center">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.p key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500/80 text-xs font-mono tracking-[0.3em] uppercase">{error}</motion.p>
            ) : isConnecting ? (
              <motion.p key="connecting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs tracking-[0.4em] uppercase font-mono text-white/30">SYNCING...</motion.p>
            ) : isConnected ? (
              <motion.p key="connected" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs tracking-[0.4em] uppercase font-mono text-white/60">
                {isSpeaking ? "TRANSMITTING" : isListening ? "LISTENING" : "ONLINE"}
              </motion.p>
            ) : (
              <motion.p key="standby" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs tracking-[0.4em] uppercase font-mono text-white/10">STANDBY</motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Controls - Floating Glass Bar */}
        <AnimatePresence>
          {isConnected && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-2 p-1.5 md:p-2 liquid-glass rounded-[40px] border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-40 max-w-[95vw] overflow-x-auto no-scrollbar"
            >
              <button
                onClick={disconnect}
                className="p-3 md:p-4 rounded-full bg-red-500/5 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90 shrink-0"
                title="Disconnect"
              >
                <Power className="w-5 h-5" />
              </button>
              
              <div className="w-px h-8 mx-1 bg-white/5 shrink-0" />

              <button
                onClick={toggleCamera}
                className={`p-3 md:p-4 rounded-full transition-all active:scale-90 shrink-0 ${
                  activeVideoSource === 'camera' 
                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                    : (theme === 'dark' ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-black/30 hover:text-black hover:bg-black/5')
                }`}
                title="Toggle Camera"
              >
                {activeVideoSource === 'camera' ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              {isScreenShareSupported && (
                <button
                  onClick={toggleScreen}
                  className={`p-3 md:p-4 rounded-full transition-all active:scale-90 shrink-0 ${
                    activeVideoSource === 'screen' 
                      ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                      : (theme === 'dark' ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-black/30 hover:text-black hover:bg-black/5')
                  }`}
                  title="Share Screen"
                >
                  {activeVideoSource === 'screen' ? <MonitorUp className="w-5 h-5" /> : <MonitorOff className="w-5 h-5" />}
                </button>
              )}

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-3 md:p-4 rounded-full transition-all active:scale-90 shrink-0 ${
                  showChat 
                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                    : (theme === 'dark' ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-black/30 hover:text-black hover:bg-black/5')
                }`}
                title="Toggle Chat"
              >
                <Send className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className={`p-3 md:p-4 rounded-full transition-all active:scale-90 shrink-0 ${
                  showQuickActions 
                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                    : (theme === 'dark' ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-black/30 hover:text-black hover:bg-black/5')
                }`}
                title="Quick Actions"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions Sidebar */}
        <AnimatePresence>
          {showQuickActions && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowQuickActions(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[800px] z-[110] liquid-glass border-l shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col ${theme === 'dark' ? 'bg-black/60 border-white/10' : 'bg-white/80 border-black/10'}`}
              >
                <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                  <div className="space-y-1">
                    <h2 className={`text-xl md:text-2xl font-light tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>Command Center</h2>
                    <p className={`text-[10px] tracking-[0.3em] uppercase font-mono ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>Protocol Selection Interface</p>
                  </div>
                  <button 
                    onClick={() => setShowQuickActions(false)}
                    className={`p-3 rounded-full transition-all active:scale-95 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/50 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/50 hover:text-black'}`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8">
                  <QuickActions 
                    theme={theme} 
                    onAction={(prompt) => {
                      // Intercept tool actions
                      const toolMap: Record<string, string> = {
                        "Set an alarm for: ": "alarm",
                        "Start a stopwatch.": "stopwatch",
                        "Set a timer for: ": "timer",
                        "Add this to my to-do list: ": "todo",
                        "Calculate: ": "calculator",
                        "Create a mind map for: ": "mindmap",
                        "Start a Pomodoro timer.": "pomodoro",
                        "Play some relaxing sounds.": "relax",
                        "Play some focus music.": "focus",
                        "Help me sign this document.": "signature",
                        "Manage my contacts: ": "contacts",
                        "Find text in this image: ": "ocr"
                      };

                      const toolType = toolMap[prompt];
                      if (toolType) {
                        setActiveTool(toolType);
                        setShowTools(true);
                        setShowQuickActions(false);
                        return;
                      }

                      if (!isConnected) {
                        connect(prompt);
                      } else {
                        sendText(prompt);
                      }
                      setShowChat(true);
                      setShowQuickActions(false);
                    }} 
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Hidden Video/Canvas elements for processing */}
        <video 
          ref={videoRef} 
          className="hidden" 
          playsInline 
          muted 
        />
        <canvas 
          ref={canvasRef} 
          className="hidden" 
        />

        {/* Video Preview (PIP) */}
        <AnimatePresence>
          {activeVideoSource !== 'none' && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-8 right-8 w-48 aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl z-20"
            >
              <video 
                autoPlay 
                playsInline 
                muted 
                className={`w-full h-full object-cover ${activeVideoSource === 'camera' ? 'scale-x-[-1]' : ''}`}
                ref={(el) => {
                  if (el && videoRef.current?.srcObject) {
                    el.srcObject = videoRef.current.srcObject;
                  }
                }}
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur text-[10px] font-mono text-white/80 rounded uppercase tracking-widest">
                {activeVideoSource === 'camera' ? 'OPTICAL FEED' : 'TACTICAL STREAM'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memory Panel */}
      <AnimatePresence>
        {showMemories && (
          <>
            {/* Backdrop for mobile */}
            <div 
              className="fixed inset-0 z-[100] md:hidden bg-black/40 backdrop-blur-sm"
              onClick={() => setShowMemories(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`fixed md:absolute top-20 md:top-24 left-4 md:left-8 w-[calc(100%-2rem)] md:w-80 max-h-[70vh] md:max-h-[60vh] liquid-glass border rounded-2xl flex flex-col overflow-hidden z-[110] ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/10 shadow-xl'}`}
            >
            <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              <h2 className={`text-sm font-medium tracking-widest uppercase flex items-center gap-2 ${theme === 'dark' ? 'text-friday-cyan' : 'text-indigo-600'}`}>
                <BrainCircuit className="w-4 h-4" />
                Long-Term Memory
              </h2>
              {memories.length > 0 && (
                <button 
                  onClick={clearMemories}
                  className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-md transition-colors"
                  title="Clear Memories"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {memories.length === 0 ? (
                <p className={`text-sm italic text-center py-8 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  MAX hasn't learned anything about you yet. Tell him something to remember!
                </p>
              ) : (
                memories.map((memory, i) => (
                  <div key={i} className={`border rounded-lg p-3 text-sm ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white/80' : 'bg-black/5 border-black/5 text-black/80'}`}>
                    {memory}
                  </div>
                ))
              )}
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* Backdrop for mobile */}
            <div 
              className="fixed inset-0 z-[100] md:hidden bg-black/40 backdrop-blur-sm"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`fixed md:absolute top-20 md:top-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-80 max-h-[70vh] md:max-h-[60vh] liquid-glass border rounded-2xl flex flex-col overflow-hidden z-[110] ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/10 shadow-xl'}`}
            >
            <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              <h2 className={`text-sm font-medium tracking-widest uppercase flex items-center gap-2 ${theme === 'dark' ? 'text-friday-cyan' : 'text-indigo-600'}`}>
                <Settings className="w-4 h-4" />
                Settings
              </h2>
              <button 
                onClick={() => setShowSettings(false)}
                className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-black/50 hover:text-black hover:bg-black/10'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>Theme</span>
                <div className={`flex items-center gap-1 p-1 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white'}`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'bg-black text-white shadow-sm' : 'text-black/50 hover:text-black'}`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Persona Toggle */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>AI Persona</span>
                <div className={`flex items-center gap-1 p-1 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                  <button
                    onClick={() => setPersona('max')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${persona === 'max' ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') : 'text-white/50 hover:text-white'}`}
                  >
                    MAX
                  </button>
                  <button
                    onClick={() => setPersona('jarvis')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${persona === 'jarvis' ? 'bg-amber-500 text-black' : 'text-black/50 hover:text-black'}`}
                  >
                    JARVIS
                  </button>
                </div>
              </div>

              {/* Wake Word Toggle */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>Wake Word ("Hey MAX")</span>
                <button
                  onClick={() => setWakeWordEnabled(!wakeWordEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${wakeWordEnabled ? 'bg-max-cyan' : (theme === 'dark' ? 'bg-white/20' : 'bg-black/20')}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${wakeWordEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Voice Selector */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Voice Persona</span>
                  <button 
                    onClick={testVoice}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono uppercase transition-all ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/50 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/50 hover:text-black'}`}
                  >
                    <Volume2 className="w-3 h-3" />
                    Test Voice
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {VOICE_PERSONAS.map((persona) => (
                    <button
                      key={persona.id}
                      disabled={isConnected || isConnecting}
                      onClick={() => setVoice(persona.id as any)}
                      className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all border ${
                        voice === persona.id
                          ? (theme === 'dark' ? 'bg-white/10 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-black/5 border-black/10 shadow-sm')
                          : (theme === 'dark' ? 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10' : 'bg-black/5 border-transparent hover:bg-black/10 hover:border-black/10')
                      } ${(isConnected || isConnecting) ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${persona.color} ${voice === persona.id ? (theme === 'dark' ? 'text-white' : 'text-black') : (theme === 'dark' ? 'text-white/40 group-hover:text-white/70' : 'text-black/40 group-hover:text-black/70')}`}>
                        {persona.icon}
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className={`text-xs font-bold tracking-wider ${voice === persona.id ? (theme === 'dark' ? 'text-white' : 'text-black') : (theme === 'dark' ? 'text-white/60' : 'text-black/60')}`}>
                          {persona.name}
                        </span>
                        <span className={`text-[10px] opacity-40 font-light ${voice === persona.id ? (theme === 'dark' ? 'text-white' : 'text-black') : (theme === 'dark' ? 'text-white/80' : 'text-black/80')}`}>
                          {persona.desc}
                        </span>
                      </div>
                      {voice === persona.id && (
                        <motion.div 
                          layoutId="active-voice"
                          className="absolute right-3 w-1.5 h-1.5 rounded-full bg-max-cyan shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                        />
                      )}
                    </button>
                  ))}
                </div>
                
                {(isConnected || isConnecting) && (
                  <p className="text-[10px] text-center opacity-30 font-mono uppercase">
                    Protocol active. Voice modification restricted.
                  </p>
                )}
              </div>

              {/* Google Intelligence Section */}
              <div className={`pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Google Intelligence</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${hasApiKey ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                    <span className="text-[10px] font-mono uppercase opacity-50">
                      {hasApiKey === null ? 'Checking...' : hasApiKey ? 'Active' : 'Key Required'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl space-y-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-medium">Model</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-60">Gemini 3.1 Flash Live</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs font-medium">Grounding</span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono uppercase tracking-tighter">Search</span>
                      <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 text-[8px] font-mono uppercase tracking-tighter">Maps</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={async () => {
                        if ((window as any).aistudio && typeof (window as any).aistudio.openSelectKey === 'function') {
                          await (window as any).aistudio.openSelectKey();
                          // The interval in useEffect will pick up the change
                        } else {
                          alert("API Key selection is only available in the AI Studio environment.");
                        }
                      }}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                        !hasApiKey 
                          ? 'bg-max-cyan text-black hover:bg-max-cyan/80 shadow-[0_0_15px_rgba(0,255,255,0.2)]' 
                          : (theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black')
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      {hasApiKey ? 'Update Google API Key' : 'Add Your Google API Key'}
                    </button>
                    {!hasApiKey && hasApiKey !== null && (
                      <p className="mt-2 text-[9px] text-center opacity-40 font-mono uppercase tracking-tighter">
                        A paid API key is required for advanced music & video generation.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Clear Memory */}
              <div className={`pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <button
                  onClick={() => {
                    clearMemories();
                    setShowSettings(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All Memories
                </button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Data Visualization Panel */}
      <AnimatePresence>
        {activeChart && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveChart(null);
            }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-xl"
          >
            <DataVisualizer 
              chart={activeChart} 
              onClose={() => setActiveChart(null)} 
              theme={theme} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tools Panel */}
      <AnimatePresence>
        {showTools && activeTool && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed inset-0 z-[130] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-xl`}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowTools(false);
            }}
          >
            <div className={`w-full max-w-2xl liquid-glass border rounded-[32px] overflow-hidden flex flex-col max-h-[80vh] shadow-2xl ${theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/10'}`}>
              <div className={`p-6 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-max-cyan/20 text-max-cyan' : 'bg-indigo-100 text-indigo-600'}`}>
                    {activeTool === 'timer' && <Hourglass className="w-5 h-5" />}
                    {activeTool === 'stopwatch' && <Timer className="w-5 h-5" />}
                    {activeTool === 'alarm' && <AlarmClock className="w-5 h-5" />}
                    {activeTool === 'todo' && <CheckSquare className="w-5 h-5" />}
                    {activeTool === 'calculator' && <Calculator className="w-5 h-5" />}
                    {activeTool === 'mindmap' && <GitGraph className="w-5 h-5" />}
                    {activeTool === 'pomodoro' && <TimerReset className="w-5 h-5" />}
                    {activeTool === 'relax' && <Wind className="w-5 h-5" />}
                    {activeTool === 'focus' && <Headphones className="w-5 h-5" />}
                    {activeTool === 'signature' && <Signature className="w-5 h-5" />}
                    {activeTool === 'contacts' && <Contact2 className="w-5 h-5" />}
                    {activeTool === 'ocr' && <SearchCode className="w-5 h-5" />}
                  </div>
                  <h2 className={`text-lg font-light tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {activeTool.replace('_', ' ')}
                  </h2>
                </div>
                <button 
                  onClick={() => setShowTools(false)}
                  className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-black/50 hover:text-black hover:bg-black/10'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                {activeTool === 'todo' && (
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="Add a new task..."
                        className={`flex-1 px-4 py-3 rounded-xl outline-none border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-max-cyan/50' : 'bg-black/5 border-black/10 text-black focus:border-indigo-500/50'}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value;
                            if (val) {
                              setTodos([...todos, val]);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-3">
                      {todos.map((todo, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
                          <span className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{todo}</span>
                          <button onClick={() => setTodos(todos.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {todos.length === 0 && (
                        <p className="text-center opacity-30 py-12 font-mono text-xs tracking-widest uppercase">No tasks found</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTool === 'contacts' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        id="contact-name"
                        type="text" 
                        placeholder="Name"
                        className={`px-4 py-3 rounded-xl outline-none border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-max-cyan/50' : 'bg-black/5 border-black/10 text-black focus:border-indigo-500/50'}`}
                      />
                      <input 
                        id="contact-phone"
                        type="text" 
                        placeholder="Phone"
                        className={`px-4 py-3 rounded-xl outline-none border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-max-cyan/50' : 'bg-black/5 border-black/10 text-black focus:border-indigo-500/50'}`}
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const name = (document.getElementById('contact-name') as HTMLInputElement).value;
                        const phone = (document.getElementById('contact-phone') as HTMLInputElement).value;
                        if (name && phone) {
                          setContacts([...contacts, { name, phone }]);
                          (document.getElementById('contact-name') as HTMLInputElement).value = '';
                          (document.getElementById('contact-phone') as HTMLInputElement).value = '';
                        }
                      }}
                      className={`w-full py-3 rounded-xl font-mono text-[10px] tracking-[0.2em] uppercase transition-all ${theme === 'dark' ? 'bg-max-cyan text-black hover:bg-max-cyan/80' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                      Add Contact
                    </button>
                    <div className="space-y-3">
                      {contacts.map((contact, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
                          <div className="flex flex-col">
                            <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{contact.name}</span>
                            <span className="text-xs opacity-50">{contact.phone}</span>
                          </div>
                          <button onClick={() => setContacts(contacts.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === 'calculator' && (
                  <div className="grid grid-cols-4 gap-3">
                    {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
                      <button 
                        key={btn}
                        className={`p-6 rounded-2xl text-xl font-mono transition-all ${
                          ['/','*','-','+','='].includes(btn)
                            ? (theme === 'dark' ? 'bg-max-cyan text-black' : 'bg-indigo-600 text-white')
                            : (theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-black hover:bg-black/10')
                        }`}
                        onClick={() => {
                          if (btn === '=') {
                            try {
                              const display = document.getElementById('calc-display') as HTMLInputElement;
                              display.value = eval(display.value).toString();
                            } catch {
                              (document.getElementById('calc-display') as HTMLInputElement).value = 'Error';
                            }
                          } else {
                            (document.getElementById('calc-display') as HTMLInputElement).value += btn;
                          }
                        }}
                      >
                        {btn}
                      </button>
                    ))}
                    <input 
                      id="calc-display"
                      readOnly
                      className={`col-span-4 mt-4 p-6 rounded-2xl text-right text-3xl font-mono outline-none ${theme === 'dark' ? 'bg-black/40 text-white border border-white/10' : 'bg-gray-100 text-black border border-black/10'}`}
                    />
                  </div>
                )}

                {activeTool === 'signature' && (
                  <div className="flex flex-col gap-6">
                    <canvas 
                      id="sig-canvas"
                      width={500}
                      height={300}
                      className={`w-full rounded-2xl border cursor-crosshair ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
                      onMouseDown={(e) => {
                        const canvas = e.currentTarget;
                        const ctx = canvas.getContext('2d');
                        if (!ctx) return;
                        ctx.beginPath();
                        ctx.strokeStyle = theme === 'dark' ? '#00FFFF' : '#4F46E5';
                        ctx.lineWidth = 2;
                        const rect = canvas.getBoundingClientRect();
                        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                        
                        const handleMove = (me: MouseEvent) => {
                          ctx.lineTo(me.clientX - rect.left, me.clientY - rect.top);
                          ctx.stroke();
                        };
                        const handleUp = () => {
                          window.removeEventListener('mousemove', handleMove);
                          window.removeEventListener('mouseup', handleUp);
                        };
                        window.addEventListener('mousemove', handleMove);
                        window.addEventListener('mouseup', handleUp);
                      }}
                    />
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          const canvas = document.getElementById('sig-canvas') as HTMLCanvasElement;
                          const ctx = canvas.getContext('2d');
                          ctx?.clearRect(0, 0, canvas.width, canvas.height);
                        }}
                        className={`flex-1 py-3 rounded-xl font-mono text-[10px] tracking-[0.2em] uppercase border ${theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'}`}
                      >
                        Clear
                      </button>
                      <button 
                        className={`flex-1 py-3 rounded-xl font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'bg-max-cyan text-black hover:bg-max-cyan/80' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                      >
                        Save Signature
                      </button>
                    </div>
                  </div>
                )}

                {['timer', 'stopwatch', 'alarm', 'pomodoro'].includes(activeTool) && (
                  <div className="flex flex-col items-center gap-8 py-12">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-10" />
                        <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="553" strokeDashoffset="0" className={theme === 'dark' ? 'text-max-cyan' : 'text-indigo-600'} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-mono tracking-tighter">
                        00:00:00
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className={`px-8 py-3 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'}`}>
                        Start
                      </button>
                      <button className={`px-8 py-3 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase border ${theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'}`}>
                        Reset
                      </button>
                    </div>
                  </div>
                )}

                {['relax', 'focus'].includes(activeTool) && (
                  <div className="flex flex-col items-center gap-8 py-12">
                    <div className={`p-12 rounded-full animate-pulse ${theme === 'dark' ? 'bg-max-cyan/10 text-max-cyan' : 'bg-indigo-100 text-indigo-600'}`}>
                      {activeTool === 'relax' ? <Wind className="w-16 h-16" /> : <Headphones className="w-16 h-16" />}
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className={`text-xl font-light tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {activeTool === 'relax' ? 'Ambient Rain' : 'Deep Focus Beats'}
                      </h3>
                      <p className="text-xs opacity-50 uppercase tracking-widest">Now Streaming</p>
                    </div>
                    <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className={`w-1/2 h-full ${theme === 'dark' ? 'bg-max-cyan shadow-[0_0_10px_#00FFFF]' : 'bg-indigo-600'}`}
                      />
                    </div>
                  </div>
                )}

                {activeTool === 'mindmap' && (
                  <div className="flex flex-col items-center justify-center gap-6 py-12">
                    <GitGraph className={`w-24 h-24 opacity-20 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                    <p className={`text-center max-w-sm text-sm opacity-50 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      Mind Map generation protocol active. MAX is visualizing your concepts in the neural network.
                    </p>
                    <div className="grid grid-cols-3 gap-4 w-full">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className={`h-24 rounded-2xl border animate-pulse ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`} />
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === 'ocr' && (
                  <div className="flex flex-col items-center justify-center gap-6 py-12">
                    <SearchCode className={`w-24 h-24 opacity-20 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                    <p className={`text-center max-w-sm text-sm opacity-50 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      Optical Character Recognition active. Please provide an image feed for analysis.
                    </p>
                    <button className={`px-8 py-4 rounded-2xl font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 ${theme === 'dark' ? 'bg-max-cyan text-black hover:bg-max-cyan/80' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                      <Video className="w-4 h-4" />
                      Initialize Camera
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player Panel */}
      <AnimatePresence>
        {generatedSong && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full md:max-w-md liquid-glass border rounded-3xl overflow-hidden z-40 shadow-2xl transition-all duration-500 ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'}`}
          >
            <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              <h2 className={`text-sm font-medium tracking-widest uppercase flex items-center gap-2 ${theme === 'dark' ? 'text-max-cyan' : 'text-pink-600'}`}>
                <Music className="w-4 h-4" />
                {generatedSong.isLoading ? 'Composing...' : 'Now Playing'}
              </h2>
              <button 
                onClick={() => setGeneratedSong(null)}
                className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-black/50 hover:text-black hover:bg-black/10'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex flex-col items-center gap-4">
              {generatedSong.isLoading ? (
                <>
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-pink-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
                    <Music className={`w-8 h-8 animate-pulse ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
                  </div>
                  <p className={`text-sm text-center animate-pulse ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                    Generating: "{generatedSong.prompt}"
                  </p>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <audio 
                      controls 
                      autoPlay 
                      src={generatedSong.url} 
                      className="w-full" 
                      ref={(el) => {
                        if (el) el.volume = appVolume;
                      }}
                    />
                  </div>
                  {generatedSong.lyrics && (
                    <div className={`w-full max-h-48 overflow-y-auto p-4 rounded-xl text-sm whitespace-pre-wrap text-center ${theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'}`}>
                      {generatedSong.lyrics}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
        <AnimatePresence>
          {showChat && isConnected && (
            <motion.div
              initial={{ opacity: 0, y: "100%", md: { y: 50 } }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%", md: { y: 50 } }}
              className={`fixed bottom-0 md:bottom-32 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-full md:max-w-md liquid-glass border-t md:border rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col h-[60vh] md:h-96 z-[120] shadow-2xl transition-all duration-500 ${theme === 'dark' ? 'bg-black/80 md:bg-black/40 border-white/10' : 'bg-white/95 md:bg-white/40 border-black/10'}`}
            >
              <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
                <div className={`w-12 h-1.5 rounded-full opacity-50 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
              </div>
              <div className="flex justify-between items-center px-4 pb-2 border-b md:hidden border-opacity-10 dark:border-white/10 border-black/10">
                <span className={`text-xs font-medium tracking-widest uppercase ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Chat Log</span>
                <button onClick={() => setShowChat(false)} className={`p-1.5 rounded-full ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-accent-blue text-white rounded-br-none' 
                        : (theme === 'dark' ? 'bg-white/10 text-white/90 rounded-bl-none' : 'bg-gray-200 text-gray-900 rounded-bl-none')
                    }`}>
                      {msg.role === 'user' ? (
                        msg.text
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0 prose-a:text-accent-amber hover:prose-a:text-accent-amber/80">
                          <Markdown
                            components={{
                              a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
                            }}
                          >
                            {msg.text}
                          </Markdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSend} className={`p-3 border-t flex gap-2 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className={`flex-1 bg-transparent border-none outline-none text-sm px-4 py-2 ${theme === 'dark' ? 'text-white placeholder:text-white/30' : 'text-black placeholder:text-black/40'}`}
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className={`p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${theme === 'dark' ? 'bg-accent-blue text-white' : 'bg-accent-blue text-white'}`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="fixed bottom-2 right-4 md:bottom-6 md:right-8 z-10 pointer-events-none"
      >
        <div className="flex flex-col items-end gap-0.5 md:gap-1">
          <span className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-light opacity-50">Architected by</span>
          <span className="text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase bg-gradient-to-r from-accent-blue via-accent-emerald to-accent-amber bg-clip-text text-transparent">Abhigyan</span>
        </div>
      </motion.div>
    </main>
    </div>
  );
}
