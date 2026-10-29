"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { TextScramble } from "@/components/animations/TextScramble";
import { RotatingWords } from "@/components/animations/RotatingWords";
import { Button } from "@/components/ui/Button";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ChevronDown, Sparkles, MapPin, Code2 } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 my-auto">
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
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
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-snow leading-[1.08] select-none">
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
          </div>
        </div>

        {/* Right Column: Prominent Hero Portrait Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[360px] sm:max-w-[420px] transition-transform duration-200 ease-out cursor-pointer"
          >
            {/* Ambient Radial Backglow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-royal via-sky to-deep rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />

            {/* Glassmorphic Frame */}
            <div className="relative rounded-3xl p-3 bg-navy/40 border border-royal/60 backdrop-blur-xl shadow-[0_0_50px_rgba(30,94,255,0.35)] overflow-hidden">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-night">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover object-top filter contrast-[1.08] brightness-[1.03] transition-transform duration-700 ease-out hover:scale-105"
                />

                {/* Subtle Duotone Gradient Overlay on edges of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge Top Left */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/75 border border-royal/60 backdrop-blur-md shadow-lg text-[11px] font-semibold text-snow">
                  <Code2 className="w-3.5 h-3.5 text-sky" />
                  <span>Full Stack Dev</span>
                </div>

                {/* Floating Badge Bottom Right */}
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy/85 border border-deep backdrop-blur-md shadow-lg text-[11px] font-medium text-mist">
                  <MapPin className="w-3 h-3 text-sky" />
                  <span>Probolinggo, ID</span>
                </div>
              </div>
            </div>
          </div>
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
