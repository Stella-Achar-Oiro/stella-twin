import Image from "next/image";
import Link from "next/link";

const EXPERIENCE = [
  { role: "Software Engineer", org: "Evarest Technologies", period: "Sep 2025 – Present", location: "Nairobi, Kenya" },
  { role: "Apprentice Software Developer", org: "Zone01 Kisumu", period: "Apr 2024 – Sep 2025", location: "Kisumu, Kenya" },
  { role: "Technical Writer", org: "Hashnode", period: "Aug 2023 – Sep 2025", location: "Remote" },
  { role: "Data Scientist & Analyst", org: "Azubi Africa", period: "Sep 2022 – Sep 2025", location: "Remote" },
  { role: "Clinical Officer", org: "Ministry of Health Kenya", period: "2012 – Jun 2023 · 11 yrs", location: "Kenya" },
];

const PROJECTS = [
  { name: "AfyaChain", desc: "Blockchain-based medical records with privacy-preserving mechanisms and smart contracts for secure health data management." },
  { name: "Sepsis Prediction System", desc: "ML model achieving 87% accuracy for early sepsis detection using patient data analytics." },
  { name: "Zeya Antenatal", desc: "Bilingual (English/Swahili) maternal-health AI chatbot with danger-sign detection, deployed on AWS App Runner." },
  { name: "AI Digital Twin", desc: "This site — Next.js App Router + FastAPI streaming twin with file-based conversation memory." },
];

const SKILLS = [
  "React", "Next.js", "FastAPI", "Golang", "TypeScript", "Python",
  "AWS (Community Builder)", "Docker", "Blockchain", "Machine Learning",
  "Technical Writing", "API Documentation",
];

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Stella logo" width={36} height={36} priority />
          <span className="text-lg font-semibold" style={{ color: "var(--purple-200)" }}>
            Stella Oiro
          </span>
        </div>
        <Link
          href="/chat"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "var(--purple-700)", color: "var(--purple-100)" }}
        >
          Chat with my twin →
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-14 space-y-16">
        {/* Hero */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0"
            style={{ background: "var(--purple-800)", color: "var(--purple-200)", border: "2px solid var(--purple-700)" }}
          >
            SO
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-1" style={{ color: "var(--purple-200)" }}>
              Stella Achar Oiro
            </h1>
            <p className="mb-3" style={{ color: "var(--purple-400)" }}>
              Software Engineer · Technical Writer · AWS Community Builder · Clinical Officer · Entrepreneur
            </p>
            <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
              Kisumu County, Kenya · Co-founder @ Evarest Technologies
            </p>
            <p className="leading-relaxed mt-3 max-w-2xl" style={{ color: "var(--purple-100)" }}>
              I trained as a Clinical Officer and spent 11 years at the Ministry of Health Kenya before
              transitioning into software engineering. I build full-stack apps, contribute to blockchain
              health infrastructure, and write technical docs — always at the intersection of technology
              and real-world impact.
            </p>
            <div className="flex gap-3 mt-5 flex-wrap">
              <a href="https://github.com/Stella-Achar-Oiro" target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-lg text-sm transition-opacity hover:opacity-80"
                style={{ background: "var(--surface2)", color: "var(--purple-200)", border: "1px solid var(--border)" }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/stella-achar-oiro" target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-lg text-sm transition-opacity hover:opacity-80"
                style={{ background: "var(--surface2)", color: "var(--purple-200)", border: "1px solid var(--border)" }}>
                LinkedIn
              </a>
              <Link href="/chat"
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: "var(--purple-700)", color: "var(--purple-100)" }}>
                Chat with my AI twin
              </Link>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--purple-400)" }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full text-sm"
                style={{ background: "var(--surface2)", color: "var(--purple-200)", border: "1px solid var(--border)" }}>
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--purple-400)" }}>Experience</h2>
          <div className="space-y-3">
            {EXPERIENCE.map((e) => (
              <div key={e.org + e.period} className="p-4 rounded-xl flex justify-between items-start gap-4"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div>
                  <p className="font-medium" style={{ color: "var(--purple-200)" }}>{e.role}</p>
                  <p className="text-sm" style={{ color: "var(--purple-400)" }}>{e.org}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{e.period}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{e.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--purple-400)" }}>Notable Projects</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <div key={p.name} className="p-4 rounded-xl"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="font-semibold mb-1" style={{ color: "var(--purple-200)" }}>{p.name}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 rounded-2xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-lg font-medium mb-2" style={{ color: "var(--purple-200)" }}>
            Want to know more about my work?
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            My AI twin knows my background, projects, and experience — ask it anything.
          </p>
          <Link href="/chat"
            className="px-8 py-3 rounded-xl text-base font-semibold transition-opacity hover:opacity-80"
            style={{ background: "var(--purple-700)", color: "var(--purple-100)" }}>
            Start chatting →
          </Link>
        </section>
      </main>
    </div>
  );
}
