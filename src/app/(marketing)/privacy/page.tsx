import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { PRIVACY_POLICY } from "@/constants/legal";
import { siteConfig } from "@/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`This policy explains how ${siteConfig.name} collects, uses and protects your information.`}
      lastUpdated={PRIVACY_POLICY.lastUpdated}
      sections={PRIVACY_POLICY.sections}
    />
  );
}
