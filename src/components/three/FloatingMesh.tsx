"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trigger.kill();
    };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;

      // Mouse follow with smooth damping
      const targetX = mouseTarget.current.x * 0.8 + 2.2;
      const targetY = mouseTarget.current.y * 0.6 - scrollProgress.current * 4;

      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.04;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.04;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.2;
      innerRef.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group position={[2.2, 0, -1]}>
      {/* Outer Geometric Wireframe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.0, 2]} />
        <meshStandardMaterial
          color="#1E5EFF"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#4DA3FF"
          wireframe
          transparent
          opacity={0.5}
          emissive="#1E5EFF"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}
