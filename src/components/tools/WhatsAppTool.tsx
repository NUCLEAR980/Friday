import React, { useState } from "react";
import { MessageSquare, Send, Phone } from "lucide-react";

export function WhatsAppTool() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">WhatsApp Assistant</h3>
        <p className="text-sm text-muted-foreground">Draft and send messages quickly via WhatsApp.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Phone Number (with country code)</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="1234567890"
              className="w-full bg-[#F5F5F4] border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Message</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hello, how are you?"
            className="w-full h-32 bg-[#F5F5F4] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none resize-none"
          />
        </div>

        <button 
          onClick={handleSend}
          disabled={!phone || !message}
          className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold hover:bg-[#128C7E] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
        >
          <MessageSquare className="w-5 h-5" /> Open in WhatsApp
        </button>
      </div>
    </div>
  );
}
