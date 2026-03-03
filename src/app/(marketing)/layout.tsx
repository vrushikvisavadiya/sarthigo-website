import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";

export const metadata: Metadata = {
  title: {
    default: "Sarthigo – Taxi & Tour Booking for Pilgrimage Cities",
    template: "%s | Sarthigo",
  },
  description:
    "Pre-book verified local taxis and multi-day tour packages in Somnath, Dwarka, Gir, Junagadh and across Gujarat's pilgrimage cities.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
