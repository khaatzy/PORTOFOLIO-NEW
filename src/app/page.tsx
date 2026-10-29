import React from "react";
import { getGithubRepos } from "@/lib/github";
import { Navbar } from "@/components/ui/Navbar";
import { Preloader } from "@/components/ui/Preloader";
import { DynamicBackground } from "@/components/three/DynamicBackground";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { GithubProjects } from "@/components/sections/GithubProjects";
import { LiveProjects } from "@/components/sections/LiveProjects";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 3600; // Revalidate page every hour

export default async function HomePage() {
  const repos = await getGithubRepos();

  return (
    <>
      <Preloader />
      <Navbar />
      <DynamicBackground />

      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <GithubProjects repos={repos} />
        <LiveProjects />
      </main>

      <Contact />
    </>
  );
}
