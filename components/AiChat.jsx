"use client";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import Typewriter from "./Typewriter";
import ShinyButton from "./ShinyButton";

const AiChat = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { name } = useParams();
  const countryName = decodeURIComponent(name);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAskAi = async () => {
    setError("");
    setReply("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message, country: countryName }),
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
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 md:p-8 border border-slate-200 rounded-2xl shadow-xl bg-white mt-6 md:mt-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-6 bg-indigo-600 rounded-full shrink-0"></div>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
          Ask AI About {countryName}{" "}
        </h1>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Type a quastion here..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleAskAi();
          }
        }}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent"
      />

      {/* Button */}
      <ShinyButton
        onClick={handleAskAi}
        disabled={loading || !message.trim()}
        loading={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Thinking...
          </span>
        ) : (
          "Ask AI"
        )}
      </ShinyButton>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 border border-red-200 rounded-xl bg-red-50 text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Reply */}
      {reply && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2 ml-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              AI Response
            </p>
            {/* Copy icon button */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-indigo-100 transition-colors text-slate-400 hover:text-indigo-600"
              title={copied ? "Copied!" : "Copy"}
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          <div className="p-5 border border-indigo-100 rounded-2xl bg-indigo-50/50 text-slate-800 leading-relaxed shadow-sm break-words">
            {reply}
            <Typewriter text={reply} speed={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChat;
