import React, { useState } from "react";
import { Banknote, ArrowRightLeft, RefreshCw } from "lucide-react";

export function CurrencyTool() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    setLoading(true);
    try {
      // Using a free API for currency conversion
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      const rate = data.rates[to];
      setResult(parseFloat(amount) * rate);
    } catch (error) {
      console.error("Currency error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Amount</label>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-4xl font-bold bg-transparent border-b-2 border-gray-100 focus:border-orange-600 outline-none py-2 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <select 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-600/20"
          >
            <option>USD</option><option>EUR</option><option>GBP</option><option>JPY</option><option>INR</option><option>AUD</option><option>CAD</option>
          </select>
          <div className="flex justify-center">
            <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
          </div>
          <select 
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-600/20"
          >
            <option>EUR</option><option>USD</option><option>GBP</option><option>JPY</option><option>INR</option><option>AUD</option><option>CAD</option>
          </select>
        </div>

        <button 
          onClick={convert}
          disabled={loading}
          className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Banknote className="w-5 h-5" />}
          Convert
        </button>
      </div>

      {result !== null && (
        <div className="text-center p-8 bg-orange-50 rounded-3xl border border-orange-100">
          <div className="text-sm text-orange-700 font-bold opacity-50 mb-1">{amount} {from} =</div>
          <div className="text-4xl font-bold text-orange-900">{result.toFixed(2)} {to}</div>
        </div>
      )}
    </div>
  );
}
