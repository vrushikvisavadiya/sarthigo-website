"use client";

import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Search, MessageCircle, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { whatsappBookingUrl } from "@/constants";

const STEPS = [
  {
    step: "01",
    icon: <Search className="h-7 w-7" />,
    title: "Choose Your Package",
    description:
      "Browse Somnath taxi packages and multi-day tour options. Filter by trip duration, group size, or route.",
  },
  {
    step: "02",
    icon: <MessageCircle className="h-7 w-7" />,
    title: "Connect via WhatsApp",
    description:
      "No online payment needed. Simply send your booking details on WhatsApp and get instant confirmation from your driver.",
  },
  {
    step: "03",
    icon: <Car className="h-7 w-7" />,
    title: "Travel with Confidence",
    description:
      "Your verified Somnath driver picks you up on time. Pay directly after your trip. No hidden charges.",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
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
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Book Your Somnath Taxi in{" "}
            <span className="text-secondary">3 Easy Steps</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            No app download. No registration. No prepayment. Just pick your
            package and connect with your driver directly.
          </p>
        </m.div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* Connector Line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {STEPS.map((step, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center gap-4 p-6"
            >
              {/* Step Number + Icon */}
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold font-heading">
                  {step.step}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-foreground text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-14"
        >
          <a
            href={whatsappBookingUrl("Hi! I want to book a Somnath taxi")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-3.5 font-semibold text-secondary-foreground hover:bg-brand-orange-dark transition-colors"
          >
            Start Booking Now →
          </a>
        </m.div>
      </div>
    </section>
  );
}
