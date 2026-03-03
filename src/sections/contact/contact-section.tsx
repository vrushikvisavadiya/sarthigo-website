"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { siteConfig, whatsappBookingUrl } from "@/constants";

// ── Contact Form Schema ────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit number"),
  email: z.string().email("Enter valid email").optional().or(z.literal("")),
  subject: z.enum(["booking", "package", "driver", "other"], {
    error: "Please select a subject",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ── Contact Info Cards ─────────────────────────
const CONTACT_CARDS = [
  {
    icon: <FaWhatsapp className="h-6 w-6" />,
    title: "WhatsApp",
    value: siteConfig.contact.phoneDisplay,
    sub: "Fastest response — usually within minutes",
    href: whatsappBookingUrl(),
    color: "bg-green-500",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    value: siteConfig.contact.phoneDisplay,
    sub: "Available 8 AM – 9 PM daily",
    href: `tel:${siteConfig.contact.phone}`,
    color: "bg-primary",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    value: siteConfig.contact.email,
    sub: "We reply within 24 hours",
    href: `mailto:${siteConfig.contact.email}`,
    color: "bg-secondary",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    value: siteConfig.contact.address,
    sub: "Currently operating in Somnath",
    href: "https://maps.google.com",
    color: "bg-purple-500",
  },
];

// ── Form ───────────────────────────────────────
function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setIsSuccess(true);
    reset();
    toast.success("Message sent! We'll get back to you shortly.");
  };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-5 py-12"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading font-bold text-xl text-foreground">
            Message Sent! ✅
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            We&apos;ll get back to you within 24 hours. For faster response,
            WhatsApp us directly!
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            className="rounded-xl gap-2 bg-green-500 hover:bg-green-600 text-white"
          >
            <a
              href={whatsappBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setIsSuccess(false)}
          >
            Send Another
          </Button>
        </div>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Your Name <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("name")}
            placeholder="Ramesh Patel"
            className="rounded-xl h-11"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Mobile Number <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              +91
            </span>
            <Input
              {...register("phone")}
              placeholder="9999999999"
              maxLength={10}
              className="rounded-xl h-11 pl-12"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Email Address (Optional)
        </label>
        <Input
          {...register("email")}
          type="email"
          placeholder="you@email.com"
          className="rounded-xl h-11"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Subject <span className="text-destructive">*</span>
        </label>
        <select
          {...register("subject")}
          className="w-full rounded-xl border border-input bg-background px-3 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">What&apos;s this about?</option>
          <option value="booking">🚗 Taxi Booking</option>
          <option value="package">📦 Tour Package</option>
          <option value="driver">🚖 Driver Registration</option>
          <option value="other">💬 Other</option>
        </select>
        {errors.subject && (
          <p className="text-xs text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          {...register("message")}
          placeholder="Tell us your travel dates, group size, destinations..."
          rows={4}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="rounded-xl gap-2 font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

// ── Main Section ───────────────────────────────
export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* ── Left: Info ── */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-7"
          >
            <div className="flex flex-col gap-2">
              <Badge
                variant="outline"
                className="w-fit rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
              >
                📍 Contact Info
              </Badge>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Let&apos;s Talk
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The fastest way to reach us is WhatsApp. For bookings, packages
                or driver queries — we&apos;re available 8 AM to 9 PM.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="flex flex-col gap-3">
              {CONTACT_CARDS.map((card, i) => (
                <m.a
                  key={i}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.color} text-white`}
                  >
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {card.title}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {card.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {card.sub}
                    </span>
                  </div>
                </m.a>
              ))}
            </div>

            {/* Hours */}
            <div className="rounded-xl border border-border bg-background p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <Clock className="h-4 w-4 text-secondary" />
                Response Hours
              </div>
              {[
                { day: "Monday – Saturday", time: "8:00 AM – 9:00 PM" },
                { day: "Sunday", time: "9:00 AM – 7:00 PM" },
                { day: "WhatsApp", time: "Always available" },
              ].map((h, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-medium text-foreground">{h.time}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                Follow us
              </p>
              <div className="flex gap-2">
                {[
                  {
                    icon: <FaWhatsapp className="h-4 w-4" />,
                    href: siteConfig.social.whatsapp,
                    color: "bg-green-500",
                  },
                  {
                    icon: <FaInstagram className="h-4 w-4" />,
                    href: siteConfig.social.instagram,
                    color: "bg-pink-500",
                  },
                  {
                    icon: <FaFacebookF className="h-4 w-4" />,
                    href: siteConfig.social.facebook,
                    color: "bg-blue-600",
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white hover:opacity-80 transition-opacity`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </m.div>

          {/* ── Right: Form ── */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border bg-background shadow-xl p-6 md:p-8">
              <div className="flex flex-col gap-1.5 mb-7">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  Send Us a Message
                </h3>
                <p className="text-muted-foreground text-sm">
                  Fill the form below or{" "}
                  <a
                    href={whatsappBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-medium hover:underline"
                  >
                    WhatsApp us directly
                  </a>{" "}
                  for instant response.
                </p>
              </div>
              <ContactForm />
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
