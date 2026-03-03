"use client";

import { m } from "motion/react";
import { Badge } from "@/components/ui/badge";

export function PlansHero() {
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
      <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto"
        >
          <Badge
            variant="secondary"
            className="w-fit rounded-full px-4 py-1.5 gap-2 text-sm"
          >
            🚖 Driver Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Simple, Flat Pricing
            <br />
            <span className="text-secondary">Zero Commission</span>
          </h1>
          <p className="text-white/65 text-base md:text-lg max-w-xl leading-relaxed">
            One flat monthly fee. No per-booking cuts. No surge fees. Keep 100%
            of every rupee your customers pay you.
          </p>

          {/* Highlight Bar */}
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            {[
              { value: "₹0", label: "Commission" },
              { value: "100%", label: "Earnings Yours" },
              { value: "30d", label: "Free Trial" },
              { value: "24hr", label: "Verification" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-heading font-bold text-secondary">
                  {stat.value}
                </span>
                <span className="text-xs text-white/55">{stat.label}</span>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
