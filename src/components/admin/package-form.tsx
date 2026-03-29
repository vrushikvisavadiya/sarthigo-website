"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  useCreatePackage,
  useUpdatePackage,
} from "@/services/packages.service";
import { toast } from "sonner";
import type { Package, CreatePackageDto } from "@/types/package.types";
import type { City } from "@/types/package.types";

const packageSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  cityId: z.string().min(1, "City is required"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  nights: z.number().min(0, "Nights cannot be negative"),
  basePrice: z.number().min(1, "Price must be greater than 0"),
  maxPassengers: z.number().min(1, "Max passengers must be at least 1"),
  highlights: z.array(z.string()).min(1, "At least one highlight required"),
  inclusions: z.array(z.string()).min(1, "At least one inclusion required"),
  exclusions: z.array(z.string()),
  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      description: z.string(),
      activities: z.array(z.string()),
    }),
  ),
  images: z.array(z.string()),
  isPremium: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  badge: z.string().optional(),
});

type PackageFormData = z.infer<typeof packageSchema>;

interface PackageFormProps {
  package?: Package;
  cities: City[];
  onSuccess: () => void;
}

export function PackageForm({
  package: pkg,
  cities,
  onSuccess,
}: PackageFormProps) {
  const [highlightInput, setHighlightInput] = useState("");
  const [inclusionInput, setInclusionInput] = useState("");
  const [exclusionInput, setExclusionInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const createPackage = useCreatePackage();
  const updatePackage = useUpdatePackage(pkg?.id || "");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: pkg
      ? {
          name: pkg.name,
          description: pkg.description,
          cityId: pkg.cityId,
          duration: pkg.duration,
          nights: pkg.nights,
          basePrice: pkg.basePrice,
          maxPassengers: pkg.maxPassengers,
          highlights: pkg.highlights,
          inclusions: pkg.inclusions,
          exclusions: pkg.exclusions,
          itinerary: pkg.itinerary,
          images: pkg.images,
          isPremium: pkg.isPremium,
          isPopular: pkg.isPopular,
          badge: pkg.badge,
        }
      : {
          highlights: [],
          inclusions: [],
          exclusions: [],
          itinerary: [],
          images: [],
          isPremium: false,
          isPopular: false,
        },
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control,
    name: "itinerary",
  });

  const highlights = watch("highlights") || [];
  const inclusions = watch("inclusions") || [];
  const exclusions = watch("exclusions") || [];
  const images = watch("images") || [];

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setValue("highlights", [...highlights, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  const removeHighlight = (index: number) => {
    setValue(
      "highlights",
      highlights.filter((_, i) => i !== index),
    );
  };

  const addInclusion = () => {
    if (inclusionInput.trim()) {
      setValue("inclusions", [...inclusions, inclusionInput.trim()]);
      setInclusionInput("");
    }
  };

  const removeInclusion = (index: number) => {
    setValue(
      "inclusions",
      inclusions.filter((_, i) => i !== index),
    );
  };

  const addExclusion = () => {
    if (exclusionInput.trim()) {
      setValue("exclusions", [...exclusions, exclusionInput.trim()]);
      setExclusionInput("");
    }
  };

  const removeExclusion = (index: number) => {
    setValue(
      "exclusions",
      exclusions.filter((_, i) => i !== index),
    );
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setValue("images", [...images, imageInput.trim()]);
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: PackageFormData) => {
    try {
      if (pkg) {
        await updatePackage.mutateAsync(data);
        toast.success("Package updated successfully");
      } else {
        await createPackage.mutateAsync(data as CreatePackageDto);
        toast.success("Package created successfully");
      }
      onSuccess();
    } catch (error) {
      toast.error(
        pkg ? "Failed to update package" : "Failed to create package",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Somnath Darshan Day Trip"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cityId">City *</Label>
            <Select
              value={watch("cityId")}
              onValueChange={(value) => setValue("cityId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.cityId && (
              <p className="text-sm text-destructive">
                {errors.cityId.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Describe the package..."
            rows={4}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (Days) *</Label>
            <Input
              id="duration"
              type="number"
              {...register("duration", { valueAsNumber: true })}
              placeholder="1"
            />
            {errors.duration && (
              <p className="text-sm text-destructive">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nights">Nights *</Label>
            <Input
              id="nights"
              type="number"
              {...register("nights", { valueAsNumber: true })}
              placeholder="0"
            />
            {errors.nights && (
              <p className="text-sm text-destructive">
                {errors.nights.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="basePrice">Base Price (₹) *</Label>
            <Input
              id="basePrice"
              type="number"
              {...register("basePrice", { valueAsNumber: true })}
              placeholder="999"
            />
            {errors.basePrice && (
              <p className="text-sm text-destructive">
                {errors.basePrice.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPassengers">Max Passengers *</Label>
            <Input
              id="maxPassengers"
              type="number"
              {...register("maxPassengers", { valueAsNumber: true })}
              placeholder="4"
            />
            {errors.maxPassengers && (
              <p className="text-sm text-destructive">
                {errors.maxPassengers.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Highlights</h3>
        <div className="flex gap-2">
          <Input
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            placeholder="Add a highlight..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addHighlight())
            }
          />
          <Button type="button" onClick={addHighlight}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <span className="flex-1">{highlight}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeHighlight(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {errors.highlights && (
          <p className="text-sm text-destructive">
            {errors.highlights.message}
          </p>
        )}
      </div>

      {/* Inclusions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Inclusions</h3>
        <div className="flex gap-2">
          <Input
            value={inclusionInput}
            onChange={(e) => setInclusionInput(e.target.value)}
            placeholder="Add an inclusion..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addInclusion())
            }
          />
          <Button type="button" onClick={addInclusion}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {inclusions.map((inclusion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <span className="flex-1">{inclusion}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeInclusion(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {errors.inclusions && (
          <p className="text-sm text-destructive">
            {errors.inclusions.message}
          </p>
        )}
      </div>

      {/* Exclusions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Exclusions</h3>
        <div className="flex gap-2">
          <Input
            value={exclusionInput}
            onChange={(e) => setExclusionInput(e.target.value)}
            placeholder="Add an exclusion..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addExclusion())
            }
          />
          <Button type="button" onClick={addExclusion}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {exclusions.map((exclusion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <span className="flex-1">{exclusion}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeExclusion(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Images</h3>
        <div className="flex gap-2">
          <Input
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="Add image URL..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addImage())
            }
          />
          <Button type="button" onClick={addImage}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <span className="flex-1 truncate">{image}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tags & Badges</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="isPremium"
              checked={watch("isPremium")}
              onCheckedChange={(checked) => setValue("isPremium", checked)}
            />
            <Label htmlFor="isPremium">Premium Package</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPopular"
              checked={watch("isPopular")}
              onCheckedChange={(checked) => setValue("isPopular", checked)}
            />
            <Label htmlFor="isPopular">Popular Package</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge">Badge Text</Label>
            <Input
              id="badge"
              {...register("badge")}
              placeholder="e.g., Best Value"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createPackage.isPending || updatePackage.isPending}
        >
          {pkg ? "Update Package" : "Create Package"}
        </Button>
      </div>
    </form>
  );
}
