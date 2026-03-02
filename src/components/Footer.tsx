import Link from "next/link";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FOOTER_LINKS,
  siteConfig,
  SOCIAL_LINKS,
  whatsappBookingUrl,
} from "@/constants";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* ── WhatsApp CTA Banner ── */}
      <div className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaWhatsapp className="h-6 w-6 text-secondary-foreground shrink-0" />
            <p className="font-heading font-semibold text-secondary-foreground text-sm md:text-base">
              Need help planning your trip? Chat with us on WhatsApp!
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-xl border-secondary-foreground  text-primary hover:bg-secondary-foreground hover:text-secondary shrink-0 gap-2"
          >
            <a
              href={whatsappBookingUrl()}
              // href={`tel:${siteConfig.contact.phone}?text=Hi! I want to book a taxi in Somnath`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat Now
            </a>
          </Button>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={150}
                height={45}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-background/70 leading-relaxed max-w-xs">
              Trusted local travel partner for pilgrimage and tourist
              destinations across Gujarat. Pre-book verified drivers for
              multi-day tours.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-2.5 text-sm text-background/70 ">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 hover:text-background transition-colors"
              >
                <FaPhone className="h-4 w-4 text-secondary shrink-0" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 hover:text-background transition-colors"
              >
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                {siteConfig.contact.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary shrink-0" />
                {siteConfig.contact.address}
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL_LINKS.map((s) => {
                const icons: Record<string, typeof FaWhatsapp> = {
                  FaWhatsapp,
                  FaInstagram,
                  FaFacebookF,
                  FaXTwitter,
                  FaYoutube,
                };
                const Icon = icons[s.iconName];

                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-background/70 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4 text-white" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Company Links ── */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-background text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Cities Links ── */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-background text-sm uppercase tracking-wider">
              Cities
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.cities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Driver Links ── */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-background text-sm uppercase tracking-wider">
              For Drivers
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.drivers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="rounded-xl mt-2 w-fit"
            >
              <Link href="/drivers/register">Join as Driver →</Link>
            </Button>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <Separator className="mt-12 mb-6 bg-background/10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-background transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund"
              className="hover:text-background transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
