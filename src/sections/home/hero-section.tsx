"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ShieldCheck, Star, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { CITIES, whatsappBookingUrl } from "@/constants";

const TRUST_POINTS = [
  {
    icon: "🪪",
    title: "License Verified",
    desc: "Every driver's license, RC and insurance is manually checked before onboarding.",
  },
  {
    icon: "💬",
    title: "Direct WhatsApp",
    desc: "You talk directly to your driver — no middleman, no call center.",
  },
  {
    icon: "💵",
    title: "Pay After Trip",
    desc: "Zero advance payment. Pay cash to your driver after the trip ends.",
  },
  {
    icon: "📍",
    title: "Local Experts",
    desc: "Drivers who live in Somnath — they know every temple, route and shortcut.",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* ── Subtle top accent line ── */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center py-20 md:py-28 gap-10">
          {/* ── Eyebrow ── */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Accepting bookings for Somnath · Dwarka · Gir
          </m.div>

          {/* ── Headline ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5 max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground leading-[1.1] tracking-tight">
              The Taxi You Can
              <br />
              <span className="text-primary">Actually Trust</span> in Somnath
            </h1>
            <p className="text-muted-foreground text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
              Verified local drivers for Somnath pilgrimage tours. No app. No
              prepayment. Book on WhatsApp in 2 minutes.
            </p>
          </m.div>

          {/* ── CTAs ── */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="rounded-xl gap-2 font-bold h-13 px-8 text-base bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25"
            >
              <a
                href={whatsappBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
                Book Now — It&apos;s Free
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl gap-2 font-semibold h-13 px-8 text-base"
            >
              <Link href="/packages">View Tour Packages</Link>
            </Button>
          </m.div>

          {/* ── Social Proof Row ── */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
          >
            {/* Avatars + rating */}
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {["RP", "KS", "VM", "PJ", "AS"].map((init, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-primary text-[10px] font-bold"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  Trusted by{" "}
                  <strong className="text-foreground">500+ pilgrims</strong>
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>All drivers verified</span>
            </div>

            <div className="h-6 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="text-base">💵</span>
              <span>Pay cash after trip</span>
            </div>

            <div className="h-6 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="text-base">⚡</span>
              <span>Reply in &lt; 5 minutes</span>
            </div>
          </m.div>

          {/* ── Trust Cards ── */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl hidden"
          >
            {TRUST_POINTS.map((point, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                className="flex flex-col gap-2.5 rounded-2xl border border-border bg-muted/30 p-4 text-left hover:border-primary/20 hover:bg-muted/50 transition-all"
              >
                <span className="text-2xl">{point.icon}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">
                    {point.title}
                  </span>
                  <span className="text-xs text-muted-foreground leading-snug">
                    {point.desc}
                  </span>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* ── City Pills ── */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-2 hidden"
          >
            {CITIES.map((city) => (
              <Link key={city.slug} href={city.href}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                  {city.icon} {city.label}
                </span>
              </Link>
            ))}
          </m.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center pb-8"
      >
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground/40" />
        </m.div>
      </m.div>
    </section>
  );
}
