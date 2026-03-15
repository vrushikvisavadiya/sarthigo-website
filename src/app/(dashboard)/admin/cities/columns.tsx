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
import { MoreHorizontal, Edit, Trash2, Power, MapPin } from "lucide-react";
import {
  City,
  useToggleCityActive,
  useDeleteCity,
} from "@/services/cities.service";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

function CityActions({ city }: { city: City }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutate: toggleActive, isPending: isToggling } = useToggleCityActive();
  const { mutate: deleteCity, isPending: isDeleting } = useDeleteCity();

  const handleToggleActive = () => {
    toggleActive(city.id, {
      onSuccess: (data) => {
        toast.success(
          `City ${data.isActive ? "activated" : "deactivated"} successfully`,
        );
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update city status",
        );
      },
    });
  };

  const handleDelete = () => {
    deleteCity(city.id, {
      onSuccess: () => {
        toast.success("City deleted successfully");
        setShowDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to delete city");
      },
    });
  };

  const totalPackages =
    (city._count?.packagesAsSource || 0) +
    (city._count?.packagesAsDestination || 0);

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

          <DropdownMenuItem onClick={handleToggleActive} disabled={isToggling}>
            <Power className="mr-2 h-4 w-4" />
            {isToggling
              ? "Updating..."
              : city.isActive
                ? "Deactivate"
                : "Activate"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
            disabled={totalPackages > 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>

          {totalPackages > 0 && (
            <p className="px-2 py-1 text-xs text-muted-foreground">
              Cannot delete: {totalPackages} package(s) using this city
            </p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete City?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {city.name}. This action cannot be
              undone.
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

export const cityColumns: ColumnDef<City>[] = [
  {
    accessorKey: "name",
    header: "City",
    cell: ({ row }) => {
      const city = row.original;
      return (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{city.name}</div>
            {city.state && (
              <div className="text-sm text-muted-foreground">{city.state}</div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      return (
        <code className="text-sm bg-muted px-2 py-1 rounded">
          {row.original.slug}
        </code>
      );
    },
  },
  {
    accessorKey: "packages",
    header: "Packages",
    cell: ({ row }) => {
      const city = row.original;
      const asSource = city._count?.packagesAsSource || 0;
      const asDestination = city._count?.packagesAsDestination || 0;
      const total = asSource + asDestination;

      return (
        <div className="text-center">
          <div className="font-medium">{total}</div>
          {total > 0 && (
            <div className="text-xs text-muted-foreground">
              {asSource} source, {asDestination} dest
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
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
      return (
        <div className="text-sm">
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CityActions city={row.original} />,
  },
];
