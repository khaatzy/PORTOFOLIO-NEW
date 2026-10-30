"use client";

import React from "react";
import Lanyard from "@/components/ui/Lanyard";

export function LanyardCard3D() {
  return (
    <div className="relative w-full h-[540px] md:h-[640px] lg:h-[720px] flex items-center justify-center select-none">
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[440px] h-[320px] md:h-[440px] bg-royal/20 rounded-full blur-[130px] pointer-events-none" />

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
        size={0.62}
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
    </div>
  );
}
