import type { Metadata } from "next";
import { Fragment_Mono, Inter } from "next/font/google";
import "./globals.css";
import { DevTools } from "@/components/dev-tools";

/* Font swap seam: replace these with the brand's faces (next/font), keep the
   CSS variable names — tokens.css maps them to --font-ui / --font-mono-stack. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Prototype",
  description: "Interactive prototype variants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Dark mode is a scene decision: add className="dark" to <html> when the
     usage scene calls for it (e.g. ops tooling used at night). */
  return (
    <html lang="en" className={`${inter.variable} ${fragmentMono.variable}`}>
      <body className="min-h-dvh antialiased">
        {children}
        <DevTools />
      </body>
    </html>
  );
}
