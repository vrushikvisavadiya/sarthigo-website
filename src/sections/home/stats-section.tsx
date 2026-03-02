"use client";

import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Users, MapPin, Star, CalendarCheck } from "lucide-react";

const STATS = [
  {
    icon: <Users className="h-6 w-6" />,
    value: "20+",
    label: "Verified Drivers",
    description: "Background-checked local drivers in Somnath",
  },
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    value: "200+",
    label: "Trips Completed",
    description: "Successful pilgrimage tours this year",
  },
  {
    icon: <Star className="h-6 w-6" />,
    value: "4.8",
    label: "Average Rating",
    description: "Based on real traveller reviews",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    value: "15+",
    label: "Routes Covered",
    description: "Somnath · Veraval · Diu · Gir · Junagadh",
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full bg-primary py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Top Label */}
        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center text-sm font-medium text-white/50 uppercase tracking-widest mb-10"
        >
          Sarthigo in Somnath — By the Numbers
        </m.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-heading font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-white/80">
                  {stat.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-white/45 leading-relaxed">
                {stat.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
