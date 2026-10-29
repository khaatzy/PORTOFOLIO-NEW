"use client";

import React from "react";
import { profile } from "@/data/profile";
import { ProjectCard, type GitHubRepoItem } from "@/components/ui/ProjectCard";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { Button } from "@/components/ui/Button";
import { SiGithub } from "react-icons/si";
import { ArrowRight } from "lucide-react";

interface GithubProjectsProps {
  repos: GitHubRepoItem[];
}

export function GithubProjects({ repos }: GithubProjectsProps) {
  return (
    <section
      id="github-projects"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-deep/40"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal mb-3 inline-block">
            Open Source & Kode
          </span>
          <SplitReveal
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-snow tracking-tight"
          >
            Project di GitHub
          </SplitReveal>
          <p className="text-mist text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            Eksplorasi kode sumber dan proyek yang sedang aktif dikembangkan. Data disinkronkan langsung dari profil GitHub @{profile.githubUsername}.
          </p>
        </div>

        <Button
          variant="outline"
          href={`https://github.com/${profile.githubUsername}?tab=repositories`}
          external
          icon={<ArrowRight className="w-4 h-4" />}
          className="self-start md:self-end text-xs"
        >
          Lihat Semua Repository
        </Button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, idx) => (
          <FadeInOnScroll
            key={repo.id}
            delay={idx * 0.08}
            className={repo.isFeatured ? "md:col-span-2" : ""}
          >
            <ProjectCard repo={repo} featured={repo.isFeatured} />
          </FadeInOnScroll>
        ))}
      </div>

      {/* Bottom Large CTA Banner */}
      <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-navy/50 via-deep/40 to-navy/50 border border-royal/40 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-royal/20 border border-royal flex items-center justify-center text-sky text-2xl">
            <SiGithub />
          </div>
          <div>
            <h4 className="text-lg font-bold text-snow">
              Ingin melihat lebih banyak kode?
            </h4>
            <p className="text-xs text-mist mt-0.5">
              Jelajahi seluruh kontribusi, commits, dan repository publik di profil GitHub saya.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          href={`https://github.com/${profile.githubUsername}?tab=repositories`}
          external
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Lihat Semua Repository di GitHub
        </Button>
      </div>
    </section>
  );
}
