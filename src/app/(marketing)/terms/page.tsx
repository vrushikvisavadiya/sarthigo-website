import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { TERMS_OF_SERVICE } from "@/constants/legal";
import { siteConfig } from "@/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description={`By using ${siteConfig.name}, you agree to these terms. Please read carefully.`}
      lastUpdated={TERMS_OF_SERVICE.lastUpdated}
      sections={TERMS_OF_SERVICE.sections}
    />
  );
}
