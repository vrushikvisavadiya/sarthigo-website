"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCreateCity } from "@/services/cities.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const createCitySchema = z.object({
  name: z.string().min(2, "City name is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  state: z.string().optional(),
  isActive: z.boolean(),
});

type CreateCityFormData = z.infer<typeof createCitySchema>;

interface CreateCityFormProps {
  onSuccess?: () => void;
}

export function CreateCityForm({ onSuccess }: CreateCityFormProps) {
  const { mutate: createCity, isPending } = useCreateCity();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateCityFormData>({
    resolver: zodResolver(createCitySchema),
    defaultValues: {
      isActive: true,
    },
  });

  const cityName = watch("name");
  const isActive = watch("isActive");

  // Auto-generate slug from city name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setValue("slug", slug);
  };

  const onSubmit = (data: CreateCityFormData) => {
    createCity(data, {
      onSuccess: () => {
        toast.success("City created successfully!");
        reset();
        onSuccess?.();
      },
      onError: (error: any) => {
        toast.error("Failed to create city", {
          description: error?.response?.data?.message || "Unknown error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* City Name */}
      <div className="space-y-2">
        <Label htmlFor="name">City Name</Label>
        <Input
          id="name"
          {...register("name")}
          onChange={(e) => {
            register("name").onChange(e);
            handleNameChange(e);
          }}
          placeholder="Mumbai"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL-friendly)</Label>
        <Input
          id="slug"
          {...register("slug")}
          placeholder="mumbai"
          className="font-mono text-sm"
        />
        {errors.slug && (
          <p className="text-sm text-red-500">{errors.slug.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Auto-generated from city name. Use lowercase letters, numbers, and
          hyphens only.
        </p>
      </div>

      {/* State */}
      <div className="space-y-2">
        <Label htmlFor="state">State (Optional)</Label>
        <Input id="state" {...register("state")} placeholder="Maharashtra" />
        {errors.state && (
          <p className="text-sm text-red-500">{errors.state.message}</p>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="isActive">Active Status</Label>
          <p className="text-sm text-muted-foreground">
            Make this city available for selection
          </p>
        </div>
        <Switch
          id="isActive"
          checked={isActive}
          onCheckedChange={(checked: boolean) => setValue("isActive", checked)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create City
        </Button>
      </div>
    </form>
  );
}
