"use client";

import { useState, useCallback, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Car,
  Calendar,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { whatsappBookingUrl } from "@/constants";
import { CITIES_LIST, CAR_TYPES, TRIP_TYPES } from "@/sections/home/booking-search-form";
import { cn } from "@/lib/utils";

// ── Extended Package Data ──────────────────────
const ALL_PACKAGES = [
  {
    id: "somnath-darshan-day",
    title: "Somnath Darshan Day Trip",
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
    inclusions: ["Innova Crysta all 3 days", "Experienced driver-guide", "Hotel assistance", "Priority pilgrimage timing"],
  },
  {
    id: "group-tempo-kutch",
    title: "Kutch Group Tour — Tempo Traveller",
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
  {
    id: "ambaji-day",
    title: "Ambaji Darshan Day Trip",
    city: "ambaji",
    tripType: "day-trip",
    cars: ["sedan", "suv"],
    duration: "1 Day",
    days: 1,
    nights: 0,
    price: 1099,
    priceDisplay: "₹1,099",
    priceNote: "per day · 1–4 passengers",
    groupSize: "1–4",
    badge: undefined,
    popular: false,
    icon: "🙏",
    highlights: [
      "Ambaji Shakti Peeth",
      "Koteshwar Mahadev Temple",
      "Gabbar Hill Ropeway",
      "Evening Aarti at temple",
    ],
    inclusions: ["AC taxi full day", "Verified local driver", "Pickup & drop", "Temple stop planning"],
  },
  {
    id: "diu-day",
    title: "Diu Island Day Trip",
    city: "diu",
    tripType: "day-trip",
    cars: ["sedan", "suv"],
    duration: "1 Day",
    days: 1,
    nights: 0,
    price: 1399,
    priceDisplay: "₹1,399",
    priceNote: "per day · 1–4 passengers",
    groupSize: "1–4",
    badge: undefined,
    popular: false,
    icon: "🏖️",
    highlights: [
      "Diu Fort & old city walk",
      "Naida Caves",
      "Gangeshwar Temple",
      "Ghoghla Beach sunset",
    ],
    inclusions: ["AC taxi full day", "Local driver", "Pickup & drop", "All sightseeing stops"],
  },
];

// ── Package type ────────────────────────────────
type Package = (typeof ALL_PACKAGES)[number];

// ── Filter State ───────────────────────────────
interface FilterState {
  city: string;
  car: string;
  trip: string;
}

// ── Package Card ───────────────────────────────
function PackageCard({ pkg, index }: { pkg: (typeof ALL_PACKAGES)[number]; index: number }) {
  const msg = `Hi! I'm interested in the "${pkg.title}" package from Sarthigo.\n📍 City: ${CITIES_LIST.find((c) => c.value === pkg.city)?.label}\n📅 Duration: ${pkg.duration}\nPlease share details and availability.`;
  const availableCars = CAR_TYPES.filter((c) => pkg.cars.includes(c.value));

  return (
    <m.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="flex"
    >
      <Card
        className={cn(
          "relative flex flex-col w-full border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden",
          pkg.popular && "ring-2 ring-secondary ring-offset-2"
        )}
      >
        {/* Badge */}
        {pkg.badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="secondary" className="rounded-full text-xs font-semibold shadow">
              {pkg.badge}
            </Badge>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-br from-primary/5 via-muted/30 to-secondary/10 p-6 flex flex-col gap-3 relative">
          <span className="text-5xl">{pkg.icon}</span>
          <div>
            <h3 className="font-heading font-bold text-foreground text-xl leading-snug">{pkg.title}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5 flex-wrap">
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
          </div>
          {/* Car pills */}
          <div className="flex flex-wrap gap-1.5">
            {availableCars.map((c) => (
              <span
                key={c.value}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background text-muted-foreground text-[10px] px-2 py-0.5 font-medium"
              >
                {c.icon} {c.label}
              </span>
            ))}
          </div>
        </div>

        <CardContent className="flex flex-col gap-4 p-5 flex-1">
          {/* Highlights */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Highlights</p>
            {pkg.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {h}
              </div>
            ))}
          </div>

          <Separator />

          {/* Inclusions */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inclusions</p>
            <div className="grid grid-cols-2 gap-1.5">
              {pkg.inclusions.map((inc, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="text-green-500">✓</span>
                  {inc}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price + CTA */}
          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="text-2xl font-heading font-bold text-foreground">{pkg.priceDisplay}</span>
              <p className="text-xs text-muted-foreground">{pkg.priceNote}</p>
            </div>
            <Badge
              variant="outline"
              className="text-xs rounded-full border-green-500/30 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
            >
              No Prepayment
            </Badge>
          </div>

          <Button
            asChild
            className="w-full rounded-xl gap-2 font-semibold"
            variant={pkg.popular ? "secondary" : "default"}
            size="lg"
          >
            <a href={whatsappBookingUrl(msg)} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="h-5 w-5" />
              Book This Package
            </a>
          </Button>
        </CardContent>
      </Card>
    </m.div>
  );
}

// ── Main List ──────────────────────────────────
export function PackagesList() {
  const [filters, setFilters] = useState<FilterState>({ city: "", car: "", trip: "" });
  const [packages, setPackages] = useState<Package[]>(ALL_PACKAGES);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
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
  const hasFilters = filters.city || filters.car || filters.trip;

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Filter Bar */}
        <div className="flex flex-col gap-3 mb-10">
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
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="h-9 pl-7 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
              >
                <option value="">All Cities</option>
                {CITIES_LIST.map((c) => (
                  <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>

            {/* Car */}
            <div className="relative">
              <Car className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <select
                value={filters.car}
                onChange={(e) => setFilters({ ...filters, car: e.target.value })}
                className="h-9 pl-7 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
              >
                <option value="">All Vehicles</option>
                {CAR_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>

            {/* Trip Type */}
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <select
                value={filters.trip}
                onChange={(e) => setFilters({ ...filters, trip: e.target.value })}
                className="h-9 pl-7 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
              >
                <option value="">Any Duration</option>
                {TRIP_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                ))}
              </select>
            </div>

            {hasFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 h-9 px-3 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}

            <span className="text-sm text-muted-foreground ml-auto hidden sm:block">
              {filtered.length} package{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {filters.city && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-xs px-2.5 py-1 font-medium">
                  {CITIES_LIST.find((c) => c.value === filters.city)?.icon}{" "}
                  {CITIES_LIST.find((c) => c.value === filters.city)?.label}
                  <button onClick={() => setFilters({ ...filters, city: "" })} className="ml-0.5 hover:opacity-70">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.car && (
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 text-secondary text-xs px-2.5 py-1 font-medium">
                  {CAR_TYPES.find((c) => c.value === filters.car)?.icon}{" "}
                  {CAR_TYPES.find((c) => c.value === filters.car)?.label}
                  <button onClick={() => setFilters({ ...filters, car: "" })} className="ml-0.5 hover:opacity-70">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.trip && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted text-foreground text-xs px-2.5 py-1 font-medium">
                  {TRIP_TYPES.find((t) => t.value === filters.trip)?.icon}{" "}
                  {TRIP_TYPES.find((t) => t.value === filters.trip)?.label}
                  <button onClick={() => setFilters({ ...filters, trip: "" })} className="ml-0.5 hover:opacity-70">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <span className="text-xs text-muted-foreground sm:hidden">{filtered.length} found</span>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))
            ) : (
              <m.div
                key="empty"
                className="col-span-full flex flex-col items-center gap-4 py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-5xl">🔍</span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-foreground text-lg">No packages match your filters</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Try adjusting your city, vehicle or trip type. Or WhatsApp us for a custom package!
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <X className="h-4 w-4" /> Clear Filters
                  </button>
                  <Button asChild className="rounded-xl gap-2 bg-green-500 hover:bg-green-600 text-white">
                    <a href="https://wa.me/917984789311" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="h-4 w-4" />
                      Custom Package
                    </a>
                  </Button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-heading font-bold text-foreground text-xl">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Tell us your dates, group size and destinations — we&apos;ll
              create a personalised itinerary with a verified driver.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-xl gap-2 font-semibold"
            >
              <a
                href={whatsappBookingUrl("Hi! I need a custom tour package from Somnath.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
                Custom Package
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl gap-2">
              <a href="/contact">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
