import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, getAllCitySlugs } from "@/constants/cities";
import { CityHero } from "@/sections/city/city-hero";
import { CityAttractions } from "@/sections/city/city-attractions";
import { CityPackages } from "@/sections/city/city-packages";
import { CityFaq } from "@/sections/city/city-faq";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";

// ── Pre-render all known city slugs at build time ──
export async function generateStaticParams() {
  return getAllCitySlugs();
}

// ── Per-city SEO metadata ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  return {
    title: `Taxi & Tour Packages in ${city.name} | Sarthigo`,
    description: `Book verified local taxis and tour packages in ${city.name}, Gujarat. ${city.tagline}. Starting ₹999/day. No prepayment needed.`,
    keywords: [
      `${city.name.toLowerCase()} taxi`,
      `${city.name.toLowerCase()} tour package`,
      `${city.name.toLowerCase()} cab booking`,
      `pilgrimage taxi ${city.name.toLowerCase()}`,
      "sarthigo",
    ],
    openGraph: {
      title: `${city.name} Taxi & Tour Packages — Sarthigo`,
      description: city.description,
    },
  };
}

// ── Page ──
export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Cities", href: "/city/somnath" },
          { name: city.name, href: `/city/${slug}` },
        ]}
      />
      <FaqJsonLd faqs={city.faqs} />
      <CityHero city={city} />
      <CityAttractions city={city} />
      <CityPackages city={city} />
      <CityFaq city={city} />
    </>
  );
}
