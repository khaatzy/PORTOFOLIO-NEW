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

    // Filter out forks
    const ownRepos = (data as RawGithubRepo[]).filter((repo) => !repo.fork);

    // Sort: featuredRepos first, then stars desc, then updated_at desc
    const featuredNames = new Set(profile.featuredRepos.map((n) => n.toLowerCase()));

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
      const isFeat = featuredNames.has(r.name.toLowerCase());
      return {
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage || (isFeat ? "https://apk-absen-nine.vercel.app/" : null),
        stargazers_count: r.stargazers_count ?? 0,
        forks_count: r.forks_count ?? 0,
        language: r.language,
        topics: r.topics ?? [],
        isFeatured: isFeat,
      };
    });

    // If APK-ABSEN was not found in API response, ensure it's prepended
    if (!mapped.some((m) => m.name.toLowerCase() === "apk-absen")) {
      mapped.unshift(getApkAbsenFallback());
    }

    return mapped;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return getFallbackRepos();
  }
}

function getApkAbsenFallback(): GitHubRepoItem {
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

function getFallbackRepos(): GitHubRepoItem[] {
  return [
    getApkAbsenFallback(),
    {
      id: 102,
      name: "PORTOFOLIO-NEW",
      description: "Website portofolio pribadi modern dengan Next.js, Tailwind CSS, Three.js, dan GSAP.",
      html_url: `https://github.com/${profile.githubUsername}/PORTOFOLIO-NEW`,
      homepage: null,
      stargazers_count: 0,
      forks_count: 0,
      language: "TypeScript",
      topics: ["nextjs", "threejs", "tailwind", "gsap"],
      isFeatured: false,
    },
  ];
}
