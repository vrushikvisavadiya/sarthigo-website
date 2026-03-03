"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Phone, Car } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NAV_LINKS, siteConfig, whatsappBookingUrl } from "@/constants";
import type { NavLink } from "@/constants";

// ── Dropdown ───────────────────────────────────
function NavDropdown({ item }: { item: NavLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = item.children?.some((c) => c.href === pathname);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "text-primary bg-primary/5"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
      >
        {item.label}
        <m.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </m.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-border bg-background shadow-xl overflow-hidden z-50"
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Desktop Nav Link ───────────────────────────
function NavItem({ item }: { item: NavLink }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  if (item.children) return <NavDropdown item={item} />;

  return (
    <Link
      href={item.href}
      className={cn(
        "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "text-primary bg-primary/5 font-semibold"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      {item.label}
    </Link>
  );
}

// ── Mobile Menu ────────────────────────────────
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-background border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-black text-sm">
                  SG
                </div>
                <span className="font-heading font-bold text-foreground">
                  {siteConfig.name}
                </span>
              </Link>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.href}>
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                        {item.label}
                      </div>
                      {item.children.map((child) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom CTAs */}
            <div className="flex flex-col gap-3 px-4 py-5 border-t border-border">
              <Button
                asChild
                variant="secondary"
                className="w-full rounded-xl gap-2 font-semibold"
              >
                <a
                  href={whatsappBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Book via WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl gap-2"
              >
                <Link href="/drivers/register" onClick={onClose}>
                  <Car className="h-4 w-4" />
                  Join as Driver
                </Link>
              </Button>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Navbar ────────────────────────────────
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/95 backdrop-blur-md shadow-sm"
            : "border-transparent bg-background/95 backdrop-blur-md",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-heading font-black text-sm shadow-sm">
                SG
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-foreground text-lg tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-muted-foreground leading-none">
                  Somnath Taxi & Tours
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="rounded-xl gap-2 font-semibold"
              >
                <a
                  href={whatsappBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Book Now
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-xl gap-1.5"
              >
                <Link href="/drivers/register">
                  <Car className="h-4 w-4" />
                  Join as Driver
                </Link>
              </Button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
