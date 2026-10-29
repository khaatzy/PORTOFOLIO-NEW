"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uProgress;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Subtle wave distortion based on mouse
    float dist = distance(uv, uMouse * 0.5 + 0.5);
    float wave = sin(uv.y * 6.0 + uTime * 1.0) * cos(uv.x * 6.0 + uTime * 0.8) * 0.025;
    float mouseWave = sin(dist * 8.0 - uTime * 2.0) * exp(-dist * 2.5) * 0.05;

    pos.z += (wave + mouseWave) * (1.0 - uProgress * 0.7);

    // Scale outward as user scrolls
    pos.xy *= 1.0 + uProgress * 0.2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);

    // Keep natural face clarity and enhance with blue ambiance
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

    // Atmospheric blue tint in darker areas (#10275E to #1E5EFF)
    vec3 blueRim = vec3(0.118, 0.369, 1.0) * pow(gray, 1.5) * 0.35;
    vec3 ambientBlue = vec3(0.04, 0.10, 0.25) * (1.0 - gray) * 0.4;

    vec3 finalColor = tex.rgb * 1.05 + blueRim + ambientBlue;

    // Soft fade only on outer perimeter of the plane
    float distFromCenter = distance(vUv, vec2(0.5, 0.5));
    float vignette = smoothstep(0.9, 0.55, distFromCenter);

    // Dissolve / fade gently on scroll
    float alpha = (1.0 - uProgress * 0.85) * vignette * 0.85;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function PhotoPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const texture = useTexture("/images/profile.jpg");

  const isDesktop = viewport.width > 6;
  const planeWidth = isDesktop ? 3.6 : Math.min(viewport.width * 0.9, 3.4);
  const planeHeight = planeWidth * 1.35; // 3:4 portrait ratio

  const mouseTarget = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uProgress: { value: 0 },
    }),
    [texture]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ScrollTrigger to animate uProgress as user scrolls
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (materialRef.current) {
          const heroProgress = Math.min(1, self.scroll() / (window.innerHeight * 1.5));
          materialRef.current.uniforms.uProgress.value = heroProgress;
        }
      },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trigger.kill();
    };
  }, []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smooth mouse lerp
      const currentMouse = materialRef.current.uniforms.uMouse.value;
      currentMouse.x += (mouseTarget.current.x - currentMouse.x) * 0.05;
      currentMouse.y += (mouseTarget.current.y - currentMouse.y) * 0.05;
    }
  });

  // Desktop: position to the right
  const posX = isDesktop ? Math.min(viewport.width * 0.25, 2.2) : 0;
  const posY = isDesktop ? 0 : 0.1;

  return (
    <mesh ref={meshRef} position={[posX, posY, -0.5]}>
      <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
