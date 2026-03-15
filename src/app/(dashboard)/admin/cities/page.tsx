"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cityColumns } from "./columns";
import { useCities } from "@/services/cities.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateCityForm } from "./create-city-form";

export default function CitiesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data: cities, isLoading, error } = useCities();

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
          <p className="text-red-500 mb-2">Failed to load cities</p>
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
          <h1 className="text-3xl font-bold">Cities & Locations</h1>
          <p className="text-muted-foreground mt-1">
            Manage cities and locations for tour packages
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add City
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Total Cities
          </div>
          <div className="text-2xl font-bold mt-2">{cities?.length || 0}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Active Cities
          </div>
          <div className="text-2xl font-bold mt-2">
            {cities?.filter((c) => c.isActive).length || 0}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Inactive Cities
          </div>
          <div className="text-2xl font-bold mt-2">
            {cities?.filter((c) => !c.isActive).length || 0}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Total Packages
          </div>
          <div className="text-2xl font-bold mt-2">
            {cities?.reduce(
              (sum, c) =>
                sum +
                (c._count?.packagesAsSource || 0) +
                (c._count?.packagesAsDestination || 0),
              0,
            ) || 0}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-lg border bg-card">
        <DataTable columns={cityColumns} data={cities || []} />
      </div>

      {/* Create City Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New City</DialogTitle>
          </DialogHeader>
          <CreateCityForm onSuccess={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
