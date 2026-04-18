"use client";

import { useCallback, useRef, useState } from "react";
import { streamChat } from "@/lib/api";

type Message = { role: "user" | "assistant"; content: string };

const SESSION_ID = "twin-" + Math.random().toString(36).slice(2, 10);

const STARTERS = [
  "What's your background as a Clinical Officer?",
  "Tell me about AfyaChain.",
  "What is Evarest Technologies?",
  "How did you transition from healthcare to tech?",
  "What AI projects have you built?",
  "Tell me about your sepsis prediction system.",
];

const QUICK_FACTS = [
  { label: "Role", value: "Software Engineer & Co-founder" },
  { label: "Company", value: "Evarest Technologies" },
  { label: "Location", value: "Kisumu, Kenya" },
  { label: "Background", value: "11 yrs Clinical Officer" },
  { label: "AWS", value: "Community Builder (Dev Tools)" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || streaming) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
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
        updated[updated.length - 1] = { role: "assistant", content: "Sorry, something went wrong. Please try again." };
        return updated;
      });
      setStreaming(false);
    }
  }, [streaming]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className="w-72 shrink-0 flex flex-col border-r overflow-y-auto"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {/* Avatar + name */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4"
            style={{ background: "var(--purple-800)", color: "var(--purple-200)", border: "2px solid var(--purple-700)" }}
          >
            SO
          </div>
          <p className="font-semibold" style={{ color: "var(--purple-200)" }}>Stella Achar Oiro</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--purple-400)" }}>
            Software Engineer · Clinical Officer
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Kisumu County, Kenya</p>
        </div>

        {/* Quick facts */}
        <div className="p-4 border-b space-y-2" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--purple-400)" }}>
            Quick Facts
          </p>
          {QUICK_FACTS.map((f) => (
            <div key={f.label}>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{f.label}</p>
              <p className="text-sm" style={{ color: "var(--purple-200)" }}>{f.value}</p>
            </div>
          ))}
        </div>

        {/* Suggested questions */}
        <div className="p-4 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--purple-400)" }}>
            Ask me about…
          </p>
          <div className="space-y-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={streaming}
                className="w-full text-left px-3 py-2 rounded-lg text-xs leading-snug transition-all hover:opacity-90 disabled:opacity-40"
                style={{
                  background: "var(--surface2)",
                  color: "var(--purple-200)",
                  border: "1px solid var(--border)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="p-4 border-t flex gap-3" style={{ borderColor: "var(--border)" }}>
          <a href="https://github.com/Stella-Achar-Oiro" target="_blank" rel="noreferrer"
            className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--purple-400)" }}>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/stella-achar-oiro" target="_blank" rel="noreferrer"
            className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--purple-400)" }}>
            LinkedIn
          </a>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                style={{ background: "var(--purple-800)", color: "var(--purple-200)" }}
              >
                SO
              </div>
              <p className="text-lg font-medium" style={{ color: "var(--purple-200)" }}>
                Hi, I&apos;m Stella&apos;s AI twin
              </p>
              <p className="text-sm max-w-sm" style={{ color: "var(--text-muted)" }}>
                Ask me anything about Stella&apos;s background, projects, or experience.
                Try one of the prompts in the sidebar to get started.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mr-2 mt-0.5 shrink-0"
                  style={{ background: "var(--purple-800)", color: "var(--purple-300)" }}
                >
                  SO
                </div>
              )}
              <div
                className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                style={
                  m.role === "user"
                    ? { background: "var(--purple-700)", color: "var(--purple-100)", borderBottomRightRadius: "4px" }
                    : { background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", borderBottomLeftRadius: "4px" }
                }
              >
                {m.content}
                {m.role === "assistant" && streaming && i === messages.length - 1 && (
                  <span
                    className="inline-block w-1.5 h-4 ml-0.5 rounded-sm animate-pulse align-middle"
                    style={{ background: "var(--purple-400)" }}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Stella's twin anything…"
              disabled={streaming}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none disabled:opacity-50"
              style={{
                background: "var(--surface2)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 hover:opacity-80 transition-opacity"
              style={{ background: "var(--purple-700)", color: "var(--purple-100)" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
