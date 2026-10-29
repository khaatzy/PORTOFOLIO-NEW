"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface TextFillOnScrollProps {
  children: string;
  className?: string;
}

export function TextFillOnScroll({
  children,
  className = "",
}: TextFillOnScrollProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".fill-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          color: "#10275E", // --color-deep
          opacity: 0.35,
        },
        {
          color: "#EAF0FF", // --color-snow
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
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
    <p ref={containerRef} className={`leading-relaxed ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="fill-word inline-block mr-[0.3em] transition-colors duration-200"
        >
          {word}
        </span>
      ))}
    </p>
  );
}
