import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";
import { ArrowRight } from "lucide-react";
import {
  siteConfig,
  whatsappBookingUrl,
  FOOTER_LINKS,
  CITIES,
} from "@/constants";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* ── Main Grid ── */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* ── Brand — 2 cols ── */}
          <div className="col-span-2 flex flex-col gap-5">
            <Logo />

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Verified local taxis for Somnath, Dwarka, Gir and Gujarat&apos;s
              pilgrimage circuit. No prepayment. No app needed.
            </p>

            {/* Contact Pills */}
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                📞 {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                ✉️ {siteConfig.contact.email}
              </a>
              <span className="text-sm text-muted-foreground">
                📍 {siteConfig.contact.address}
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                {
                  icon: <FaWhatsapp className="h-3.5 w-3.5" />,
                  href: siteConfig.social.whatsapp,
                },
                {
                  icon: <FaInstagram className="h-3.5 w-3.5" />,
                  href: siteConfig.social.instagram,
                },
                {
                  icon: <FaFacebookF className="h-3.5 w-3.5" />,
                  href: siteConfig.social.facebook,
                },
                {
                  icon: <FaYoutube className="h-3.5 w-3.5" />,
                  href: siteConfig.social.youtube,
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Travellers ── */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-foreground uppercase tracking-widest">
              Travellers
            </span>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.travellers.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Drivers ── */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-foreground uppercase tracking-widest">
              Drivers
            </span>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.drivers.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <span className="text-xs font-semibold text-foreground uppercase tracking-widest mt-2">
              Company
            </span>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Cities ── */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-foreground uppercase tracking-widest">
              Cities
            </span>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.cities.slice(0, 1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* City Pills */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {CITIES.slice(0, 1).map((city) => (
                <Link
                  key={city.slug}
                  href={city.href}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  {city.icon} {city.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name} · Made with 🛕 for
            pilgrims of India
          </p>

          {/* CTA — subtle */}
          <a
            href={whatsappBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground hover:border-green-500/40 hover:text-green-600 transition-all"
          >
            <FaWhatsapp className="h-3.5 w-3.5 text-green-500" />
            Book on WhatsApp
            <ArrowRight className="h-3 w-3" />
          </a>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <span className="text-border">·</span>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <span className="text-border">·</span>
            <Link
              href="/sitemap.xml"
              className="hover:text-foreground transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
