"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ShieldCheck, Star, ChevronDown } from "lucide-react";
import { BookingSearchForm } from "@/sections/home/booking-search-form";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* ── Subtle top accent line ── */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center py-14 md:py-20 gap-8">
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
            className="flex flex-col gap-4 max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground leading-[1.1] tracking-tight">
              The Taxi You Can
              <br />
              <span className="text-primary">Actually Trust</span> in Somnath
            </h1>
            <p className="text-muted-foreground text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
              Pick your city, choose your vehicle, select your trip — and we&apos;ll
              connect you with a verified local driver instantly.
            </p>
          </m.div>

          {/* ── Booking Search Form ── */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-full max-w-3xl"
          >
            <BookingSearchForm />
          </m.div>

          {/* ── Social Proof Row ── */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
