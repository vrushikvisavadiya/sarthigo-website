"use client";

import Link from "next/link";
import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { whatsappBookingUrl, siteConfig } from "@/constants";

export function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-primary to-brand-primary-dark p-10 md:p-14 text-center flex flex-col items-center gap-7 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-3 relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Ready to Travel with{" "}
              <span className="text-secondary">{siteConfig.name}?</span>
            </h2>
            <p className="text-white/65 text-base md:text-lg max-w-xl leading-relaxed">
              Whether you&apos;re a pilgrim planning your Somnath darshan or a
              driver looking to grow your business — we&apos;re here for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-xl gap-2 font-semibold h-12 px-7"
            >
              <a
                href={whatsappBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
                Book a Taxi
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-xl gap-2 font-semibold h-12 px-7 border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/drivers/register">
                Join as Driver
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
