"use client";

import { useCallback, useRef, useState } from "react";
import { streamChat } from "@/lib/api";

type Message = { role: "user" | "assistant"; content: string };

const SESSION_ID = "twin-" + Math.random().toString(36).slice(2, 10);

const STARTERS = [
  "What's your background in healthcare?",
  "Tell me about Zeya Antenatal.",
  "What AI tools have you worked with?",
  "How did you go from medicine to software?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;
      const userMsg: Message = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setStreaming(true);

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      try {
        await streamChat(
          text,
          SESSION_ID,
          (token) => {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: updated[updated.length - 1].content + token,
              };
              return updated;
            });
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          },
          () => setStreaming(false)
        );
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          };
          return updated;
        });
        setStreaming(false);
      }
    },
    [streaming]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-12">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
              style={{ backgroundColor: "var(--sage)" }}
            >
              SO
            </div>
            <p className="text-gray-500 max-w-sm">
              Ask me anything about my background, projects, or experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-[var(--sage)] hover:text-[var(--sage)] transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "text-white rounded-br-sm"
                  : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm"
              }`}
              style={m.role === "user" ? { backgroundColor: "var(--sage)" } : {}}
            >
              {m.content}
              {m.role === "assistant" && streaming && i === messages.length - 1 && (
                <span className="inline-block w-1.5 h-4 ml-0.5 rounded-sm animate-pulse" style={{ backgroundColor: "var(--sage)" }} />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Stella's twin anything…"
            disabled={streaming}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--sage)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="px-5 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-40 hover:opacity-90 transition"
            style={{ backgroundColor: "var(--sage)" }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
