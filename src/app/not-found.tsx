"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { whatsappBookingUrl, siteConfig } from "@/constants";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Somnath Packages", href: "/city/somnath" },
  { label: "All Packages", href: "/packages" },
  { label: "Register as Driver", href: "/drivers/register" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Animated 404 */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Big 404 */}
          <div className="relative">
            <span className="text-[10rem] md:text-[14rem] font-heading font-black text-primary/10 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl">🛕</span>
            </div>
          </div>

          {/* Text */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              This Road Leads Nowhere
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Looks like this page took a wrong turn. Let us guide you back to
              the right destination — just like our Somnath drivers do!
            </p>
          </m.div>

          {/* CTA Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild
              size="lg"
              className="rounded-xl gap-2 font-semibold"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl gap-2 font-semibold"
            >
              <a
                href={whatsappBookingUrl(
                  "Hi! I need help finding something on Sarthigo.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-4 w-4 text-green-500" />
                Ask on WhatsApp
              </a>
            </Button>
          </m.div>

          {/* Quick Links */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Quick Links
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-border bg-muted/30 px-4 py-1.5 text-sm text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </m.div>
        </m.div>
      </div>
    </div>
  );
}
