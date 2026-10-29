"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const CHARS = "!<>-_\/[]{}—=+*^?#_0123456789";

export function TextScramble({
  text,
  className = "",
  delay = 300,
  speed = 35,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let iteration = 0;
    let interval: NodeJS.Timeout | null = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (interval) clearInterval(interval);
        }
        iteration += 1 / 3;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, speed, prefersReducedMotion]);

  return <span className={className}>{prefersReducedMotion ? text : displayText}</span>;
}
