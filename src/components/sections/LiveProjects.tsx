"use client";

import React from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { ExternalLink, QrCode, ShieldCheck, HeartHandshake, EyeOff } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function LiveProjects() {
  return (
    <section
      id="live-projects"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-deep/40"
    >
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal mb-3 inline-block">
          Karya Nyata & Terpublikasi
        </span>
        <SplitReveal
          tag="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-black text-snow tracking-tight"
        >
          Project Live yang Sudah Dibuat
        </SplitReveal>
        <p className="text-mist text-sm md:text-base mt-4 leading-relaxed">
          Aplikasi web siap pakai yang telah di-deploy dan dapat diakses publik. Dirancang untuk menjawab kebutuhan nyata dengan keamanan, kecepatan, dan privasi yang optimal.
        </p>
      </div>

      <div className="flex flex-col gap-12 lg:gap-16">
        {profile.liveProjects.map((project, index) => {
          const isEven = index % 2 === 1;
          const numberStr = (index + 1).toString().padStart(2, "0");

          return (
            <FadeInOnScroll key={project.title} delay={index * 0.1}>
              <div
                className={`group relative rounded-3xl p-6 md:p-10 bg-navy/25 border border-deep/70 backdrop-blur-xl overflow-hidden hover:border-royal/60 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Background ambient glow */}
                <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-royal/10 blur-[100px] pointer-events-none group-hover:bg-royal/20 transition-colors" />

                {/* Left/Right: Screenshot Container */}
                <div
                  className={`lg:col-span-7 relative rounded-2xl overflow-hidden border border-deep/80 bg-night aspect-[16/10] shadow-2xl ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-full overflow-hidden cursor-pointer group/img"
                    aria-label={`Kunjungi situs ${project.title}`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    {/* Dark Blue Overlay on Hover */}
                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-royal text-snow text-xs font-bold tracking-wide uppercase shadow-[0_0_20px_rgba(30,94,255,0.8)] transform -translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                        <span>Buka Website</span>
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </a>
                </div>

                {/* Left/Right: Content Details */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    {/* Outline Number & Highlight Badges */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span
                        className="text-4xl md:text-5xl font-black font-mono tracking-tighter select-none text-transparent"
                        style={{
                          WebkitTextStroke: "1px rgba(77, 163, 255, 0.4)",
                        }}
                      >
                        {numberStr}
                      </span>

                      {/* Highlight badges based on project */}
                      <div className="flex items-center gap-2">
                        {project.title.includes("Absen") ? (
                          <>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-royal/15 border border-royal/40 text-sky">
                              <QrCode className="w-3.5 h-3.5" />
                              QR Dinamis
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-navy/80 border border-deep text-mist">
                              <ShieldCheck className="w-3.5 h-3.5 text-sky" />
                              Anti-Kecurangan
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-royal/15 border border-royal/40 text-sky">
                              <HeartHandshake className="w-3.5 h-3.5" />
                              Curhat Aman
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-navy/80 border border-deep text-mist">
                              <EyeOff className="w-3.5 h-3.5 text-sky" />
                              100% Anonim
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-snow group-hover:text-sky transition-colors">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-sm md:text-base text-mist/90 leading-relaxed mt-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-md bg-night/90 border border-deep/60 text-snow/90 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5 mt-8 pt-4 border-t border-deep/40">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-royal hover:bg-sky text-snow text-xs font-bold transition-all shadow-[0_0_20px_rgba(30,94,255,0.4)] hover:shadow-[0_0_25px_rgba(77,163,255,0.6)] cursor-pointer"
                    >
                      <span>Kunjungi Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {Boolean(project.repo) && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy/70 hover:bg-navy border border-deep hover:border-royal/60 text-snow text-xs font-semibold transition-all cursor-pointer"
                      >
                        <SiGithub className="text-sm" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          );
        })}
      </div>
    </section>
  );
}
