"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, Upload, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 chars"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  city: z.string().min(2, "City is required"),
  vehicle_type: z.string().min(2, "Vehicle type required"),
  vehicle_number: z.string().optional(),
  bio: z.string().max(300, "Max 300 chars").optional(),
  languages: z.string().optional(),
});
type ProfileForm = z.infer<typeof profileSchema>;

export default function DriverProfilePage() {
  const [driverId, setDriverId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: driver } = await supabase
        .from("drivers")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (driver) {
        setDriverId(driver.id);
        setPhotoUrl(driver.photo_url ?? "");
        reset({
          name: driver.name,
          phone: driver.phone,
          city: driver.city,
          vehicle_type: driver.vehicle_type,
          vehicle_number: driver.vehicle_number ?? "",
          bio: driver.bio ?? "",
          languages: (driver.languages ?? []).join(", "),
        });
      }
      setLoading(false);
    };
    fetch();
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    if (!driverId) return;
    try {
      const res = await fetch(`/api/drivers/${driverId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          languages: data.languages
            ? data.languages.split(",").map((l) => l.trim())
            : [],
          photo_url: photoUrl || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", "drivers");
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const { url } = await res.json();
      if (url) {
        setPhotoUrl(url);
        toast.success("Photo uploaded!");
      }
    } catch {
      toast.error("Failed to upload photo");
    } finally {
      setPhotoUploading(false);
    }
  };

  const CITIES = [
    "Somnath",
    "Dwarka",
    "Gir",
    "Junagadh",
    "Diu",
    "Kutch",
    "Ambaji",
    "Rajkot",
    "Other",
  ];
  const CAR_TYPES = ["Sedan", "SUV", "Innova Crysta", "Tempo Traveller"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Update your driver profile information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Photo Upload */}
        <Card>
          <CardContent className="p-5 flex items-center gap-5">
            <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                Profile Photo
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP · Max 10MB
              </p>
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-xl pointer-events-none"
                  disabled={photoUploading}
                >
                  {photoUploading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  {photoUploading ? "Uploading…" : "Upload Photo"}
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card>
          <CardContent className="p-5 flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">
              Personal Information
            </p>
            <Separator />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Full Name *
                </label>
                <Input
                  {...register("name")}
                  placeholder="Ramesh Patel"
                  className="h-10 rounded-xl"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Phone *
                </label>
                <Input
                  {...register("phone")}
                  placeholder="9876543210"
                  className="h-10 rounded-xl"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Languages (comma-separated)
              </label>
              <Input
                {...register("languages")}
                placeholder="Gujarati, Hindi, English"
                className="h-10 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                About Me (max 300 chars)
              </label>
              <textarea
                {...register("bio")}
                placeholder="Tell passengers a little about yourself…"
                rows={3}
                className="rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              {errors.bio && (
                <p className="text-xs text-destructive">{errors.bio.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle */}
        <Card>
          <CardContent className="p-5 flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">
              Vehicle Details
            </p>
            <Separator />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  City *
                </label>
                <select
                  {...register("city")}
                  className="h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Vehicle Type *
                </label>
                <select
                  {...register("vehicle_type")}
                  className="h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
                >
                  {CAR_TYPES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Vehicle Number
                </label>
                <Input
                  {...register("vehicle_number")}
                  placeholder="GJ01AB1234"
                  className="h-10 rounded-xl uppercase"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 rounded-xl gap-2 font-bold self-start"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
