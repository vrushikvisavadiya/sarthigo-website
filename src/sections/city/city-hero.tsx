"use client";

import { m } from "motion/react";
import { MapPin, Clock, Train, Plane } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { whatsappBookingUrl } from "@/constants";
import type { CityData } from "@/constants/cities";

export function CityHero({ city }: { city: CityData }) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-orange-950 via-primary to-primary flex items-center">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-6 py-20">
        <div className="flex flex-col gap-6 max-w-3xl">
          {/* Breadcrumb */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-white/50 text-sm"
          >
            <span>Home</span>
            <span>/</span>
            <span>Cities</span>
            <span>/</span>
            <span className="text-white/80">{city.name}</span>
          </m.div>

          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Badge
              variant="secondary"
              className="w-fit rounded-full px-4 py-1.5 gap-2 text-sm"
            >
              {city.icon} {city.tagline}
            </Badge>
          </m.div>

          {/* Headline */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
              Taxi & Tours in{" "}
              <span className="text-secondary">{city.name}</span>
            </h1>
            <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-2xl">
              {city.description}
            </p>
          </m.div>

          {/* Quick Info Pills */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/75 backdrop-blur-sm">
              <Clock className="h-3.5 w-3.5 text-secondary" />
              Best time: {city.bestTimeToVisit}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/75 backdrop-blur-sm">
              <Train className="h-3.5 w-3.5 text-secondary" />
              {city.nearestRailway}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/75 backdrop-blur-sm">
              <Plane className="h-3.5 w-3.5 text-secondary" />
              {city.nearestAirport}
            </span>
          </m.div>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-xl gap-2 font-semibold h-12 px-7"
            >
              <a href="#packages">View Packages</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-xl gap-2 font-semibold h-12 px-7 border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
            >
              <a
                href={whatsappBookingUrl(
                  `Hi! I want to book a taxi in ${city.name}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
                Book via WhatsApp
              </a>
            </Button>
          </m.div>

          {/* Stats Row */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-8 pt-2"
          >
            {city.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-xl font-heading font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-white/50">{stat.label}</span>
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
