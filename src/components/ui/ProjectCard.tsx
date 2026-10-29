"use client";

import React, { useRef, useState } from "react";
import { Star, GitFork, ExternalLink, ShieldCheck, QrCode } from "lucide-react";
import { SiGithub } from "react-icons/si";

export interface GitHubRepoItem {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  isFeatured?: boolean;
}

interface ProjectCardProps {
  repo: GitHubRepoItem;
  featured?: boolean;
}

export function ProjectCard({ repo, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Tilt calculation (-6 to 6 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  };

  const isAbsen = repo.name.toLowerCase().includes("absen");

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative h-full w-full rounded-2xl p-6 md:p-8 transition-transform duration-200 ease-out flex flex-col justify-between overflow-hidden bg-navy/30 backdrop-blur-md border ${
        featured
          ? "md:col-span-2 border-royal/70 shadow-[0_0_35px_rgba(30,94,255,0.25)] bg-gradient-to-br from-navy/60 via-night/90 to-navy/40"
          : "border-deep/60 hover:border-royal/50 hover:shadow-[0_0_25px_rgba(30,94,255,0.15)]"
      }`}
    >
      {/* Spotlight Cursor Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(77, 163, 255, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Top and Middle Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar: Badge & Stats */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            {featured ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-royal/20 border border-royal text-sky shadow-[0_0_15px_rgba(30,94,255,0.5)]">
                ⭐ Featured Project
              </span>
            ) : (
              <span className="text-xs font-medium text-mist/60 uppercase tracking-wider">
                Repository
              </span>
            )}

            {isAbsen && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-navy/80 text-mist border border-deep">
                <ShieldCheck className="w-3 h-3 text-sky" /> Keamanan QR
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-mist/80">
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-snow group-hover:text-sky transition-colors flex items-center gap-2">
          {repo.name}
          {isAbsen && <QrCode className="w-5 h-5 text-sky/70" />}
        </h3>

        {/* Description with Uniform Min-Height */}
        <p className="text-sm text-mist leading-relaxed mt-2.5 line-clamp-3 min-h-[3.8rem]">
          {repo.description ||
            (isAbsen
              ? "Aplikasi absensi digital berbasis QR Code dengan verifikasi berkeamanan tinggi untuk pencatatan kehadiran yang akurat dan real-time."
              : "Project open source oleh Arkhanza Akbar Zakky Siswanto.")}
        </p>

        {/* Topics / Tags with Uniform Min-Height for Grid Alignment */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 min-h-[1.75rem]">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-navy/60 border border-deep text-snow">
              <span className="w-2 h-2 rounded-full bg-royal" />
              {repo.language}
            </span>
          )}
          {repo.topics &&
            repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-xs px-2.5 py-1 rounded-md bg-night/80 border border-deep/50 text-mist"
              >
                #{topic}
              </span>
            ))}
        </div>
      </div>

      {/* Action Buttons: Anchored uniformly at bottom */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-deep/40">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-navy/80 hover:bg-navy border border-deep hover:border-royal text-snow transition-all shadow-sm"
        >
          <SiGithub className="text-sm" />
          <span>View Repo</span>
        </a>

        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-royal/80 hover:bg-royal text-snow transition-all shadow-[0_0_15px_rgba(30,94,255,0.4)]"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
