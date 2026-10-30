"use client";

import React from "react";
import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import { TextScramble } from "@/components/animations/TextScramble";
import { ScrambleRotatingWords } from "@/components/animations/ScrambleRotatingWords";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowRight, ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";

// Dynamically import 3D Lanyard Card with SSR disabled
const LanyardCard3D = dynamic(
  () => import("@/components/three/LanyardCard3D").then((mod) => mod.LanyardCard3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[480px] md:h-[620px] lg:h-[700px] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-royal/30 border-t-sky animate-spin" />
        <span className="text-xs text-mist/60 font-mono tracking-widest uppercase">
          Memuat 3D Badge...
        </span>
      </div>
    ),
  }
);

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-1 my-auto">
        {/* Left Column: Typography & Bio */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10 py-2 sm:py-4 order-2 lg:order-1">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/50 border border-deep/80 backdrop-blur-md mb-4 sm:mb-6 w-fit shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-royal" />
            </span>
            <span className="text-xs font-medium text-mist flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-sky" />
              {profile.school}
            </span>
          </div>

          {/* Main Title matching Image 1 & Font Syne */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight text-snow leading-[1.06] sm:leading-[1.04] select-none">
            <span className="block text-mist/90 text-2xl sm:text-3xl md:text-4xl font-semibold mb-1 min-h-[1.25em]">
              <TextScramble text="Welcome to" delay={250} speed={32} />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-snow via-sky to-royal drop-shadow-[0_0_35px_rgba(37,99,235,0.45)]">
              My Portfolio
            </span>
          </h1>

          {/* Dynamic Decrypting Roles + Separator Pipe + Permanent Name with Stable Locked Height */}
          <div className="min-h-[4.75rem] sm:min-h-[3.8rem] lg:min-h-[2.5rem] flex items-center mt-3">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-sky flex items-center flex-wrap gap-x-2.5 gap-y-1">
              <ScrambleRotatingWords
                words={[
                  "SMPN 9 Probolinggo Student",
                  "Full Stack Web Developer",
                  "3D Creative Developer",
                  "Computing Enthusiast",
                ]}
                className="text-sky font-semibold tracking-wide"
              />
              <span className="text-mist/50 font-light select-none text-sm sm:text-base md:text-lg">
                |
              </span>
              <span className="text-snow font-bold tracking-tight text-sm sm:text-base md:text-lg whitespace-nowrap">
                {profile.name}
              </span>
              <span className="w-0.5 h-4 sm:h-5 bg-sky animate-pulse inline-block ml-0.5" />
            </div>
          </div>

          {/* Bio Description matching user prompt and image tone */}
          <p className="text-sm sm:text-base md:text-lg text-mist/90 max-w-xl mt-4 sm:mt-5 leading-relaxed">
            Berawal dari rasa penasaran, sekarang jadi passion. Aku suka bereksperimen dengan kode,
            mengeksplorasi teknologi baru, dan mengubah ide menjadi sesuatu yang nyata. Dari tampilan web
            yang menarik sampai interaksi 3D yang seru, aku selalu berusaha bikin sesuatu yang bukan cuma
            keren dilihat, tapi juga nyaman digunakan.
          </p>

          {/* Pill CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mt-6 sm:mt-8">
            <a
              href="#live-projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#live-projects", { offset: -30 });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-royal to-sky hover:from-royal/90 hover:to-sky/90 text-snow font-semibold text-sm shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group min-h-[48px]"
            >
              <span>Lihat Project</span>
              <ArrowRight className="w-4 h-4 text-snow group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact", { offset: -30 });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-full bg-navy/60 hover:bg-navy/90 border border-deep/80 hover:border-royal/70 text-snow font-medium text-sm backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group min-h-[48px]"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="w-4 h-4 text-mist group-hover:text-sky group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* FIND ME Social Links Row */}
          <div className="flex items-center gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-deep/40">
            <span className="text-xs uppercase tracking-widest text-mist/70 font-bold">
              FIND ME
            </span>
            <div className="flex items-center gap-3">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-navy/60 border border-deep/80 hover:border-royal/80 hover:bg-royal/20 flex items-center justify-center text-mist hover:text-snow transition-all hover:scale-110 active:scale-95 shadow-sm"
              >
                <SiGithub className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.socials.email}`}
                aria-label="Email Arkhanza"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-navy/60 border border-deep/80 hover:border-royal/80 hover:bg-royal/20 flex items-center justify-center text-mist hover:text-snow transition-all hover:scale-110 active:scale-95 shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Swinging Lanyard Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center z-20 order-1 lg:order-2">
          <LanyardCard3D />
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="z-10 flex flex-col items-center justify-center pt-4 sm:pt-6">
        <button
          onClick={() => scrollTo("#about", { offset: -30 })}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-mist/60 hover:text-sky transition-colors cursor-pointer group py-2"
          aria-label="Scroll Down to About Section"
        >
          <span>Scroll ke bawah</span>
          <span className="w-6 h-10 rounded-full border border-deep group-hover:border-royal flex items-start justify-center p-1.5 transition-colors">
            <span className="w-1.5 h-2.5 rounded-full bg-royal group-hover:bg-sky animate-bounce" />
          </span>
        </button>
      </div>
    </section>
  );
}
