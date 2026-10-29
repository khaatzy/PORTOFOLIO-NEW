"use client";

import React, { useState } from "react";
import type { Skill } from "@/data/skills";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full w-full p-6 rounded-2xl bg-navy/30 hover:bg-navy/60 border border-deep/60 hover:border-royal/60 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden cursor-default min-h-[230px]"
      style={{
        boxShadow: isHovered
          ? `0 10px 35px -10px ${skill.color}40, 0 0 20px 0 ${skill.color}20`
          : "none",
        borderColor: isHovered ? `${skill.color}60` : undefined,
      }}
    >
      {/* Background ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
        }}
      />

      {/* Top Section: Badge, Icon, Title */}
      <div className="flex flex-col items-center w-full">
        {/* Category badge */}
        <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-navy/80 border border-deep text-mist/70 mb-3 group-hover:text-snow transition-colors">
          {skill.category}
        </span>

        {/* Tech Icon */}
        <div className="relative my-2 w-14 h-14 flex items-center justify-center">
          <Icon
            aria-hidden="true"
            className="text-4xl md:text-5xl transition-all duration-300 group-hover:scale-110"
            style={{
              color: isHovered ? skill.color : "var(--color-mist)",
              filter: isHovered ? `drop-shadow(0 0 12px ${skill.color}80)` : "none",
            }}
          />
        </div>

        {/* Tech Name */}
        <h3 className="font-sans text-base font-semibold text-snow mt-2 group-hover:text-sky transition-colors">
          {skill.name}
        </h3>
      </div>

      {/* Bottom Section: Short Description with Uniform Reserved Height */}
      <p className="text-xs text-mist/80 mt-3 leading-relaxed line-clamp-2 min-h-[2rem] flex items-center justify-center">
        {skill.description}
      </p>
    </div>
  );
}
