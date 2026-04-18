import Link from "next/link";
import Chat from "@/components/Chat";

export const metadata = { title: "Chat — Stella's Digital Twin" };

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen">
      <nav
        className="flex items-center justify-between px-6 py-3 shadow-sm shrink-0"
        style={{ backgroundColor: "var(--sage)" }}
      >
        <Link href="/" className="text-xl font-semibold text-white tracking-wide hover:opacity-90">
          Stella Oiro
        </Link>
        <span className="text-sm text-white/70">AI Digital Twin</span>
      </nav>
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: "var(--cream)" }}>
        <Chat />
      </div>
    </div>
  );
}
