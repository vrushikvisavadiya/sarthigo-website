"use client";

import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { Testimonial } from "@/constants";
import { TESTIMONIALS } from "@/constants/testimonials";

// ── Star Rating ──────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-secondary text-secondary"
              : "fill-muted text-muted-foreground"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Avatar ───────────────────────────────────
function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-sm">
      {initials}
    </div>
  );
}

// ── Testimonial Card ─────────────────────────
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card className="h-full border-border hover:border-primary/20 hover:shadow-md transition-all duration-300">
      <CardContent className="p-5 flex flex-col gap-4 h-full">
        {/* Quote Icon + Stars */}
        <div className="flex items-center justify-between">
          <Quote className="h-8 w-8 text-primary/20 fill-primary/10" />
          <StarRating rating={t.rating} />
        </div>

        {/* Review Text */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          &quot;{t.review}&quot;
        </p>

        {/* Trip Badge */}
        <Badge
          variant="outline"
          className="w-fit rounded-full text-xs border-primary/20 bg-primary/5 text-primary"
        >
          🛕 {t.trip}
        </Badge>

        {/* Author */}
        <div className="flex items-center gap-3 border-t border-border pt-3">
          <Avatar initials={t.avatar} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold font-heading text-foreground">
              {t.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {t.location} · {t.date}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Section ─────────────────────────────
export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <Badge
            variant="outline"
            className="w-fit rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
          >
            ⭐ Real Reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            What Travellers Say About{" "}
            <span className="text-secondary">Sarthigo</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            Hundreds of pilgrims and tourists have trusted our verified drivers
            for their Somnath journey.
          </p>

          {/* Overall Rating */}
          <div className="flex items-center gap-3 mt-2 bg-background rounded-2xl border border-border px-5 py-3 shadow-sm">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-heading font-bold text-foreground">
                4.9
              </span>
              <StarRating rating={5} />
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                Excellent Rating
              </span>
              <span className="text-xs text-muted-foreground">
                Based on 200+ trips in Somnath
              </span>
            </div>
          </div>
        </m.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <m.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TestimonialCard t={t} />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
