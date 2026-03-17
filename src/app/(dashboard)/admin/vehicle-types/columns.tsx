"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal, Edit, Trash2, Users, Car } from "lucide-react";
import {
  VehicleType,
  useDeleteVehicleType,
} from "@/services/vehicle-types.service";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

function VehicleTypeActions({
  vehicleType,
  onEdit,
}: {
  vehicleType: VehicleType;
  onEdit?: (vehicleType: VehicleType) => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteVehicleType, isPending: isDeleting } =
    useDeleteVehicleType();

  const handleDelete = () => {
    deleteVehicleType(vehicleType.id, {
      onSuccess: () => {
        toast.success("Vehicle type deleted successfully");
        setShowDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete vehicle type",
        );
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onEdit?.(vehicleType)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vehicle Type?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              vehicle type &quot;{vehicleType.name}&ldquo;.
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
    </>
  );
}

export const vehicleTypeColumns = (
  onEdit?: (vehicleType: VehicleType) => void,
): ColumnDef<VehicleType>[] => [
  {
    accessorKey: "name",
    header: "Vehicle Type",
    cell: ({ row }) => {
      const vehicleType = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Car className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{vehicleType.name}</div>
            {vehicleType.description && (
              <div className="text-sm text-muted-foreground">
                {vehicleType.description}
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "seats",
    header: "Seats",
    cell: ({ row }) => {
      const seats = row.getValue("seats") as number;
      return (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{seats}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {format(new Date(date), "MMM dd, yyyy")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <VehicleTypeActions vehicleType={row.original} onEdit={onEdit} />
    ),
  },
];
