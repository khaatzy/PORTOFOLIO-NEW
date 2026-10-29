"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface FadeInOnScrollProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}

export function FadeInOnScroll({
  children,
  direction = "up",
  delay = 0,
  distance = 35,
  duration = 0.8,
  className = "",
}: FadeInOnScrollProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !elRef.current) return;

    let x = 0;
    let y = 0;

    if (direction === "up") y = distance;
    if (direction === "down") y = -distance;
    if (direction === "left") x = distance;
    if (direction === "right") x = -distance;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elRef.current,
        {
          opacity: 0,
          x,
          y,
          scale: 0.97,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, elRef);

    return () => {
      ctx.revert();
    };
  }, [direction, delay, distance, duration, prefersReducedMotion]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
