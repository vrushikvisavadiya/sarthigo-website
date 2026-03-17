"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import {
  useUpdateRole,
  usePermissions,
  UpdateRoleDto,
  Role,
} from "@/services/roles.service";
import { toast } from "sonner";

const roleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  isActive: z.boolean(),
  permissionIds: z.array(z.string()).optional(),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface EditRoleFormProps {
  role: Role;
  onSuccess?: () => void;
}

export function EditRoleForm({ role, onSuccess }: EditRoleFormProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    role.permissions.map((p) => p.id),
  );
  const { mutate: updateRole, isPending } = useUpdateRole();
  const { data: permissions } = usePermissions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role.name,
      description: role.description || "",
      isActive: role.isActive,
      permissionIds: role.permissions.map((p) => p.id),
    },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    setValue("permissionIds", selectedPermissions);
  }, [selectedPermissions, setValue]);

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) => {
      const newSelection = prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId];
      return newSelection;
    });
  };

  const onSubmit = (data: RoleFormData) => {
    const roleData: UpdateRoleDto = {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      permissionIds: selectedPermissions,
    };

    updateRole(
      { id: role.id, data: roleData },
      {
        onSuccess: () => {
          toast.success("Role updated successfully");
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update role",
          );
        },
      },
    );
  };

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
    {} as Record<string, typeof permissions>,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Role Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Manager, Supervisor"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Brief description of the role"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="isActive">Active Status</Label>
            <p className="text-sm text-muted-foreground">
              Enable this role for assignment
            </p>
          </div>
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked) => setValue("isActive", checked)}
          />
        </div>
      </div>

      {/* Permissions */}
      <div className="space-y-4">
        <div>
          <Label>Permissions</Label>
          <p className="text-sm text-muted-foreground">
            Select permissions for this role
          </p>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-4 border rounded-lg p-4">
          {Object.entries(groupedPermissions || {}).map(
            ([resource, resourcePermissions]) => (
              <div key={resource} className="space-y-2">
                <h4 className="font-medium capitalize text-sm">{resource}</h4>
                <div className="grid gap-2 pl-4">
                  {resourcePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor={permission.id}
                        className="text-sm cursor-pointer flex-1"
                      >
                        <span className="font-medium">{permission.name}</span>
                        <span className="text-muted-foreground ml-2">
                          - {permission.description}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {selectedPermissions.length} permission(s) selected
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Role
        </Button>
      </div>
    </form>
  );
}
