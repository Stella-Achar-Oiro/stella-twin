import Image from "next/image";
import Link from "next/link";
import Chat from "@/components/Chat";

export const metadata = { title: "Chat — Stella's Digital Twin" };

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--bg)" }}>
      <nav
        className="flex items-center justify-between px-6 py-3 shrink-0 border-b"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="Stella logo" width={28} height={28} priority />
          <span className="font-semibold" style={{ color: "var(--purple-200)" }}>Stella Oiro</span>
        </Link>
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>AI Digital Twin</span>
      </nav>
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
}
