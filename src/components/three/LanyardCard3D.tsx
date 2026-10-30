"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// 1. Front Badge Texture: Clean Polaroid / Minimalist VIP pass aesthetic matching user images
function createFrontBadgeTexture(imageSrc: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1180;
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

      // Clean crisp white premium badge stock
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);

      // Subtle outer border line
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 3;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      // Top Punch Hole Slot
      ctx.fillStyle = "#0B0F19";
      ctx.beginPath();
      ctx.roundRect(w / 2 - 38, 16, 76, 14, 7);
      ctx.fill();

      // Inset Portrait Photo Area (Centered with clean white margins)
      const photoX = 36;
      const photoY = 46;
      const photoW = w - 72; // 728
      const photoH = 760;

      ctx.fillStyle = "#020617";
      ctx.fillRect(photoX, photoY, photoW, photoH);

      if (image) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(photoX, photoY, photoW, photoH, 4);
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
      ctx.strokeStyle = "rgba(15, 23, 42, 0.12)";
      ctx.lineWidth = 2;
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      // Subtle horizontal divider below photo
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(photoX, 835);
      ctx.lineTo(w - photoX, 835);
      ctx.stroke();

      // Bottom minimalist credentials
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 34px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("ARKHANZA A.Z.S.", photoX + 4, 882);

      ctx.fillStyle = "#0284C7";
      ctx.font = "bold 20px 'Courier New', monospace";
      ctx.fillText("FULL STACK WEB DEV", photoX + 4, 922);

      ctx.fillStyle = "#64748B";
      ctx.font = "600 18px sans-serif";
      ctx.fillText("SMPN 9 PROBOLINGGO", photoX + 4, 958);

      // Verified badge symbol
      ctx.fillStyle = "#2563EB";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("OFFICIAL PASS ✓", w - photoX - 4, 882);

      // Barcode mockup
      ctx.fillStyle = "#1E293B";
      const barY = 995;
      const barH = 50;
      let curX = photoX + 6;
      const barWidths = [3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 4, 2, 4, 1, 3, 2, 1, 4, 3, 2, 4];
      for (let i = 0; i < barWidths.length; i++) {
        const bw = barWidths[i] * 3.4;
        if (i % 2 === 0) {
          ctx.fillRect(curX, barY, bw, barH);
        }
        curX += bw + 4;
        if (curX > w - photoX - 10) break;
      }

      ctx.fillStyle = "#94A3B8";
      ctx.font = "14px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText("ID: 2026-990-AKZ // SMPN 9 // VERIFIED PORTFOLIO", w / 2, 1075);

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
  canvas.width = 800;
  canvas.height = 1180;
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
    ctx.roundRect(w / 2 - 38, 16, 76, 14, 7);
    ctx.fill();

    // Outer border
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // Header
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 24px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("DEV PASS // 2026", w / 2, 130);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 52px sans-serif";
    ctx.fillText("ARKHANZA", w / 2, 230);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("CREATIVE WEB DEVELOPER", w / 2, 285);

    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("SMPN 9 PROBOLINGGO", w / 2, 330);

    // Divider
    ctx.strokeStyle = "rgba(37, 99, 235, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 380);
    ctx.lineTo(w - 80, 380);
    ctx.stroke();

    // Barcode mockup
    ctx.fillStyle = "#F8FAFC";
    const barY = 440;
    const barH = 90;
    let curX = 90;
    const barWidths = [3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 4, 2, 4, 1, 3, 2];
    for (let i = 0; i < barWidths.length; i++) {
      const bw = barWidths[i] * 3.5;
      if (i % 2 === 0) {
        ctx.fillRect(curX, barY, bw, barH);
      }
      curX += bw + 4;
      if (curX > w - 100) break;
    }

    ctx.fillStyle = "#94A3B8";
    ctx.font = "18px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("ID: 2026-990-AKZ // OFFICIAL PASS", w / 2, 570);

    // Verified badge
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("VERIFIED PORTFOLIO BADGE ✓", w / 2, 680);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 3. Woven Ribbon Strap Texture matching the reference image: Pure matte black with crisp white "3D CARD"
function createStrapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Pure matte deep black strap matching user's reference image
    ctx.fillStyle = "#0A0A0E";
    ctx.fillRect(0, 0, 256, 1024);

    // Subtle premium herringbone/twill fabric grain
    ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
    ctx.lineWidth = 1;
    for (let y = 0; y < 1024; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y + 6);
      ctx.stroke();
    }

    // Outer subtle border thread
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 0, 248, 1024);

    // Crisp white vertical text: "3D CARD"
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw repeated text with comfortable spacing exactly like user reference images
    for (let y = 110; y < 1024; y += 220) {
      ctx.save();
      ctx.translate(128, y);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("3D CARD", 0, 0);
      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const SEGMENTS = 48;

function CardScene() {
  const [frontTexture, setFrontTexture] = useState<THREE.CanvasTexture | null>(null);
  const backTexture = useMemo(() => createBackBadgeTexture(), []);
  const strapTexture = useMemo(() => createStrapTexture(), []);

  const cardGroupRef = useRef<THREE.Group>(null);
  const strapMeshRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Responsive scale & proportions
  const isMobile = viewport.width < 5.2;
  const cardScale = isMobile ? 0.82 : 1.0;
  const cardW = 2.0;
  const cardH = 2.95;

  // Fixed top anchor disappearing off-screen above the header (like reference images)
  const anchorPos = useMemo(() => new THREE.Vector3(0, 2.45, 0), []);
  // Resting position centered vertically
  const restPos = useMemo(() => new THREE.Vector3(0, -0.28, 0), []);

  // Entrance drop-in state
  const dropState = useRef({
    active: true,
    y: 1.8,
    vy: 0.0,
    gravity: 34.0,
    springK: 85.0,
    damping: 9.5,
  });

  // Dynamic physics state (position, velocity, rotation)
  const physics = useRef({
    pos: new THREE.Vector3(restPos.x, restPos.y + 1.8, restPos.z),
    vel: new THREE.Vector3(0, 0, 0),
    rot: new THREE.Euler(0, 0, 0),
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
        // Map pointer to 3D world plane at z = 0, adjusted by cardScale
        const worldX = ((x * viewport.width) / 2) / cardScale;
        const worldY = ((y * viewport.height) / 2) / cardScale;

        // Clamp drag area so the card stays comfortably visible
        const clampedX = Math.max(-viewport.width / 2 + 0.6, Math.min(viewport.width / 2 - 0.6, worldX - physics.current.dragOffset.x));
        const clampedY = Math.max(-viewport.height / 2 + 0.5, Math.min(anchorPos.y - 0.45, worldY - physics.current.dragOffset.y));

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
  }, [anchorPos.y, cardScale, restPos, viewport.height, viewport.width]);

  // Pointer Down on the Card Mesh
  const handleCardPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    physics.current.isDragging = true;

    // Calculate drag offset between pointer world pos and current card pos
    const worldX = ((e.pointer.x * viewport.width) / 2) / cardScale;
    const worldY = ((e.pointer.y * viewport.height) / 2) / cardScale;
    physics.current.dragOffset.set(
      worldX - physics.current.pos.x,
      worldY - physics.current.pos.y
    );
  }, [cardScale, viewport.height, viewport.width]);

  // Persistent Cubic Bezier curve for dynamic ribbon strap
  const strapCurve = useMemo(() => {
    return new THREE.CubicBezierCurve3(
      anchorPos.clone(),
      anchorPos.clone().add(new THREE.Vector3(0, -0.5, 0)),
      restPos.clone().add(new THREE.Vector3(0, 0.5, 0)),
      restPos.clone()
    );
  }, [anchorPos, restPos]);

  // High-performance custom Ribbon BufferGeometry (allocated ONCE, updated in-place via ref)
  const ribbonGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertexCount = (SEGMENTS + 1) * 2;
    const positions = new Float32Array(vertexCount * 3);
    const normals = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);
    const indices: number[] = [];

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      // UV coordinates: u in [0, 1], v repeats smoothly along ribbon length
      uvs[i * 4 + 0] = 0;
      uvs[i * 4 + 1] = t * 3.5;
      uvs[i * 4 + 2] = 1;
      uvs[i * 4 + 3] = t * 3.5;

      if (i < SEGMENTS) {
        const v0 = i * 2;
        const v1 = i * 2 + 1;
        const v2 = (i + 1) * 2;
        const v3 = (i + 1) * 2 + 1;

        // Two triangles per quad segment
        indices.push(v0, v1, v2);
        indices.push(v2, v1, v3);
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!cardGroupRef.current || !strapMeshRef.current) return;

    const dt = Math.min(delta, 0.05); // prevent tunneling on frame lag
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

        if (Math.abs(drop.y) < 0.015 && Math.abs(drop.vy) < 0.08) {
          drop.y = 0;
          drop.vy = 0;
          drop.active = false;
        }
      }
      p.pos.y = restPos.y + drop.y;
    }

    // 2. Interactive Drag vs Buttery-Smooth Pendulum Return Physics
    if (p.isDragging) {
      const targetX = p.targetPos.x;
      const targetY = p.targetPos.y;

      // Smooth responsive follow during drag
      const followFactor = Math.min(1, 22 * dt);
      const newX = p.pos.x + (targetX - p.pos.x) * followFactor;
      const newY = p.pos.y + (targetY - p.pos.y) * followFactor;

      p.vel.set((newX - p.pos.x) / dt, (newY - p.pos.y) / dt, 0);
      p.pos.x = newX;
      p.pos.y = newY;

      // Realistic 3D tilt while dragging (pitch, yaw, roll)
      const dx = p.pos.x - anchorPos.x;
      const dy = p.pos.y - anchorPos.y;
      const angle = Math.atan2(dx, -dy);

      const targetRotZ = -angle * 0.78 - p.vel.x * 0.035;
      const targetRotY = -angle * 0.70 - p.vel.x * 0.045;
      const targetRotX = p.vel.y * 0.035;

      const rotLerp = Math.min(1, 15 * dt);
      p.rot.z += (targetRotZ - p.rot.z) * rotLerp;
      p.rot.y += (targetRotY - p.rot.y) * rotLerp;
      p.rot.x += (targetRotX - p.rot.x) * rotLerp;
    } else if (!drop.active) {
      // Natural, ultra-smooth pendulum harmonic recoil upon release
      const springK = 26.0; // gentle organic spring
      const damping = 3.6;  // smooth decay without harsh bouncing

      // Subtle ambient floating breeze when settled
      const t = state.clock.elapsedTime;
      const ambientX = Math.sin(t * 1.5) * 0.035;
      const ambientY = Math.cos(t * 1.8) * 0.02;

      const desiredX = restPos.x + ambientX;
      const desiredY = restPos.y + ambientY;

      // Mouse tilt reaction when hovering
      const mouseTiltX = pointerPos.current.y * 0.12;
      const mouseTiltY = pointerPos.current.x * 0.16;

      const fx = (desiredX - p.pos.x) * springK - p.vel.x * damping;
      const fy = (desiredY - p.pos.y) * springK - p.vel.y * damping;

      p.vel.x += fx * dt;
      p.vel.y += fy * dt;

      p.pos.x += p.vel.x * dt;
      p.pos.y += p.vel.y * dt;

      // Rotations smoothly follow the pendulum angle & momentum
      const dx = p.pos.x - anchorPos.x;
      const dy = p.pos.y - anchorPos.y;
      const angle = Math.atan2(dx, -dy);

      const targetRotZ = -angle * 0.82 - p.vel.x * 0.04;
      const targetRotY = -angle * 0.72 - p.vel.x * 0.05 + mouseTiltY;
      const targetRotX = p.vel.y * 0.04 + mouseTiltX;

      const rotLerp = Math.min(1, 12 * dt);
      p.rot.z += (targetRotZ - p.rot.z) * rotLerp;
      p.rot.y += (targetRotY - p.rot.y) * rotLerp;
      p.rot.x += (targetRotX - p.rot.x) * rotLerp;
    }

    // Apply 3D transform to card
    cardGroupRef.current.position.copy(p.pos);
    cardGroupRef.current.rotation.set(p.rot.x, p.rot.y, p.rot.z);

    // 3. Dynamic Flexible Ribbon Strap Math (Matching user's reference images)
    const cardEuler = new THREE.Euler(p.rot.x, p.rot.y, p.rot.z);
    const cardUp = new THREE.Vector3(0, 1, 0).applyEuler(cardEuler);
    const cardRight = new THREE.Vector3(1, 0, 0).applyEuler(cardEuler);

    // Clasp ring center is exactly at cardH * 0.5 + 0.12
    const claspPoint = p.pos.clone().add(cardUp.clone().multiplyScalar(cardH * 0.5 + 0.12));

    // Dynamic Bezier control points with natural gravity slack/sag (S-curve as in Image 1)
    const dist = anchorPos.distanceTo(claspPoint);
    const restLen = 1.30;
    const slack = Math.max(0, restLen - dist);
    const sag = slack * 0.45; // natural droop when card is pushed close to anchor

    const handleLen = Math.min(0.70, Math.max(0.25, dist * 0.38));
    const v1 = anchorPos.clone().add(new THREE.Vector3(0, -handleLen, 0));
    const v2 = claspPoint.clone().add(cardUp.clone().multiplyScalar(handleLen)).add(new THREE.Vector3(0, -sag, 0));

    strapCurve.v0.copy(anchorPos);
    strapCurve.v1.copy(v1);
    strapCurve.v2.copy(v2);
    strapCurve.v3.copy(claspPoint);

    // In-place Ribbon Geometry Buffer update via ref (React 19 compliant, 60-120 FPS buttery smooth)
    const geo = strapMeshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const normAttr = geo.attributes.normal;
    if (!posAttr || !normAttr) return;

    const posArr = posAttr.array as Float32Array;
    const normArr = normAttr.array as Float32Array;

    const halfW = 0.058; // slim, elegant ribbon width ~ 0.116 units
    const topAnchorRight = new THREE.Vector3(1, 0, 0);

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const pt = strapCurve.getPoint(t);
      const tan = strapCurve.getTangent(t).normalize();

      // Smoothly twist from top horizontal orientation to the card's local tilt
      const desRight = new THREE.Vector3().lerpVectors(topAnchorRight, cardRight, t);

      let norm = new THREE.Vector3().crossVectors(tan, desRight).normalize();
      if (norm.lengthSq() < 0.0001) {
        norm = new THREE.Vector3(0, 0, 1);
      }
      const right = new THREE.Vector3().crossVectors(norm, tan).normalize();

      const leftPt = pt.clone().sub(right.clone().multiplyScalar(halfW));
      const rightPt = pt.clone().add(right.clone().multiplyScalar(halfW));

      const base = i * 6;
      // Left edge vertex
      posArr[base + 0] = leftPt.x;
      posArr[base + 1] = leftPt.y;
      posArr[base + 2] = leftPt.z;
      normArr[base + 0] = norm.x;
      normArr[base + 1] = norm.y;
      normArr[base + 2] = norm.z;

      // Right edge vertex
      posArr[base + 3] = rightPt.x;
      posArr[base + 4] = rightPt.y;
      posArr[base + 5] = rightPt.z;
      normArr[base + 3] = norm.x;
      normArr[base + 4] = norm.y;
      normArr[base + 5] = norm.z;
    }

    posAttr.needsUpdate = true;
    normAttr.needsUpdate = true;
  });

  return (
    <group scale={cardScale}>
      {/* 1. Top Anchor Mount (Disappears upwards at top edge) */}
      <group position={[anchorPos.x, anchorPos.y, anchorPos.z]}>
        {/* Subtle dark ceiling clip */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 16]} />
          <meshStandardMaterial color="#0A0A0E" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* 2. Dynamic Flexible Woven Ribbon Strap (Curves in 3D, always 100% connected) */}
      <mesh ref={strapMeshRef} geometry={ribbonGeo}>
        <meshStandardMaterial
          map={strapTexture}
          side={THREE.DoubleSide}
          roughness={0.75}
          metalness={0.08}
        />
      </mesh>

      {/* 3. The 3D ID Card Assembly (Interactive drag target) */}
      <group
        ref={cardGroupRef}
        position={[restPos.x, restPos.y, restPos.z]}
        onPointerDown={handleCardPointerDown}
      >
        {/* Metal Swivel Buckle / Clasp at top center of card matching Image 2 */}
        <group position={[0, cardH * 0.5 + 0.05, 0]}>
          {/* Card punch clip bracket */}
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[0.16, 0.09, 0.035]} />
            <meshStandardMaterial color="#0A0A0E" metalness={0.92} roughness={0.25} />
          </mesh>
          {/* Swivel metal loop at exactly [0, 0.07, 0] (cardH * 0.5 + 0.12) */}
          <mesh position={[0, 0.07, 0]}>
            <torusGeometry args={[0.062, 0.013, 16, 32]} />
            <meshStandardMaterial color="#1E293B" metalness={0.92} roughness={0.2} />
          </mesh>
        </group>

        {/* Outer White Card Bevel / Body (Polaroid / Minimalist Pass matching Image 2) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[cardW, cardH, 0.04]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.25}
            metalness={0.05}
          />
        </mesh>

        {/* Front Printed Photo Plane (Arkhanza's portrait with white border) */}
        {frontTexture && (
          <mesh position={[0, 0, 0.021]}>
            <planeGeometry args={[cardW, cardH]} />
            <meshStandardMaterial
              map={frontTexture}
              roughness={0.2}
              metalness={0.02}
            />
          </mesh>
        )}

        {/* Back Printed Info Plane (Rotated 180 deg around Y) */}
        <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
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
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] flex items-center justify-center pointer-events-auto select-none">
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[440px] h-[320px] md:h-[440px] bg-royal/25 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Canvas with cursor grab */}
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 8, 5]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-4, 2, 3]} intensity={0.9} color="#38BDF8" />
        <pointLight position={[3, -3, 2]} intensity={0.8} color="#2563EB" />
        <CardScene />
      </Canvas>
    </div>
  );
}
