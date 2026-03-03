import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/constants";

const PERKS = [
  "₹999/month flat — no commission",
  "Direct customer leads",
  "Verified driver badge",
  "WhatsApp booking system",
];

export function RegisterHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-primary-dark py-16 md:py-24">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <Badge
              variant="secondary"
              className="w-fit rounded-full px-4 py-1.5 gap-2 text-sm"
            >
              🚖 Driver Registration
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Grow Your Taxi Business
              <br />
              with <span className="text-secondary">{siteConfig.name}</span>
            </h1>
            <p className="text-white/65 text-base md:text-lg leading-relaxed">
              Join our verified driver network. Get direct pilgrimage tour
              bookings — flat ₹{siteConfig.business.driverSubscriptionPrice}
              /month, no per-booking commission.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {PERKS.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/80 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "₹999", label: "Per Month", sub: "Flat subscription" },
              { value: "20+", label: "Bookings/Month", sub: "Avg per driver" },
              { value: "0%", label: "Commission", sub: "Keep all earnings" },
              { value: "24hr", label: "Verification", sub: "Fast onboarding" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
              >
                <span className="text-3xl font-heading font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-white/80">
                  {stat.label}
                </span>
                <span className="text-xs text-white/50">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
