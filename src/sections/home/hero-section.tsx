"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Car, MapPin, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CITIES, whatsappBookingUrl } from "@/constants";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-primary-dark flex flex-col">
      {/* ── Background Dot Pattern ── */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Glow Orbs ── */}
      <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto max-w-7xl w-full px-4 md:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* ── Left Column ── */}
            <div className="flex flex-col gap-7">
              {/* Trust Badge */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Badge
                  variant="secondary"
                  className="w-fit gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  ✦ Trusted by 500+ pilgrims monthly
                </Badge>
              </m.div>

              {/* Headline */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-white leading-[1.15]">
                  Book Trusted Taxis
                  <br />
                  for <span className="text-secondary">Pilgrimage Cities</span>
                </h1>
                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
                  Pre-book verified local drivers for Somnath, Dwarka, Gir &
                  more. Multi-day tour packages — no payment needed upfront.
                </p>
              </m.div>

              {/* CTA Buttons */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-xl gap-2 font-semibold text-base h-12 px-7"
                >
                  <Link href="/packages">
                    <Car className="h-5 w-5" />
                    Browse Packages
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="rounded-xl gap-2 font-semibold text-base h-12 px-7 border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  variant="ghost"
                >
                  <a
                    href={whatsappBookingUrl()}
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
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-8 pt-1"
              >
                {[
                  { value: "20+", label: "Verified Drivers" },
                  { value: "6", label: "Cities Covered" },
                  { value: "₹999", label: "Starting/Day" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-2xl font-heading font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs text-white/55">{stat.label}</span>
                  </div>
                ))}
              </m.div>

              {/* City Pills */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-2"
              >
                {CITIES.map((city) => (
                  <Link key={city.slug} href={city.href}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/75 hover:bg-white/20 hover:text-white transition-all cursor-pointer backdrop-blur-sm">
                      {city.icon} {city.label}
                    </span>
                  </Link>
                ))}
              </m.div>
            </div>

            {/* ── Right Column: Booking Card ── */}
            <m.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="hidden lg:flex justify-end relative"
            >
              {/* Temple Image */}
              <div className="relative w-full max-w-lg">
                <div className="relative h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={IMAGES.hero.somnathTemple}
                    alt="Somnath Jyotirlinga Temple"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1280px) 50vw, 560px"
                  />
                  {/* Dark overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Floating Booking Card — over image */}
                {/* <div className="absolute bottom-6 left-6 right-6">
                  <BookingCard />
                </div> */}

                {/* Floating Trust Badge */}
                <div className="absolute top-5 right-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 flex items-center gap-2 shadow-lg">
                  <span className="text-2xl">🛕</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">
                      Somnath Temple
                    </span>
                    <span className="text-xs text-white/60">
                      First Jyotirlinga
                    </span>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/30"
        >
          <span className="text-xs tracking-wide">Scroll to explore</span>
          <ChevronDown className="h-4 w-4" />
        </m.div>
      </m.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Booking Card (desktop right panel)
// ─────────────────────────────────────────────
function BookingCard() {
  return (
    <div className="w-full max-w-[360px] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-2xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-white text-lg">
          Quick Booking
        </h3>
        <Badge variant="secondary" className="text-xs rounded-full">
          Free · No Prepayment
        </Badge>
      </div>

      {/* Destination */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/55 uppercase tracking-wider">
          Destination
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
          <select className="w-full rounded-xl border border-white/20 bg-white/10 text-white pl-9 pr-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-secondary backdrop-blur-sm">
            <option value="" className="text-foreground bg-background">
              Select City
            </option>
            {CITIES.map((city) => (
              <option
                key={city.slug}
                value={city.slug}
                className="text-foreground bg-background"
              >
                {city.icon} {city.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date + Days */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/55 uppercase tracking-wider">
            Travel Date
          </label>
          <input
            type="date"
            className="w-full rounded-xl border border-white/20 bg-white/10 text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary backdrop-blur-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/55 uppercase tracking-wider">
            No. of Days
          </label>
          <select className="w-full rounded-xl border border-white/20 bg-white/10 text-white px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-secondary backdrop-blur-sm">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <option
                key={d}
                value={d}
                className="text-foreground bg-background"
              >
                {d} {d === 1 ? "Day" : "Days"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Passengers */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/55 uppercase tracking-wider">
          Passengers
        </label>
        <select className="w-full rounded-xl border border-white/20 bg-white/10 text-white px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-secondary backdrop-blur-sm">
          {[1, 2, 3, 4, 5, 6].map((p) => (
            <option key={p} value={p} className="text-foreground bg-background">
              {p} {p === 1 ? "Passenger" : "Passengers"}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <Button
        asChild
        size="lg"
        variant="secondary"
        className="w-full rounded-xl gap-2 font-semibold mt-1"
      >
        <a
          href={whatsappBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="h-5 w-5" />
          Get Free Quotes
        </a>
      </Button>

      <p className="text-center text-xs text-white/40">
        Verified drivers · Instant reply · No hidden charges
      </p>
    </div>
  );
}
