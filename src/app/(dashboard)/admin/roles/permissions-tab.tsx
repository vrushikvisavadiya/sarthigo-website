"use client";

import { useState } from "react";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  usePermissions,
  useDeletePermission,
  Permission,
} from "@/services/roles.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreatePermissionForm } from "./create-permission-form";
import { toast } from "sonner";

export function PermissionsTab() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deletePermission, setDeletePermission] = useState<Permission | null>(
    null,
  );
  const { data: permissions, isLoading, error } = usePermissions();
  const { mutate: deletePermissionMutation, isPending: isDeleting } =
    useDeletePermission();

  const handleDelete = () => {
    if (!deletePermission) return;

    deletePermissionMutation(deletePermission.id, {
      onSuccess: () => {
        toast.success("Permission deleted successfully");
        setDeletePermission(null);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete permission",
        );
      },
    });
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
          <p className="text-red-500 mb-2">Failed to load permissions</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  // Group permissions by resource
  const groupedPermissions = permissions?.reduce(
    (acc, permission) => {
      const resource = permission.resource;
      if (!acc[resource]) {
        acc[resource] = [];
      }
      acc[resource].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Total Permissions
          </div>
          <div className="text-2xl font-bold mt-2">
            {permissions?.length || 0}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Resources
          </div>
          <div className="text-2xl font-bold mt-2">
            {Object.keys(groupedPermissions || {}).length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Actions
          </div>
          <div className="text-2xl font-bold mt-2">
            {new Set(permissions?.map((p) => p.action)).size}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Permission
        </Button>
      </div>

      {/* Permissions Grid */}
      <div className="space-y-6">
        {Object.entries(groupedPermissions || {}).map(
          ([resource, resourcePermissions]) => (
            <div key={resource} className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {resource}
              </h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {resourcePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {permission.action}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">
                        {permission.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permission.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletePermission(permission)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      {/* Create Permission Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Permission</DialogTitle>
          </DialogHeader>
          <CreatePermissionForm
            onSuccess={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletePermission}
        onOpenChange={() => setDeletePermission(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Permission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the permission &quot;
              {deletePermission?.name}&quot; and remove it from all roles. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
