"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// 1. Front Badge Texture: Clean Polaroid / Minimalist VIP pass aesthetic (matching the video)
function createFrontBadgeTexture(imageSrc: string): Promise<THREE.CanvasTexture> {
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

    const paint = (image: HTMLImageElement | null) => {
      const w = canvas.width;
      const h = canvas.height;

      // Clean off-white premium badge stock
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(0, 0, w, h);

      // Subtle outer border
      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Top Punch Hole Slot
      ctx.fillStyle = "#0F172A";
      ctx.beginPath();
      ctx.roundRect(w / 2 - 36, 18, 72, 16, 8);
      ctx.fill();

      // Inset Portrait Photo Area
      const photoX = 36;
      const photoY = 46;
      const photoW = w - 72; // 648
      const photoH = 890;

      ctx.fillStyle = "#020617";
      ctx.fillRect(photoX, photoY, photoW, photoH);

      if (image) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(photoX, photoY, photoW, photoH);
        ctx.clip();

        // Cover crop
        const imgAspect = image.width / image.height;
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
        ctx.drawImage(image, dx, dy, dw, dh);
        ctx.restore();
      }

      // Thin inner photo border
      ctx.strokeStyle = "rgba(15, 23, 42, 0.15)";
      ctx.lineWidth = 2;
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      // Bottom minimalist credentials strip
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 28px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("ARKHANZA A.Z.S.", photoX + 6, 982);

      ctx.fillStyle = "#64748B";
      ctx.font = "600 18px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText("FULL STACK WEB DEV // SMPN 9 PROBOLINGGO", photoX + 6, 1020);

      // Verification symbol
      ctx.fillStyle = "#2563EB";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("ID PASS ✓", w - photoX - 6, 984);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      resolve(texture);
    };

    img.onload = () => paint(img);
    img.onerror = () => paint(null);
  });
}

// 2. Back Badge Texture: Dark developer identity pass
function createBackBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const w = canvas.width;
    const h = canvas.height;

    // Dark carbon background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#080F26");
    grad.addColorStop(0.5, "#0D183B");
    grad.addColorStop(1, "#030717");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // High tech grid
    ctx.strokeStyle = "rgba(37, 99, 235, 0.15)";
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

    // Top punch slot
    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 36, 18, 72, 16, 8);
    ctx.fill();

    // Outer border
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // Text details
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("DEV PASS // 2026", w / 2, 120);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 48px sans-serif";
    ctx.fillText("ARKHANZA", w / 2, 220);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("CREATIVE WEB DEVELOPER", w / 2, 275);

    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("SMPN 9 PROBOLINGGO", w / 2, 320);

    // Decorative divider
    ctx.strokeStyle = "rgba(37, 99, 235, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 360);
    ctx.lineTo(w - 80, 360);
    ctx.stroke();

    // Barcode mockup
    ctx.fillStyle = "#F8FAFC";
    const barY = 420;
    const barH = 80;
    let curX = 90;
    const barWidths = [3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 4, 2, 4, 1, 3, 2];
    for (let i = 0; i < barWidths.length; i++) {
      const bw = barWidths[i] * 3.2;
      if (i % 2 === 0) {
        ctx.fillRect(curX, barY, bw, barH);
      }
      curX += bw + 4;
      if (curX > w - 100) break;
    }

    ctx.fillStyle = "#94A3B8";
    ctx.font = "16px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("ID: 2026-990-AKZ // OFFICIAL PASS", w / 2, 540);

    // Verified badge
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("VERIFIED PORTFOLIO BADGE ✓", w / 2, 640);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 3. Woven Ribbon Strap Texture with clean vertical typography
function createStrapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0A0D14";
    ctx.fillRect(0, 0, 128, 1024);

    // Blue stitched side borders
    ctx.strokeStyle = "#2563EB";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 0, 124, 1024);

    // Repeated vertical text: "3D CARD" and "ARKHANZA"
    ctx.fillStyle = "#F8FAFC";
    ctx.font = "900 22px sans-serif";
    ctx.textAlign = "center";

    for (let y = 60; y < 1024; y += 140) {
      ctx.save();
      ctx.translate(64, y);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("3D CARD", 0, 0);
      ctx.restore();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  return texture;
}

function CardScene() {
  const [frontTexture, setFrontTexture] = useState<THREE.CanvasTexture | null>(null);
  const backTexture = useMemo(() => createBackBadgeTexture(), []);
  const strapTexture = useMemo(() => createStrapTexture(), []);

  const cardGroupRef = useRef<THREE.Group>(null);
  const strapMeshRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Responsive scale & anchor
  const isMobile = viewport.width < 6;
  const cardScale = isMobile ? 0.78 : 0.98;
  const cardW = 2.45;
  const cardH = 3.65;
  const anchorPos = useMemo(() => new THREE.Vector3(isMobile ? 0 : 0.4, 2.9, 0), [isMobile]);
  const restPos = useMemo(() => new THREE.Vector3(isMobile ? 0 : 0.4, -0.15, 0), [isMobile]);

  // Entrance drop-in state
  const dropState = useRef({
    active: true,
    y: 5.0,
    vy: 0.0,
    gravity: 34.0,
    springK: 85.0,
    damping: 9.5,
  });

  // Dynamic physics state (position, velocity, rotation, angular velocity)
  const physics = useRef({
    pos: new THREE.Vector3(restPos.x, restPos.y + 5.0, restPos.z),
    vel: new THREE.Vector3(0, 0, 0),
    rot: new THREE.Euler(0, 0, 0),
    rotVel: new THREE.Vector3(0, 0, 0),
    targetPos: restPos.clone(),
    isDragging: false,
    dragOffset: new THREE.Vector2(0, 0),
  });

  // Track global pointer coordinates in normalized device coordinates
  const pointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    createFrontBadgeTexture("/images/profile-id.jpg").then(setFrontTexture);
  }, []);

  // Window pointer listeners for smooth dragging outside canvas bounds
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerPos.current = { x, y };

      if (physics.current.isDragging) {
        // Map pointer to 3D plane at z = 0
        const worldX = (x * viewport.width) / 2;
        const worldY = (y * viewport.height) / 2;

        // Clamp drag area
        const clampedX = Math.max(-viewport.width / 2 + 1, Math.min(viewport.width / 2 - 1, worldX - physics.current.dragOffset.x));
        const clampedY = Math.max(-viewport.height / 2 + 0.5, Math.min(anchorPos.y - 0.6, worldY - physics.current.dragOffset.y));

        physics.current.targetPos.set(clampedX, clampedY, 0);
      }
    };

    const handlePointerUp = () => {
      if (physics.current.isDragging) {
        physics.current.isDragging = false;
        physics.current.targetPos.copy(restPos);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [anchorPos.y, restPos, viewport.height, viewport.width]);

  // Pointer Down on the Card Mesh
  const handleCardPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    physics.current.isDragging = true;

    // Calculate drag offset between pointer world pos and current card pos
    const worldX = (e.pointer.x * viewport.width) / 2;
    const worldY = (e.pointer.y * viewport.height) / 2;
    physics.current.dragOffset.set(
      worldX - physics.current.pos.x,
      worldY - physics.current.pos.y
    );
  }, [viewport.height, viewport.width]);

  // Cubic Bezier curve for the dynamic flexible strap
  const strapCurve = useMemo(() => {
    return new THREE.CubicBezierCurve3(
      anchorPos.clone(),
      anchorPos.clone().add(new THREE.Vector3(0, -0.5, 0)),
      restPos.clone().add(new THREE.Vector3(0, 0.5, 0)),
      restPos.clone()
    );
  }, [anchorPos, restPos]);

  useFrame((state, delta) => {
    if (!cardGroupRef.current || !strapMeshRef.current) return;

    const dt = Math.min(delta, 0.05); // prevent tunneling
    const p = physics.current;
    const drop = dropState.current;

    if (prefersReducedMotion) {
      cardGroupRef.current.position.copy(restPos);
      cardGroupRef.current.rotation.set(0, 0, 0);
      return;
    }

    // 1. Drop-In Entrance Animation on initial mount
    if (drop.active) {
      drop.vy -= drop.gravity * dt;
      drop.y += drop.vy * dt;

      if (drop.y <= 0) {
        const springForce = -drop.y * drop.springK;
        const dampingForce = -drop.vy * drop.damping;
        drop.vy += (springForce + dampingForce) * dt;

        if (Math.abs(drop.y) < 0.02 && Math.abs(drop.vy) < 0.1) {
          drop.y = 0;
          drop.vy = 0;
          drop.active = false;
        }
      }
      p.pos.y = restPos.y + drop.y;
    }

    // 2. Interactive Drag vs Spring-Damper Pendulum Physics
    if (p.isDragging) {
      // Follow cursor with smooth responsive lerp
      const lerpSpeed = 0.35;
      const targetX = p.targetPos.x;
      const targetY = p.targetPos.y;

      const vx = (targetX - p.pos.x) * 18;
      const vy = (targetY - p.pos.y) * 18;
      p.vel.set(vx, vy, 0);

      p.pos.x += (targetX - p.pos.x) * lerpSpeed;
      p.pos.y += (targetY - p.pos.y) * lerpSpeed;

      // Realistic 3D tilt while dragging (pitch, yaw, roll)
      const dx = p.pos.x - anchorPos.x;
      const dy = p.pos.y - anchorPos.y;
      const targetRotZ = -dx * 0.22 - p.vel.x * 0.04;
      const targetRotY = -dx * 0.25 - p.vel.x * 0.05;
      const targetRotX = p.vel.y * 0.04 + (dy + 3.0) * 0.08;

      p.rot.z += (targetRotZ - p.rot.z) * 0.25;
      p.rot.y += (targetRotY - p.rot.y) * 0.25;
      p.rot.x += (targetRotX - p.rot.x) * 0.25;
    } else if (!drop.active) {
      // Spring-damper pendulum oscillation toward rest position
      const springK = 26.0;
      const damping = 3.8;

      // Gentle ambient floating breeze sway
      const t = state.clock.elapsedTime;
      const ambientX = Math.sin(t * 1.4) * 0.035;
      const ambientY = Math.cos(t * 1.8) * 0.02;

      const desiredX = restPos.x + ambientX;
      const desiredY = restPos.y + ambientY;

      // Subtle mouse tilt reaction when not dragging
      const mouseTiltX = pointerPos.current.y * 0.12;
      const mouseTiltY = pointerPos.current.x * 0.18;

      // Forces
      const fx = (desiredX - p.pos.x) * springK - p.vel.x * damping;
      const fy = (desiredY - p.pos.y) * springK - p.vel.y * damping;

      p.vel.x += fx * dt;
      p.vel.y += fy * dt;

      p.pos.x += p.vel.x * dt;
      p.pos.y += p.vel.y * dt;

      // Rotations follow velocity and displacement
      const dx = p.pos.x - anchorPos.x;
      const targetRotZ = -dx * 0.18 - p.vel.x * 0.06;
      const targetRotY = -dx * 0.22 - p.vel.x * 0.08 + mouseTiltY;
      const targetRotX = p.vel.y * 0.06 + mouseTiltX;

      p.rot.z += (targetRotZ - p.rot.z) * 0.15;
      p.rot.y += (targetRotY - p.rot.y) * 0.15;
      p.rot.x += (targetRotX - p.rot.x) * 0.15;
    }

    // Apply 3D transform to card
    cardGroupRef.current.position.copy(p.pos);
    cardGroupRef.current.rotation.set(p.rot.x, p.rot.y, p.rot.z);

    // 3. Dynamic Flexible Strap Curve Update
    // Calculate the card's top clip attachment point in world space
    const clipOffset = cardH * 0.5 + 0.14;
    const cardEuler = new THREE.Euler(p.rot.x, p.rot.y, p.rot.z);
    const cardUp = new THREE.Vector3(0, 1, 0).applyEuler(cardEuler);
    const clipPoint = p.pos.clone().add(cardUp.clone().multiplyScalar(clipOffset));

    // Control point 1: leaves anchor going straight down
    const v1 = anchorPos.clone().add(new THREE.Vector3(0, -0.45, 0));
    // Control point 2: enters clip aligned with the card's tilt angle
    const v2 = clipPoint.clone().add(cardUp.clone().multiplyScalar(0.45));

    strapCurve.v0.copy(anchorPos);
    strapCurve.v1.copy(v1);
    strapCurve.v2.copy(v2);
    strapCurve.v3.copy(clipPoint);

    // Re-generate smooth tube geometry along the dynamic curve (32 segments, width 0.048)
    const newStrapGeo = new THREE.TubeGeometry(strapCurve, 28, 0.048, 8, false);
    strapMeshRef.current.geometry.dispose();
    strapMeshRef.current.geometry = newStrapGeo;
  });

  return (
    <group scale={cardScale}>
      {/* 1. Top Anchor Mounting Ring (fixed at top edge) */}
      <mesh position={[anchorPos.x, anchorPos.y, anchorPos.z]}>
        <torusGeometry args={[0.08, 0.02, 16, 24]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Dynamic Flexible Strap Mesh (curves dynamically as card moves) */}
      <mesh
        ref={strapMeshRef}
        scale={[1.85, 1.0, 0.25]} // Flatten cross section to form a ribbon
      >
        <bufferGeometry />
        <meshStandardMaterial
          map={strapTexture}
          color="#1E293B"
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {/* 3. The 3D ID Card Assembly (interactive drag target) */}
      <group
        ref={cardGroupRef}
        position={[restPos.x, restPos.y, restPos.z]}
        onPointerDown={handleCardPointerDown}
      >
        {/* Metal Swivel Buckle / Clasp at top center of card */}
        <group position={[0, cardH * 0.5 + 0.12, 0]}>
          {/* Snap ring */}
          <mesh position={[0, -0.04, 0]}>
            <torusGeometry args={[0.07, 0.018, 16, 24]} />
            <meshStandardMaterial color="#0F172A" metalness={0.92} roughness={0.2} />
          </mesh>
          {/* Clasp body */}
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.15, 0.12, 0.04]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>

        {/* Outer White Card Bevel / Body (Polaroid / Minimalist Pass from the video) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[cardW, cardH, 0.05]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.25}
            metalness={0.05}
          />
        </mesh>

        {/* Front Printed Photo Plane (Arkhanza's portrait with white border) */}
        {frontTexture && (
          <mesh position={[0, 0, 0.026]}>
            <planeGeometry args={[cardW, cardH]} />
            <meshStandardMaterial
              map={frontTexture}
              roughness={0.2}
              metalness={0.02}
            />
          </mesh>
        )}

        {/* Back Printed Info Plane (Rotated 180 deg around Y) */}
        <mesh position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[cardW, cardH]} />
          <meshStandardMaterial
            map={backTexture}
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

export function LanyardCard3D() {
  return (
    <div className="relative w-full h-[540px] md:h-[640px] lg:h-[720px] flex items-center justify-center pointer-events-auto select-none">
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[460px] h-[340px] md:h-[460px] bg-royal/25 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Canvas with cursor grab */}
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 8, 5]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-4, 2, 3]} intensity={0.9} color="#38BDF8" />
        <pointLight position={[3, -3, 2]} intensity={0.8} color="#2563EB" />
        <CardScene />
      </Canvas>
    </div>
  );
}
