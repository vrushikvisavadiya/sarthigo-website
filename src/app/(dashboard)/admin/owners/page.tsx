"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ownerColumns } from "./columns";
import { useOwners } from "@/services/owners.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateOwnerForm } from "./create-owner-form";

export default function OwnersPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data: owners, isLoading, error } = useOwners();

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
          <p className="text-red-500 mb-2">Failed to load owners</p>
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
          <h1 className="text-3xl font-bold">Fleet Owners</h1>
          <p className="text-muted-foreground mt-1">
            Manage fleet owners and their profiles
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Owner
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Total Owners
          </div>
          <div className="text-2xl font-bold mt-2">{owners?.length || 0}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Verified
          </div>
          <div className="text-2xl font-bold mt-2">
            {owners?.filter((o) => o.ownerProfile?.verified).length || 0}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Pending Verification
          </div>
          <div className="text-2xl font-bold mt-2">
            {owners?.filter((o) => !o.ownerProfile?.verified).length || 0}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Active
          </div>
          <div className="text-2xl font-bold mt-2">
            {owners?.filter((o) => o.isActive).length || 0}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-lg border bg-card">
        <DataTable columns={ownerColumns} data={owners || []} />
      </div>

      {/* Create Owner Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Fleet Owner</DialogTitle>
          </DialogHeader>
          <CreateOwnerForm onSuccess={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
