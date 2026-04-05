import React, { useState } from "react";
import { Mail, Send, AlertCircle, CheckCircle2 } from "lucide-react";

export function EmailTool() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setTo("");
        setSubject("");
        setBody("");
      } else {
        throw new Error(data.error || "Failed to send email.");
      }
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3 text-orange-800 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>Note:</strong> To send real emails, you must configure <code>EMAIL_USER</code> and <code>EMAIL_PASS</code> in the server environment variables.
        </p>
      </div>

      <form onSubmit={handleSend} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Recipient Email</label>
          <input 
            type="email"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            className="w-full bg-[#F5F5F4] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Subject</label>
          <input 
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Important Update"
            className="w-full bg-[#F5F5F4] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Message</label>
          <textarea 
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-48 bg-[#F5F5F4] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none resize-none"
          />
        </div>

        <button 
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
        >
          {status === "sending" ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Email
            </>
          )}
        </button>

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600 justify-center font-bold animate-bounce">
            <CheckCircle2 className="w-5 h-5" /> Email sent successfully!
          </div>
        )}

        {status === "error" && (
          <div className="text-red-600 text-center text-sm font-bold bg-red-50 p-3 rounded-xl">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
