import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import {
  siteConfig,
  whatsappBookingUrl,
  FOOTER_LINKS,
  CITIES,
} from "@/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* ── Top CTA Strip ── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <h3 className="font-heading font-bold text-xl text-white">
                Ready to Book Your Somnath Taxi?
              </h3>
              <p className="text-white/60 text-sm">
                Verified drivers · No prepayment · Instant WhatsApp confirmation
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={whatsappBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <FaWhatsapp className="h-4 w-4" />
                Book on WhatsApp
              </a>
              <Link
                href="/drivers/register"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                Join as Driver
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* ── Brand Column ── */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 font-heading font-black text-white text-sm">
                SG
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-white text-xl">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-white/50">
                  Pilgrimage Taxi & Tours
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}. Verified local drivers for Somnath,
              Dwarka, Gir and all of Gujarat&apos;s pilgrimage circuit.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-secondary shrink-0" />
                {siteConfig.contact.address}
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                {
                  icon: <FaWhatsapp className="h-4 w-4" />,
                  href: siteConfig.social.whatsapp,
                  bg: "bg-green-500 hover:bg-green-600",
                },
                {
                  icon: <FaInstagram className="h-4 w-4" />,
                  href: siteConfig.social.instagram,
                  bg: "bg-pink-500 hover:bg-pink-600",
                },
                {
                  icon: <FaFacebookF className="h-4 w-4" />,
                  href: siteConfig.social.facebook,
                  bg: "bg-blue-600 hover:bg-blue-700",
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-white transition-colors ${s.bg}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Travellers ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Travellers
            </h4>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.travellers.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Drivers ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Drivers
            </h4>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.drivers.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mt-4">
              Company
            </h4>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Cities ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Cities
            </h4>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.cities.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* City Pills */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {CITIES.slice(0, 4).map((city) => (
                <Link
                  key={city.slug}
                  href={city.href}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/60 hover:bg-white/15 hover:text-white transition-all"
                >
                  {city.icon} {city.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            Made with 🛕 for pilgrims of India.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link
              href="/privacy"
              className="hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="hover:text-white/70 transition-colors"
            >
              Terms of Service
            </Link>
            <span>·</span>
            <Link
              href="/sitemap.xml"
              className="hover:text-white/70 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
