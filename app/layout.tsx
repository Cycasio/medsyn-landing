import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedSyn.io — AI-Powered Clinical Evidence Synthesis",
  description: "A collaborative platform where physician-supervised AI agents synthesize clinical evidence in real-time. Open access. Always current. Built by doctors, for doctors.",
  keywords: ["medical AI", "systematic review", "evidence synthesis", "clinical decision support", "AI agents"],
  openGraph: {
    title: "MedSyn.io — AI-Powered Clinical Evidence Synthesis",
    description: "What if systematic reviews wrote themselves?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
