"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { vehicleTypeColumns } from "./columns";
import { useVehicleTypes, VehicleType } from "@/services/vehicle-types.service";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VehicleTypeForm } from "./vehicle-type-form";

export default function VehicleTypesPage() {
  const { data: vehicleTypes, isLoading } = useVehicleTypes();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] =
    useState<VehicleType | null>(null);

  const handleEdit = (vehicleType: VehicleType) => {
    setSelectedVehicleType(vehicleType);
    setIsEditDialogOpen(true);
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setSelectedVehicleType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Types</h1>
          <p className="text-muted-foreground">
            Manage vehicle types for your fleet
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle Type
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Types
              </p>
              <p className="text-2xl font-bold">{vehicleTypes?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Types
              </p>
              <p className="text-2xl font-bold">
                {vehicleTypes?.filter((vt) => vt.isActive).length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Inactive Types
              </p>
              <p className="text-2xl font-bold">
                {vehicleTypes?.filter((vt) => !vt.isActive).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="">
          <DataTable
            columns={vehicleTypeColumns(handleEdit)}
            data={vehicleTypes || []}
          />
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Vehicle Type</DialogTitle>
            <DialogDescription>
              Create a new vehicle type for your fleet
            </DialogDescription>
          </DialogHeader>
          <VehicleTypeForm onSuccess={handleCreateSuccess} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Vehicle Type</DialogTitle>
            <DialogDescription>
              Update vehicle type information
            </DialogDescription>
          </DialogHeader>
          {selectedVehicleType && (
            <VehicleTypeForm
              vehicleType={selectedVehicleType}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
