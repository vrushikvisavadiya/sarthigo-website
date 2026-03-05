"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Car, Calendar, Search } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { whatsappBookingUrl } from "@/constants";
import { cn } from "@/lib/utils";

// ── Data ────────────────────────────────────────

export const CITIES_LIST = [
  { value: "somnath", label: "Somnath", icon: "🛕" },
  { value: "dwarka", label: "Dwarka", icon: "🐚" },
  { value: "gir", label: "Gir Forest", icon: "🦁" },
  { value: "junagadh", label: "Junagadh", icon: "🏰" },
  { value: "diu", label: "Diu", icon: "🏖️" },
  { value: "ambaji", label: "Ambaji", icon: "🙏" },
  { value: "kutch", label: "Kutch", icon: "🌅" },
  { value: "porbandar", label: "Porbandar", icon: "🕊️" },
  { value: "rajkot", label: "Rajkot", icon: "🏙️" },
  { value: "ahmedabad", label: "Ahmedabad", icon: "✈️" },
];

export const CAR_TYPES = [
  { value: "sedan", label: "Sedan", icon: "🚗", sub: "Swift Dzire, Etios · 1–4 pax", capacity: 4 },
  { value: "suv", label: "SUV", icon: "🚙", sub: "Ertiga, XL6 · 1–6 pax", capacity: 6 },
  { value: "innova", label: "Innova Crysta", icon: "🚐", sub: "Premium · 1–7 pax", capacity: 7 },
  { value: "tempo", label: "Tempo Traveller", icon: "🚌", sub: "Group · 8–12 pax", capacity: 12 },
];

export const TRIP_TYPES = [
  { value: "day-trip", label: "Day Trip", icon: "☀️", days: 1 },
  { value: "2day", label: "2 Days / 1 Night", icon: "🌙", days: 2 },
  { value: "3day", label: "3 Days / 2 Nights", icon: "🗓️", days: 3 },
  { value: "custom", label: "Custom Duration", icon: "✏️", days: null },
];

// ── Form Component ──────────────────────────────

interface BookingSearchFormProps {
  compact?: boolean;
  onSearch?: (filters: { city: string; car: string; trip: string }) => void;
}

export function BookingSearchForm({ compact = false, onSearch }: BookingSearchFormProps) {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [car, setCar] = useState("");
  const [trip, setTrip] = useState("");
  const [activeTab, setActiveTab] = useState<"form" | "car">("form");

  const selectedCity = CITIES_LIST.find((c) => c.value === city);
  const selectedCar = CAR_TYPES.find((c) => c.value === car);
  const selectedTrip = TRIP_TYPES.find((t) => t.value === trip);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ city, car, trip });
      return;
    }
    // Scroll to packages section
    const el = document.getElementById("packages");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const buildWhatsAppMessage = () => {
    const parts: string[] = ["Hi! I want to book a taxi."];
    if (selectedCity) parts.push(`📍 City: ${selectedCity.label}`);
    if (selectedCar) parts.push(`🚗 Vehicle: ${selectedCar.label} (${selectedCar.sub})`);
    if (selectedTrip) parts.push(`📅 Trip: ${selectedTrip.label}`);
    parts.push("Please share available packages and pricing.");
    return parts.join("\n");
  };

  const hasAnySelection = city || car || trip;

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-2.5 w-full">
        {/* City */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
          >
            <option value="">Select City</option>
            {CITIES_LIST.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Car */}
        <div className="relative flex-1">
          <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <select
            value={car}
            onChange={(e) => setCar(e.target.value)}
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
          >
            <option value="">Car Type</option>
            {CAR_TYPES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Trip */}
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <select
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
          >
            <option value="">Trip Duration</option>
            {TRIP_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.icon} {t.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleSearch}
          size="default"
          className="rounded-xl gap-2 font-semibold h-11 px-6 shrink-0"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    );
  }

  // Full form (used in hero)
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border border-border bg-background shadow-2xl shadow-black/10 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border">
          {[
            { key: "form", label: "🗺️ Find Packages", desc: "By city & duration" },
            { key: "car", label: "🚗 Choose Vehicle", desc: "By car type" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "form" | "car")}
              className={cn(
                "flex-1 py-3.5 px-4 text-sm font-medium transition-colors text-left pl-5",
                activeTab === tab.key
                  ? "bg-primary/5 text-primary border-b-2 border-primary -mb-px"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              <div className="font-semibold">{tab.label}</div>
              <div className="text-xs text-muted-foreground font-normal">{tab.desc}</div>
            </button>
          ))}
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Row 1: City + Trip */}
          {activeTab === "form" && (
            <div className="grid sm:grid-cols-2 gap-3">
              {/* From City */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Starting City
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CITIES_LIST.slice(0, 6).map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCity(c.value === city ? "" : c.value)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border py-2.5 px-1 text-xs font-medium transition-all",
                        city === c.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-muted/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      <span className="text-base">{c.icon}</span>
                      <span className="leading-none">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trip Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Trip Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TRIP_TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTrip(t.value === trip ? "" : t.value)}
                      className={cn(
                        "flex flex-col items-start gap-0.5 rounded-xl border py-3 px-3 text-xs font-medium transition-all text-left",
                        trip === t.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-muted/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      <span className="text-base">{t.icon}</span>
                      <span className="font-semibold text-foreground">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5" /> Vehicle Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CAR_TYPES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCar(c.value === car ? "" : c.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border py-3 px-2 text-xs transition-all",
                    car === c.value
                      ? "border-secondary bg-secondary/5 text-secondary shadow-sm"
                      : "border-border bg-muted/20 text-muted-foreground hover:border-secondary/40 hover:text-foreground"
                  )}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span className="font-semibold text-foreground text-xs">{c.label}</span>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">{c.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selection Summary */}
          {hasAnySelection && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-muted-foreground font-medium">Selected:</span>
              {selectedCity && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-xs px-2.5 py-1 font-medium">
                  {selectedCity.icon} {selectedCity.label}
                </span>
              )}
              {selectedCar && (
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 text-secondary text-xs px-2.5 py-1 font-medium">
                  {selectedCar.icon} {selectedCar.label}
                </span>
              )}
              {selectedTrip && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted text-foreground text-xs px-2.5 py-1 font-medium">
                  {selectedTrip.icon} {selectedTrip.label}
                </span>
              )}
            </div>
          )}

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <Button
              onClick={handleSearch}
              size="lg"
              className="flex-1 rounded-xl gap-2 font-bold h-12 text-base"
            >
              <Search className="h-5 w-5" />
              {hasAnySelection ? "View Matching Packages" : "Browse All Packages"}
            </Button>
            <Button
              asChild
              size="lg"
              className="flex-1 rounded-xl gap-2 font-bold h-12 text-base bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25"
            >
              <a
                href={whatsappBookingUrl(buildWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
                Book via WhatsApp
              </a>
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            💵 No prepayment · ✅ Verified drivers · ⚡ Reply in &lt; 5 min
          </p>
        </div>
      </div>
    </div>
  );
}
