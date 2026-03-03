import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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
