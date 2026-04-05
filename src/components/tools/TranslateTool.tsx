import React, { useState } from "react";
import { Globe, ArrowRightLeft, Languages, Copy, Check } from "lucide-react";
import { askGemini } from "../../lib/gemini";

export function TranslateTool() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("Spanish");
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const prompt = `Translate the following text to ${targetLang}. Only provide the translation, no extra text.\n\nText: ${text}`;
    const result = await askGemini(prompt, "You are a professional translator.");
    setTranslated(result || "");
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold">
          <Languages className="w-4 h-4" /> Auto Detect
        </div>
        <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
        <select 
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="px-4 py-2 bg-white border border-[#E7E5E4] rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-orange-600/20"
        >
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Chinese</option>
          <option>Japanese</option>
          <option>Hindi</option>
          <option>Arabic</option>
          <option>Russian</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Source Text</label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text to translate..."
            className="w-full h-48 bg-[#F5F5F4] border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none resize-none"
          />
        </div>
        <div className="space-y-2 relative">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Translation</label>
          <div className="w-full h-48 bg-white border border-[#E7E5E4] rounded-2xl p-6 text-sm overflow-auto">
            {loading ? (
              <div className="flex items-center gap-2 text-orange-600 animate-pulse">
                <Globe className="w-4 h-4 animate-spin" /> Translating...
              </div>
            ) : (
              translated || <span className="opacity-30 italic">Translation will appear here...</span>
            )}
          </div>
          {translated && (
            <button 
              onClick={copyToClipboard}
              className="absolute bottom-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-[#E7E5E4]"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <button 
        onClick={handleTranslate}
        disabled={loading || !text.trim()}
        className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/20"
      >
        Translate Now
      </button>
    </div>
  );
}
