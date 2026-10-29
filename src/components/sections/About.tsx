"use client";

import React, { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { TextFillOnScroll } from "@/components/animations/TextFillOnScroll";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { MapPin, GraduationCap, Code2, GitFork, Users, BookOpen } from "lucide-react";

interface GithubUserStats {
  public_repos: number;
  followers: number;
  following: number;
}

export function About() {
  const [stats, setStats] = useState<GithubUserStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${profile.githubUsername}`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            public_repos: data.public_repos ?? 0,
            followers: data.followers ?? 0,
            following: data.following ?? 0,
          });
        }
      } catch {
        // Fallback gracefully
        setStats({
          public_repos: 12,
          followers: 5,
          following: 6,
        });
      }
    }

    fetchStats();
  }, []);

  return (
    <section
      id="about"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-deep/40"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Heading and Highlight Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal mb-3 inline-block">
              Tentang Saya
            </span>
            <SplitReveal
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-snow tracking-tight leading-tight"
            >
              Membangun Fondasi Digital Sejak Bangku Sekolah
            </SplitReveal>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 mt-8">
              <FadeInOnScroll delay={0.1}>
                <div className="p-4 rounded-xl bg-navy/30 border border-deep/60 backdrop-blur-md flex items-center gap-3.5 hover:border-royal/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-royal/15 border border-royal/30 flex items-center justify-center text-sky">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-mist/70 block">Pendidikan</span>
                    <span className="text-sm font-semibold text-snow">{profile.school}</span>
                  </div>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={0.2}>
                <div className="p-4 rounded-xl bg-navy/30 border border-deep/60 backdrop-blur-md flex items-center gap-3.5 hover:border-royal/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-royal/15 border border-royal/30 flex items-center justify-center text-sky">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-mist/70 block">Lokasi</span>
                    <span className="text-sm font-semibold text-snow">{profile.location}</span>
                  </div>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={0.3}>
                <div className="p-4 rounded-xl bg-navy/30 border border-deep/60 backdrop-blur-md flex items-center gap-3.5 hover:border-royal/50 transition-colors sm:col-span-2 lg:col-span-1">
                  <div className="w-10 h-10 rounded-lg bg-royal/15 border border-royal/30 flex items-center justify-center text-sky">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-mist/70 block">Fokus Saat Ini</span>
                    <span className="text-sm font-semibold text-snow">Computing & Full Stack Web Development</span>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>

          {/* GitHub Stats Snapshot */}
          <FadeInOnScroll delay={0.4} className="mt-8">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-navy/50 to-night/80 border border-deep/70 backdrop-blur-md">
              <span className="text-xs uppercase tracking-wider text-mist/70 block mb-3 font-semibold">
                Statistik GitHub @{profile.githubUsername}
              </span>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-navy/40 border border-deep/40">
                  <BookOpen className="w-4 h-4 mx-auto text-sky mb-1" />
                  <span className="text-xl font-bold text-snow">
                    {stats ? stats.public_repos : "..."}
                  </span>
                  <span className="text-[11px] text-mist/70 block">Repository</span>
                </div>
                <div className="p-2.5 rounded-xl bg-navy/40 border border-deep/40">
                  <Users className="w-4 h-4 mx-auto text-sky mb-1" />
                  <span className="text-xl font-bold text-snow">
                    {stats ? stats.followers : "..."}
                  </span>
                  <span className="text-[11px] text-mist/70 block">Followers</span>
                </div>
                <div className="p-2.5 rounded-xl bg-navy/40 border border-deep/40">
                  <GitFork className="w-4 h-4 mx-auto text-sky mb-1" />
                  <span className="text-xl font-bold text-snow">
                    {stats ? stats.following : "..."}
                  </span>
                  <span className="text-[11px] text-mist/70 block">Following</span>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Right Column: Bio Paragraphs with Fill on Scroll effect */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-8 text-base md:text-lg">
          {profile.bio.map((paragraph, idx) => (
            <div key={idx} className="relative p-6 md:p-8 rounded-2xl bg-navy/20 border border-deep/40 backdrop-blur-sm">
              <TextFillOnScroll className="font-normal text-mist">
                {paragraph}
              </TextFillOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
