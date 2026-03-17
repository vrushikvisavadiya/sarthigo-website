"use client";

import { useState } from "react";
import { Plus, Loader2, Car as CarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { carColumns } from "./columns";
import { useCars, Car } from "@/services/cars.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateCarForm } from "./create-car-form";
import { EditCarForm } from "./edit-car-form";

export default function CarsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { data: cars, isLoading, error } = useCars();

  const handleEdit = (car: Car) => {
    setSelectedCar(car);
    setIsEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setSelectedCar(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load cars</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vehicles</h1>
          <p className="text-muted-foreground mt-1">
            Manage fleet vehicles and their information
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CarIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Vehicles
              </p>
              <p className="text-2xl font-bold mt-1">{cars?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CarIcon className="w-6 h-6 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Verified
              </p>
              <p className="text-2xl font-bold mt-1">
                {cars?.filter((c) => c.verified).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <CarIcon className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active
              </p>
              <p className="text-2xl font-bold mt-1">
                {cars?.filter((c) => c.isActive).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <CarIcon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Inactive
              </p>
              <p className="text-2xl font-bold mt-1">
                {cars?.filter((c) => !c.isActive).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="">
        <DataTable columns={carColumns(handleEdit)} data={cars || []} />
      </div>

      {/* Create Car Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
          </DialogHeader>
          <CreateCarForm onSuccess={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Car Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
          </DialogHeader>
          {selectedCar && (
            <EditCarForm car={selectedCar} onSuccess={handleEditSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
