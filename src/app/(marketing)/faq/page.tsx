import type { Metadata } from "next";
import { FaqPageContent } from "@/sections/faq/faq-page-content";
import { siteConfig } from "@/constants";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: `Common questions about booking taxis, tour packages and driver registration on ${siteConfig.name}.`,
};

export default function FaqPage() {
  return <FaqPageContent />;
}
