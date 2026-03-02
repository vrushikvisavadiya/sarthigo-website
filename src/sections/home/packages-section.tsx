"use client";

import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Clock, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SOMNATH_PACKAGES, whatsappBookingUrl } from "@/constants";
import type { Package } from "@/constants";
import Link from "next/link";

export function PackagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <Badge
            variant="outline"
            className="w-fit rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
          >
            🛕 Somnath Tour Packages
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Choose Your <span className="text-secondary">Perfect Package</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            All packages include a verified AC taxi and local driver. No
            prepayment — pay directly to your driver after the trip.
          </p>
        </m.div>

        {/* Packages Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {SOMNATH_PACKAGES.map((pkg, i) => (
            <m.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex"
            >
              <PackageCard pkg={pkg} />
            </m.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
        >
          <p className="text-muted-foreground text-sm">
            Need a custom itinerary?
          </p>
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

// ─────────────────────────────────────────────
// Package Card
// ─────────────────────────────────────────────
function PackageCard({ pkg }: { pkg: Package }) {
  const whatsappMsg = `Hi! I'm interested in the "${pkg.title}" package from Sarthigo.`;

  return (
    <Card
      className={`
        relative flex flex-col w-full border-border hover:border-primary/40
        hover:shadow-xl transition-all duration-300
        ${pkg.popular ? "ring-2 ring-secondary ring-offset-2" : ""}
      `}
    >
      {/* Popular Ring Label */}
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge
            variant={pkg.badge === "Best Value" ? "outline" : "secondary"}
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
          <h3 className="font-heading font-bold text-foreground text-base leading-snug">
            {pkg.title}
          </h3>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-secondary" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-secondary" />
            {pkg.groupSize} pax
          </span>
        </div>

        <Separator />

        {/* Highlights */}
        <div className="flex flex-col gap-1.5 flex-1">
          {pkg.highlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-2xl font-heading font-bold text-foreground">
              {pkg.priceDisplay}
            </span>
            <span className="text-xs text-muted-foreground">
              {pkg.priceNote}
            </span>
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
          <a
            href={whatsappBookingUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="h-4 w-4" />
            Book This Package
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
