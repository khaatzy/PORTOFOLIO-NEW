# 🚀 Portofolio Pribadi — Arkhanza Akbar Zakky Siswanto

Website portofolio pribadi modern, responsif, dan interaktif dengan efek 3D WebGL, partikel, smooth scrolling, dan animasi teks sinematik.

Dibuat untuk **Arkhanza Akbar Zakky Siswanto** ([@khaatzy](https://github.com/khaatzy)), pelajar di SMPN 9 Probolinggo & Full Stack Web Developer.

---

## 🧰 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 (Design tokens: `#000000`, `#050A18`, `#0A1A3F`, `#10275E`, `#1E5EFF`, `#4DA3FF`, `#A9B8D6`, `#EAF0FF`)
- **3D & WebGL:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Animasi Scroll & Timeline:** GSAP + `@gsap/react` (`ScrollTrigger`)
- **Smooth Scroll:** Lenis (disinkronkan dengan GSAP ticker)
- **Animasi Komponen & Teks:** Motion (`motion/react`)
- **Ikon:** Lucide React & React Icons Simple Icons (`react-icons/si`)
- **Bahasa:** TypeScript (Strict Mode)

---

## 🚀 Fitur Unggulan

1. **3D Interactive Photo Plane Shader (Signature Effect):** Foto profil menyatu sebagai background dinamis dengan efek duotone gradasi biru-hitam, distorsi gelombang interaktif saat mouse digerakkan, serta membesar dan memudar halus saat di-scroll.
2. **Animasi Partikel 3D:** Ribuan partikel melayang dengan nuansa warna royal blue dan sky blue yang bergerak mengikuti scroll.
3. **Efek Animasi Teks:**
   - *Text Scramble*: Karakter acak ter-decode menjadi nama pemilik di Hero.
   - *Rotating Words*: Transisi kata bergantian dengan efek blur dan slide vertikal.
   - *Split Reveal*: Reveal teks per kata dengan rotasi 3D saat masuk ke viewport.
   - *Fill on Scroll*: Teks biografi About berubah warna mengikuti progress scroll pengguna.
4. **Smooth Scroll Lenis:** Pengalaman scroll halus dengan inersia alami dan progress bar tipis di puncak halaman.
5. **Section Tech Stack & Skills:** Menampilkan 8 teknologi utama lengkap dengan logo brand asli, efek glow hover, dan infinite marquee 2 arah.
6. **Integrasi GitHub API Dinamis:** Mengambil repositori publik secara real-time dengan caching ISR (1 jam), mengunggulkan project `APK-ABSEN` dengan badge *Featured Project*.
7. **Koleksi Project Live:** Showcase aplikasi web yang telah dipublikasikan (`APK Absen` & `Proyek OASE`) dengan mockup screenshot dan tombol kunjungan langsung.

---

## 🛠️ Instalasi & Menjalankan Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/khaatzy/PORTOFOLIO-NEW.git
   cd PORTOFOLIO-NEW
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

4. **Build untuk production:**
   ```bash
   npm run build
   npm run start
   ```

5. **Linting kode:**
   ```bash
   npm run lint
   ```

---

## 📝 Konfigurasi Data & Personalisasi

### 1. Mengubah Data Profil (`src/data/profile.ts`)
Semua informasi (nama, bio, username GitHub, lokasi, project live) tersimpan terpusat di `src/data/profile.ts`.
Cukup ubah nilainya di file tersebut tanpa perlu mengedit komponen tampilan.

### 2. Mengganti Foto Profil
- Letakkan foto baru di folder `public/images/profile.jpg` (disarankan rasio portrait 3:4 dengan resolusi minimal 1600px).
- Tersedia foto alternatif kasual di `public/images/profile-casual.jpg`. Untuk menggunakannya, ubah field `photo` pada `src/data/profile.ts`.

### 3. Menghindari Rate Limit GitHub API
Buat file `.env.local` dan tambahkan Personal Access Token GitHub (opsional):
```env
GITHUB_TOKEN=ghp_your_token_here
```

---

## 🌐 Deploy ke Vercel

1. Push seluruh kode ke repositori GitHub:
   ```bash
   git add .
   git commit -m "feat: complete modern portfolio website"
   git push origin master
   ```
2. Buka dashboard [Vercel](https://vercel.com/) dan pilih **Add New Project**.
3. Import repositori `PORTOFOLIO-NEW`.
4. Next.js akan terdeteksi otomatis. Klik **Deploy**.
