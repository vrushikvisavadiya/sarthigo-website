import { CityData, SOMNATH_CITY } from "./somnath";
export type { CityData } from "./somnath";

// Registry — add new cities here
const CITY_REGISTRY = {
  somnath: SOMNATH_CITY,
} as const;

export type CitySlug = keyof typeof CITY_REGISTRY;

export function getCityBySlug(slug: string): CityData | null {
  return (CITY_REGISTRY as Record<string, CityData>)[slug] ?? null;
}

export function getAllCitySlugs(): { slug: string }[] {
  return Object.keys(CITY_REGISTRY).map((slug) => ({ slug }));
}

export { SOMNATH_CITY };
