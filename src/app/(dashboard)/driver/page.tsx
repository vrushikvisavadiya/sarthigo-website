"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";
import { Car, Edit3, Loader2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DriverData {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  vehicle_type: string;
  plan: string;
  status: string;
  photo_url?: string;
}

export default function DriverDashboard() {
  const [driver, setDriver] = useState<DriverData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("drivers")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setDriver(data);
      setLoading(false);
    };
    fetchDriver();
  }, []);

  const STATUS_CONFIG = {
    pending: { color: "bg-amber-100 text-amber-700", label: "Pending Review" },
    approved: { color: "bg-green-100 text-green-700", label: "Approved ✓" },
    rejected: { color: "bg-red-100 text-red-700", label: "Rejected" },
  };

  const PLAN_BADGES = {
    free: "bg-muted text-muted-foreground",
    starter: "bg-primary/10 text-primary",
    pro: "bg-secondary/10 text-secondary",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="text-5xl">🚗</span>
        <h2 className="font-heading font-bold text-foreground text-xl">
          Driver profile not found
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          Your account is not linked to a driver profile yet. Please complete
          registration.
        </p>
        <Button asChild className="rounded-xl">
          <Link href="/drivers/register">Complete Registration</Link>
        </Button>
      </div>
    );
  }

  const statusCfg =
    STATUS_CONFIG[driver.status as keyof typeof STATUS_CONFIG] ??
    STATUS_CONFIG.pending;
  const planCfg =
    PLAN_BADGES[driver.plan as keyof typeof PLAN_BADGES] ?? PLAN_BADGES.free;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            My Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Welcome back, {driver.name.split(" ")[0]}!
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 rounded-xl"
        >
          <Link href="/driver/profile">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </div>

      {/* Status Banner */}
      {driver.status === "pending" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
          <span className="text-2xl">⏳</span>
          <div>
            <p className="font-semibold text-amber-800 text-sm">
              Application Under Review
            </p>
            <p className="text-amber-700 text-xs">
              Our team will verify your documents within 24 hours and notify
              you.
            </p>
          </div>
        </div>
      )}
      {driver.status === "rejected" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-3">
          <span className="text-2xl">❌</span>
          <div>
            <p className="font-semibold text-red-800 text-sm">
              Application Rejected
            </p>
            <p className="text-red-700 text-xs">
              Please update your profile with correct documents and contact
              support.
            </p>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl font-bold">
            {driver.photo_url ? (
              <img
                src={driver.photo_url}
                alt={driver.name}
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              driver.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading font-bold text-foreground text-xl">
                  {driver.name}
                </h2>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusCfg.color}`}
                >
                  {statusCfg.label}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${planCfg}`}
                >
                  {driver.plan} plan
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: <Phone className="h-4 w-4" />,
                  label: "Phone",
                  value: driver.phone,
                },
                {
                  icon: <Mail className="h-4 w-4" />,
                  label: "Email",
                  value: driver.email,
                },
                {
                  icon: <MapPin className="h-4 w-4" />,
                  label: "City",
                  value: driver.city,
                },
                {
                  icon: <Car className="h-4 w-4" />,
                  label: "Vehicle",
                  value: driver.vehicle_type,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span className="text-foreground font-medium capitalize">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            href: "/driver/profile",
            icon: "👤",
            title: "Update Profile",
            desc: "Edit your details & upload photo",
          },
          {
            href: "/drivers/plans",
            icon: "🚀",
            title: "Upgrade Plan",
            desc: `You're on ${driver.plan} plan`,
          },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="hover:border-primary/30 hover:shadow-md transition-all group h-full">
              <CardContent className="p-5 flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
