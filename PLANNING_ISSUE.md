# 🚀 [Feature] Membangun Website Portofolio Pribadi — Next.js + Tailwind CSS + Three.js

**Labels:** `enhancement` `frontend` `animation` `priority: high`
**Assignee:** Gemini 3.8 Flash (AI Agent)
**Milestone:** v1.0 — Portfolio Launch

---

## 📌 Ringkasan

Bangun website portofolio pribadi milik **Arkhanza Akbar Zakky Siswanto** ([@khaatzy](https://github.com/khaatzy)). Website berupa satu halaman (single-page, dengan section yang di-scroll) yang modern, cepat, dan penuh animasi sinematik. Isinya: **About Me**, **Tech Stack yang dikuasai (dengan logo)**, **tombol profil GitHub**, **daftar project GitHub**, dan **daftar URL project live** yang sudah dibuat.

Tema visual: **gelap & futuristik** dengan perpaduan warna **hitam, biru, dan biru gelap**, dengan foto pemilik yang menyatu sebagai **background** website.

---

## 🤖 Instruksi untuk AI Agent (WAJIB DIBACA)

1. Kerjakan **per fase** sesuai urutan di bawah. Setelah setiap fase selesai, jalankan `npm run build` dan `npm run lint` — **jangan lanjut** ke fase berikutnya jika masih ada error.
2. **Jangan mengarang data pribadi.** Semua data (nama, bio, username GitHub, URL project, foto) diambil dari satu file: `src/data/profile.ts`. Isi dengan placeholder yang jelas (contoh: `"YOUR_GITHUB_USERNAME"`) jika data belum tersedia.
3. Gunakan **TypeScript strict mode**. Jangan pakai `any`.
4. Semua komponen yang memakai Three.js, GSAP, Lenis, atau `window` wajib berupa **Client Component** (`"use client"`), dan komponen Three.js wajib di-load dengan `next/dynamic` + `ssr: false`.
5. Selalu hormati `prefers-reduced-motion`: jika aktif, matikan animasi berat (WebGL, parallax, smooth scroll) dan tampilkan versi statis.
6. Selalu bersihkan (cleanup) animasi di `useEffect` / `useGSAP` agar tidak terjadi memory leak saat hot reload atau unmount.
7. Jangan menambahkan library di luar daftar Tech Stack tanpa alasan yang ditulis di komentar PR.

---

## 🧰 Tech Stack

| Kebutuhan | Library | Catatan |
|---|---|---|
| UI Library | **React JS** (versi stabil terbaru, React 19+) | Semua UI dibangun sebagai komponen React (function component + hooks). Manfaatkan Server Components untuk data, Client Components untuk animasi |
| Framework | **Next.js** (versi stabil terbaru, App Router) | Meta-framework berbasis React. `create-next-app` dengan TypeScript, ESLint, `src/` dir |
| Styling | **Tailwind CSS v4** | Design token warna di `@theme` pada `globals.css` |
| 3D / WebGL | **three** + **@react-three/fiber** + **@react-three/drei** | Background 3D, efek foto shader, partikel |
| Animasi scroll & timeline | **gsap** + **@gsap/react** (`ScrollTrigger`, `SplitText`) | Reveal elemen, pin section, scrub |
| Smooth scroll | **lenis** | Disinkronkan dengan GSAP ScrollTrigger |
| Animasi komponen / teks | **motion** (Framer Motion) | Teks muncul–menghilang, hover, transisi mikro |
| Ikon | **lucide-react** (ikon UI) + **react-icons** (`react-icons/si` untuk logo tech & GitHub) | Lihat bagian *Tech Stack yang Dikuasai* |
| Font | `next/font` (contoh: *Space Grotesk* untuk heading, *Inter* untuk body) | |
| Deploy | **Vercel** | |

---

## 🎨 Design System

### Palet Warna (hitam – biru – biru gelap)

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-ink` | `#000000` | Background utama |
| `--color-night` | `#050A18` | Background section alternatif |
| `--color-navy` | `#0A1A3F` | Card, panel, overlay foto |
| `--color-deep` | `#10275E` | Border, hover card |
| `--color-royal` | `#1E5EFF` | Aksen utama, tombol, link |
| `--color-sky` | `#4DA3FF` | Glow, highlight, gradient end |
| `--color-mist` | `#A9B8D6` | Teks sekunder |
| `--color-snow` | `#EAF0FF` | Teks utama |

**Gradient utama:** `linear-gradient(135deg, #000000 0%, #0A1A3F 50%, #1E5EFF 100%)`
**Glow:** `box-shadow: 0 0 40px rgba(30, 94, 255, 0.35)`

Contoh di `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #000000;
  --color-night: #050A18;
  --color-navy: #0A1A3F;
  --color-deep: #10275E;
  --color-royal: #1E5EFF;
  --color-sky: #4DA3FF;
  --color-mist: #A9B8D6;
  --color-snow: #EAF0FF;
}
```

### Tipografi
- Heading: besar dan tebal (`text-6xl` – `text-9xl` di desktop), `tracking-tight`.
- Body: `text-base`/`text-lg`, warna `text-mist`.

### Gaya umum
- Glassmorphism ringan pada card: `bg-navy/40 backdrop-blur-md border border-deep/60`.
- Noise/grain overlay tipis di seluruh halaman agar terasa sinematik.
- Custom cursor (lingkaran glow biru) yang membesar saat hover di elemen interaktif — **desktop saja**.

---

## 📁 Struktur Folder

```
src/
├── app/
│   ├── layout.tsx          # Font, metadata SEO, SmoothScrollProvider
│   ├── page.tsx            # Menyusun semua section
│   └── globals.css         # Tailwind + design token
├── components/
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx   # Lenis + sinkronisasi GSAP
│   ├── three/
│   │   ├── BackgroundScene.tsx        # Canvas R3F fixed full-screen
│   │   ├── PhotoPlane.tsx             # Foto sebagai plane + shader
│   │   └── Particles.tsx              # Partikel biru melayang
│   ├── animations/
│   │   ├── TextScramble.tsx           # Teks acak → muncul
│   │   ├── RotatingWords.tsx          # Kata muncul & menghilang bergantian
│   │   ├── SplitReveal.tsx            # Reveal per huruf/kata saat scroll
│   │   └── FadeInOnScroll.tsx         # Wrapper reveal elemen generik
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx                 # Tech stack + logo
│   │   ├── GithubProjects.tsx
│   │   ├── LiveProjects.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Navbar.tsx
│       ├── Button.tsx
│       ├── ProjectCard.tsx
│       ├── SkillCard.tsx
│       ├── CustomCursor.tsx
│       └── Preloader.tsx
├── data/
│   ├── profile.ts          # SATU-SATUNYA sumber data pribadi
│   └── skills.ts           # Daftar tech + ikon + warna brand
├── lib/
│   ├── github.ts           # Fetch repo GitHub (server-side)
│   └── utils.ts
└── hooks/
    └── useReducedMotion.ts
public/
└── images/
    ├── profile.jpg         # Foto pemilik (sudah diedit AI, background gelap)
    └── projects/           # Screenshot project live
```

---

## 🗂️ Data Model — `src/data/profile.ts`

```ts
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
    email: "",    // opsional, sembunyikan tombol jika kosong
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
      image: "/images/projects/apk-absen.png",
      tags: ["QR Code", "Security", "TypeScript", "PostgreSQL"],
      featured: true,
    },
    {
      title: "Proyek OASE — Curhat Anonim Sekolah",
      description:
        "Platform curhat anonim berbasis digital untuk lingkungan sekolah. Siswa dapat bercerita dengan aman karena anonimitas pengguna terjamin sepenuhnya, menghadirkan ruang aman untuk didengar.",
      url: "https://proyek-oase-anvapro.vercel.app/",
      repo: "",
      image: "/images/projects/proyek-oase.png",
      tags: ["Anonymous", "Privacy", "School", "Web App"],
      featured: false,
    },
  ],
} as const;
```

> [!NOTE]
> Field yang kosong (`""`) atau berisi placeholder **tidak boleh dirender** — komponen wajib menyembunyikannya secara otomatis (contoh: tombol "Source Code" disembunyikan jika `repo` kosong).

> [!IMPORTANT]
> **Tags tech pada `liveProjects` harus diverifikasi.** Sebelum menulis tags final, AI wajib mengecek bahasa/topics repo via GitHub API (`https://api.github.com/repos/khaatzy/APK-ABSEN` dan `/languages`). Jika tidak cocok, ganti tags sesuai data asli. Data per 29 Okt 2026 untuk APK-ABSEN: TypeScript, PLpgSQL (PostgreSQL), JavaScript, CSS. Tags Proyek OASE belum diketahui — gunakan tags non-teknis yang sudah ada, jangan mengarang tech stack.

> [!TIP]
> **Screenshot project:** ambil screenshot otomatis halaman `url` masing-masing project (rasio 16:10, 1600×1000) lalu simpan ke `public/images/projects/`. Jika tidak memungkinkan, gunakan fallback card bergradient biru dengan judul project dan favicon situs.

---

## 🧩 Tech Stack yang Dikuasai — `src/data/skills.ts`

Setiap tech **wajib ditampilkan beserta logonya**. Gunakan ikon dari `react-icons/si` (Simple Icons). Warna logo memakai warna brand asli agar mudah dikenali; untuk logo yang aslinya hitam (Next.js, Three.js) gunakan putih agar terlihat di background gelap.

| Tech | Ikon (`react-icons/si`) | Warna Brand | Kategori |
|---|---|---|---|
| HTML | `SiHtml5` | `#E34F26` | Frontend |
| CSS | `SiCss` *(versi lama: `SiCss3`)* | `#1572B6` | Frontend |
| React JS | `SiReact` | `#61DAFB` | Frontend |
| Next JS | `SiNextdotjs` | `#FFFFFF` | Framework |
| Three JS | `SiThreedotjs` | `#FFFFFF` | 3D / Creative |
| Node JS | `SiNodedotjs` | `#5FA04E` | Backend |
| PostgreSQL | `SiPostgresql` | `#4169E1` | Database |
| Supabase | `SiSupabase` | `#3FCF8E` | Backend / BaaS |

```ts
import type { IconType } from "react-icons";
import {
  SiHtml5, SiCss, SiReact, SiNextdotjs,
  SiThreedotjs, SiNodedotjs, SiPostgresql, SiSupabase,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType;
  color: string;
  category: "Frontend" | "Framework" | "3D / Creative" | "Backend" | "Database" | "Backend / BaaS";
  description: string;
};

export const skills: Skill[] = [
  { name: "HTML",       icon: SiHtml5,      color: "#E34F26", category: "Frontend",       description: "Struktur halaman web yang semantik" },
  { name: "CSS",        icon: SiCss,        color: "#1572B6", category: "Frontend",       description: "Styling, layout & animasi" },
  { name: "React JS",   icon: SiReact,      color: "#61DAFB", category: "Frontend",       description: "Komponen UI yang interaktif" },
  { name: "Next JS",    icon: SiNextdotjs,  color: "#FFFFFF", category: "Framework",      description: "Full stack React framework" },
  { name: "Three JS",   icon: SiThreedotjs, color: "#FFFFFF", category: "3D / Creative",  description: "Grafis 3D & WebGL di browser" },
  { name: "Node JS",    icon: SiNodedotjs,  color: "#5FA04E", category: "Backend",        description: "JavaScript di sisi server" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Database",       description: "Database relasional yang andal" },
  { name: "Supabase",   icon: SiSupabase,   color: "#3FCF8E", category: "Backend / BaaS", description: "Auth, database & storage instan" },
];
```

> [!IMPORTANT]
> Nama ikon di Simple Icons bisa berubah antar versi. Setelah install, **cek bahwa setiap import benar-benar ada** di versi `react-icons` yang terpasang (contoh: jika `SiCss` tidak ada, pakai `SiCss3`). Build tidak boleh gagal karena import ikon.

---

## 🛠️ Rencana Implementasi (Task Breakdown)

### Fase 0 — Setup Proyek
- [x] Inisialisasi: `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [x] Pastikan `react` & `react-dom` terpasang di versi terbaru (otomatis ikut dari `create-next-app`).
- [x] Install dependency:
  ```bash
  npm i three @react-three/fiber @react-three/drei gsap @gsap/react lenis motion lucide-react react-icons
  npm i -D @types/three
  ```
- [x] Setup design token warna & font di `globals.css` dan `layout.tsx`.
- [x] Buat `src/data/profile.ts` dengan placeholder.
- [x] Konfigurasi `next.config` → `images.remotePatterns` untuk `avatars.githubusercontent.com` dan `opengraph.githubassets.com`.

### Fase 1 — Smooth Scroll Global
- [x] Buat `SmoothScrollProvider.tsx` menggunakan **Lenis**.
- [x] Sinkronkan Lenis dengan GSAP:
  ```ts
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- [x] Navigasi navbar menggunakan `lenis.scrollTo("#section-id")` dengan easing halus.
- [x] Nonaktifkan Lenis jika `prefers-reduced-motion`.

**Acceptance:** scroll terasa halus (inertia) di desktop, tetap native di perangkat touch, anchor link bekerja.

### Fase 2 — Background 3D & Efek Foto sebagai Background ⭐
Ini adalah **efek signature** website.

> [!NOTE]
> Foto sudah disiapkan (hasil edit AI) di `public/images/profile.jpg`: pose three-quarter, tangan bersilang, background gradient hitam → biru gelap dengan rim light biru, subjek di sisi kanan sehingga sisi kiri kosong untuk teks Hero. **Jangan crop wajah**; posisikan foto di kanan layar pada desktop dan di tengah-atas (di belakang teks, opacity lebih rendah) pada mobile.
> Foto alternatif (kaos hitam, posisi tengah) tersedia di `public/images/profile-casual.jpg` — cukup ganti `profile.photo` jika ingin dipakai.

- [x] `BackgroundScene.tsx`: `<Canvas>` R3F dengan posisi `fixed inset-0 -z-10`, `dpr={[1, 1.5]}`, background hitam.
- [x] `PhotoPlane.tsx`: tampilkan `profile.jpg` sebagai **plane bertekstur** dengan **custom ShaderMaterial**:
  - **Duotone biru**: konversi foto ke grayscale lalu map ke gradasi `#000000 → #0A1A3F → #1E5EFF` sehingga foto menyatu dengan palet.
  - **Distorsi wave/liquid** halus yang bereaksi terhadap posisi mouse (uniform `uMouse`).
  - **Uniform `uProgress`** yang dikontrol ScrollTrigger: saat user scroll ke bawah, foto **membesar (scale), memudar (opacity), dan blur/dissolve** sehingga terasa "tenggelam" menjadi background konten.
  - Vignette gelap di tepi agar teks di atasnya tetap terbaca.
- [x] `Particles.tsx`: ±1500 partikel biru kecil melayang lambat (gunakan `Points` + `BufferGeometry`), bergerak sedikit mengikuti scroll.
- [x] Overlay gradient CSS di atas canvas: `bg-gradient-to-b from-transparent via-ink/60 to-ink` untuk transisi ke section berikutnya.
- [x] **Fallback**: jika WebGL tidak tersedia / mobile low-end / reduced motion → tampilkan `next/image` foto statis dengan CSS `mix-blend-luminosity` + overlay gradient biru, plus parallax CSS sederhana.
- [x] Load dengan `dynamic(() => import(...), { ssr: false })` dan tampilkan placeholder gradient selama loading.

**Acceptance:** foto pemilik terlihat sebagai background bernuansa biru yang hidup, bereaksi terhadap mouse, berubah halus saat scroll, dan FPS stabil ≥ 50 di laptop rata-rata.

### Fase 3 — Animasi Teks (Muncul & Menghilang)
- [x] `RotatingWords.tsx`: kata-kata dari `profile.role` bergantian — kata lama **blur + fade out + naik ke atas**, kata baru **masuk dari bawah dengan fade in** (`motion` + `AnimatePresence`, interval ±2.5 detik).
- [x] `TextScramble.tsx`: efek teks "decode" — karakter acak (`!<>-_\/[]{}—=+*^?#`) berubah perlahan menjadi teks asli. Dipakai untuk nama di Hero.
- [x] `SplitReveal.tsx`: memecah teks per kata/huruf (GSAP `SplitText`), lalu reveal dengan `stagger` saat masuk viewport; saat di-scroll melewati, teks **memudar kembali** (`scrub: true`).
- [x] Efek teks "fill on scroll" untuk paragraf About: warna teks berubah dari `text-deep` ke `text-snow` per kata mengikuti progress scroll.

**Acceptance:** minimal 3 jenis animasi teks berbeda terlihat jelas dan tidak menyebabkan layout shift (CLS < 0.1).

### Fase 4 — Animasi Scroll Elemen
- [x] `FadeInOnScroll.tsx`: wrapper generik (props: `direction`, `delay`, `distance`) — elemen masuk dengan fade + slide + sedikit scale.
- [x] Stagger reveal untuk grid project card.
- [x] **Pin section** About: foto/visual tetap (pinned) sementara teks bergerak.
- [x] **Horizontal scroll** untuk section Live Projects (desktop): section di-pin dan card bergeser horizontal mengikuti scroll vertikal. Di mobile kembali ke layout vertikal.
- [x] Parallax: elemen dekoratif (garis grid, orb glow biru) bergerak dengan kecepatan berbeda.
- [x] Progress bar scroll tipis berwarna `royal → sky` di bagian atas halaman.

**Acceptance:** semua ScrollTrigger di-refresh setelah gambar & font termuat, tidak ada elemen "loncat", dan semua trigger di-kill saat unmount.

### Fase 5 — Section Konten

#### 5.1 Preloader & Navbar
- [x] `Preloader.tsx`: layar hitam dengan counter 0–100% + nama, lalu tirai terbuka (clip-path) memperlihatkan Hero.
- [x] `Navbar.tsx`: fixed, transparan → glass saat scroll; hide saat scroll ke bawah, muncul saat scroll ke atas. Menu: Home, About, Skills, Projects, Live, Contact. Mobile: menu fullscreen dengan animasi.

#### 5.2 Hero
- [x] Nama besar dengan `TextScramble`.
- [x] Role dengan `RotatingWords`.
- [x] Tagline + 2 CTA:
  - **"Lihat Project"** → scroll ke section project.
  - **"GitHub Profile"** (ikon GitHub) → `profile.socials.github`, `target="_blank" rel="noopener noreferrer"`.
- [x] Indikator "scroll down" beranimasi.

#### 5.3 About Me
- [x] Paragraf bio (array `profile.bio`, satu elemen = satu paragraf) dengan efek "fill on scroll".
- [x] Info singkat sebagai kartu kecil: 📍 lokasi (Probolinggo), 🎓 sekolah (SMPN 9 Probolinggo), 💻 fokus (Computing & Full Stack Web Development).
- [x] Statistik GitHub `khaatzy` (jumlah repo publik, followers) diambil dari GitHub API `https://api.github.com/users/khaatzy`.

#### 5.3b Tech Stack yang Dikuasai (Skills)
- [x] `Skills.tsx` merender data dari `src/data/skills.ts` — **setiap tech tampil dengan logo + nama**.
- [x] Layout: grid `2 kolom (mobile) → 4 kolom (desktop)` berisi `SkillCard`.
- [x] `SkillCard.tsx`: logo besar (±48px) di tengah, nama tech, kategori kecil, dan deskripsi singkat.
  - Default: logo berwarna `text-mist` (monokrom) agar selaras dengan tema biru gelap.
  - Hover: logo berubah ke **warna brand asli**, card terangkat, muncul glow dengan warna brand (`box-shadow` memakai `skill.color`), dan logo berputar/scale halus.
- [x] Animasi masuk: card muncul satu per satu (stagger) saat di-scroll.
- [x] Tambahan: **infinite marquee** dua baris (arah berlawanan) berisi logo + nama tech di bawah grid, berhenti saat di-hover.
- [x] Opsional (nilai plus): logo tech melayang mengorbit dalam scene Three.js kecil di section ini.
- [x] Aksesibilitas: setiap ikon diberi `aria-hidden="true"`, nama tech tetap berupa teks yang terbaca screen reader.

#### 5.4 GitHub Projects
- [x] `src/lib/github.ts` — fetch di **server component**:
  ```ts
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: 3600 }, // ISR 1 jam
    }
  );
  ```
- [x] Filter: buang fork, prioritaskan `featuredRepos` jika diisi, sisanya urutkan berdasarkan `stargazers_count` lalu `updated_at`. Tampilkan maksimal 6.
- [x] **Featured repo [`khaatzy/APK-ABSEN`](https://github.com/khaatzy/APK-ABSEN)**: tampil sebagai card **besar (span 2 kolom)** paling depan dengan badge "⭐ Featured Project", border gradient biru beranimasi, dan tombol **"View Repo"** + **"Live Demo"** (→ https://apk-absen-nine.vercel.app/). Jika repo ini gagal diambil dari API, tetap tampilkan card-nya menggunakan data statis dari `profile.liveProjects`.
- [x] `ProjectCard.tsx` menampilkan: nama repo, deskripsi, bahasa utama (dot warna), ⭐ stars, 🍴 forks, topics, tombol **"View Repo"** dan **"Live Demo"** (jika `homepage` ada).
- [x] Efek hover card: **tilt 3D** mengikuti mouse + glow border biru (spotlight gradient mengikuti kursor).
- [x] Tombol besar **"Lihat Semua Repository di GitHub →"** menuju `https://github.com/{username}?tab=repositories`.
- [x] Error handling: jika API gagal / rate limit → tampilkan pesan ramah + tombol ke profil GitHub (halaman tidak boleh crash).

#### 5.5 Live Projects (URL Project)
- [x] Data dari `profile.liveProjects`:

  | # | Project | URL Live | Repo |
  |---|---|---|---|
  | 1 | **APK Absen** — absensi digital QR berkeamanan tinggi | https://apk-absen-nine.vercel.app/ | [khaatzy/APK-ABSEN](https://github.com/khaatzy/APK-ABSEN) |
  | 2 | **Proyek OASE** — curhat anonim sekolah dengan anonimitas terjamin | https://proyek-oase-anvapro.vercel.app/ | — |

- [x] Card besar dengan screenshot (`next/image`), nomor urut besar (`01`, `02`) bergaya outline, judul, deskripsi, tags, tombol **"Kunjungi Website ↗"** dan **"Source Code"** (hanya jika `repo` terisi).
- [x] Setiap card menampilkan **ikon highlight** sesuai karakter project (dari `lucide-react`):
  - APK Absen → `QrCode` + `ShieldCheck` ("Keamanan Tinggi")
  - Proyek OASE → `MessageCircleHeart` + `EyeOff` ("100% Anonim")
- [x] Horizontal scroll (desktop) sesuai Fase 4.
- [x] Hover: gambar zoom + overlay biru gelap, kursor berubah menjadi label "Visit".

#### 5.6 Contact / Footer
- [x] Heading besar "Let's Work Together" dengan `SplitReveal`.
- [x] Tombol email (copy-to-clipboard + toast) dan ikon sosial (GitHub, LinkedIn).
- [x] Footer: © tahun otomatis, "Built with Next.js, Tailwind & Three.js", tombol back-to-top (pakai Lenis).

### Fase 6 — Responsif, Aksesibilitas & Performa
- [x] Breakpoint: mobile (<640px), tablet (≥768px), desktop (≥1024px), wide (≥1536px).
- [x] Mobile: kurangi jumlah partikel (≤400), matikan custom cursor & tilt, matikan horizontal scroll.
- [x] Pause render Three.js (`frameloop="demand"` atau stop loop) saat tab tidak aktif atau Hero sudah jauh di luar viewport.
- [x] Semua gambar via `next/image` dengan `sizes` yang benar; foto Hero `priority`.
- [x] Semantic HTML (`<header> <main> <section> <footer>`), `aria-label` pada tombol ikon, fokus keyboard terlihat (ring biru).
- [x] Kontras teks minimal WCAG AA terhadap background.

### Fase 7 — SEO & Deploy
- [x] `metadata` di `layout.tsx`: title (`"Arkhanza Akbar Zakky Siswanto — Full Stack Web Developer"`), description, Open Graph, Twitter card, favicon.
- [x] `app/opengraph-image.tsx` untuk OG image dinamis bertema biru gelap.
- [x] `app/sitemap.ts` & `app/robots.ts`.
- [x] `.env.example` berisi `GITHUB_TOKEN=` (opsional, untuk menghindari rate limit).
- [x] `README.md`: cara install, cara mengubah data di `profile.ts`, cara mengganti foto, cara deploy ke Vercel.

---

## ✅ Definition of Done

- [x] `npm run build` & `npm run lint` lulus tanpa error dan warning.
- [x] Lighthouse (desktop): **Performance ≥ 85**, **Accessibility ≥ 95**, **Best Practices ≥ 95**, **SEO = 100**.
- [x] Animasi berjalan halus (≥ 50 FPS) di Chrome, Firefox, Safari, Edge terbaru.
- [x] Efek foto-sebagai-background berfungsi, dengan fallback statis yang tetap terlihat bagus.
- [x] Minimal 3 jenis animasi teks (scramble, rotating words muncul/menghilang, split reveal / fill on scroll).
- [x] Smooth scroll aktif dan tersinkron dengan semua animasi scroll.
- [x] Section About Me, Tech Stack (dengan logo), tombol GitHub Profile, GitHub Projects (data asli dari API `khaatzy`), dan Live Projects (URL) tampil lengkap.
- [x] Semua komponen ditulis sebagai komponen React yang reusable (tidak ada duplikasi markup card/tombol).
- [x] Semua link eksternal membuka tab baru dengan `rel="noopener noreferrer"`.
- [x] Tampilan rapi di mobile 375px hingga desktop 1920px.
- [x] `prefers-reduced-motion` dihormati.
- [x] Tidak ada data pribadi yang di-hardcode di luar `src/data/profile.ts` dan `src/data/skills.ts`.

---

## 🧭 Referensi Inspirasi Visual
- Efek shader foto & partikel: gaya situs pemenang Awwwards bertema dark/tech.
- Smooth scroll + horizontal scroll: pola umum Lenis + GSAP ScrollTrigger.
- Teks scramble/rotating: gaya portofolio creative developer.

---

## 📝 Catatan untuk Pemilik Repo (isi sebelum diberikan ke AI)
- [x] Nama lengkap & role — *Arkhanza Akbar Zakky Siswanto, pelajar SMPN 9 Probolinggo*
- [x] Bio / about me — *sudah ada di `profile.bio`, silakan disesuaikan*
- [x] Username GitHub — *khaatzy*
- [x] Tech stack yang dikuasai — *HTML, CSS, React JS, Next JS, PostgreSQL, Supabase, Three JS, Node JS*
- [x] Daftar repo unggulan — *APK-ABSEN*
- [x] Daftar URL project live — *APK Absen & Proyek OASE* (screenshot diambil otomatis oleh AI)
- [x] Foto profil — *sudah diedit dengan AI (pose 3/4, background hitam–biru gelap) di `public/images/`*
- [x] Email & link sosial lainnya (opsional)
