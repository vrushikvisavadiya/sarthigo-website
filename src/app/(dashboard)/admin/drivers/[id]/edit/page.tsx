"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDriver } from "@/services/drivers.service";
import { EditDriverForm } from "../../edit-driver-form";

export default function EditDriverPage() {
  const params = useParams();
  const router = useRouter();
  const driverId = params.id as string;

  const { data: driver, isLoading, error } = useDriver(driverId);

  const handleSuccess = () => {
    router.push(`/admin/drivers/${driverId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load driver</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Driver not found"}
          </p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Driver</h1>
          <p className="text-muted-foreground mt-1">
            Update {driver.name} information
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="rounded-lg border bg-card p-6 max-w-2xl">
        <EditDriverForm driver={driver} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
