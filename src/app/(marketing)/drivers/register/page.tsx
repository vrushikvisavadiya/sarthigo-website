import type { Metadata } from "next";
import { RegisterHero } from "@/sections/drivers/register-hero";
import { RegisterForm } from "@/features/drivers/components/register-form";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Register as a Driver — Join Sarthigo",
  description:
    "Join Sarthigo's verified driver network in Somnath. Get direct pilgrimage tour bookings. Flat ₹999/month — no commission cuts.",
};

export default function DriverRegisterPage() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RegisterHero />

      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          {/* Form Card */}
          <div className="rounded-2xl border border-border bg-background shadow-xl p-6 md:p-10">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Driver Registration Form
              </h2>
              <p className="text-muted-foreground text-sm">
                Takes 3 minutes. No payment needed now.
              </p>
            </div>
            <RegisterForm />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-muted-foreground">
            {[
              "🔒 Your data is safe",
              "📞 We call within 24hrs",
              "💰 No charges until verified",
              "✅ Free to register",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
