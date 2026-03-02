"use client";

import Link from "next/link";
import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  CheckCircle2,
  TrendingUp,
  Wallet,
  Users,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappBookingUrl } from "@/constants";

const DRIVER_BENEFITS = [
  {
    icon: <Wallet className="h-5 w-5" />,
    title: "₹999/month Subscription",
    description: "Flat monthly fee. No per-booking cuts on small rides.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "12–20 Packages/Month",
    description: "High-ticket pilgrimage packages — more earnings per trip.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Direct Customer Connect",
    description: "Leads come directly to you — no middleman, no app needed.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Verified Driver Badge",
    description: "Build trust with tourists via your Sarthigo profile page.",
  },
];

const DRIVER_STEPS = [
  { step: "01", label: "Register for free" },
  { step: "02", label: "Get verified by our team" },
  { step: "03", label: "Start receiving bookings" },
];

export function DriverCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const driverWhatsApp = whatsappBookingUrl(
    "Hi! I'm a driver in Somnath and want to register on Sarthigo.",
  );

  return (
    <section
      ref={ref}
      className="w-full py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-brand-primary-dark relative overflow-hidden"
    >
      {/* ── Background Pattern ── */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Glow Orbs ── */}
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-7">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <Badge
                variant="secondary"
                className="w-fit rounded-full px-4 py-1.5 text-sm font-medium gap-2"
              >
                🚖 For Local Somnath Drivers
              </Badge>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                Grow Your Taxi
                <br />
                Business with <span className="text-secondary">Sarthigo</span>
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
                Join {siteConfig.name}&apos;s verified driver network in
                Somnath. Get direct pilgrim bookings, no commission cuts, flat ₹
                {siteConfig.business.driverSubscriptionPrice}/month.
              </p>
            </m.div>

            {/* Benefits */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {DRIVER_BENEFITS.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                    {benefit.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-white">
                      {benefit.title}
                    </span>
                    <span className="text-xs text-white/55 leading-relaxed">
                      {benefit.description}
                    </span>
                  </div>
                </div>
              ))}
            </m.div>

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-xl gap-2 font-semibold h-12 px-7"
              >
                <Link href="/drivers/register">
                  Register as Driver
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-xl gap-2 font-semibold h-12 px-7 border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                <a
                  href={driverWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  Chat with Us
                </a>
              </Button>
            </m.div>
          </div>

          {/* ── Right: Steps Card ── */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-7 shadow-2xl flex flex-col gap-7">
              {/* Card Header */}
              <div className="flex flex-col gap-1">
                <h3 className="font-heading font-bold text-white text-xl">
                  How to Join
                </h3>
                <p className="text-sm text-white/55">
                  Get started in under 10 minutes
                </p>
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-5">
                {DRIVER_STEPS.map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    {/* Step Number */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-sm">
                      {s.step}
                    </div>
                    {/* Connector */}
                    <div className="flex flex-col gap-0.5 flex-1">
                      <span className="text-sm font-semibold text-white">
                        {s.label}
                      </span>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10" />

              {/* Pricing Highlight */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-white/50 uppercase tracking-wider">
                    Monthly Subscription
                  </span>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-heading font-bold text-white">
                      ₹{siteConfig.business.driverSubscriptionPrice}
                    </span>
                    <span className="text-white/50 text-sm mb-1">/ month</span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-xl text-sm px-3 py-1.5 font-semibold"
                >
                  No Commission
                </Badge>
              </div>

              {/* Card CTA */}
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full rounded-xl gap-2 font-semibold"
              >
                <Link href="/drivers/register">
                  Join Now — It&apos;s Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <p className="text-center text-xs text-white/35">
                Currently onboarding Somnath drivers only
              </p>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
