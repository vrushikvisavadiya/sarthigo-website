"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m, AnimatePresence } from "motion/react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  FileCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { whatsappBookingUrl, siteConfig } from "@/constants";
import {
  driverRegisterSchema,
  type DriverRegisterFormData,
} from "../schemas/register.schema";

// ── Step Config ────────────────────────────────
const STEPS = [
  { id: 1, title: "Personal Info", icon: <User className="h-4 w-4" /> },
  { id: 2, title: "Vehicle Info", icon: <Car className="h-4 w-4" /> },
  { id: 3, title: "Documents", icon: <FileCheck className="h-4 w-4" /> },
  { id: 4, title: "Confirmation", icon: <CheckCircle2 className="h-4 w-4" /> },
];

const CITY_OPTIONS = [
  { value: "somnath", label: "Somnath" },
  { value: "dwarka", label: "Dwarka" },
  { value: "gir", label: "Gir" },
  { value: "junagadh", label: "Junagadh" },
  { value: "ambaji", label: "Ambaji" },
  { value: "kutch", label: "Kutch" },
];

const VEHICLE_TYPES = [
  {
    value: "sedan",
    label: "Sedan",
    desc: "Swift Dzire, Etios etc.",
    icon: "🚗",
  },
  { value: "suv", label: "SUV", desc: "Ertiga, Marazzo etc.", icon: "🚙" },
  {
    value: "innova",
    label: "Innova/Crysta",
    desc: "Most popular for tours",
    icon: "🛻",
  },
  {
    value: "tempo",
    label: "Tempo Traveller",
    desc: "Groups of 9–12",
    icon: "🚐",
  },
];

const EXPERIENCE_OPTIONS = [
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5+", label: "5+ years" },
];

// ── Field Error ────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <AnimatePresence>
      <m.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="text-xs text-destructive mt-1"
      >
        {message}
      </m.p>
    </AnimatePresence>
  );
}

// ── Label ──────────────────────────────────────
function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-medium text-foreground">
      {children}
      {required && <span className="text-destructive ml-0.5">*</span>}
    </label>
  );
}

// ── Main Form ──────────────────────────────────
export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DriverRegisterFormData>({
    resolver: zodResolver(driverRegisterSchema),
    defaultValues: {
      hasLicense: false,
      hasRC: false,
      hasInsurance: false,
      agreeToTerms: false,
    },
  });

  const watchedVehicleType = watch("vehicleType");
  const watchedCity = watch("city");

  // ── Step Validation ──
  const stepFields: Record<number, (keyof DriverRegisterFormData)[]> = {
    1: ["fullName", "phone", "email", "city", "experience"],
    2: ["vehicleType", "vehicleModel", "vehicleNumber"],
    3: ["hasLicense", "hasRC", "hasInsurance", "agreeToTerms"],
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if (valid) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  const onSubmit = async (data: DriverRegisterFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          phone: data.phone,
          email: data.email ?? "",
          city: data.city,
          vehicle_type: data.vehicleType,
          vehicle_number: data.vehicleNumber,
          bio: `Experience: ${data.experience}. Vehicle: ${data.vehicleModel}`,
          languages: [],
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Registration failed");
      setIsSuccess(true);
      toast.success(json.message ?? "Registration submitted! We'll contact you within 24 hours.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please WhatsApp us instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success Screen ──
  if (isSuccess) {
    const formData = watch();
    const whatsappMsg = `Hi! I just registered as a driver on Sarthigo. My name is ${formData.fullName}, phone: ${formData.phone}, city: ${formData.city}, vehicle: ${formData.vehicleModel} (${formData.vehicleNumber}).`;

    return (
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-6 py-10"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-heading font-bold text-foreground">
            Registration Submitted! 🎉
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Thank you{" "}
            <span className="font-semibold text-foreground">
              {formData.fullName}
            </span>
            ! Our team will verify your details and contact you within{" "}
            <span className="text-primary font-semibold">24 hours</span>.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-5 text-left w-full max-w-sm flex flex-col gap-2 text-sm">
          <p className="font-semibold text-foreground mb-1">Your Details:</p>
          <p className="text-muted-foreground">📛 {formData.fullName}</p>
          <p className="text-muted-foreground">📱 {formData.phone}</p>
          <p className="text-muted-foreground">
            📍 {CITY_OPTIONS.find((c) => c.value === formData.city)?.label}
          </p>
          <p className="text-muted-foreground">
            🚗 {formData.vehicleModel} · {formData.vehicleNumber}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="rounded-xl gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          <a
            href={whatsappBookingUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="h-5 w-5" />
            Also Message Us on WhatsApp
          </a>
        </Button>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {/* ── Step Indicator ── */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 text-sm font-bold",
                  currentStep === step.id
                    ? "border-primary bg-primary text-primary-foreground scale-110"
                    : currentStep > step.id
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-border bg-background text-muted-foreground",
                )}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  currentStep === step.id
                    ? "text-primary"
                    : currentStep > step.id
                      ? "text-green-600"
                      : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 mt-[-16px] transition-all duration-300",
                  currentStep > step.id ? "bg-green-500" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Step Content ── */}
      <AnimatePresence mode="wait">
        <m.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-5"
        >
          {/* STEP 1 — Personal Info */}
          {currentStep === 1 && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label required>Full Name</Label>
                <Input
                  {...register("fullName")}
                  placeholder="e.g. Mahesh Patel"
                  className="rounded-xl h-11"
                />
                <FieldError message={errors.fullName?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label required>Mobile Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                    +91
                  </span>
                  <Input
                    {...register("phone")}
                    placeholder="9999999999"
                    maxLength={10}
                    className="rounded-xl h-11 pl-12"
                  />
                </div>
                <FieldError message={errors.phone?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Email Address (Optional)</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="mahesh@email.com"
                  className="rounded-xl h-11"
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label required>Operating City</Label>
                <select
                  {...register("city")}
                  className={cn(
                    "w-full rounded-xl border border-input bg-background px-3 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    !watchedCity && "text-muted-foreground",
                  )}
                >
                  <option value="">Select your city</option>
                  {CITY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.city?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label required>Driving Experience</Label>
                <select
                  {...register("experience")}
                  className="w-full rounded-xl border border-input bg-background px-3 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select experience</option>
                  {EXPERIENCE_OPTIONS.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.experience?.message} />
              </div>
            </>
          )}

          {/* STEP 2 — Vehicle Info */}
          {currentStep === 2 && (
            <>
              <div className="flex flex-col gap-2">
                <Label required>Vehicle Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {VEHICLE_TYPES.map((v) => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() =>
                        setValue(
                          "vehicleType",
                          v.value as DriverRegisterFormData["vehicleType"],
                          {
                            shouldValidate: true,
                          },
                        )
                      }
                      className={cn(
                        "flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all",
                        watchedVehicleType === v.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30",
                      )}
                    >
                      <span className="text-2xl">{v.icon}</span>
                      <span className="text-sm font-semibold text-foreground">
                        {v.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {v.desc}
                      </span>
                    </button>
                  ))}
                </div>
                <FieldError message={errors.vehicleType?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label required>Vehicle Model</Label>
                <Input
                  {...register("vehicleModel")}
                  placeholder="e.g. Toyota Innova Crysta"
                  className="rounded-xl h-11"
                />
                <FieldError message={errors.vehicleModel?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label required>Vehicle Registration Number</Label>
                <Input
                  {...register("vehicleNumber")}
                  placeholder="e.g. GJ12AB1234"
                  className="rounded-xl h-11 uppercase"
                  onChange={(e) =>
                    setValue(
                      "vehicleNumber",
                      e.target.value.toUpperCase().replace(/\s/g, ""),
                      { shouldValidate: true },
                    )
                  }
                />
                <FieldError message={errors.vehicleNumber?.message} />
              </div>
            </>
          )}

          {/* STEP 3 — Documents */}
          {currentStep === 3 && (
            <>
              <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 text-sm text-amber-700 dark:text-amber-400">
                ℹ️ Documents will be verified by our team during onboarding
                call. No uploads needed now.
              </div>

              {[
                {
                  field: "hasLicense" as const,
                  label: "I have a valid Commercial Driving License (CDL)",
                  icon: "🪪",
                },
                {
                  field: "hasRC" as const,
                  label: "I have a valid RC Book for my vehicle",
                  icon: "📋",
                },
                {
                  field: "hasInsurance" as const,
                  label: "My vehicle has valid insurance",
                  icon: "🛡️",
                },
              ].map(({ field, label, icon }) => {
                const checked = watch(field);
                return (
                  <button
                    key={field}
                    type="button"
                    onClick={() =>
                      setValue(field, !checked, { shouldValidate: true })
                    }
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                      checked
                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                        : "border-border hover:border-primary/30",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all",
                        checked
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-border",
                      )}
                    >
                      {checked && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium text-foreground">
                      {label}
                    </span>
                  </button>
                );
              })}

              {(errors.hasLicense || errors.hasRC || errors.hasInsurance) && (
                <p className="text-xs text-destructive">
                  All documents are required to register as a driver.
                </p>
              )}

              {/* Terms */}
              <button
                type="button"
                onClick={() =>
                  setValue("agreeToTerms", !watch("agreeToTerms"), {
                    shouldValidate: true,
                  })
                }
                className={cn(
                  "flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                  watch("agreeToTerms")
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30",
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 mt-0.5 transition-all",
                    watch("agreeToTerms")
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border",
                  )}
                >
                  {watch("agreeToTerms") && (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I agree to Sarthigo&apos;s{" "}
                  <span className="text-primary underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary underline">
                    Driver Guidelines
                  </span>
                  . I confirm all information provided is accurate.
                </span>
              </button>
              <FieldError message={errors.agreeToTerms?.message} />
            </>
          )}

          {/* STEP 4 — Confirmation */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center gap-3 py-4">
                <span className="text-5xl">🎉</span>
                <h3 className="font-heading font-bold text-xl text-foreground">
                  Almost Done!
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Review your details below and submit. Our team will contact
                  you within 24 hours.
                </p>
              </div>

              {/* Summary */}
              <div className="rounded-xl border border-border bg-muted/30 p-5 flex flex-col gap-3 text-sm">
                {[
                  {
                    icon: <User className="h-4 w-4" />,
                    label: "Name",
                    value: watch("fullName"),
                  },
                  {
                    icon: <Phone className="h-4 w-4" />,
                    label: "Phone",
                    value: `+91 ${watch("phone")}`,
                  },
                  {
                    icon: <Mail className="h-4 w-4" />,
                    label: "Email",
                    value: watch("email") || "Not provided",
                  },
                  {
                    icon: <MapPin className="h-4 w-4" />,
                    label: "City",
                    value: CITY_OPTIONS.find((c) => c.value === watch("city"))
                      ?.label,
                  },
                  {
                    icon: <Car className="h-4 w-4" />,
                    label: "Vehicle",
                    value: `${watch("vehicleModel")} · ${watch("vehicleNumber")}`,
                  },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-secondary">{row.icon}</span>
                    <span className="text-muted-foreground w-16">
                      {row.label}
                    </span>
                    <span className="font-medium text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
                💰 Subscription:{" "}
                <span className="font-bold">
                  ₹{siteConfig.business.driverSubscriptionPrice}/month
                </span>{" "}
                after verification. No charges now.
              </div>
            </div>
          )}
        </m.div>
      </AnimatePresence>

      {/* ── Navigation Buttons ── */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="rounded-xl gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 4 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="rounded-xl gap-2 ml-auto"
          >
            Next Step
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl gap-2 ml-auto min-w-32"
            variant="secondary"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Submit Registration
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
