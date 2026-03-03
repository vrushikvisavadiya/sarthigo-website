import type { Metadata } from "next";
import { AboutHero } from "@/sections/about/about-hero";
import { AboutStory } from "@/sections/about/about-story";
import { AboutValues } from "@/sections/about/about-values";
import { AboutCTA } from "@/sections/about/about-cta";

export const metadata: Metadata = {
  title: "About Us — Sarthigo",
  description:
    "Learn about Sarthigo — the trusted local taxi and tour booking platform for pilgrimage cities in Gujarat. Our story, mission and values.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
