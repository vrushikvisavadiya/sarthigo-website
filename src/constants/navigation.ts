import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  icon?: string;
  children?: NavLink[];
};

export type CityLink = {
  slug: string;
  label: string;
  href: string;
  icon: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Somnath",
    href: "/city/somnath",
  },
  {
    label: "Packages",
    href: "/packages",
  },
  {
    label: "Book Now",
    href: "/book",
  },
  {
    label: "For Drivers",
    href: "/drivers/plans",
    children: [
      { label: "View Plans", href: "/drivers/plans" },
      { label: "Register as Driver", href: "/drivers/register" },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const CITIES: CityLink[] = [
  { slug: "somnath", label: "Somnath", href: "/city/somnath", icon: "🛕" },
  { slug: "dwarka", label: "Dwarka", href: "/city/dwarka", icon: "🐚" },
  { slug: "gir", label: "Gir", href: "/city/gir", icon: "🦁" },
  { slug: "junagadh", label: "Junagadh", href: "/city/junagadh", icon: "🏰" },
  { slug: "diu", label: "Diu", href: "/city/diu", icon: "🏖️" },
  { slug: "ambaji", label: "Ambaji", href: "/city/ambaji", icon: "🙏" },
  { slug: "kutch", label: "Kutch", href: "/city/kutch", icon: "🌅" },
];

export const FOOTER_LINKS = {
  travellers: [
    { label: "Somnath Taxi", href: "/city/somnath" },
    { label: "All Packages", href: "/packages" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/faq" },
  ],
  drivers: [
    { label: "Register as Driver", href: "/drivers/register" },
    { label: "View Plans", href: "/drivers/plans" },
    { label: "Driver Guidelines", href: "/drivers/guidelines" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  cities: [
    { label: "Somnath", href: "/city/somnath" },
    { label: "Dwarka", href: "/city/dwarka" },
    { label: "Gir", href: "/city/gir" },
    { label: "Junagadh", href: "/city/junagadh" },
    { label: "Diu", href: "/city/diu" },
    { label: "Ambaji", href: "/city/ambaji" },
  ],
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "WhatsApp", href: "https://wa.me/917984789311", icon: "whatsapp" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
];
