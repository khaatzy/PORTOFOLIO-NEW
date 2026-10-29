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

  // Background deep cosmic dark navy
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#050C24");
  grad.addColorStop(0.5, "#09173D");
  grad.addColorStop(1, "#020617");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // High-tech subtle background grid
  ctx.strokeStyle = "rgba(37, 99, 235, 0.18)";
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
  ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
  ctx.lineWidth = 3;
  ctx.strokeRect(22, 22, w - 44, h - 44);

  // Top Punch Slot Hole (where clip passes through)
  ctx.fillStyle = "rgba(2, 6, 23, 0.95)";
  ctx.beginPath();
  ctx.roundRect(w / 2 - 48, 30, 96, 22, 11);
  ctx.fill();
  ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header Title
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 20px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillText("DEV PASS // 2026", w / 2, 88);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 42px sans-serif";
  ctx.fillText("DEVELOPER", w / 2, 138);

  // Photo Frame
  const photoW = 500;
  const photoH = 530;
  const photoX = (w - photoW) / 2;
  const photoY = 162;

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

  // Thin clean border around photo
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 3;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  // Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 34px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ARKHANZA A.Z.S.", w / 2, 742);

  // Role & School
  ctx.fillStyle = "#38BDF8";
  ctx.font = "700 20px 'Courier New', monospace";
  ctx.fillText("FULL STACK WEB DEVELOPER", w / 2, 784);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "bold 19px sans-serif";
  ctx.fillText("SMPN 9 PROBOLINGGO", w / 2, 818);

  // Decorative divider line
  ctx.strokeStyle = "rgba(37, 99, 235, 0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(photoX + 10, 846);
  ctx.lineTo(photoX + photoW - 10, 846);
  ctx.stroke();

  // Barcode Mockup
  ctx.fillStyle = "#F8FAFC";
  const barY = 872;
  const barH = 54;
  let curX = photoX + 24;
  const barWidths = [3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 4, 2, 4, 1, 3, 2];
  for (let i = 0; i < barWidths.length; i++) {
    const bw = barWidths[i] * 2.4;
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
  ctx.fillText("ID: 2026-990-AKZ // OFFICIAL PASS", w / 2, 954);

  // Holographic chip graphic on bottom left
  ctx.fillStyle = "#1E40AF";
  ctx.fillRect(photoX + 24, 980, 64, 44);
  ctx.strokeStyle = "#38BDF8";
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX + 24, 980, 64, 44);
  ctx.fillStyle = "#E0F2FE";
  ctx.font = "bold 12px 'Courier New', monospace";
  ctx.fillText("CHIP", photoX + 56, 1007);

  // Verified Badge on bottom right
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("VERIFIED CREATOR ✓", photoX + photoW - 24, 1007);
}

function createStrapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Dark navy woven ribbon fabric
    ctx.fillStyle = "#081028";
    ctx.fillRect(0, 0, 128, 1024);

    // Cyan & blue side stitch borders
    ctx.strokeStyle = "#2563EB";
    ctx.lineWidth = 5;
    ctx.strokeRect(3, 0, 122, 1024);

    // Cyan inner accent stitch
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 0, 108, 1024);

    // Repeated typography on strap
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 19px 'Courier New', monospace";
    ctx.textAlign = "center";

    for (let y = 60; y < 1024; y += 140) {
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

  // Refs for hierarchical 3D components
  const pivotGroupRef = useRef<THREE.Group>(null);
  const swingGroupRef = useRef<THREE.Group>(null);
  const cardGroupRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Entrance drop animation state (falls down from above when loading page)
  const dropState = useRef({
    active: true,
    y: 6.5,          // Starts high above viewport edge
    vy: 0.0,         // Vertical velocity
    gravity: 36.0,   // Rapid, punchy gravitational pull
    springK: 90.0,   // Snappy elastic spring catch
    damping: 10.0,   // Damping to settle quickly
    hitBottom: false,
  });

  // Pendulum sway & drag physics
  const physics = useRef({
    angleZ: 0.0,
    velZ: 0.0,
    angleX: 0.0,
    velX: 0.0,
    angleY: 0.0,
    velY: 0.0,
    targetAngleZ: -0.06,
    isDragging: false,
    lastPointerX: 0,
    lastPointerY: 0,
  });

  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Load the cropped passport portrait photo
    createBadgeTexture("/images/profile-id.jpg").then(setTexture);
  }, []);

  const strapTexture = useMemo(() => createStrapTexture(), []);

  // Dimensions
  const isMobile = viewport.width < 6;
  const cardScale = isMobile ? 0.78 : 0.98;
  const cardW = 2.3;
  const cardH = 3.45;
  const strapLength = 1.45;
  const basePivotY = isMobile ? 2.9 : 3.3;
  const pivotX = isMobile ? 0.0 : 0.5;

  // Wobble trigger on touch / click / hover
  const triggerWobble = useCallback((intensity = 1.0) => {
    const dir = Math.random() > 0.5 ? 1 : -1;
    physics.current.velZ += dir * (3.8 + Math.random() * 2.2) * intensity;
    physics.current.velX += (Math.random() - 0.5) * 2.8 * intensity;
    physics.current.velY += (Math.random() - 0.5) * 3.8 * intensity;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };

      if (!physics.current.isDragging) {
        // Gravitational reaction towards cursor
        physics.current.targetAngleZ = x * -0.22 - 0.05;
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

  // Pointer interactions on the card
  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    physics.current.isDragging = true;
    physics.current.lastPointerX = e.point.x;
    physics.current.lastPointerY = e.point.y;
    triggerWobble(0.8);
  }, [triggerWobble]);

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!physics.current.isDragging) return;
    e.stopPropagation();
    const deltaX = e.point.x - physics.current.lastPointerX;
    const deltaY = e.point.y - physics.current.lastPointerY;
    physics.current.lastPointerX = e.point.x;
    physics.current.lastPointerY = e.point.y;

    // Follow drag directly
    physics.current.angleZ += deltaX * 0.45;
    physics.current.angleY += deltaX * 0.55;
    physics.current.angleX -= deltaY * 0.45;
    physics.current.velZ = deltaX * 10;
  }, []);

  const handlePointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    physics.current.isDragging = false;
  }, []);

  const handlePointerEnter = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Wobble dynamically when touched/hovered!
    triggerWobble(0.7);
  }, [triggerWobble]);

  useFrame((state, delta) => {
    if (!pivotGroupRef.current || !swingGroupRef.current || !cardGroupRef.current) return;

    const dt = Math.min(delta, 0.05); // Clamp dt to prevent physics tunneling
    const drop = dropState.current;
    const p = physics.current;

    if (prefersReducedMotion) {
      pivotGroupRef.current.position.y = basePivotY;
      swingGroupRef.current.rotation.z = -0.1;
      return;
    }

    // 1. Entrance Drop-In Animation (Falls from top of screen on page load)
    if (drop.active) {
      drop.vy -= drop.gravity * dt;
      drop.y += drop.vy * dt;

      // When reaching rest anchor y <= 0, strap engages elastic bounce
      if (drop.y <= 0) {
        const springForce = -drop.y * drop.springK;
        const dampingForce = -drop.vy * drop.damping;
        drop.vy += (springForce + dampingForce) * dt;

        // On first impact with the strap: trigger natural pendulum swing!
        if (!drop.hitBottom) {
          drop.hitBottom = true;
          p.velZ = -6.2; // Strong initial swing impulse
          p.velX = 2.4;  // Forward flip
          p.velY = 3.2;  // 3D twist
        }

        if (Math.abs(drop.y) < 0.015 && Math.abs(drop.vy) < 0.08) {
          drop.y = 0;
          drop.vy = 0;
          drop.active = false;
        }
      }
    }

    pivotGroupRef.current.position.y = basePivotY + drop.y;

    // 2. Pendulum Swing & Wobble Physics
    if (p.isDragging) {
      p.angleZ = Math.max(-0.65, Math.min(0.65, p.angleZ));
      p.angleX = Math.max(-0.45, Math.min(0.45, p.angleX));
      p.angleY = Math.max(-0.65, Math.min(0.65, p.angleY));
    } else {
      const springK = 7.0;
      const damping = 3.0;

      // Ambient gentle sway when idle
      const ambientSway = Math.sin(state.clock.elapsedTime * 1.6) * 0.04;
      const desiredZ = p.targetAngleZ + ambientSway;

      const forceZ = (desiredZ - p.angleZ) * springK;
      p.velZ += forceZ * dt;
      p.velZ -= p.velZ * damping * dt;
      p.angleZ += p.velZ * dt;

      // Mouse tilt reaction
      const desiredX = mousePos.current.y * 0.16;
      const forceX = (desiredX - p.angleX) * springK;
      p.velX += forceX * dt;
      p.velX -= p.velX * damping * dt;
      p.angleX += p.velX * dt;

      const desiredY = mousePos.current.x * 0.26;
      const forceY = (desiredY - p.angleY) * springK;
      p.velY += forceY * dt;
      p.velY -= p.velY * damping * dt;
      p.angleY += p.velY * dt;
    }

    // Apply main pendulum swing to the whole strap + card assembly
    swingGroupRef.current.rotation.z = p.angleZ;
    swingGroupRef.current.rotation.x = p.angleX;
    swingGroupRef.current.rotation.y = p.angleY;

    // Subtle secondary wobble on card itself relative to strap
    cardGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2.2) * 0.02 + p.velZ * 0.02;
  });

  return (
    <group
      ref={pivotGroupRef}
      position={[pivotX, basePivotY, 0]}
      scale={cardScale}
    >
      {/* Pendulum assembly: swings around the top pivot */}
      <group ref={swingGroupRef}>
        {/* Upper Anchor Ring at top edge of screen */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.09, 0.022, 16, 24]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Lanyard Flat Ribbon Strap: hanging straight down from pivot (0,0,0) to clasp */}
        <mesh position={[0, -strapLength / 2, 0]}>
          <boxGeometry args={[0.22, strapLength, 0.015]} />
          <meshStandardMaterial
            map={strapTexture}
            color="#0F172A"
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Metal Swivel Clasp Assembly connecting strap to badge */}
        <group position={[0, -strapLength, 0]}>
          {/* Top Swivel Ring holding bottom of ribbon */}
          <mesh position={[0, -0.04, 0]}>
            <torusGeometry args={[0.13, 0.028, 16, 24]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Swivel metal cylinder body */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.16, 16]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.92} roughness={0.15} />
          </mesh>
          {/* Snap hook / clip looping into top punch slot of badge */}
          <mesh position={[0, -0.28, 0]}>
            <torusGeometry args={[0.12, 0.03, 16, 24]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* ID Card Badge Assembly: Hanging directly below the clip */}
        <group
          ref={cardGroupRef}
          position={[0, -strapLength - 0.28 - cardH / 2, 0]}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerEnter={handlePointerEnter}
        >
          {/* Outer Clear Plastic Pouch (Glossy Acrylic / PVC) */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[cardW + 0.16, cardH + 0.26, 0.04]} />
            <meshPhysicalMaterial
              color="#38BDF8"
              transmission={0.88}
              opacity={0.35}
              transparent={true}
              roughness={0.1}
              ior={1.4}
              reflectivity={0.7}
              clearcoat={1.0}
              clearcoatRoughness={0.06}
            />
          </mesh>

          {/* Printed Card Badge Front */}
          {texture && (
            <mesh position={[0, 0, 0.025]}>
              <planeGeometry args={[cardW, cardH]} />
              <meshStandardMaterial
                map={texture}
                roughness={0.3}
                metalness={0.08}
              />
            </mesh>
          )}

          {/* Card Badge Back */}
          <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[cardW, cardH]} />
            <meshStandardMaterial
              color="#04091A"
              roughness={0.45}
              metalness={0.2}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function LanyardCard3D() {
  return (
    <div className="relative w-full h-[540px] md:h-[640px] lg:h-[720px] flex items-center justify-center pointer-events-auto select-none">
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[460px] h-[340px] md:h-[460px] bg-royal/25 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 8, 5]} intensity={1.7} color="#FFFFFF" />
        <pointLight position={[-4, 2, 3]} intensity={0.9} color="#38BDF8" />
        <pointLight position={[3, -3, 2]} intensity={0.75} color="#2563EB" />
        <BadgeScene />
      </Canvas>
    </div>
  );
}
