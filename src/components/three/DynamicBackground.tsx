"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const BackgroundScene = dynamic(
  () => import("@/components/three/BackgroundScene"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-ink overflow-hidden pointer-events-none select-none">
        <div className="absolute right-0 top-0 w-full md:w-3/5 h-full opacity-20 mix-blend-luminosity">
          <Image
            src="/images/profile.jpg"
            alt="Loading background"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-navy/70 to-transparent" />
      </div>
    ),
  }
);

export function DynamicBackground() {
  return <BackgroundScene />;
}
