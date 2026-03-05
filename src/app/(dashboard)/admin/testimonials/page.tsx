"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { Star, RefreshCw, CheckCircle2, EyeOff, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  trip: string;
  review: string;
  verified: boolean;
  active: boolean;
  created_at: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/testimonials${showAll ? "?all=1" : ""}`);
      const { data } = await res.json();
      setTestimonials(data ?? []);
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [showAll]);

  const toggle = async (
    id: string,
    field: "active" | "verified",
    value: boolean,
  ) => {
    setUpdating(id);
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      toast.success("Updated");
      fetchTestimonials();
    } catch {
      toast.error("Failed");
    } finally {
      setUpdating(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      setTestimonials((t) => t.filter((x) => x.id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Testimonials
          </h1>
          <p className="text-sm text-muted-foreground">
            {testimonials.length} review{testimonials.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="gap-2 rounded-xl text-xs"
          >
            {showAll ? "Show Active Only" : "Show All"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTestimonials}
            className="gap-2 rounded-xl"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-3">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse h-28" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <span className="text-4xl">⭐</span>
          <p className="text-muted-foreground">No testimonials yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((t, i) => (
            <m.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card
                className={cn(
                  "transition-colors",
                  !t.active && "opacity-60 border-dashed",
                )}
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-sm">
                            {t.name}
                          </span>
                          {t.verified && (
                            <Badge
                              variant="outline"
                              className="text-[10px] rounded-full text-green-600 border-green-300"
                            >
                              ✓ Verified
                            </Badge>
                          )}
                          {!t.active && (
                            <Badge
                              variant="outline"
                              className="text-[10px] rounded-full text-muted-foreground"
                            >
                              Hidden
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{t.location}</span>
                          <span>•</span>
                          <span>🚗 {t.trip}</span>
                          <span>•</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < t.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggle(t.id, "verified", !t.verified)}
                        disabled={updating === t.id}
                        className="gap-1 rounded-xl text-xs"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {t.verified ? "Unverify" : "Verify"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggle(t.id, "active", !t.active)}
                        disabled={updating === t.id}
                        className="gap-1 rounded-xl text-xs"
                      >
                        <EyeOff className="h-3 w-3" />
                        {t.active ? "Hide" : "Show"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => remove(t.id)}
                        className="gap-1 rounded-xl text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      )}
    </div>
  );
}
