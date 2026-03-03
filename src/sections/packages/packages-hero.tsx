"use client";

import { m } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export function PackagesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-primary-dark py-20 md:py-28">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-5"
        >
          <Badge
            variant="secondary"
            className="w-fit rounded-full px-4 py-1.5 gap-2 text-sm"
          >
            <Package className="h-4 w-4" />
            All Packages
          </Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white max-w-3xl leading-tight">
            Somnath Tour Packages —
            <span className="text-secondary"> Verified Drivers</span>
          </h1>
          <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed">
            From quick Somnath darshan to multi-day Saurashtra circuits. All
            packages include AC taxi, local driver, flexible timing. No
            prepayment — pay after your trip.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["All", "1 Day", "2 Days", "3+ Days", "With Gir", "With Diu"].map(
              (f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/75 hover:bg-white/20 hover:text-white cursor-pointer transition-all backdrop-blur-sm"
                >
                  {f}
                </span>
              ),
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}
