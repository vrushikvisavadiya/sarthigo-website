"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { Plus, Search, MapPin, Clock, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  title: string;
  city: string;
  duration: string;
  price: number;
  active: boolean;
  popular: boolean;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/packages?all=1");
      const { data } = await res.json();
      setPackages(data ?? []);
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const deletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      await fetch(`/api/packages/${id}`, { method: "DELETE" });
      toast.success("Package deleted");
      fetchPackages();
    } catch {
      toast.error("Failed to delete package");
    }
  };

  const filtered = packages.filter((p) =>
    search
      ? p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase())
      : true,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Tour Packages
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} active packages
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl"
          onClick={() => toast.info("Create form coming soon!")}
        >
          <Plus className="h-4 w-4" /> Add Package
        </Button>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or city..."
          className="pl-9 h-10 rounded-xl bg-background"
        />
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse h-40" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <span className="text-5xl">🧳</span>
          <p className="text-lg font-semibold text-foreground">
            No packages found
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">
            You haven&apos;t added any packages yet, or none match your search
            criteria.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pkg, i) => (
            <m.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={cn(
                  "hover:shadow-md transition-shadow",
                  !pkg.active && "opacity-60 grayscale",
                )}
              >
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-foreground leading-snug">
                      {pkg.title}
                    </h3>
                    {pkg.popular && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {pkg.city}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-foreground mt-1">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-2 pt-4 border-t border-border">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        pkg.active
                          ? "bg-green-100 text-green-700"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {pkg.active ? "Active" : "Draft"}
                    </span>
                    <div className="flex gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-lg"
                        onClick={() => toast.info("Edit form coming soon!")}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deletePackage(pkg.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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
