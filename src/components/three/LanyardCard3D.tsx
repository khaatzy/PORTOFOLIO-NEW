"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function createBadgeTexture(imageSrc: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      resolve(new THREE.CanvasTexture(canvas));
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      renderBadge(ctx, canvas, img);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      resolve(texture);
    };

    img.onerror = () => {
      renderBadge(ctx, canvas, null);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      resolve(texture);
    };
  });
}

function renderBadge(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement | null
) {
  const w = canvas.width;
  const h = canvas.height;

  // Background deep cosmic navy/black
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#060D24");
  grad.addColorStop(0.4, "#0A173B");
  grad.addColorStop(1, "#020617");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // High-tech subtle background grid
  ctx.strokeStyle = "rgba(37, 99, 235, 0.16)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 36) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Cyan and blue decorative outer border
  ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
  ctx.lineWidth = 3;
  ctx.strokeRect(22, 22, w - 44, h - 44);

  // Top Punch Slot Area (for lanyard clip)
  ctx.fillStyle = "rgba(2, 6, 23, 0.95)";
  ctx.beginPath();
  ctx.roundRect(w / 2 - 48, 32, 96, 20, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header Title
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 20px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillText("DEV PASS // 2026", w / 2, 90);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 42px sans-serif";
  ctx.fillText("DEVELOPER", w / 2, 140);

  // Photo Frame
  const photoW = 480;
  const photoH = 510;
  const photoX = (w - photoW) / 2;
  const photoY = 168;

  ctx.fillStyle = "#020617";
  ctx.fillRect(photoX, photoY, photoW, photoH);

  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();
    const imgAspect = img.width / img.height;
    const boxAspect = photoW / photoH;
    let dw, dh, dx, dy;
    if (imgAspect > boxAspect) {
      dh = photoH;
      dw = photoH * imgAspect;
      dx = photoX + (photoW - dw) / 2;
      dy = photoY;
    } else {
      dw = photoW;
      dh = photoW / imgAspect;
      dx = photoX;
      dy = photoY + (photoH - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  // Photo bottom shadow gradient
  const photoGrad = ctx.createLinearGradient(0, photoY + photoH - 140, 0, photoY + photoH);
  photoGrad.addColorStop(0, "rgba(6, 13, 36, 0)");
  photoGrad.addColorStop(1, "rgba(6, 13, 36, 0.95)");
  ctx.fillStyle = photoGrad;
  ctx.fillRect(photoX, photoY + photoH - 140, photoW, 140);

  // Photo border
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 3.5;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  // Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 34px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ARKHANZA A.Z.S.", w / 2, 730);

  // Role & School
  ctx.fillStyle = "#38BDF8";
  ctx.font = "700 20px 'Courier New', monospace";
  ctx.fillText("FULL STACK WEB DEVELOPER", w / 2, 772);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "bold 19px sans-serif";
  ctx.fillText("SMPN 9 PROBOLINGGO", w / 2, 808);

  // Decorative divider line
  ctx.strokeStyle = "rgba(37, 99, 235, 0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(photoX + 10, 836);
  ctx.lineTo(photoX + photoW - 10, 836);
  ctx.stroke();

  // Barcode Mockup
  ctx.fillStyle = "#F8FAFC";
  const barY = 862;
  const barH = 54;
  let curX = photoX + 24;
  const barWidths = [3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 4, 2, 4, 1, 3, 2];
  for (let i = 0; i < barWidths.length; i++) {
    const bw = barWidths[i] * 2.3;
    if (i % 2 === 0) {
      ctx.fillRect(curX, barY, bw, barH);
    }
    curX += bw + 3.2;
    if (curX > photoX + photoW - 30) break;
  }

  // Barcode Number
  ctx.fillStyle = "#94A3B8";
  ctx.font = "14px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillText("ID: 2026-990-AKZ // OFFICIAL PASS", w / 2, 946);

  // Holographic chip graphic on bottom left
  ctx.fillStyle = "#1E40AF";
  ctx.fillRect(photoX + 24, 972, 64, 44);
  ctx.strokeStyle = "#38BDF8";
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX + 24, 972, 64, 44);
  ctx.fillStyle = "#E0F2FE";
  ctx.font = "bold 12px 'Courier New', monospace";
  ctx.fillText("CHIP", photoX + 56, 999);

  // Verified Badge on bottom right
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("VERIFIED CREATOR ✓", photoX + photoW - 24, 999);
}

function createStrapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0A122A";
    ctx.fillRect(0, 0, 128, 1024);

    // Blue side stitch lines
    ctx.strokeStyle = "#2563EB";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 0, 124, 1024);

    // Repeated typography on strap
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 20px 'Courier New', monospace";
    ctx.textAlign = "center";

    for (let y = 60; y < 1024; y += 130) {
      ctx.save();
      ctx.translate(64, y);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("ARKHANZA • DEV", 0, 0);
      ctx.restore();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  return texture;
}

function BadgeScene() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const cardGroupRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Physics state for pendulum sway & interactive drag
  const physics = useRef({
    angleZ: -0.12,
    velZ: 0,
    angleX: 0,
    velX: 0,
    angleY: 0,
    velY: 0,
    targetAngleZ: -0.1,
    isDragging: false,
    lastPointerX: 0,
    lastPointerY: 0,
  });

  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    createBadgeTexture("/images/profile-uniform.jpg").then(setTexture);
  }, []);

  const strapTexture = useMemo(() => createStrapTexture(), []);

  // Responsive scale & anchor
  const isMobile = viewport.width < 6;
  const cardScale = isMobile ? 0.75 : 1.0;
  const anchorY = 3.6;
  const anchorX = isMobile ? 0.4 : 1.2;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };

      if (!physics.current.isDragging) {
        // Gravitational reaction towards cursor
        physics.current.targetAngleZ = x * -0.25 - 0.08;
      }
    };

    const handlePointerUpGlobal = () => {
      if (physics.current.isDragging) {
        physics.current.isDragging = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUpGlobal);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
    };
  }, []);

  // Pointer interaction on 3D Card
  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    physics.current.isDragging = true;
    physics.current.lastPointerX = e.point.x;
    physics.current.lastPointerY = e.point.y;
  }, []);

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!physics.current.isDragging) return;
    e.stopPropagation();
    const deltaX = e.point.x - physics.current.lastPointerX;
    const deltaY = e.point.y - physics.current.lastPointerY;
    physics.current.lastPointerX = e.point.x;
    physics.current.lastPointerY = e.point.y;

    // Direct influence on angles
    physics.current.angleZ += deltaX * 0.45;
    physics.current.angleY += deltaX * 0.6;
    physics.current.angleX -= deltaY * 0.5;
    physics.current.velZ = deltaX * 8;
  }, []);

  const handlePointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    physics.current.isDragging = false;
  }, []);

  useFrame((state, delta) => {
    if (!cardGroupRef.current) return;

    const p = physics.current;

    if (prefersReducedMotion) {
      cardGroupRef.current.rotation.z = -0.12;
      cardGroupRef.current.rotation.y = 0.08;
      return;
    }

    const dt = Math.min(delta, 0.1); // clamp delta to prevent physics explosion

    if (p.isDragging) {
      // Clamp rotation while dragging
      p.angleZ = Math.max(-0.6, Math.min(0.6, p.angleZ));
      p.angleX = Math.max(-0.4, Math.min(0.4, p.angleX));
      p.angleY = Math.max(-0.6, Math.min(0.6, p.angleY));
    } else {
      // Natural pendulum spring-damper physics
      const springK = 7.5;
      const damping = 3.2;

      // Ambient sway
      const ambientSway = Math.sin(state.clock.elapsedTime * 1.5) * 0.045;
      const desiredZ = p.targetAngleZ + ambientSway;

      const forceZ = (desiredZ - p.angleZ) * springK;
      p.velZ += forceZ * dt;
      p.velZ -= p.velZ * damping * dt;
      p.angleZ += p.velZ * dt;

      // Mouse tilt on X and Y
      const desiredX = mousePos.current.y * 0.18;
      const forceX = (desiredX - p.angleX) * springK;
      p.velX += forceX * dt;
      p.velX -= p.velX * damping * dt;
      p.angleX += p.velX * dt;

      const desiredY = mousePos.current.x * 0.28;
      const forceY = (desiredY - p.angleY) * springK;
      p.velY += forceY * dt;
      p.velY -= p.velY * damping * dt;
      p.angleY += p.velY * dt;
    }

    // Apply rotations
    cardGroupRef.current.rotation.z = p.angleZ;
    cardGroupRef.current.rotation.x = p.angleX;
    cardGroupRef.current.rotation.y = p.angleY;
  });

  const cardW = 2.4;
  const cardH = 3.6;

  return (
    <group position={[isMobile ? 0 : 0.6, -0.2, 0]} scale={cardScale}>
      {/* Upper Lanyard Strap hanging down from top right */}
      <mesh position={[anchorX * 0.45, anchorY * 0.5 + 0.65, -0.08]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.07, 0.07, anchorY, 16]} />
        <meshStandardMaterial
          map={strapTexture}
          color="#0B132B"
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Swinging Badge Assembly */}
      <group
        ref={cardGroupRef}
        position={[0, 0.6, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Metal Swivel Clasp / Clip Ring */}
        <mesh position={[0, cardH * 0.5 + 0.16, 0]}>
          <torusGeometry args={[0.15, 0.038, 16, 32]} />
          <meshStandardMaterial
            color="#A0AEC0"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, cardH * 0.5 + 0.35, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.24, 16]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        {/* Outer Clear Plastic Pouch (Glossy Acrylic / PVC) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[cardW + 0.16, cardH + 0.3, 0.04]} />
          <meshPhysicalMaterial
            color="#38BDF8"
            transmission={0.85}
            opacity={0.35}
            transparent={true}
            roughness={0.12}
            ior={1.4}
            reflectivity={0.65}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Printed Card Badge Front */}
        {texture && (
          <mesh position={[0, -0.05, 0.025]}>
            <planeGeometry args={[cardW, cardH]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.32}
              metalness={0.12}
            />
          </mesh>
        )}

        {/* Card Badge Back */}
        <mesh position={[0, -0.05, -0.025]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[cardW, cardH]} />
          <meshStandardMaterial
            color="#050B1C"
            roughness={0.45}
            metalness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

export function LanyardCard3D() {
  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] flex items-center justify-center pointer-events-auto select-none">
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[460px] h-[340px] md:h-[460px] bg-royal/25 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 5]} intensity={1.6} color="#FFFFFF" />
        <pointLight position={[-4, 2, 3]} intensity={0.85} color="#38BDF8" />
        <pointLight position={[3, -3, 2]} intensity={0.7} color="#2563EB" />
        <BadgeScene />
      </Canvas>
    </div>
  );
}
