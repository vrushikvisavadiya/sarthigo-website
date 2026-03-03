"use client";

import Link from "next/link";
import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import {
  DRIVER_PLANS,
  PLAN_FAQ,
  whatsappBookingUrl,
  siteConfig,
} from "@/constants";
import type { Plan } from "@/constants";
import { cn } from "@/lib/utils";

// ── Plan Card ──────────────────────────────────
function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const whatsappMsg =
    plan.price === 0
      ? `Hi! I want to start the free trial on Sarthigo.`
      : `Hi! I want to subscribe to the ${plan.name} plan (${plan.priceDisplay}/month) on Sarthigo.`;

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex"
    >
      <Card
        className={cn(
          "relative flex flex-col w-full border-border transition-all duration-300 hover:shadow-xl",
          plan.popular
            ? "ring-2 ring-secondary ring-offset-2 hover:border-secondary/50"
            : "hover:border-primary/30",
        )}
      >
        {/* Popular Badge */}
        {plan.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <Badge
              variant={plan.popular ? "secondary" : "outline"}
              className="rounded-full px-4 py-1 text-xs font-bold shadow"
            >
              {plan.badge}
            </Badge>
          </div>
        )}

        <CardContent className="flex flex-col gap-5 p-6 pt-8 flex-1">
          {/* Plan Header */}
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-bold text-foreground text-xl">
              {plan.name}
            </h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-heading font-bold text-foreground">
                {plan.priceDisplay}
              </span>
              <span className="text-muted-foreground text-sm mb-1.5">
                {plan.period}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {plan.description}
            </p>
          </div>

          <Separator />

          {/* Features List */}
          <div className="flex flex-col gap-3 flex-1">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                {feature.included ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    feature.included
                      ? "text-foreground"
                      : "text-muted-foreground/60 line-through",
                  )}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              variant={plan.ctaVariant}
              className="w-full rounded-xl font-semibold gap-2"
            >
              <a
                href={whatsappBookingUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-4 w-4" />
                {plan.cta}
              </a>
            </Button>

            {plan.price === 0 && (
              <p className="text-center text-xs text-muted-foreground">
                No credit card required
              </p>
            )}
            {plan.price > 0 && (
              <p className="text-center text-xs text-muted-foreground">
                Cancel anytime · No lock-in
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
}

// ── FAQ Accordion ──────────────────────────────
function PlansFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3 max-w-3xl mx-auto">
      {PLAN_FAQ.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-border overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-muted/50 transition-colors"
          >
            <span className="font-heading font-semibold text-foreground text-sm md:text-base">
              {faq.question}
            </span>
            <m.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </m.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                  {faq.answer}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Main Section ───────────────────────────────
export function PlansGrid() {
  const ref = useRef(null);
  const faqRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Plans ── */}
      <section ref={ref} className="w-full py-16 md:py-24 bg-muted/30">
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
              💰 Pricing Plans
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Choose Your <span className="text-secondary">Plan</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
              Start free. Upgrade when you&apos;re ready. Every plan includes 0%
              commission — always.
            </p>
          </m.div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {DRIVER_PLANS.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Bottom Note */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12"
          >
            <p className="text-muted-foreground text-sm">
              Not sure which plan? Start with the free trial.
            </p>
            <Link
              href="/drivers/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-brand-primary-dark transition-colors"
            >
              Register as Driver
              <ArrowRight className="h-4 w-4" />
            </Link>
          </m.div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="w-full py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 items-center text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Sarthigo vs Others
            </h2>
            <p className="text-muted-foreground text-sm">
              See why local drivers prefer Sarthigo over Ola/Uber/InDriver
            </p>
          </m.div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-5 py-3.5 font-semibold text-foreground">
                    Feature
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-secondary">
                    {siteConfig.name}
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                    Ola / Uber
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                    InDriver
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Commission",
                    sarthigo: "₹0 (0%)",
                    ola: "20–25%",
                    indriver: "5–10%",
                    highlight: true,
                  },
                  {
                    feature: "Pilgrimage focused",
                    sarthigo: "✅ Yes",
                    ola: "❌ No",
                    indriver: "❌ No",
                  },
                  {
                    feature: "Multi-day tours",
                    sarthigo: "✅ Yes",
                    ola: "❌ No",
                    indriver: "❌ No",
                  },
                  {
                    feature: "Direct customer contact",
                    sarthigo: "✅ WhatsApp",
                    ola: "❌ Via app only",
                    indriver: "🟡 Limited",
                  },
                  {
                    feature: "Surge pricing on driver",
                    sarthigo: "❌ Never",
                    ola: "✅ Yes",
                    indriver: "🟡 Sometimes",
                  },
                  {
                    feature: "Flat monthly fee",
                    sarthigo: "₹999/mo",
                    ola: "No (per ride %)",
                    indriver: "No (per ride %)",
                  },
                  {
                    feature: "Tier-2 city focus",
                    sarthigo: "✅ Yes",
                    ola: "❌ Metro only",
                    indriver: "🟡 Partial",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-t border-border",
                      row.highlight
                        ? "bg-secondary/5"
                        : i % 2 === 0
                          ? "bg-background"
                          : "bg-muted/20",
                    )}
                  >
                    <td className="px-5 py-3.5 font-medium text-foreground">
                      {row.feature}
                    </td>
                    <td className="px-5 py-3.5 text-center font-semibold text-secondary">
                      {row.sarthigo}
                    </td>
                    <td className="px-5 py-3.5 text-center text-muted-foreground">
                      {row.ola}
                    </td>
                    <td className="px-5 py-3.5 text-center text-muted-foreground">
                      {row.indriver}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="w-full py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-3 mb-12"
          >
            <Badge
              variant="outline"
              className="w-fit rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
            >
              ❓ FAQs
            </Badge>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Plan Questions Answered
            </h2>
          </m.div>
          <PlansFaq />
        </div>
      </section>
    </>
  );
}
