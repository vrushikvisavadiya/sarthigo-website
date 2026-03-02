"use client";

import Link from "next/link";
import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const SOMNATH_ROUTES = [
  {
    from: "Somnath",
    to: "Diu",
    duration: "1.5 hrs",
    distance: "90 km",
    price: "₹1,200",
    popular: true,
    description: "Beach town + Portuguese fort — perfect day trip",
    icon: "🏖️",
  },
  {
    from: "Somnath",
    to: "Gir Forest",
    duration: "1 hr",
    distance: "65 km",
    price: "₹1,000",
    popular: true,
    description: "Asiatic lion safari — book 2–3 day package",
    icon: "🦁",
  },
  {
    from: "Somnath",
    to: "Junagadh",
    duration: "1.5 hrs",
    distance: "85 km",
    price: "₹1,100",
    popular: false,
    description: "Uparkot fort, Girnar hill & Mahabat Maqbara",
    icon: "🏰",
  },
  {
    from: "Somnath",
    to: "Dwarka",
    duration: "4 hrs",
    distance: "230 km",
    price: "₹3,200",
    popular: true,
    description: "Complete Saurashtra pilgrimage circuit",
    icon: "🐚",
  },
  {
    from: "Somnath",
    to: "Porbandar",
    duration: "2 hrs",
    distance: "120 km",
    price: "₹1,600",
    popular: false,
    description: "Birthplace of Mahatma Gandhi + Sudama Mandir",
    icon: "🕊️",
  },
  {
    from: "Somnath",
    to: "Veraval",
    duration: "15 min",
    distance: "6 km",
    price: "₹200",
    popular: false,
    description: "Fishing harbour & Bhalka Tirth temple",
    icon: "⚓",
  },
];

export function CitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-muted/40">
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
            📍 Based in Somnath
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Popular Routes from <span className="text-secondary">Somnath</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            Our verified drivers cover all major destinations around Somnath.
            Day trips, overnight packages, and full pilgrimage circuits.
          </p>
        </m.div>

        {/* Routes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOMNATH_ROUTES.map((route, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <RouteCard route={route} />
            </m.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
        >
          <p className="text-muted-foreground text-sm">
            Don&apos;t see your route?
          </p>
          <Link
            href="/city/somnath"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-brand-primary-dark transition-colors"
          >
            View All Somnath Routes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Route Card
// ─────────────────────────────────────────────
type Route = (typeof SOMNATH_ROUTES)[number];

function RouteCard({ route }: { route: Route }) {
  return (
    <Card className="group h-full border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
      <CardContent className="p-5 flex flex-col gap-4 h-full">
        {/* Top Row */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-3xl">{route.icon}</span>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {route.popular && (
              <Badge variant="secondary" className="text-xs rounded-full">
                Popular
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-xs rounded-full font-semibold text-primary border-primary/30"
            >
              {route.price}
            </Badge>
          </div>
        </div>

        {/* Route Name */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2 text-foreground">
            <span className="font-heading font-bold text-base">
              {route.from}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="font-heading font-bold text-base text-primary">
              {route.to}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {route.description}
          </p>
        </div>

        {/* Meta Row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-secondary" />
            {route.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            {route.distance}
          </span>
          <span className="ml-auto text-primary font-medium group-hover:underline text-xs flex items-center gap-1">
            Book Now
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
