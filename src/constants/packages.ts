export type Package = {
  id: string;
  title: string;
  slug: string;
  city: string;
  duration: string;
  days: number;
  nights: number;
  price: number;
  priceDisplay: string;
  priceNote: string;
  groupSize: string;
  highlights: string[];
  inclusions: string[];
  badge?: string;
  popular?: boolean;
  icon: string;
};

export const SOMNATH_PACKAGES: Package[] = [
  {
    id: "somnath-darshan-day",
    title: "Somnath Darshan Day Trip",
    slug: "somnath-darshan-day-trip",
    city: "Somnath",
    duration: "1 Day",
    days: 1,
    nights: 0,
    price: 999,
    priceDisplay: "₹999",
    priceNote: "per day · 1–4 passengers",
    groupSize: "1–4",
    badge: "Best Value",
    popular: true,
    icon: "🛕",
    highlights: [
      "Somnath Jyotirlinga Temple",
      "Bhalka Tirth (Krishna departure site)",
      "Triveni Sangam & Somnath Beach",
      "Prabhas Patan Museum",
    ],
    inclusions: [
      "AC taxi for full day",
      "Verified local driver",
      "Pickup from station/hotel",
      "Flexible timing",
    ],
  },
  {
    id: "somnath-gir-2day",
    title: "Somnath + Gir Safari Package",
    slug: "somnath-gir-safari-2day",
    city: "Somnath",
    duration: "2 Days · 1 Night",
    days: 2,
    nights: 1,
    price: 2499,
    priceDisplay: "₹2,499",
    priceNote: "for 2 days · 1–4 passengers",
    groupSize: "1–4",
    badge: "Most Popular",
    popular: true,
    icon: "🦁",
    highlights: [
      "Somnath Temple morning darshan",
      "Gir National Park safari",
      "Devaliya Safari Park",
      "Kamleshwar Dam & Kankai Mata Temple",
    ],
    inclusions: [
      "AC taxi both days",
      "Verified driver",
      "Hotel drop & pickup",
      "Safari booking assistance",
    ],
  },
  {
    id: "somnath-diu-daytrip",
    title: "Somnath to Diu Day Trip",
    slug: "somnath-diu-day-trip",
    city: "Somnath",
    duration: "1 Day",
    days: 1,
    nights: 0,
    price: 1499,
    priceDisplay: "₹1,499",
    priceNote: "per day · 1–4 passengers",
    groupSize: "1–4",
    badge: undefined,
    popular: false,
    icon: "🏖️",
    highlights: [
      "Diu Fort (Portuguese heritage)",
      "Naida Caves",
      "Gangeshwar Temple (sea-level Shivlings)",
      "Diu Beach & sunset point",
    ],
    inclusions: [
      "AC taxi full day",
      "Verified driver",
      "Pickup & drop Somnath",
      "Sightseeing stops",
    ],
  },
  {
    id: "somnath-circuit-3day",
    title: "Saurashtra Pilgrimage Circuit",
    slug: "saurashtra-pilgrimage-3day",
    city: "Somnath",
    duration: "3 Days · 2 Nights",
    days: 3,
    nights: 2,
    price: 5999,
    priceDisplay: "₹5,999",
    priceNote: "for 3 days · 1–4 passengers",
    groupSize: "1–4",
    badge: "Premium",
    popular: true,
    icon: "🗺️",
    highlights: [
      "Somnath + Veraval temples",
      "Gir Forest safari",
      "Junagadh — Uparkot & Girnar",
      "Dwarka Dwarkadhish Temple",
    ],
    inclusions: [
      "AC taxi all 3 days",
      "Experienced driver-guide",
      "Hotel assistance",
      "Flexible itinerary",
    ],
  },
];
