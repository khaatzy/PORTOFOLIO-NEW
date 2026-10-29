"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingMesh } from "./FloatingMesh";
import { Particles } from "./Particles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function FallbackStaticBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-ink">
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-royal/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[350px] h-[350px] bg-navy/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink pointer-events-none" />
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#4DA3FF" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#1E5EFF" />
        <Suspense fallback={null}>
          <FloatingMesh />
          <Particles />
        </Suspense>
      </Canvas>

      {/* Atmospheric blue glow in background */}
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-royal/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[350px] h-[350px] bg-navy/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Top and Bottom Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink pointer-events-none" />
    </div>
  );
}
