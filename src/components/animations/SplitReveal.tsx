"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function SplitReveal({
  children,
  className = "",
  tag: Tag = "h2",
}: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".split-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: 40,
          opacity: 0,
          rotateX: -40,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={`perspective-1000 ${className}`}>
      <Tag className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <span className="split-word inline-block transform-gpu will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
