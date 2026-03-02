"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { Menu, X, MapPin, ChevronDown, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CITIES, NAV_LINKS, siteConfig } from "@/constants";

// ── Component ──────────────────────────────────────────────
export function Navbar() {
  const pathname = usePathname();
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority // loads instantly, no layout shift
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Cities Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCitiesOpen(!citiesOpen)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Cities
              <m.span
                animate={{ rotate: citiesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </m.span>
            </button>

            <AnimatePresence>
              {citiesOpen && (
                <m.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  onMouseLeave={() => setCitiesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-border bg-popover p-1.5 shadow-lg"
                >
                  {CITIES.map((city) => (
                    <Link
                      key={city.href}
                      href={city.href}
                      onClick={() => setCitiesOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-popover-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <span className="text-base">{city.icon}</span>
                      {city.label}
                    </Link>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/drivers/register"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            List Your Taxi
          </Link>
          <Button asChild size="sm" className="rounded-xl gap-2">
            <Link href="/book">
              <Car className="h-4 w-4" />
              Book a Taxi
            </Link>
          </Button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <m.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-4 w-4" />
                  </m.span>
                ) : (
                  <m.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-4 w-4" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] p-0">
            <SheetHeader className="px-6 py-5 border-b">
              <SheetTitle asChild>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src={siteConfig.logo}
                    alt={siteConfig.name}
                    width={130}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                </Link>
              </SheetTitle>
            </SheetHeader>

            {/* Mobile Links */}
            <nav className="flex flex-col px-3 py-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}

              {/* Mobile Cities */}
              <div className="pt-2 pb-1 px-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Cities
                </p>
              </div>
              {CITIES.map((city, i) => (
                <m.div
                  key={city.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + i) * 0.05 }}
                >
                  <Link
                    href={city.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <span>{city.icon}</span>
                    {city.label}
                  </Link>
                </m.div>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full rounded-xl">
                <Link
                  href="/drivers/register"
                  onClick={() => setMobileOpen(false)}
                >
                  List Your Taxi
                </Link>
              </Button>
              <Button asChild className="w-full rounded-xl gap-2">
                <Link href="/book" onClick={() => setMobileOpen(false)}>
                  <Car className="h-4 w-4" />
                  Book a Taxi
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
