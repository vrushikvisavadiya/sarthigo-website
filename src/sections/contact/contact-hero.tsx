"use client";

import { m } from "motion/react";
import { Badge } from "@/components/ui/badge";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-primary-dark py-16 md:py-24">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto"
        >
          <Badge
            variant="secondary"
            className="w-fit rounded-full px-4 py-1.5 gap-2 text-sm"
          >
            📞 Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            We&apos;re Here to <span className="text-secondary">Help</span>
          </h1>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            Have a question about booking, packages or driver registration?
            Reach out — we typically respond within minutes on WhatsApp.
          </p>
        </m.div>
      </div>
    </section>
  );
}
