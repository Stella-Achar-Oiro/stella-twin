import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <nav
        className="flex items-center justify-between px-6 py-4 shadow-sm"
        style={{ backgroundColor: "var(--sage)" }}
      >
        <span className="text-xl font-semibold text-white tracking-wide">
          Stella Oiro
        </span>
        <Link
          href="/chat"
          className="px-4 py-2 rounded-md text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition"
        >
          Chat with my twin →
        </Link>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-lg"
          style={{ backgroundColor: "var(--sage)" }}
        >
          SO
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--sage-dark)" }}>
          Hi, I&apos;m Stella
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-2">
          Software engineer &amp; AI practitioner — bridging clinical medicine and technology.
        </p>
        <p className="text-gray-500 max-w-lg mb-8">
          I build AI-powered health tools for underserved communities. My latest project is
          Zeya Antenatal, a bilingual maternal-health chatbot deployed across East Africa.
        </p>

        <div className="flex gap-3 flex-wrap justify-center mb-10">
          {["Healthcare AI", "Next.js + FastAPI", "AWS / Cloud", "Multilingual NLP"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: "var(--sage-light)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href="/chat"
          className="px-8 py-3 rounded-lg text-white font-semibold shadow hover:opacity-90 transition text-lg"
          style={{ backgroundColor: "var(--sage)" }}
        >
          Chat with my AI twin
        </Link>
        <p className="mt-4 text-sm text-gray-400">
          My twin remembers our conversation and answers questions about my background in real time.
        </p>
      </section>

      <footer className="py-4 text-center text-sm text-gray-400 border-t border-gray-200">
        <a href="https://github.com/Stella-Achar-Oiro" className="hover:underline mr-4" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/stella-achar-oiro" className="hover:underline" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </footer>
    </main>
  );
}
