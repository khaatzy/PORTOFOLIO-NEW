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

    // Subtle wave distortion based on mouse and time
    float dist = distance(uv, uMouse * 0.5 + 0.5);
    float wave = sin(uv.y * 8.0 + uTime * 1.2) * cos(uv.x * 8.0 + uTime) * 0.04;
    float mouseWave = sin(dist * 10.0 - uTime * 2.0) * exp(-dist * 3.0) * 0.08;

    pos.z += (wave + mouseWave) * (1.0 - uProgress * 0.7);

    // Scale outward as user scrolls
    pos.xy *= 1.0 + uProgress * 0.25;

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

    // Convert to grayscale
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

    // Duotone color grading (ink -> navy -> royal blue -> sky blue)
    vec3 colDark = vec3(0.0, 0.0, 0.0);
    vec3 colNavy = vec3(0.039, 0.102, 0.247); // #0A1A3F
    vec3 colRoyal = vec3(0.118, 0.369, 1.0);   // #1E5EFF
    vec3 colSky = vec3(0.302, 0.639, 1.0);     // #4DA3FF

    vec3 tone;
    if (gray < 0.4) {
      tone = mix(colDark, colNavy, gray / 0.4);
    } else if (gray < 0.8) {
      tone = mix(colNavy, colRoyal, (gray - 0.4) / 0.4);
    } else {
      tone = mix(colRoyal, colSky, (gray - 0.8) / 0.2);
    }

    // Blend a bit of original detail for realism
    vec3 finalColor = mix(tone, tex.rgb * vec3(0.4, 0.7, 1.2), 0.35);

    // Soft vignette around edges
    float distFromCenter = distance(vUv, vec2(0.5, 0.5));
    float vignette = smoothstep(0.7, 0.2, distFromCenter);

    // Fade on the bottom and left edges to blend into dark website text area
    float edgeFadeX = smoothstep(0.0, 0.25, vUv.x);
    float edgeFadeY = smoothstep(0.0, 0.3, vUv.y);
    float edgeAlpha = edgeFadeX * edgeFadeY * vignette;

    // Dissolve / fade on scroll
    float alpha = (1.0 - uProgress * 0.75) * edgeAlpha;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function PhotoPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const texture = useTexture("/images/profile.jpg");

  const isDesktop = viewport.width > 6;
  const planeWidth = isDesktop ? 3.4 : Math.min(viewport.width * 0.85, 3.2);
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
          // Normalize progress so Hero fades out smoothly over the first 1.5 viewports
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

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smooth mouse lerp
      const currentMouse = materialRef.current.uniforms.uMouse.value;
      currentMouse.x += (mouseTarget.current.x - currentMouse.x) * 0.05;
      currentMouse.y += (mouseTarget.current.y - currentMouse.y) * 0.05;
    }
  });

  // Desktop: position slightly to the right so left side holds headline text
  const posX = isDesktop ? Math.min(viewport.width * 0.22, 2.0) : 0;
  const posY = isDesktop ? 0 : 0.2;

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
