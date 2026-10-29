import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType;
  color: string;
  category: "Frontend" | "Framework" | "3D / Creative" | "Backend" | "Database" | "Backend / BaaS";
  description: string;
};

export const skills: Skill[] = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26", category: "Frontend", description: "Struktur halaman web yang semantik" },
  { name: "CSS", icon: SiCss, color: "#1572B6", category: "Frontend", description: "Styling, layout responsif & animasi modern" },
  { name: "React JS", icon: SiReact, color: "#61DAFB", category: "Frontend", description: "Komponen antarmuka pengguna interaktif" },
  { name: "Next JS", icon: SiNextdotjs, color: "#FFFFFF", category: "Framework", description: "Full-stack React framework (SSR & SSG)" },
  { name: "Three JS", icon: SiThreedotjs, color: "#FFFFFF", category: "3D / Creative", description: "Grafis 3D interaktif & WebGL di browser" },
  { name: "Node JS", icon: SiNodedotjs, color: "#5FA04E", category: "Backend", description: "Runtime JavaScript di sisi server yang cepat" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Database", description: "Sistem manajemen database relasional andal" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E", category: "Backend / BaaS", description: "Database PostgreSQL, autentikasi & real-time" },
];
