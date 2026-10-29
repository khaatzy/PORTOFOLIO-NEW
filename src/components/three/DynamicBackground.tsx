"use client";

import dynamic from "next/dynamic";

const BackgroundScene = dynamic(
  () => import("@/components/three/BackgroundScene"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-ink overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-royal/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 -left-20 w-[350px] h-[350px] bg-navy/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink pointer-events-none" />
      </div>
    ),
  }
);

export function DynamicBackground() {
  return <BackgroundScene />;
}
