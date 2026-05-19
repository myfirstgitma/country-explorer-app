"use client";
import { useState } from "react";

const AiChat = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAi = async () => {
    setError("");
    setReply("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setReply(data.reply);
    } catch (err) {
      setError("Network error - please check your connection");
    } finally {
      setLoading(false);
    }
  }; // ← closes handleAskAi

  return (
    <div className="max-w-xl mx-auto p-8 border border-slate-200 rounded-2xl shadow-xl bg-white mt-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Ask AI About Countries
        </h1>
      </div>

      <div className="relative group">
        <input
          type="text"
          placeholder="Type a country name or question..."
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent"
        />
      </div>

      <button
        onClick={handleAskAi}
        disabled={loading || !message.trim()}
        className="w-full sm:w-auto mt-4 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold rounded-xl shadow-md shadow-indigo-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {/* Error box */}
      {error && (
        <div className="mt-6 p-4 border border-red-200 rounded-xl bg-red-50 text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {reply && (
        <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
            AI Response
          </p>
          <div className="p-5 border border-indigo-100 rounded-2xl bg-indigo-50/50 text-slate-800 leading-relaxed shadow-sm">
            {reply}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChat;
