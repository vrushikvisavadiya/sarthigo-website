"use client";

import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/constants";

const MILESTONES = [
  {
    year: "2025",
    title: "The Problem We Saw",
    description:
      "Tourists arriving at Veraval station had no easy way to find verified, fairly priced local taxis for temple tours. Most relied on word of mouth or overpriced aggregators that didn't understand pilgrimage needs.",
    icon: "🔍",
  },
  {
    year: "Early 2026",
    title: "Sarthigo is Born",
    description:
      "We started with a simple idea — build a hyper-local taxi network focused exclusively on pilgrimage and tourist cities. No surge pricing. No hidden charges. Just verified local drivers who know every temple and route.",
    icon: "🌱",
  },
  {
    year: "Now",
    title: "Somnath First",
    description:
      "We launched in Somnath — validating with 15–20 local drivers and real pilgrims. Every booking, every review and every driver onboarded brings us closer to becoming the trusted mobility layer of Gujarat's pilgrimage circuit.",
    icon: "🛕",
  },
  {
    year: "Next",
    title: "Expanding the Circuit",
    description:
      "Somnath → Dwarka → Gir → Junagadh → Diu → Ambaji → Kutch. One pilgrimage cluster at a time. Our goal is to become the trusted local mobility network across tier-2 pilgrimage cities in India.",
    icon: "🗺️",
  },
];

export function AboutStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3 mb-16"
        >
          <Badge
            variant="outline"
            className="w-fit rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
          >
            📖 Our Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            How <span className="text-secondary">{siteConfig.name}</span>{" "}
            Started
          </h2>
        </m.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="flex flex-col gap-10">
            {MILESTONES.map((m_, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-6 md:gap-8 items-start"
              >
                {/* Icon circle */}
                <div className="relative flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20 text-2xl z-10 relative">
                    {m_.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 pt-2 flex-1">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="rounded-full text-xs px-3"
                    >
                      {m_.year}
                    </Badge>
                    <h3 className="font-heading font-bold text-foreground text-lg">
                      {m_.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {m_.description}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
