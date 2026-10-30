"use client";

import React from "react";
import { skills } from "@/data/skills";
import { SkillCard } from "@/components/ui/SkillCard";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-deep/40 overflow-hidden"
    >
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal mb-3 inline-block">
          Teknologi & Keahlian
        </span>
        <SplitReveal
          tag="h2"
          className="text-2xl sm:text-4xl md:text-5xl font-black text-snow tracking-tight"
        >
          Tech Stack yang Dikuasai
        </SplitReveal>
        <p className="text-mist text-xs sm:text-sm md:text-base mt-3 sm:mt-4 leading-relaxed">
          Kumpulan teknologi frontend, backend, database, dan grafis 3D yang aktif saya gunakan untuk mewujudkan ide menjadi aplikasi nyata.
        </p>
      </div>

      {/* Main Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch">
        {skills.map((skill, index) => (
          <FadeInOnScroll key={skill.name} delay={index * 0.07} className="h-full">
            <SkillCard skill={skill} />
          </FadeInOnScroll>
        ))}
      </div>

      {/* Infinite Marquee Section */}
      <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-deep/30">
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_32px,_black_calc(100%-32px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          {/* Marquee Row 1 - Left */}
          <div className="flex w-max gap-4 sm:gap-8 py-2 sm:py-3 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
            {[...skills, ...skills, ...skills].map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`m1-${i}`}
                  className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-navy/40 border border-deep/50 text-mist text-xs font-medium hover:text-snow hover:border-royal transition-colors whitespace-nowrap"
                >
                  <Icon
                    aria-hidden="true"
                    className="text-sm sm:text-base"
                    style={{ color: skill.color }}
                  />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>

          {/* Marquee Row 2 - Reverse Right */}
          <div className="flex w-max gap-4 sm:gap-8 py-2 sm:py-3 animate-[marquee-reverse_26s_linear_infinite] hover:[animation-play-state:paused]">
            {[...skills.slice().reverse(), ...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`m2-${i}`}
                  className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-navy/40 border border-deep/50 text-mist text-xs font-medium hover:text-snow hover:border-royal transition-colors whitespace-nowrap"
                >
                  <Icon
                    aria-hidden="true"
                    className="text-sm sm:text-base"
                    style={{ color: skill.color }}
                  />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
