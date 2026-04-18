import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stella Oiro — Digital Twin",
  description: "Chat with Stella's AI digital twin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
