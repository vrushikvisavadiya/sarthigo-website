export type Plan = {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  period: string;
  description: string;
  badge?: string;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
  }[];
  cta: string;
  ctaVariant: "default" | "secondary" | "outline";
};

export const DRIVER_PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    priceDisplay: "₹0",
    period: "for 30 days",
    description:
      "Try Sarthigo free for 30 days. Get your first bookings and see the value before paying.",
    badge: undefined,
    popular: false,
    ctaVariant: "outline",
    cta: "Start Free Trial",
    features: [
      { text: "Basic driver profile", included: true },
      { text: "Up to 5 bookings/month", included: true },
      { text: "WhatsApp lead delivery", included: true },
      { text: "Sarthigo verified badge", included: false },
      { text: "Featured in search results", included: false },
      { text: "Priority customer leads", included: false },
      { text: "Multi-city listing", included: false },
      { text: "Dedicated support", included: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 999,
    priceDisplay: "₹999",
    period: "per month",
    description:
      "Perfect for individual drivers starting out. Flat monthly fee, unlimited bookings, no commission ever.",
    badge: "Most Popular",
    popular: true,
    ctaVariant: "secondary",
    cta: "Get Started",
    features: [
      { text: "Full driver profile page", included: true },
      { text: "Unlimited bookings", included: true },
      { text: "WhatsApp lead delivery", included: true },
      { text: "Sarthigo verified badge", included: true },
      { text: "Featured in search results", included: true },
      { text: "Priority customer leads", included: false },
      { text: "Multi-city listing", included: false },
      { text: "Dedicated support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 1999,
    priceDisplay: "₹1,999",
    period: "per month",
    description:
      "For serious drivers who want maximum visibility, priority leads and multi-city presence.",
    badge: "Best Value",
    popular: false,
    ctaVariant: "default",
    cta: "Go Pro",
    features: [
      { text: "Full driver profile page", included: true },
      { text: "Unlimited bookings", included: true },
      { text: "WhatsApp lead delivery", included: true },
      { text: "Sarthigo verified badge", included: true },
      { text: "Featured in search results", included: true },
      { text: "Priority customer leads", included: true },
      { text: "Multi-city listing (up to 3)", included: true },
      { text: "Dedicated support", included: true },
    ],
  },
];

export const PLAN_FAQ = [
  {
    question: "Is there really no commission?",
    answer:
      "Yes — 0% commission on every booking. You pay a flat monthly subscription and keep 100% of what your customers pay you.",
  },
  {
    question: "When does billing start?",
    answer:
      "Billing starts after your 30-day free trial ends and you choose a plan. No credit card needed during trial.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time. Changes take effect from your next billing cycle.",
  },
  {
    question: "What is the Verified Badge?",
    answer:
      "The Sarthigo Verified Badge means our team has checked your license, RC, insurance and identity. It builds instant trust with tourists.",
  },
  {
    question: "How do I receive bookings?",
    answer:
      "Bookings come directly to your WhatsApp number. No app needed. Customer sends inquiry → you get notified → you confirm directly.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel anytime before your next billing date. No lock-in, no cancellation fees.",
  },
];
