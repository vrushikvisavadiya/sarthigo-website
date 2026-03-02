export const siteConfig = {
  // ── Brand ──────────────────────────────────────
  name: "Sarthigo",
  tagline: "Your Trusted Travel Partner",
  description:
    "Pre-book verified local taxis and multi-day tour packages in Somnath, Dwarka, Gir, Junagadh and across Gujarat's pilgrimage cities.",
  url: "https://sarthigo.com",
  logo: "/logo/logo.png",
  ogImage: "/og-image.png",

  // ── Contact ────────────────────────────────────
  contact: {
    phone: "+919999999999",
    phoneDisplay: "+91 99999 99999",
    email: "hello@sarthigo.com",
    whatsapp: "919999999999",
    whatsappMessage: "Hi! I want to book a taxi in Somnath",
    address: "Somnath, Gujarat, India",
  },

  // ── Social ─────────────────────────────────────
  social: {
    whatsapp: "https://wa.me/919999999999",
    instagram: "https://instagram.com/sarthigo",
    facebook: "https://facebook.com/sarthigo",
    twitter: "https://x.com/sarthigo",
    youtube: "https://youtube.com/@sarthigo",
  },

  // ── SEO ────────────────────────────────────────
  seo: {
    keywords: [
      "somnath taxi",
      "dwarka tour package",
      "gir safari cab",
      "gujarat pilgrimage cab",
      "junagadh taxi",
      "ambaji taxi booking",
      "kutch tour package",
      "sarthigo",
    ],
    twitterHandle: "@sarthigo",
  },

  // ── Business ───────────────────────────────────
  business: {
    driverSubscriptionPrice: 999,
    commissionPerBooking: { min: 150, max: 250 },
    targetBookingsPerMonth: { min: 30, max: 40 },
  },
} as const;

// ── Derived helpers (use anywhere) ──────────────
export const whatsappBookingUrl = (message?: string) =>
  `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    message ?? siteConfig.contact.whatsappMessage,
  )}`;
