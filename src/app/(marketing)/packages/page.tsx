import type { Metadata } from "next";
import { PackagesHero } from "@/sections/packages/packages-hero";
import { PackagesList } from "@/sections/packages/packages-list";

export const metadata: Metadata = {
  title: "Tour Packages in Somnath, Gujarat",
  description:
    "Browse all Somnath taxi and tour packages. Day trips, Gir safari, Diu beach, Saurashtra circuit — verified drivers, no prepayment.",
  keywords: [
    "somnath tour package",
    "somnath taxi package",
    "gir safari package",
    "diu day trip from somnath",
    "saurashtra pilgrimage circuit",
  ],
};

export default function PackagesPage() {
  return (
    <>
      <PackagesHero />
      <PackagesList />
    </>
  );
}
