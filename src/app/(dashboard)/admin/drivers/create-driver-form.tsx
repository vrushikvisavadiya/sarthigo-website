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
import { useCreateDriver } from "@/services/drivers.service";
import { useOwners } from "@/services/owners.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const createDriverSchema = z.object({
  ownerId: z.string().min(1, "Owner is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  licenseNumber: z.string().min(5, "Valid license number is required"),
});

type CreateDriverFormData = z.infer<typeof createDriverSchema>;

interface CreateDriverFormProps {
  onSuccess?: () => void;
}

export function CreateDriverForm({ onSuccess }: CreateDriverFormProps) {
  const { mutate: createDriver, isPending } = useCreateDriver();
  const { data: owners, isLoading: ownersLoading } = useOwners();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateDriverFormData>({
    resolver: zodResolver(createDriverSchema),
  });

  const selectedOwnerId = watch("ownerId");

  const onSubmit = (data: CreateDriverFormData) => {
    createDriver(data, {
      onSuccess: () => {
        toast.success("Driver created successfully!");
        reset();
        onSuccess?.();
      },
      onError: (error: any) => {
        toast.error("Failed to create driver", {
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

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Driver Name</Label>
        <Input id="name" {...register("name")} placeholder="John Doe" />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" {...register("phone")} placeholder="+1234567890" />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* License Number */}
      <div className="space-y-2">
        <Label htmlFor="licenseNumber">License Number</Label>
        <Input
          id="licenseNumber"
          {...register("licenseNumber")}
          placeholder="DL1234567890"
        />
        {errors.licenseNumber && (
          <p className="text-sm text-red-500">{errors.licenseNumber.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Driver
        </Button>
      </div>
    </form>
  );
}
