import { siteConfig } from "./site";

// ── Types ──────────────────────────────────────
export type NavLink = {
  label: string;
  href: string;
};

export type CityLink = NavLink & {
  icon: string;
  slug: string;
  description: string;
};

export type SocialLink = NavLink & {
  iconName: string; // matches react-icons key
};

// ── Navbar Links ───────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Drivers", href: "/drivers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Cities ─────────────────────────────────────
export const CITIES: CityLink[] = [
  {
    label: "Somnath",
    slug: "somnath",
    href: "/city/somnath",
    icon: "🛕",
    description: "Jyotirlinga temple & coastal tours",
  },
  {
    label: "Dwarka",
    slug: "dwarka",
    href: "/city/dwarka",
    icon: "🐚",
    description: "Dwarkadhish temple & Beyt Dwarka",
  },
  {
    label: "Gir",
    slug: "gir",
    href: "/city/gir",
    icon: "🦁",
    description: "Asiatic lion safari packages",
  },
  {
    label: "Junagadh",
    slug: "junagadh",
    href: "/city/junagadh",
    icon: "🏰",
    description: "Uparkot fort & Girnar trek",
  },
  {
    label: "Ambaji",
    slug: "ambaji",
    href: "/city/ambaji",
    icon: "⛰️",
    description: "Shakti peetha pilgrimage",
  },
  {
    label: "Kutch",
    slug: "kutch",
    href: "/city/kutch",
    icon: "🏜️",
    description: "Rann Utsav & white desert tours",
  },
];

// ── Social Links ───────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "WhatsApp",
    href: siteConfig.social.whatsapp,
    iconName: "FaWhatsapp",
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    iconName: "FaInstagram",
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    iconName: "FaFacebookF",
  },
  {
    label: "X / Twitter",
    href: siteConfig.social.twitter,
    iconName: "FaXTwitter",
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    iconName: "FaYoutube",
  },
];

// ── Footer Links ───────────────────────────────
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Packages", href: "/packages" },
    { label: "Drivers", href: "/drivers" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  cities: CITIES.map(({ label, href }) => ({ label, href })),

  drivers: [
    { label: "Register as Driver", href: "/drivers/register" },
    { label: "Driver Dashboard", href: "/dashboard" },
    { label: "Subscription Plans", href: "/drivers/plans" },
    { label: "Driver Guidelines", href: "/drivers/guidelines" },
  ] satisfies NavLink[],

  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ] satisfies NavLink[],
};
