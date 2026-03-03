import type { Metadata } from "next";
import { PlansHero } from "@/sections/drivers/plans-hero";
import { PlansGrid } from "@/sections/drivers/plans-grid";

export const metadata: Metadata = {
  title: "Driver Plans & Pricing — Sarthigo",
  description:
    "Join Sarthigo as a local driver. Flat ₹999/month subscription, zero commission, direct pilgrimage tour bookings. Start free for 30 days.",
};

export default function DriverPlansPage() {
  return (
    <>
      <PlansHero />
      <PlansGrid />
    </>
  );
}
