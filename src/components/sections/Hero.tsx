"use client";

import React from "react";
import { profile } from "@/data/profile";
import { TextScramble } from "@/components/animations/TextScramble";
import { RotatingWords } from "@/components/animations/RotatingWords";
import { Button } from "@/components/ui/Button";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ChevronDown, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="flex-1 flex flex-col justify-center max-w-3xl z-10 my-auto">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/40 border border-deep/70 backdrop-blur-md mb-6 w-fit shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-royal" />
          </span>
          <span className="text-xs font-medium text-mist flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-sky" />
            {profile.school}
          </span>
        </div>

        {/* Name Title with TextScramble */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-snow leading-[1.08] select-none">
          <span className="block text-mist/60 text-lg sm:text-2xl font-light tracking-normal mb-2">
            Halo, saya
          </span>
          <TextScramble text={profile.name} delay={400} />
        </h1>

        {/* Dynamic Rotating Roles */}
        <div className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 text-sky flex flex-wrap items-baseline gap-2">
          <span className="text-mist/70 font-normal">Seorang</span>
          <RotatingWords
            words={profile.role}
            className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-snow underline decoration-royal/60 decoration-2 underline-offset-8"
          />
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-mist/90 max-w-xl mt-6 leading-relaxed">
          {profile.tagline} Mengembangkan aplikasi web yang cepat, responsif, dan memberikan pengalaman digital yang memikat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Button
            size="lg"
            variant="primary"
            onClick={() => scrollTo("#live-projects", { offset: -40 })}
          >
            Lihat Project
          </Button>

          <Button
            size="lg"
            variant="secondary"
            href={profile.socials.github}
            external
            icon={<SiGithub className="text-lg text-sky" />}
          >
            GitHub Profile
          </Button>
        </div>

        {/* Quick Tech Highlights */}
        <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-deep/40 text-xs text-mist/70">
          <span className="text-mist font-semibold">Tech:</span>
          <span>React</span>
          <span>•</span>
          <span>Next.js</span>
          <span>•</span>
          <span>Three.js</span>
          <span>•</span>
          <span>PostgreSQL</span>
          <span>•</span>
          <span>Supabase</span>
          <span>•</span>
          <span>Node.js</span>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="z-10 flex flex-col items-center justify-center pt-8">
        <button
          onClick={() => scrollTo("#about", { offset: -40 })}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-mist/60 hover:text-sky transition-colors cursor-pointer group"
          aria-label="Scroll Down to About Section"
        >
          <span>Scroll ke bawah</span>
          <span className="w-6 h-10 rounded-full border border-deep group-hover:border-royal flex items-start justify-center p-1.5 transition-colors">
            <span className="w-1.5 h-2.5 rounded-full bg-royal group-hover:bg-sky animate-bounce" />
          </span>
          <ChevronDown className="w-4 h-4 text-mist/50 group-hover:text-sky transition-colors animate-pulse" />
        </button>
      </div>
    </section>
  );
}
