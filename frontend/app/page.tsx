import Image from "next/image";
import Link from "next/link";

const EXPERIENCE = [
  { role: "Software Engineer & Co-founder", org: "Evarest Technologies", period: "Sep 2025 – Present", location: "Nairobi, Kenya" },
  { role: "Apprentice Software Developer", org: "Zone01 Kisumu", period: "Apr 2024 – Sep 2025", location: "Kisumu, Kenya" },
  { role: "Technical Writer", org: "Hashnode", period: "Aug 2023 – Sep 2025", location: "Remote" },
  { role: "Data Scientist & Analyst", org: "Azubi Africa", period: "Sep 2022 – Sep 2025", location: "Remote" },
  { role: "Clinical Officer", org: "Ministry of Health Kenya", period: "2012 – Jun 2023 · 11 yrs", location: "Kenya" },
];

const PROJECTS = [
  { name: "Zeya Antenatal", desc: "Bilingual (English/Swahili) maternal-health AI chatbot with danger-sign detection, deployed on AWS App Runner + Vercel." },
  { name: "AI Digital Twin", desc: "This site — Next.js App Router + FastAPI streaming twin with file-based conversation memory, deployed on AWS." },
];

const SKILLS = [
  "React", "Next.js", "FastAPI", "Golang", "TypeScript", "Python",
  "AWS Community Builder", "Docker", "Blockchain", "Machine Learning",
  "Technical Writing", "API Documentation",
];

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Nav — white with purple accents */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white"
        style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Stella logo" width={34} height={34} priority />
          <span className="text-lg font-semibold" style={{ color: "var(--purple-700)" }}>Stella Oiro</span>
        </div>
        <Link href="/chat"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-85"
          style={{ background: "var(--purple-700)" }}>
          Chat with my twin →
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-14 space-y-14">
        {/* Hero */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0"
            style={{ background: "var(--purple-700)", color: "white" }}>
            SO
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-1" style={{ color: "var(--purple-900)" }}>Stella Achar Oiro</h1>
            <p className="mb-1 font-medium" style={{ color: "var(--purple-600)" }}>
              Software Engineer · Technical Writer · AWS Community Builder · Clinical Officer · Entrepreneur
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-soft)" }}>
              Kisumu County, Kenya · Co-founder @ Evarest Technologies
            </p>
            <p className="leading-relaxed max-w-2xl" style={{ color: "var(--text)" }}>
              I trained as a Clinical Officer and spent 11 years at the Ministry of Health Kenya before
              transitioning into software engineering. I build full-stack apps, contribute to blockchain
              health infrastructure (AfyaChain), and write technical documentation — always at the
              intersection of technology and real-world impact.
            </p>
            <div className="flex gap-3 mt-5 flex-wrap">
              <a href="https://github.com/Stella-Achar-Oiro" target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: "var(--purple-50)", color: "var(--purple-700)", border: "1px solid var(--border)" }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/stella-achar-oiro" target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: "var(--purple-50)", color: "var(--purple-700)", border: "1px solid var(--border)" }}>
                LinkedIn
              </a>
              <Link href="/chat"
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-85"
                style={{ background: "var(--purple-700)" }}>
                Chat with my AI twin
              </Link>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--purple-700)" }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span key={s} className="glass px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ color: "var(--purple-800)" }}>
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--purple-700)" }}>Experience</h2>
          <div className="space-y-3">
            {EXPERIENCE.map((e) => (
              <div key={e.org + e.period} className="glass p-4 rounded-xl flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold" style={{ color: "var(--purple-900)" }}>{e.role}</p>
                  <p className="text-sm" style={{ color: "var(--purple-600)" }}>{e.org}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm" style={{ color: "var(--text-soft)" }}>{e.period}</p>
                  <p className="text-xs" style={{ color: "var(--text-soft)" }}>{e.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--purple-700)" }}>Notable Projects</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <div key={p.name} className="glass p-5 rounded-xl">
                <p className="font-semibold mb-1.5" style={{ color: "var(--purple-900)" }}>{p.name}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass text-center py-10 rounded-2xl">
          <p className="text-lg font-semibold mb-2" style={{ color: "var(--purple-900)" }}>
            Want to know more about my work?
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-soft)" }}>
            My AI twin knows my full background — ask it anything.
          </p>
          <Link href="/chat"
            className="px-8 py-3 rounded-xl text-base font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: "var(--purple-700)" }}>
            Start chatting →
          </Link>
        </section>
      </main>
    </div>
  );
}
