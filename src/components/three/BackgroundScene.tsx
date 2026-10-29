"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { PhotoPlane } from "./PhotoPlane";
import { Particles } from "./Particles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function FallbackStaticBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-ink">
      <div className="absolute right-0 top-0 w-full md:w-3/5 h-full opacity-35 mix-blend-luminosity">
        <Image
          src="/images/profile.jpg"
          alt="Arkhanza Background"
          fill
          priority
          className="object-cover object-top filter contrast-125"
          sizes="100vw"
        />
      </div>
      {/* Duotone Blue Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-navy/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
    </div>
  );
}

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

export default function BackgroundScene() {
  const prefersReducedMotion = useReducedMotion();
  const hasWebGL = useSyncExternalStore(noopSubscribe, checkWebGL, () => false);

  if (prefersReducedMotion || !hasWebGL) {
    return <FallbackStaticBackground />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-ink">
      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <PhotoPlane />
          <Particles />
        </Suspense>
      </Canvas>

      {/* Atmospheric blue glow in background */}
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-royal/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[350px] h-[350px] bg-navy/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Top and Bottom Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />
    </div>
  );
}
