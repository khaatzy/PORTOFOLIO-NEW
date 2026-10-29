"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 6;
  const count = isMobile ? 350 : 1200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Color choices: royal blue (#1E5EFF), sky blue (#4DA3FF), deep blue (#10275E)
    const colorChoices = [
      new THREE.Color("#1E5EFF"),
      new THREE.Color("#4DA3FF"),
      new THREE.Color("#10275E"),
      new THREE.Color("#EAF0FF"),
    ];

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);

      pos[i * 3 + 0] = (r1 - 0.5) * 16;
      pos[i * 3 + 1] = (r2 - 0.5) * 16;
      pos[i * 3 + 2] = (r3 - 0.5) * 10 - 2;

      const colorIndex = Math.floor(pseudoRandom(i * 7 + 5) * colorChoices.length);
      const chosenColor = colorChoices[colorIndex % colorChoices.length];

      col[i * 3 + 0] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  const scrollOffset = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollOffset.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow rotation & floating
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;

      // React subtly to vertical scroll
      const targetY = scrollOffset.current * 3;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
