"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only on desktop and when motion is allowed
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // Touch devices

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, input, textarea, [data-interactive='true'], .cursor-pointer");
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Outer glowing follower */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-150 ease-out will-change-transform ${
          isHovered
            ? "w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-royal/20 border border-sky/70 shadow-[0_0_25px_rgba(77,163,255,0.6)] backdrop-blur-[1px]"
            : "w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-sky/40 bg-royal/5 shadow-[0_0_15px_rgba(30,94,255,0.4)]"
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
      {/* Center pinpoint */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-snow transition-transform duration-75 will-change-transform ${
          isHovered ? "w-2 h-2 opacity-0" : "w-1.5 h-1.5 opacity-90 shadow-[0_0_8px_#4DA3FF]"
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
