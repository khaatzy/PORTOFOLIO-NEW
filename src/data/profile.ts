export const profile = {
  name: "Arkhanza Akbar Zakky Siswanto",
  shortName: "Arkhanza",
  // Dipakai oleh RotatingWords di Hero (muncul & menghilang bergantian)
  role: [
    "Full Stack Web Developer",
    "Student at SMPN 9 Probolinggo",
    "Computing Enthusiast",
    "Creative Coder",
  ],
  tagline: "Pelajar yang mengubah rasa ingin tahu menjadi kode.",
  bio: [
    "Halo! Saya Arkhanza Akbar Zakky Siswanto, seorang pelajar di SMPN 9 Probolinggo yang sedang memperdalam ilmu computing dan full stack web development.",
    "Bagi saya, setiap baris kode adalah kesempatan untuk belajar sesuatu yang baru. Saya senang membangun website dari sisi frontend yang interaktif dan penuh animasi hingga sisi backend dan database yang menjadi fondasinya.",
    "Saat ini saya terus mengasah kemampuan dengan React, Next.js, Node.js, PostgreSQL, Supabase, hingga Three.js untuk menciptakan pengalaman web 3D yang imersif. Tujuan saya sederhana: tumbuh menjadi developer yang mampu menghadirkan solusi digital yang bermanfaat, sejak usia muda.",
  ],
  location: "Probolinggo, Jawa Timur, Indonesia",
  school: "SMPN 9 Probolinggo",
  photo: "/images/profile.jpg",
  socials: {
    github: "https://github.com/khaatzy",
    linkedin: "", // opsional, sembunyikan ikon jika kosong
    email: "arkhanzaazs020911@gmail.com",
  },
  githubUsername: "khaatzy",
  // Repo unggulan — tampil PALING DEPAN dengan badge "⭐ Featured"
  featuredRepos: ["APK-ABSEN"],
  liveProjects: [
    {
      title: "APK Absen — Absensi Digital QR",
      description:
        "Aplikasi absensi digital berbasis QR Code dengan keamanan tinggi. Setiap kehadiran tercatat secara real-time, akurat, dan terlindungi dari kecurangan seperti titip absen.",
      url: "https://apk-absen-nine.vercel.app/",
      repo: "https://github.com/khaatzy/APK-ABSEN",
      image: "/images/projects/apk-absen.svg",
      tags: ["QR Code", "Security", "TypeScript", "PostgreSQL"],
      featured: true,
      highlights: ["QrCode", "ShieldCheck"],
    },
    {
      title: "Proyek OASE — Curhat Anonim Sekolah",
      description:
        "Platform curhat anonim berbasis digital untuk lingkungan sekolah. Siswa dapat bercerita dengan aman karena anonimitas pengguna terjamin sepenuhnya, menghadirkan ruang aman untuk didengar.",
      url: "https://proyek-oase-anvapro.vercel.app/",
      repo: "",
      image: "/images/projects/proyek-oase.svg",
      tags: ["Anonymous", "Privacy", "School", "Web App"],
      featured: false,
      highlights: ["MessageCircleHeart", "EyeOff"],
    },
  ],
} as const;

export type Profile = typeof profile;
