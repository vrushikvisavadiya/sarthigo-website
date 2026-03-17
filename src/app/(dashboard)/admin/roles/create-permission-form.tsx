"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  useCreatePermission,
  CreatePermissionDto,
} from "@/services/roles.service";
import { toast } from "sonner";

const permissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  resource: z.string().min(2, "Resource must be at least 2 characters"),
  action: z.string().min(2, "Action must be at least 2 characters"),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

interface CreatePermissionFormProps {
  onSuccess?: () => void;
}

export function CreatePermissionForm({ onSuccess }: CreatePermissionFormProps) {
  const { mutate: createPermission, isPending } = useCreatePermission();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionFormData>({
    resolver: zodResolver(permissionSchema),
  });

  const onSubmit = (data: PermissionFormData) => {
    const permissionData: CreatePermissionDto = {
      name: data.name,
      description: data.description,
      resource: data.resource,
      action: data.action,
    };

    createPermission(permissionData, {
      onSuccess: () => {
        toast.success("Permission created successfully");
        onSuccess?.();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create permission",
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Permission Name *</Label>
          <Input
            id="name"
            placeholder="e.g., users:create, drivers:read"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Format: resource:action (e.g., users:create)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Input
            id="description"
            placeholder="e.g., Create new users"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="resource">Resource *</Label>
            <Input
              id="resource"
              placeholder="e.g., users, drivers, trips"
              {...register("resource")}
            />
            {errors.resource && (
              <p className="text-sm text-red-500">{errors.resource.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="action">Action *</Label>
            <Input
              id="action"
              placeholder="e.g., create, read, update, delete"
              {...register("action")}
            />
            {errors.action && (
              <p className="text-sm text-red-500">{errors.action.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Common Actions:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            • <strong>create</strong> - Create new resources
          </li>
          <li>
            • <strong>read</strong> - View resources
          </li>
          <li>
            • <strong>update</strong> - Modify existing resources
          </li>
          <li>
            • <strong>delete</strong> - Remove resources
          </li>
          <li>
            • <strong>manage</strong> - Full control over resources
          </li>
        </ul>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Permission
        </Button>
      </div>
    </form>
  );
}
