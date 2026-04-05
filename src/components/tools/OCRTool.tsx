import React, { useState, useRef } from "react";
import { ScanText, Upload, Copy, Check, Loader2 } from "lucide-react";
import { extractTextFromImage } from "../../lib/gemini";

export function OCRTool() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image) return;
    setLoading(true);
    const base64Data = image.split(",")[1];
    const result = await extractTextFromImage(base64Data);
    setText(result || "");
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Upload Image</div>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-600 hover:bg-orange-50 transition-all overflow-hidden relative group"
          >
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-contain" />
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-300 mb-2 group-hover:text-orange-600 transition-colors" />
                <p className="text-sm text-gray-400">Click to upload or drag image</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <button 
            onClick={processImage}
            disabled={!image || loading}
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanText className="w-5 h-5" />}
            Extract Text
          </button>
        </div>

        <div className="space-y-4 relative">
          <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Extracted Text</div>
          <div className="w-full h-[300px] bg-white border border-gray-200 rounded-3xl p-6 text-sm overflow-auto whitespace-pre-wrap">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 opacity-30">
                <Loader2 className="w-10 h-10 animate-spin" />
                <p>AI is analyzing the image...</p>
              </div>
            ) : (
              text || <span className="opacity-30 italic">Extracted text will appear here...</span>
            )}
          </div>
          {text && (
            <button 
              onClick={copyToClipboard}
              className="absolute bottom-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
