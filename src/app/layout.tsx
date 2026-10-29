import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arkhanza-portfolio.vercel.app"),
  title: `${profile.name} — Full Stack Web Developer`,
  description: `${profile.name} adalah seorang pelajar di ${profile.school} dan developer web yang menguasai React, Next.js, Three.js, PostgreSQL, Supabase, dan Node.js.`,
  keywords: [
    profile.name,
    "Arkhanza",
    "khaatzy",
    "Full Stack Web Developer",
    "Next.js Portfolio",
    "Three.js Portfolio",
    "React Developer",
    "SMPN 9 Probolinggo",
  ],
  authors: [{ name: profile.name, url: `https://github.com/${profile.githubUsername}` }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — Full Stack Web Developer`,
    description: profile.tagline,
    url: "https://github.com/khaatzy/PORTOFOLIO-NEW",
    siteName: `${profile.name} Portfolio`,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full Stack Web Developer`,
    description: profile.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth antialiased selection:bg-royal selection:text-snow`}
    >
      <body className="min-h-screen bg-ink text-snow font-sans overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
