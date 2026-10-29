import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

export const alt = `${profile.name} — Full Stack Web Developer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 80% 20%, #1E5EFF 0%, #0A1A3F 45%, #000000 80%)",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#EAF0FF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#1E5EFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            A
          </div>
          <span style={{ fontSize: "20px", fontWeight: "600", color: "#A9B8D6" }}>
            @{profile.githubUsername}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontSize: "24px", color: "#4DA3FF", fontWeight: "600" }}>
            {profile.school}
          </span>
          <h1 style={{ fontSize: "62px", fontWeight: "900", letterSpacing: "-0.03em", margin: 0 }}>
            {profile.name}
          </h1>
          <p style={{ fontSize: "28px", color: "#A9B8D6", margin: 0, maxWidth: "900px" }}>
            Full Stack Web Developer • Next.js • React • Tailwind CSS • Three.js • PostgreSQL • Supabase
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px", fontSize: "18px", color: "#A9B8D6" }}>
          <span>📍 {profile.location}</span>
          <span>•</span>
          <span>🚀 Featured: APK-ABSEN & Proyek OASE</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
