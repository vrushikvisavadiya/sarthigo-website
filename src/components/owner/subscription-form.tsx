"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateSubscription } from "@/services/packages.service";
import { toast } from "sonner";
import type { Package } from "@/types/package.types";

const subscriptionSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    },
  );

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface SubscriptionFormProps {
  package: Package;
  onSuccess: () => void;
}

export function SubscriptionForm({
  package: pkg,
  onSuccess,
}: SubscriptionFormProps) {
  const createSubscription = useCreateSubscription();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    },
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      await createSubscription.mutateAsync({
        packageId: pkg.id,
        startDate: data.startDate,
        endDate: data.endDate,
      });
      toast.success(
        "Subscription request submitted successfully! Awaiting admin approval.",
      );
      onSuccess();
    } catch (error) {
      toast.error("Failed to create subscription request");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Package Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground">{pkg.city?.name}</p>
            </div>

            <div className="flex gap-2">
              {pkg.isPremium && <Badge variant="outline">Premium</Badge>}
              {pkg.isPopular && <Badge variant="outline">Popular</Badge>}
              {pkg.badge && <Badge variant="outline">{pkg.badge}</Badge>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {pkg.duration} Days / {pkg.nights} Nights
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Passengers</p>
                <p className="font-medium">{pkg.maxPassengers}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Subscription Price</span>
                <span className="text-3xl font-bold">
                  ₹{pkg.basePrice.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                One-time payment for subscription period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Period */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Subscription Period</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <div className="relative">
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                min={new Date().toISOString().split("T")[0]}
              />
              <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            {errors.startDate && (
              <p className="text-sm text-destructive">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date *</Label>
            <div className="relative">
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                min={new Date().toISOString().split("T")[0]}
              />
              <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            {errors.endDate && (
              <p className="text-sm text-destructive">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Your subscription request will be sent to the
            admin for approval. Once approved, you'll be able to offer this
            package to your customers.
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Terms & Conditions</h3>
        <div className="rounded-lg border p-4 space-y-2 text-sm">
          <p>• Subscription is subject to admin approval</p>
          <p>• Payment must be completed before activation</p>
          <p>• Subscription is non-refundable once activated</p>
          <p>
            • You can offer this package to customers during the subscription
            period
          </p>
          <p>• Package details and pricing are subject to change by admin</p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={createSubscription.isPending}>
          {createSubscription.isPending ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
}
