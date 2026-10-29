"use client";

import React, { useState, useEffect } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { profile } from "@/data/profile";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#github-projects" },
  { label: "Live", href: "#live-projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -40, duration: 1.2 });
  };

  return (
    <>
      {/* Top Thin Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-royal via-sky to-snow transition-all duration-75 ease-out shadow-[0_0_12px_rgba(77,163,255,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "py-3 bg-ink/75 backdrop-blur-xl border-b border-deep/50 shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-navy/80 border border-deep group-hover:border-royal flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(30,94,255,0.5)]">
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky to-snow">
                A
              </span>
            </div>
            <span className="font-semibold text-sm tracking-tight text-snow group-hover:text-sky transition-colors">
              {profile.shortName}
              <span className="text-royal">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-navy/35 backdrop-blur-md px-4 py-1.5 rounded-full border border-deep/60">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-mist hover:text-snow hover:bg-royal/15 rounded-full transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* GitHub CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-navy/60 hover:bg-royal/20 border border-deep hover:border-royal/60 text-snow transition-all duration-200 group shadow-sm hover:shadow-[0_0_15px_rgba(30,94,255,0.3)]"
            >
              <SiGithub className="text-sm text-mist group-hover:text-snow transition-colors" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-mist group-hover:text-sky group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-navy/50 border border-deep text-snow hover:border-royal transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[60px] bg-ink/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center gap-6 p-8 border-t border-deep/60 md:hidden animate-in fade-in zoom-in-95 duration-200">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xl font-medium text-mist hover:text-sky transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="w-24 h-px bg-deep/60 my-2" />
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-royal text-snow font-medium text-sm shadow-[0_0_20px_rgba(30,94,255,0.4)]"
            >
              <SiGithub />
              <span>Kunjungi GitHub @{profile.githubUsername}</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
