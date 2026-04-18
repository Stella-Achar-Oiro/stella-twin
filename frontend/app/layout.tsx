import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stella Oiro — Digital Twin",
  description: "Software Engineer, AWS Community Builder, Clinical Officer & Co-founder at Evarest Technologies",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
