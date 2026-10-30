"use client";

import React, { useState, useEffect } from "react";
import Lanyard from "@/components/ui/Lanyard";
import { Hand } from "lucide-react";

export function LanyardCard3D() {
  const [cardSize, setCardSize] = useState(0.62);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardSize(0.52);
      } else {
        setCardSize(0.62);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[620px] lg:h-[700px] flex items-center justify-center select-none touch-pan-y">
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] md:w-[440px] h-[280px] sm:h-[360px] md:h-[440px] bg-royal/20 rounded-full blur-[110px] md:blur-[130px] pointer-events-none" />

      {/* Official React Bits Lanyard Component */}
      <Lanyard
        frontImage="/images/card-front.png"
        backImage="/images/card-back.png"
        strapImage="/images/strap.png"
        strapColor="#0A0A0E"
        cardColor="#FFFFFF"
        finish="glossy"
        metal="graphite"
        orientation="portrait"
        size={cardSize}
        strapLength={0.48}
        strapWidth={0.65}
        gravity={1.2}
        damping={0.45}
        elasticity={0.45}
        breeze={0.4}
        interactive={true}
        intro={true}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Subtle Mobile Interactive Cue */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-navy/70 border border-deep/60 backdrop-blur-md text-[11px] text-mist/80 pointer-events-none sm:hidden flex items-center gap-1.5 shadow-md">
        <Hand className="w-3 h-3 text-sky animate-pulse" />
        <span>Sentuh & ayunkan kartu</span>
      </div>
    </div>
  );
}
