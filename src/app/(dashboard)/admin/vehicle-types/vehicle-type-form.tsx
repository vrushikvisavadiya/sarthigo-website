"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  useCreateVehicleType,
  useUpdateVehicleType,
  VehicleType,
} from "@/services/vehicle-types.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const vehicleTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  seats: z
    .number()
    .min(1, "Seats must be at least 1")
    .max(100, "Seats cannot exceed 100"),
  isActive: z.boolean(),
});

type VehicleTypeFormData = z.infer<typeof vehicleTypeSchema>;

interface VehicleTypeFormProps {
  vehicleType?: VehicleType;
  onSuccess?: () => void;
}

export function VehicleTypeForm({
  vehicleType,
  onSuccess,
}: VehicleTypeFormProps) {
  const isEditing = !!vehicleType;
  const { mutate: createVehicleType, isPending: isCreating } =
    useCreateVehicleType();
  const { mutate: updateVehicleType, isPending: isUpdating } =
    useUpdateVehicleType(vehicleType?.id || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VehicleTypeFormData>({
    resolver: zodResolver(vehicleTypeSchema),
    defaultValues: vehicleType
      ? {
          name: vehicleType.name,
          description: vehicleType.description || "",
          seats: vehicleType.seats,
          isActive: vehicleType.isActive,
        }
      : {
          name: "",
          description: "",
          seats: 4,
          isActive: true,
        },
  });

  const isActive = watch("isActive");

  const onSubmit = (data: VehicleTypeFormData) => {
    if (isEditing) {
      updateVehicleType(data, {
        onSuccess: () => {
          toast.success("Vehicle type updated successfully!");
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error("Failed to update vehicle type", {
            description: error?.response?.data?.message || "Unknown error",
          });
        },
      });
    } else {
      createVehicleType(data, {
        onSuccess: () => {
          toast.success("Vehicle type created successfully!");
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error("Failed to create vehicle type", {
            description: error?.response?.data?.message || "Unknown error",
          });
        },
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Vehicle Type Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="e.g., Innova, Ertiga, Tempo Traveller"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Brief description of this vehicle type"
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Seats */}
      <div className="space-y-2">
        <Label htmlFor="seats">Number of Seats</Label>
        <Input
          id="seats"
          type="number"
          {...register("seats", { valueAsNumber: true })}
          placeholder="4"
          min="1"
          max="100"
        />
        {errors.seats && (
          <p className="text-sm text-red-500">{errors.seats.message}</p>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="isActive" className="text-base">
            Active Status
          </Label>
          <p className="text-sm text-muted-foreground">
            Make this vehicle type available for selection
          </p>
        </div>
        <Switch
          id="isActive"
          checked={isActive}
          onCheckedChange={(checked) => setValue("isActive", checked)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Update" : "Create"} Vehicle Type
        </Button>
      </div>
    </form>
  );
}
