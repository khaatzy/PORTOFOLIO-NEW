"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUp, Mail, Copy, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function Contact() {
  const { scrollTo } = useSmoothScroll();
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  // Contact email
  const contactEmail = profile.socials.email || "arkhanzaazs020911@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="relative pt-20 sm:pt-28 pb-10 sm:pb-12 border-t border-deep/40 bg-ink overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-royal/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal mb-3 inline-block">
            Hubungi Saya
          </span>
          <SplitReveal
            tag="h2"
            className="text-3xl sm:text-5xl md:text-6xl font-black text-snow tracking-tight leading-tight"
          >
            Mari Terhubung & Berkolaborasi
          </SplitReveal>
          <p className="text-mist text-sm sm:text-base md:text-lg mt-3 sm:mt-4 leading-relaxed">
            Terbuka untuk diskusi proyek web, eksplorasi teknologi baru, pertukaran ide seputar computing, atau sekadar menyapa.
          </p>

          {/* Contact Action Cards */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-royal hover:bg-sky text-snow font-semibold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_25px_rgba(30,94,255,0.4)] hover:shadow-[0_0_35px_rgba(77,163,255,0.7)] cursor-pointer active:scale-95 min-h-[48px]"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">{copied ? "Email Tersalin!" : contactEmail}</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-300 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-snow/80 shrink-0" />
              )}
            </button>

            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-navy/60 hover:bg-navy border border-deep hover:border-royal/60 text-snow font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer active:scale-95 min-h-[48px]"
            >
              <SiGithub className="text-base shrink-0" />
              <span>GitHub @{profile.githubUsername}</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-deep/40 my-10 sm:my-16" />

        {/* Bottom Footer Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-mist/70 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© {currentYear} {profile.name}.</span>
            <span className="hidden sm:inline">•</span>
            <span>Dibuat dengan Next.js, React, Tailwind CSS & Three.js.</span>
          </div>

          <button
            onClick={() => scrollTo("#hero", { duration: 1.5 })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/40 hover:bg-navy/80 border border-deep/60 hover:border-royal text-mist hover:text-sky transition-all cursor-pointer group active:scale-95"
            aria-label="Kembali ke atas halaman"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
