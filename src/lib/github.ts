import { profile } from "@/data/profile";
import type { GitHubRepoItem } from "@/components/ui/ProjectCard";

interface RawGithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  updated_at: string;
}

export async function getGithubRepos(): Promise<GitHubRepoItem[]> {
  const username = profile.githubUsername;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 }, // ISR 1 hour
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}`);
      return getFallbackRepos();
    }

    const data: unknown = await res.json();
    if (!Array.isArray(data)) {
      return getFallbackRepos();
    }

    // Filter out forks and old "Porto" placeholder (replaced by OASE)
    const ownRepos = (data as RawGithubRepo[]).filter(
      (repo) => !repo.fork && repo.name.toLowerCase() !== "porto"
    );

    const featuredNames = new Set(
      profile.featuredRepos.map((n) => n.toLowerCase())
    );

    ownRepos.sort((a, b) => {
      const aFeatured = featuredNames.has(a.name.toLowerCase()) ? 1 : 0;
      const bFeatured = featuredNames.has(b.name.toLowerCase()) ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;

      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    const mapped: GitHubRepoItem[] = ownRepos.slice(0, 6).map((r) => {
      let displayName = r.name;
      let description = r.description;
      let homepage = r.homepage;

      // Fix "landing" to clear title and proper homepage
      if (r.name.toLowerCase() === "landing") {
        displayName = "OASE Landing Page";
        description =
          "Landing page interaktif untuk platform curhat anonim Proyek OASE.";
        homepage = "https://landing-oase2.vercel.app";
      } else if (r.name.toLowerCase() === "portofolio-new") {
        displayName = "Portofolio Website";
        description =
          "Website portofolio pribadi modern dengan Next.js, Tailwind CSS, Three.js, dan GSAP.";
        homepage = "https://portofolio-new-beige.vercel.app";
      }

      const isFeat = featuredNames.has(r.name.toLowerCase());
      return {
        id: r.id,
        name: displayName,
        description,
        html_url: r.html_url,
        homepage: homepage || (isFeat ? "https://apk-absen-nine.vercel.app/" : null),
        stargazers_count: r.stargazers_count ?? 0,
        forks_count: r.forks_count ?? 0,
        language: r.language,
        topics: r.topics ?? [],
        isFeatured: isFeat,
      };
    });

    // Ensure Proyek OASE is always present (replaces "Porto")
    if (
      !mapped.some(
        (m) =>
          m.name.toLowerCase().includes("oase") ||
          m.html_url.includes("oase-cerita")
      )
    ) {
      mapped.push(getOaseProject());
    }

    // Ensure APK-ABSEN is always prepended as first featured project
    if (!mapped.some((m) => m.name.toLowerCase() === "apk-absen")) {
      mapped.unshift(getApkAbsenFallback());
    }

    // Always ensure Proyek OASE comes right next to featured projects
    mapped.sort((a, b) => {
      const aRank = a.isFeatured ? 2 : a.name.includes("OASE") ? 1 : 0;
      const bRank = b.isFeatured ? 2 : b.name.includes("OASE") ? 1 : 0;
      return bRank - aRank;
    });

    return mapped;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return getFallbackRepos();
  }
}

export function getApkAbsenFallback(): GitHubRepoItem {
  return {
    id: 101,
    name: "APK-ABSEN",
    description:
      "Aplikasi absensi digital berbasis QR Code dengan verifikasi berkeamanan tinggi, anti-titip absen, dan sinkronisasi real-time.",
    html_url: "https://github.com/khaatzy/APK-ABSEN",
    homepage: "https://apk-absen-nine.vercel.app/",
    stargazers_count: 1,
    forks_count: 0,
    language: "TypeScript",
    topics: ["qr-code", "security", "postgresql", "fullstack"],
    isFeatured: true,
  };
}

export function getOaseProject(): GitHubRepoItem {
  return {
    id: 102,
    name: "Proyek OASE",
    description:
      "Platform curhat anonim berbasis digital untuk lingkungan sekolah. Siswa dapat bercerita dengan aman karena anonimitas terjamin sepenuhnya.",
    html_url: "https://github.com/khaatzy/oase-cerita",
    homepage: "https://proyek-oase-anvapro.vercel.app/",
    stargazers_count: 1,
    forks_count: 0,
    language: "TypeScript",
    topics: ["anonymous", "privacy", "school", "nextjs", "supabase"],
    isFeatured: true,
  };
}

function getFallbackRepos(): GitHubRepoItem[] {
  return [
    getApkAbsenFallback(),
    getOaseProject(),
    {
      id: 103,
      name: "OASE Landing Page",
      description:
        "Landing page interaktif untuk platform curhat anonim Proyek OASE.",
      html_url: `https://github.com/${profile.githubUsername}/landing`,
      homepage: "https://landing-oase2.vercel.app",
      stargazers_count: 0,
      forks_count: 0,
      language: "TypeScript",
      topics: ["nextjs", "tailwind", "landing-page"],
      isFeatured: false,
    },
    {
      id: 104,
      name: "Portofolio Website",
      description:
        "Website portofolio pribadi modern dengan Next.js, Tailwind CSS, Three.js, dan GSAP.",
      html_url: `https://github.com/${profile.githubUsername}/PORTOFOLIO-NEW`,
      homepage: "https://portofolio-new-beige.vercel.app",
      stargazers_count: 0,
      forks_count: 0,
      language: "TypeScript",
      topics: ["nextjs", "threejs", "tailwind"],
      isFeatured: false,
    },
  ];
}
