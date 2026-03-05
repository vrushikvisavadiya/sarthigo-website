"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  User,
  Phone,
  Mail,
  Car,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  vehicle_type: string;
  vehicle_number?: string;
  plan: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const STATUS_TAB = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/drivers${statusFilter ? `?status=${statusFilter}` : ""}`,
      );
      const { data } = await res.json();
      setDrivers(data ?? []);
    } catch {
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/drivers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Driver ${status} successfully`);
      fetchDrivers();
    } catch {
      toast.error("Failed to update driver status");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = drivers.filter((d) =>
    search
      ? d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.phone.includes(search) ||
        d.email.toLowerCase().includes(search.toLowerCase())
      : true,
  );

  const StatusBadge = ({ status }: { status: Driver["status"] }) => {
    const config = {
      pending: {
        color: "bg-amber-100 text-amber-700",
        icon: <Clock className="h-3 w-3" />,
      },
      approved: {
        color: "bg-green-100 text-green-700",
        icon: <CheckCircle2 className="h-3 w-3" />,
      },
      rejected: {
        color: "bg-red-100 text-red-700",
        icon: <XCircle className="h-3 w-3" />,
      },
    };
    const { color, icon } = config[status];
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
          color,
        )}
      >
        {icon}
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Drivers
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} driver{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchDrivers}
          className="gap-2 rounded-xl"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex rounded-xl border border-border overflow-hidden">
          {STATUS_TAB.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                statusFilter === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drivers..."
            className="pl-8 h-9 rounded-xl"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="grid gap-3">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse h-24" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <span className="text-4xl">🚗</span>
          <p className="text-muted-foreground">No drivers found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((driver, i) => (
            <m.div
              key={driver.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card className="hover:border-primary/20 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                        {driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-semibold text-foreground text-sm truncate">
                          {driver.name}
                        </span>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {driver.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {driver.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground rounded-full border border-border px-2 py-0.5">
                        <MapPin className="h-3 w-3" />
                        {driver.city}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground rounded-full border border-border px-2 py-0.5">
                        <Car className="h-3 w-3" />
                        {driver.vehicle_type}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs rounded-full capitalize"
                      >
                        {driver.plan}
                      </Badge>
                      <StatusBadge status={driver.status} />
                    </div>

                    {/* Actions */}
                    {driver.status === "pending" && (
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          onClick={() => updateStatus(driver.id, "approved")}
                          disabled={updating === driver.id}
                          className="gap-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(driver.id, "rejected")}
                          disabled={updating === driver.id}
                          className="gap-1.5 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
                        >
                          <XCircle className="h-3.5 w-3.5" /> Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      )}
    </div>
  );
}
