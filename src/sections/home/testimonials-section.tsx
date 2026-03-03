"use client";

import { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "motion/react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  BadgeCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/constants";
import type { Testimonial } from "@/constants";
import { cn } from "@/lib/utils";

// ── Star Rating ────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}

// ── Single Card ────────────────────────────────
function TestimonialCard({
  t,
  featured = false,
}: {
  t: Testimonial;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-300 h-full",
        featured
          ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5"
          : "border-border bg-background hover:border-primary/20 hover:shadow-md",
      )}
    >
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-primary/15 absolute top-5 right-5" />

      {/* Rating */}
      <StarRating rating={t.rating} />

      {/* Trip Tag */}
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
        🚗 {t.trip}
      </span>

      {/* Review */}
      <p className="text-sm text-foreground leading-relaxed flex-1">
        &quot;{t.review}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
          {t.avatar}
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-foreground">
              {t.name}
            </span>
            {t.verified && (
              <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{t.location}</span>
        </div>
      </div>
    </div>
  );
}

// ── Mobile Carousel ────────────────────────────
function MobileCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = () => {
    setDir(-1);
    setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  };
  const next = () => {
    setDir(1);
    setIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait" custom={dir}>
          <m.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialCard t={TESTIMONIALS[index]} featured />
          </m.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={prev}
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-xl"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={next}
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-xl"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "rounded-full transition-all duration-300",
                i === index
                  ? "bg-primary w-5 h-2"
                  : "bg-muted-foreground/30 w-2 h-2",
              )}
            />
          ))}
        </div>

        <span className="text-xs text-muted-foreground tabular-nums">
          {index + 1} / {TESTIMONIALS.length}
        </span>
      </div>
    </div>
  );
}

// ── Main Section ───────────────────────────────
export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="w-full py-20 md:py-28 bg-muted/30"
    >
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
            ❤️ Pilgrim Reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            What Pilgrims <span className="text-secondary">Say About Us</span>
          </h2>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
            Real reviews from verified travellers who booked through Sarthigo.
            No fake reviews — every trip is real.
          </p>

          {/* Overall Rating */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-lg font-heading font-bold text-foreground">
              4.9
            </span>
            <span className="text-muted-foreground text-sm">
              from 200+ verified reviews
            </span>
          </div>
        </m.div>

        {/* Mobile — Carousel */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop — Masonry-style Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <m.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex"
            >
              <TestimonialCard t={t} featured={i === 1} />
            </m.div>
          ))}
        </div>

        {/* Bottom Trust Note */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground"
        >
          <BadgeCheck className="h-4 w-4 text-primary" />
          All reviews are from real bookings made through Sarthigo
        </m.div>
      </div>
    </section>
  );
}
