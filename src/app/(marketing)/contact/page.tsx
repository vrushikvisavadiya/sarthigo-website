import type { Metadata } from "next";
import { ContactHero } from "@/sections/contact/contact-hero";
import { ContactSection } from "@/sections/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact Us — Sarthigo",
  description:
    "Get in touch with Sarthigo for taxi bookings, tour packages or driver registration in Somnath, Gujarat.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}
