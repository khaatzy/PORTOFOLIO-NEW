"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 350);
          return 100;
        }
        // Accelerate as it nears 100
        const step = Math.max(1, Math.floor((100 - prev) * 0.15));
        return Math.min(100, prev + step);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion || isFinished) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        exit={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%)",
          transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] },
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink text-snow select-none"
      >
        {/* Subtle glowing orb */}
        <div className="absolute w-72 h-72 rounded-full bg-royal/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <span className="text-xs uppercase tracking-[0.35em] text-mist/70">
            Initializing Portfolio
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-snow via-sky to-royal">
            {profile.shortName}
          </h1>

          <div className="flex items-baseline gap-2 mt-4 font-mono">
            <span className="text-4xl md:text-6xl font-light text-snow">
              {count.toString().padStart(3, "0")}
            </span>
            <span className="text-sm text-royal">%</span>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-navy/80 rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-gradient-to-r from-royal to-sky"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
