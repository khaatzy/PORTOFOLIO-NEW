"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrambleRotatingWordsProps {
  words: readonly string[] | string[];
  intervalMs?: number;
  className?: string;
  speed?: number;
}

// Fixed-width characters to guarantee zero horizontal width jitter during scramble
const CHARS = "0123456789ABCDEF!#$*+?@%&";

export function ScrambleRotatingWords({
  words,
  intervalMs = 3800,
  className = "",
  speed = 28,
}: ScrambleRotatingWordsProps) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const prefersReducedMotion = useReducedMotion();
  const currentWord = words[index];

  // Scramble decrypt effect on word change
  useEffect(() => {
    if (prefersReducedMotion) return;

    let iteration = 0;
    const target = currentWord;
    const len = target.length;
    let interval: NodeJS.Timeout | null = null;

    interval = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) {
              return target[i];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= len) {
        if (interval) clearInterval(interval);
      }
      iteration += 1 / 2.2;
    }, speed);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentWord, speed, prefersReducedMotion]);

  // Rotate word index
  useEffect(() => {
    if (words.length <= 1 || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [words.length, intervalMs, prefersReducedMotion]);

  return (
    <span className={`inline-block whitespace-nowrap font-mono tabular-nums tracking-wide ${className}`}>
      {prefersReducedMotion ? currentWord : displayText}
    </span>
  );
}
