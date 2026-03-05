"use client";

import { useState, useCallback, useId, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Clock, Users, CheckCircle2, ArrowRight, MapPin, Car, Calendar, SlidersHorizontal, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { whatsappBookingUrl } from "@/constants";
import { CITIES_LIST, CAR_TYPES, TRIP_TYPES } from "@/sections/home/booking-search-form";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Extended Packages with City + Car + Trip metadata ──

const ALL_PACKAGES = [
  {
    id: "somnath-darshan-day",
    title: "Somnath Darshan Day Trip",
    slug: "somnath-darshan-day-trip",
    city: "somnath",
    tripType: "day-trip",
    cars: ["sedan", "suv"],
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
    inclusions: ["AC taxi for full day", "Verified local driver", "Pickup from station/hotel", "Flexible timing"],
  },
  {
    id: "somnath-gir-2day",
    title: "Somnath + Gir Safari Package",
    slug: "somnath-gir-safari-2day",
    city: "somnath",
    tripType: "2day",
    cars: ["sedan", "suv", "innova"],
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
    inclusions: ["AC taxi both days", "Verified driver", "Hotel drop & pickup", "Safari booking assistance"],
  },
  {
    id: "somnath-diu-daytrip",
    title: "Somnath to Diu Day Trip",
    slug: "somnath-diu-day-trip",
    city: "somnath",
    tripType: "day-trip",
    cars: ["sedan", "suv", "innova"],
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
    inclusions: ["AC taxi full day", "Verified driver", "Pickup & drop Somnath", "Sightseeing stops"],
  },
  {
    id: "somnath-circuit-3day",
    title: "Saurashtra Pilgrimage Circuit",
    slug: "saurashtra-pilgrimage-3day",
    city: "somnath",
    tripType: "3day",
    cars: ["suv", "innova"],
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
    inclusions: ["AC taxi all 3 days", "Experienced driver-guide", "Hotel assistance", "Flexible itinerary"],
  },
  {
    id: "dwarka-darshan-day",
    title: "Dwarka Darshan Day Trip",
    slug: "dwarka-darshan-day-trip",
    city: "dwarka",
    tripType: "day-trip",
    cars: ["sedan", "suv"],
    duration: "1 Day",
    days: 1,
    nights: 0,
    price: 1499,
    priceDisplay: "₹1,499",
    priceNote: "per day · 1–4 passengers",
    groupSize: "1–4",
    badge: undefined,
    popular: false,
    icon: "🐚",
    highlights: [
      "Dwarkadhish Temple",
      "Beyt Dwarka Island",
      "Nageshwar Jyotirlinga",
      "Rukmini Devi Temple",
    ],
    inclusions: ["AC taxi full day", "Verified local driver", "Pickup & drop", "Flexible timing"],
  },
  {
    id: "dwarka-2day",
    title: "Dwarka & Somnath 2-Day Package",
    slug: "dwarka-somnath-2day",
    city: "dwarka",
    tripType: "2day",
    cars: ["suv", "innova"],
    duration: "2 Days · 1 Night",
    days: 2,
    nights: 1,
    price: 3999,
    priceDisplay: "₹3,999",
    priceNote: "for 2 days · 2–6 passengers",
    groupSize: "2–6",
    badge: "Popular",
    popular: true,
    icon: "🛕",
    highlights: [
      "Dwarkadhish & Nageshwar temples",
      "Somnath Jyotirlinga",
      "Beyt Dwarka boat ride",
      "Evening aarti at Somnath",
    ],
    inclusions: ["AC SUV both days", "Experienced guide-driver", "Hotel drop & pickup", "Temple entry support"],
  },
  {
    id: "gir-safari-day",
    title: "Gir Safari Day Trip",
    slug: "gir-safari-day-trip",
    city: "gir",
    tripType: "day-trip",
    cars: ["sedan", "suv"],
    duration: "1 Day",
    days: 1,
    nights: 0,
    price: 1299,
    priceDisplay: "₹1,299",
    priceNote: "per day · 1–4 passengers",
    groupSize: "1–4",
    badge: undefined,
    popular: false,
    icon: "🦁",
    highlights: [
      "Gir National Park jeep safari",
      "Devaliya Safari Park",
      "Kamleshwar Dam",
      "Kankai Mata Temple",
    ],
    inclusions: ["AC taxi full day", "Local safari-expert driver", "Pickup & drop", "Safari permit guidance"],
  },
  {
    id: "junagadh-day",
    title: "Junagadh Heritage Day Trip",
    slug: "junagadh-heritage-day",
    city: "junagadh",
    tripType: "day-trip",
    cars: ["sedan", "suv"],
    duration: "1 Day",
    days: 1,
    nights: 0,
    price: 1199,
    priceDisplay: "₹1,199",
    priceNote: "per day · 1–4 passengers",
    groupSize: "1–4",
    badge: undefined,
    popular: false,
    icon: "🏰",
    highlights: [
      "Uparkot Fort",
      "Girnar Rope-way & temples",
      "Mahabat Maqbara",
      "Damodar Kund",
    ],
    inclusions: ["AC taxi full day", "Local driver", "Flexible stops", "Pickup & drop"],
  },
  {
    id: "group-pilgrimage-innova",
    title: "Group Pilgrimage — Innova Crysta",
    slug: "group-pilgrimage-innova",
    city: "somnath",
    tripType: "3day",
    cars: ["innova"],
    duration: "3 Days · 2 Nights",
    days: 3,
    nights: 2,
    price: 7999,
    priceDisplay: "₹7,999",
    priceNote: "for 3 days · 1–7 passengers",
    groupSize: "1–7",
    badge: "Group Special",
    popular: true,
    icon: "🚐",
    highlights: [
      "All Saurashtra holy sites",
      "Somnath, Gir, Dwarka, Junagadh",
      "Premium Innova Crysta",
      "Night halt arrangements",
    ],
    inclusions: ["Innova Crysta all 3 days", "Experienced driver-guide", "Hotel assistance", "Priorities pilgrimage timing"],
  },
  {
    id: "group-tempo-kutch",
    title: "Kutch Group Tour — Tempo Traveller",
    slug: "kutch-group-tempo",
    city: "kutch",
    tripType: "3day",
    cars: ["tempo"],
    duration: "3 Days · 2 Nights",
    days: 3,
    nights: 2,
    price: 14999,
    priceDisplay: "₹14,999",
    priceNote: "for 3 days · 8–12 passengers",
    groupSize: "8–12",
    badge: "Group Tour",
    popular: false,
    icon: "🌅",
    highlights: [
      "Rann of Kutch white desert",
      "Dholavira heritage site",
      "Bhuj city tour",
      "Kalo Dungar viewpoint",
    ],
    inclusions: ["Tempo Traveller 3 days", "Experienced driver", "Hotel & stay assistance", "Full Kutch circuit"],
  },
];

// ── Package type ────────────────────────────────
type Package = (typeof ALL_PACKAGES)[number];

// ── Filter Bar ──────────────────────────────────
interface FilterState {
  city: string;
  car: string;
  trip: string;
}

function FilterBar({
  filters,
  onChange,
  resultCount,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
}) {
  const hasFilters = filters.city || filters.car || filters.trip;

  return (
    <div className="flex flex-col gap-3">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground shrink-0">
          <SlidersHorizontal className="h-4 w-4" />
          Filter:
        </div>

        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={filters.city}
            onChange={(e) => onChange({ ...filters, city: e.target.value })}
            className="h-9 pl-7 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
          >
            <option value="">All Cities</option>
            {CITIES_LIST.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Car */}
        <div className="relative">
          <Car className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={filters.car}
            onChange={(e) => onChange({ ...filters, car: e.target.value })}
            className="h-9 pl-7 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
          >
            <option value="">All Vehicles</option>
            {CAR_TYPES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Trip */}
        <div className="relative">
          <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={filters.trip}
            onChange={(e) => onChange({ ...filters, trip: e.target.value })}
            className="h-9 pl-7 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
          >
            <option value="">Any Duration</option>
            {TRIP_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.icon} {t.label}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={() => onChange({ city: "", car: "", trip: "" })}
            className="flex items-center gap-1 h-9 px-3 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}

        <span className="text-sm text-muted-foreground ml-auto hidden sm:block">
          {resultCount} package{resultCount !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-1.5 items-center">
          {filters.city && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-xs px-2.5 py-1 font-medium">
              {CITIES_LIST.find((c) => c.value === filters.city)?.icon}{" "}
              {CITIES_LIST.find((c) => c.value === filters.city)?.label}
              <button onClick={() => onChange({ ...filters, city: "" })} className="ml-0.5 hover:opacity-70">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.car && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 text-secondary text-xs px-2.5 py-1 font-medium">
              {CAR_TYPES.find((c) => c.value === filters.car)?.icon}{" "}
              {CAR_TYPES.find((c) => c.value === filters.car)?.label}
              <button onClick={() => onChange({ ...filters, car: "" })} className="ml-0.5 hover:opacity-70">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.trip && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted text-foreground text-xs px-2.5 py-1 font-medium">
              {TRIP_TYPES.find((t) => t.value === filters.trip)?.icon}{" "}
              {TRIP_TYPES.find((t) => t.value === filters.trip)?.label}
              <button onClick={() => onChange({ ...filters, trip: "" })} className="ml-0.5 hover:opacity-70">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          <span className="text-xs text-muted-foreground sm:hidden">{resultCount} found</span>
        </div>
      )}
    </div>
  );
}

// ── Package Card ────────────────────────────────
function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const whatsappMsg = `Hi! I'm interested in the "${pkg.title}" package from Sarthigo.\n📍 City: ${pkg.city}\n📅 Duration: ${pkg.duration}\nPlease share details.`;

  const availableCars = CAR_TYPES.filter((c) => pkg.cars.includes(c.value));

  return (
    <Card
      className={cn(
        "relative flex flex-col w-full border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300",
        pkg.popular && "ring-2 ring-secondary ring-offset-2"
      )}
    >
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge
            variant={pkg.badge === "Best Value" || pkg.badge === "Premium" ? "outline" : "secondary"}
            className="rounded-full px-3 py-0.5 text-xs font-semibold shadow-sm border-secondary/40"
          >
            {pkg.badge}
          </Badge>
        </div>
      )}

      <CardContent className="flex flex-col gap-4 p-5 flex-1">
        {/* Icon + Title */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-3xl">{pkg.icon}</span>
          <h3 className="font-heading font-bold text-foreground text-base leading-snug">{pkg.title}</h3>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-secondary" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-secondary" />
            {pkg.groupSize} pax
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            {CITIES_LIST.find((c) => c.value === pkg.city)?.label ?? pkg.city}
          </span>
        </div>

        {/* Car Type Badges */}
        <div className="flex flex-wrap gap-1.5">
          {availableCars.map((c) => (
            <span
              key={c.value}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/30 text-muted-foreground text-[10px] px-2 py-0.5 font-medium"
            >
              {c.icon} {c.label}
            </span>
          ))}
        </div>

        <Separator />

        {/* Highlights */}
        <div className="flex flex-col gap-1.5 flex-1">
          {pkg.highlights.map((highlight, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-2xl font-heading font-bold text-foreground">{pkg.priceDisplay}</span>
            <span className="text-xs text-muted-foreground">{pkg.priceNote}</span>
          </div>
          <Badge
            variant="outline"
            className="text-xs rounded-full border-green-500/30 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
          >
            No Prepayment
          </Badge>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="w-full rounded-xl gap-2 font-semibold"
          variant={pkg.popular ? "secondary" : "default"}
        >
          <a href={whatsappBookingUrl(whatsappMsg)} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="h-4 w-4" />
            Book This Package
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Empty State ─────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-4 py-16 text-center">
      <span className="text-5xl">🔍</span>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-bold text-foreground text-lg">No packages match your filters</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Try adjusting your city, vehicle type or trip duration. Or reach us on WhatsApp for a custom package.
        </p>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <Button variant="outline" onClick={onReset} className="rounded-xl gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
        <Button asChild className="rounded-xl gap-2 bg-green-500 hover:bg-green-600 text-white">
          <a href="https://wa.me/917984789311" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="h-4 w-4" />
            Request Custom Package
          </a>
        </Button>
      </div>
    </div>
  );
}

// ── Main Section ────────────────────────────────
export function PackagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [filters, setFilters] = useState<FilterState>({ city: "", car: "", trip: "" });
  const [packages, setPackages] = useState<Package[]>(ALL_PACKAGES);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          // Map DB package to front-end shape
          const dbPackages = json.data.map((p: any) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            city: p.city,
            tripType: p.trip_type,
            cars: p.cars || [],
            duration: p.duration,
            days: p.days,
            nights: p.nights,
            price: p.price,
            priceDisplay: `₹${p.price.toLocaleString("en-IN")}`,
            priceNote: p.price_note,
            groupSize: p.group_size,
            badge: p.badge,
            popular: p.popular,
            icon: p.icon || "🛕",
            highlights: p.highlights || [],
            inclusions: p.inclusions || [],
            image: p.image_url,
          }));
          setPackages(dbPackages);
        }
      })
      .catch((err) => console.error("Failed to load packages", err));
  }, []);

  const filtered = packages.filter((pkg) => {
    if (filters.city && pkg.city !== filters.city) return false;
    if (filters.car && !pkg.cars.includes(filters.car)) return false;
    if (filters.trip && pkg.tripType !== filters.trip) return false;
    return true;
  });

  const handleReset = useCallback(() => setFilters({ city: "", car: "", trip: "" }), []);

  return (
    <section ref={ref} id="packages" className="w-full py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3 mb-10"
        >
          <Badge
            variant="outline"
            className="w-fit rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
          >
            🛕 Tour Packages
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Choose Your <span className="text-secondary">Perfect Package</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            Filter by city, vehicle type and trip duration. All packages include a verified AC taxi — pay after the trip.
          </p>
        </m.div>

        {/* Filter Bar */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8"
        >
          <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
        </m.div>

        {/* Packages Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <EmptyState onReset={handleReset} key="empty" />
            ) : (
              filtered.map((pkg, i) => (
                <m.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex"
                >
                  <PackageCard pkg={pkg} index={i} />
                </m.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
        >
          <p className="text-muted-foreground text-sm">Need a custom itinerary?</p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            View All Packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
