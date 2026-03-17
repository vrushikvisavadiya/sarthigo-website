"use client";

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
import { Switch } from "@/components/ui/switch";
import { useUpdateCar, CarType, Car } from "@/services/cars.service";
import { useOwners } from "@/services/owners.service";
import { useActiveVehicleTypes } from "@/services/vehicle-types.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const updateCarSchema = z.object({
  ownerId: z.string().min(1, "Owner is required"),
  carModel: z.string().min(2, "Car model must be at least 2 characters"),
  carType: z.string().min(1, "Vehicle type is required"),
  carNumber: z.string().min(5, "Valid car number is required"),
  seats: z
    .number()
    .min(1, "Seats must be at least 1")
    .max(50, "Seats cannot exceed 50"),
  ac: z.boolean(),
});

type UpdateCarFormData = z.infer<typeof updateCarSchema>;

interface EditCarFormProps {
  car: Car;
  onSuccess?: () => void;
}

export function EditCarForm({ car, onSuccess }: EditCarFormProps) {
  const { mutate: updateCar, isPending } = useUpdateCar(car.id);
  const { data: owners, isLoading: ownersLoading } = useOwners();
  const { data: vehicleTypes, isLoading: vehicleTypesLoading } =
    useActiveVehicleTypes();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateCarFormData>({
    resolver: zodResolver(updateCarSchema),
    defaultValues: {
      ownerId: car.ownerId,
      carModel: car.carModel,
      carType: car.carType,
      carNumber: car.carNumber,
      seats: car.seats,
      ac: car.ac,
    },
  });

  const selectedOwnerId = watch("ownerId");
  const selectedCarType = watch("carType");
  const acEnabled = watch("ac");

  const onSubmit = (data: UpdateCarFormData) => {
    updateCar(data, {
      onSuccess: () => {
        toast.success("Car updated successfully!");
        onSuccess?.();
      },
      onError: (error: any) => {
        toast.error("Failed to update car", {
          description: error?.response?.data?.message || "Unknown error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Owner Selection */}
      <div className="space-y-2">
        <Label htmlFor="ownerId">Fleet Owner</Label>
        <Select
          value={selectedOwnerId}
          onValueChange={(value) => setValue("ownerId", value)}
          disabled={ownersLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select owner" />
          </SelectTrigger>
          <SelectContent>
            {ownersLoading ? (
              <div className="flex items-center justify-center p-2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : owners && owners.length > 0 ? (
              owners
                .filter((owner) => owner.isActive && owner.ownerProfile)
                .map((owner) => (
                  <SelectItem
                    key={owner.ownerProfile.id}
                    value={owner.ownerProfile.id}
                  >
                    {owner.firstName} {owner.lastName} -{" "}
                    {owner.ownerProfile.companyName}
                  </SelectItem>
                ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">
                No active owners found
              </div>
            )}
          </SelectContent>
        </Select>
        {errors.ownerId && (
          <p className="text-sm text-red-500">{errors.ownerId.message}</p>
        )}
      </div>

      {/* Car Model */}
      <div className="space-y-2">
        <Label htmlFor="carModel">Car Model</Label>
        <Input
          id="carModel"
          {...register("carModel")}
          placeholder="e.g., Toyota Innova Crysta"
        />
        {errors.carModel && (
          <p className="text-sm text-red-500">{errors.carModel.message}</p>
        )}
      </div>

      {/* Car Type */}
      <div className="space-y-2">
        <Label htmlFor="carType">Vehicle Type</Label>
        <Select
          value={selectedCarType}
          onValueChange={(value) => setValue("carType", value)}
          disabled={vehicleTypesLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>
          <SelectContent>
            {vehicleTypesLoading ? (
              <div className="flex items-center justify-center p-2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : vehicleTypes && vehicleTypes.length > 0 ? (
              vehicleTypes.map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name} ({type.seats} seats)
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">
                No vehicle types found
              </div>
            )}
          </SelectContent>
        </Select>
        {errors.carType && (
          <p className="text-sm text-red-500">{errors.carType.message}</p>
        )}
      </div>

      {/* Car Number */}
      <div className="space-y-2">
        <Label htmlFor="carNumber">Car Number</Label>
        <Input
          id="carNumber"
          {...register("carNumber")}
          placeholder="GJ01AB1234"
          className="uppercase"
        />
        {errors.carNumber && (
          <p className="text-sm text-red-500">{errors.carNumber.message}</p>
        )}
      </div>

      {/* Seats */}
      <div className="space-y-2">
        <Label htmlFor="seats">Number of Seats</Label>
        <Input
          id="seats"
          type="number"
          {...register("seats", { valueAsNumber: true })}
          placeholder="7"
          min="1"
          max="50"
        />
        {errors.seats && (
          <p className="text-sm text-red-500">{errors.seats.message}</p>
        )}
      </div>

      {/* AC Switch */}
      <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="ac" className="text-base">
            Air Conditioning
          </Label>
          <p className="text-sm text-muted-foreground">
            Does this vehicle have AC?
          </p>
        </div>
        <Switch
          id="ac"
          checked={acEnabled}
          onCheckedChange={(checked) => setValue("ac", checked)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Car
        </Button>
      </div>
    </form>
  );
}
