"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOwner, Owner } from "@/services/owners.service";
import { useCities } from "@/services/cities.service";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

const updateOwnerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  companyName: z.string().min(2, "Company name is required"),
  city: z.string().min(2, "City is required"),
});

type UpdateOwnerFormData = z.infer<typeof updateOwnerSchema>;

interface EditOwnerFormProps {
  owner: Owner;
  onSuccess?: () => void;
}

export function EditOwnerForm({ owner, onSuccess }: EditOwnerFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: updateOwner, isPending } = useUpdateOwner(owner.id);
  const { data: cities, isLoading: citiesLoading } = useCities(true); // Only active cities

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateOwnerFormData>({
    resolver: zodResolver(updateOwnerSchema),
    defaultValues: {
      email: owner.email,
      firstName: owner.firstName,
      lastName: owner.lastName,
      phone: owner.phone || "",
      companyName: owner.ownerProfile?.companyName || "",
      city: owner.ownerProfile?.city || "",
      password: "",
    },
  });

  const selectedCity = watch("city");

  const onSubmit = (data: UpdateOwnerFormData) => {
    // Remove password if empty (don't update it)
    const updateData: any = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      companyName: data.companyName,
      city: data.city,
    };

    // Only include password if it's provided
    if (data.password && data.password.length > 0) {
      updateData.password = data.password;
    }

    updateOwner(updateData, {
      onSuccess: () => {
        toast.success("Owner updated successfully!");
        onSuccess?.();
      },
      onError: (error: any) => {
        toast.error("Failed to update owner", {
          description: error?.response?.data?.message || "Unknown error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} placeholder="John" />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} placeholder="Doe" />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="owner@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password with visibility toggle */}
      <div className="space-y-2">
        <Label htmlFor="password">
          Password{" "}
          <span className="text-sm text-muted-foreground">
            (leave empty to keep current)
          </span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder="+91 98765 43210"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          {...register("companyName")}
          placeholder="ABC Travels"
        />
        {errors.companyName && (
          <p className="text-sm text-red-500">{errors.companyName.message}</p>
        )}
      </div>

      {/* City Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        {citiesLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading cities...
          </div>
        ) : (
          <Select
            value={selectedCity}
            onValueChange={(value) => setValue("city", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities?.map((city) => (
                <SelectItem key={city.id} value={city.name}>
                  {city.name}
                  {city.state && `, ${city.state}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isPending || citiesLoading}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Owner
        </Button>
      </div>
    </form>
  );
}
