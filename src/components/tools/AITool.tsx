import React, { useState } from "react";
import { Sparkles, Send, Loader2, Copy, Check, Volume2 } from "lucide-react";
import { askGemini } from "../../lib/gemini";

interface AIToolProps {
  title: string;
  placeholder: string;
  systemInstruction: string;
  icon: React.ReactNode;
}

export function AITool({ title, placeholder, systemInstruction, icon }: AIToolProps) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const result = await askGemini(input, systemInstruction);
    setResponse(result || "");
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full h-32 bg-[#F5F5F4] border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none resize-none pr-16"
        />
        <button 
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute bottom-4 right-4 p-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all disabled:opacity-50 shadow-lg shadow-orange-600/20"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>

      <div className="space-y-2 relative">
        <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">AI Response</div>
        <div className="w-full min-h-[200px] bg-white border border-[#E7E5E4] rounded-2xl p-6 text-sm overflow-auto whitespace-pre-wrap leading-relaxed">
          {loading ? (
            <div className="flex items-center gap-2 text-orange-600 animate-pulse">
              <Sparkles className="w-4 h-4" /> AI is thinking...
            </div>
          ) : (
            response || <span className="opacity-30 italic">Response will appear here...</span>
          )}
        </div>
        {response && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={speak}
              className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-[#E7E5E4]"
              title="Read aloud"
            >
              <Volume2 className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={copyToClipboard}
              className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-[#E7E5E4]"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
