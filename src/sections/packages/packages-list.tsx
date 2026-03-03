"use client";

import { useState } from "react";
import { m } from "motion/react";
import Image from "next/image";
import {
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SOMNATH_PACKAGES, whatsappBookingUrl } from "@/constants";
import type { Package } from "@/constants";
import { IMAGES } from "@/constants/images";

// ── Filter config ──────────────────────────────
const FILTERS = [
  { label: "All", value: "all" },
  { label: "1 Day", value: "1" },
  { label: "2 Days", value: "2" },
  { label: "3+ Days", value: "3" },
];

const PACKAGE_IMAGES: Record<string, string> = {
  "somnath-darshan-day": IMAGES.packages.somnathDarshan,
  "somnath-gir-2day": IMAGES.packages.girSafari,
  "somnath-diu-daytrip": IMAGES.packages.diuBeach,
  "somnath-circuit-3day": IMAGES.packages.saurasthaCircuit,
};

// ── Package Card ───────────────────────────────
function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const image = PACKAGE_IMAGES[pkg.id] ?? IMAGES.cities.somnath;
  const msg = `Hi! I'm interested in the "${pkg.title}" package from Sarthigo.`;

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card
        className={`py-0  group flex flex-col h-full border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden
          ${pkg.popular ? "ring-2 ring-secondary ring-offset-2" : ""}
        `}
      >
        {/* Image */}
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={image}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Overlays */}
          <div className="absolute top-3 left-3 flex gap-2">
            {pkg.badge && (
              <Badge
                variant="secondary"
                className="rounded-full text-xs font-semibold shadow"
              >
                {pkg.badge}
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="rounded-lg bg-black/60 backdrop-blur-sm px-3 py-1 text-sm font-bold text-white">
              {pkg.priceDisplay}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white/80 text-xs">
            <Clock className="h-3.5 w-3.5" />
            {pkg.duration}
          </div>
        </div>

        <CardContent className="flex flex-col gap-4 p-5 flex-1">
          {/* Title + meta */}
          <div className="flex flex-col gap-1">
            <h3 className="font-heading font-bold text-foreground text-lg leading-snug">
              {pkg.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-secondary" />
                {pkg.groupSize} passengers
              </span>
              <span className="flex items-center gap-1">
                <span className="text-secondary">📍</span>
                {pkg.city}
              </span>
            </div>
          </div>

          <Separator />

          {/* Highlights */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Highlights
            </p>
            {pkg.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {h}
              </div>
            ))}
          </div>

          <Separator />

          {/* Inclusions */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Inclusions
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {pkg.inclusions.map((inc, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
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
              <span className="text-2xl font-heading font-bold text-foreground">
                {pkg.priceDisplay}
              </span>
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
            <a
              href={whatsappBookingUrl(msg)}
              target="_blank"
              rel="noopener noreferrer"
            >
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
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = SOMNATH_PACKAGES.filter((pkg) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "3") return pkg.days >= 3;
    return pkg.days === Number(activeFilter);
  });

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Filter by duration:
            </span>
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all
                    ${
                      activeFilter === f.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {filtered.length} package{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-5xl">🔍</span>
            <p className="text-muted-foreground text-base">
              No packages found for this filter.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              View All Packages
            </button>
          </div>
        )}

        {/* Custom Package CTA */}
        <div className="mt-16 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-heading font-bold text-foreground text-xl">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Tell us your dates, group size and destinations — we&apos;ll
              create a personalised Somnath itinerary with a verified driver.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-xl gap-2 font-semibold"
            >
              <a
                href={whatsappBookingUrl(
                  "Hi! I need a custom tour package from Somnath.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
                Custom Package
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl gap-2"
            >
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
