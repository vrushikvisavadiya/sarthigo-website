"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { Package, Users, Star, MessageSquare, ArrowUpRight, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Stats {
  packages: number;
  drivers: { total: number; pending: number; approved: number };
  testimonials: number;
  contacts: { total: number; new_count: number };
}

function StatCard({ icon, label, value, sub, href, color, delay }: {
  icon: React.ReactNode; label: string; value: number | string; sub?: string; href: string; color: string; delay: number;
}) {
  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <Link href={href}>
        <Card className="hover:border-primary/30 hover:shadow-md transition-all group">
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color} text-white`}>
                {icon}
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-heading font-bold text-foreground">{value}</span>
              <span className="text-sm font-semibold text-foreground">{label}</span>
              {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
            </div>
          </CardContent>
        </Card>
      </Link>
    </m.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pkgRes, driversRes, testiRes, contactRes] = await Promise.all([
          fetch("/api/packages?all=1"),
          fetch("/api/drivers"),
          fetch("/api/testimonials?all=1"),
          fetch("/api/contact"),
        ]);

        const [pkg, driversData, testi, contact] = await Promise.all([
          pkgRes.json(), driversRes.json(), testiRes.json(), contactRes.json(),
        ]);

        const drivers = driversData.data ?? [];
        const contacts = contact.data ?? [];

        setStats({
          packages: (pkg.data ?? []).length,
          drivers: {
            total: drivers.length,
            pending: drivers.filter((d: { status: string }) => d.status === "pending").length,
            approved: drivers.filter((d: { status: string }) => d.status === "approved").length,
          },
          testimonials: (testi.data ?? []).length,
          contacts: {
            total: contacts.length,
            new_count: contacts.filter((c: { status: string }) => c.status === "new").length,
          },
        });
      } catch {
        // Supabase not set up yet — show zeros
        setStats({ packages: 0, drivers: { total: 0, pending: 0, approved: 0 }, testimonials: 0, contacts: { total: 0, new_count: 0 } });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back! Here&apos;s what&apos;s happening with Sarthigo.</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse h-32">
              <CardContent className="p-5" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon={<Package className="h-5 w-5" />} label="Total Packages" value={stats?.packages ?? 0} sub="Active tour packages" href="/admin/packages" color="bg-primary" delay={0} />
          <StatCard icon={<Users className="h-5 w-5" />} label="Registered Drivers" value={stats?.drivers.total ?? 0} sub={`${stats?.drivers.pending ?? 0} pending approval`} href="/admin/drivers" color="bg-secondary" delay={0.08} />
          <StatCard icon={<Star className="h-5 w-5" />} label="Testimonials" value={stats?.testimonials ?? 0} sub="Customer reviews" href="/admin/testimonials" color="bg-amber-500" delay={0.16} />
          <StatCard icon={<MessageSquare className="h-5 w-5" />} label="Contact Submissions" value={stats?.contacts.total ?? 0} sub={`${stats?.contacts.new_count ?? 0} new inquiries`} href="/admin/contacts" color="bg-purple-500" delay={0.24} />
        </div>
      )}

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: "/admin/packages", icon: "📦", title: "Manage Packages", desc: "Add, edit or delete tour packages" },
          { href: "/admin/drivers", icon: "🚗", title: "Approve Drivers", desc: "Review pending driver registrations" },
          { href: "/admin/contacts", icon: "📩", title: "Inbox", desc: "View & respond to customer inquiries" },
          { href: "/admin/testimonials", icon: "⭐", title: "Reviews", desc: "Approve & manage testimonials" },
          { href: "/admin/cities", icon: "📍", title: "City Pages", desc: "Manage city landing pages" },
          { href: "/admin/faq", icon: "❓", title: "FAQ", desc: "Edit frequently asked questions" },
        ].map((item, i) => (
          <m.div key={item.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}>
            <Link href={item.href}>
              <Card className="hover:border-primary/30 hover:shadow-md transition-all group h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          </m.div>
        ))}
      </div>
    </div>
  );
}
