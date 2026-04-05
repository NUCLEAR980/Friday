import React, { useState } from "react";
import { Mic, Square, Play, Trash2, Loader2, Volume2 } from "lucide-react";

export function STTTool() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => setError(event.error);
    
    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.start();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">Speech to Text</h3>
        <p className="text-sm text-muted-foreground">Convert your voice into text in real-time.</p>
      </div>

      <div className="relative">
        <div className="w-full min-h-[300px] bg-gray-50 border border-gray-200 rounded-3xl p-8 text-lg leading-relaxed">
          {transcript || <span className="opacity-20 italic">Start talking to see text here...</span>}
          {isListening && <span className="inline-block w-1 h-6 bg-orange-600 animate-pulse ml-1 align-middle" />}
        </div>
        
        <div className="absolute bottom-6 right-6 flex gap-3">
          <button 
            onClick={() => setTranscript("")}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(transcript);
              window.speechSynthesis.speak(utterance);
            }}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={startListening}
          disabled={isListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isListening ? "bg-red-100 text-red-600 animate-pulse" : "bg-orange-600 text-white shadow-lg shadow-orange-600/20 hover:scale-110"
          }`}
        >
          {isListening ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>
      </div>

      {error && <div className="text-red-600 text-center text-sm font-bold">{error}</div>}
    </div>
  );
}
