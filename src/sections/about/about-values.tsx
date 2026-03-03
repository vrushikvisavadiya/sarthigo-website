"use client";

import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const VALUES = [
  {
    icon: "🤝",
    title: "Trust First",
    description:
      "Every driver is manually verified — license, RC, insurance and background check. Tourists deserve to feel safe.",
  },
  {
    icon: "💰",
    title: "Fair Pricing",
    description:
      "No surge pricing. No hidden charges. Flat quoted price before you book — pay your driver directly after the trip.",
  },
  {
    icon: "📍",
    title: "Hyper Local",
    description:
      "Our drivers aren't just drivers — they're local experts. They know every temple, shortcut, dhaba and hidden gem.",
  },
  {
    icon: "📱",
    title: "Simple & Accessible",
    description:
      "No app download. No account needed. A WhatsApp message is all it takes. Built for every type of traveller.",
  },
  {
    icon: "🌱",
    title: "Driver First",
    description:
      "We exist to grow local driver businesses — not replace them. Flat subscription, zero commission, direct leads.",
  },
  {
    icon: "🛕",
    title: "Pilgrimage Focused",
    description:
      "We're not trying to be Uber. We're building specifically for pilgrimage and tourist cities — and doing it right.",
  },
];

export function AboutValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
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
            💡 What We Stand For
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Our <span className="text-secondary">Core Values</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
            Every decision we make — from driver verification to pricing — is
            guided by these principles.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((value, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 flex flex-col gap-4">
                  <span className="text-4xl">{value.icon}</span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading font-bold text-foreground text-lg">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
