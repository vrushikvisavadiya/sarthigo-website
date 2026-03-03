"use client";

import { m } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/constants";

export function AboutHero() {
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
          className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto"
        >
          <Badge
            variant="secondary"
            className="w-fit rounded-full px-4 py-1.5 gap-2 text-sm"
          >
            🙏 Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Built for Pilgrims.
            <br />
            <span className="text-secondary">Powered by Local Drivers.</span>
          </h1>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            {siteConfig.name} was born from a simple observation — millions of
            devotees visit Somnath every year, but finding a trusted, fairly
            priced local taxi was always a challenge. We&apos;re fixing that.
          </p>
        </m.div>
      </div>
    </section>
  );
}
