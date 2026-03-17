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
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Power,
  XCircle,
  Star,
} from "lucide-react";
import {
  Driver,
  useVerifyDriver,
  useToggleDriverActive,
  useDeleteDriver,
  useHardDeleteDriver,
} from "@/services/drivers.service";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

function DriverActions({
  driver,
  onEdit,
}: {
  driver: Driver;
  onEdit?: (driver: Driver) => void;
}) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showHardDeleteDialog, setShowHardDeleteDialog] = useState(false);

  const { mutate: verifyDriver, isPending: isVerifying } = useVerifyDriver();
  const { mutate: toggleActive, isPending: isToggling } =
    useToggleDriverActive();
  const { mutate: deleteDriver, isPending: isDeleting } = useDeleteDriver();
  const { mutate: hardDeleteDriver, isPending: isHardDeleting } =
    useHardDeleteDriver();

  const handleVerify = () => {
    verifyDriver(driver.id, {
      onSuccess: () => {
        toast.success("Driver verification status updated");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to verify driver",
        );
      },
    });
  };

  const handleToggleActive = () => {
    toggleActive(driver.id, {
      onSuccess: (data) => {
        toast.success(
          `Driver ${data.isActive ? "activated" : "deactivated"} successfully`,
        );
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update driver status",
        );
      },
    });
  };

  const handleDelete = () => {
    deleteDriver(driver.id, {
      onSuccess: () => {
        toast.success("Driver deactivated successfully");
        setShowDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to deactivate driver",
        );
      },
    });
  };

  const handleHardDelete = () => {
    hardDeleteDriver(driver.id, {
      onSuccess: () => {
        toast.success("Driver permanently deleted");
        setShowHardDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to delete driver permanently",
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
          <DropdownMenuItem
            onClick={() => router.push(`/admin/drivers/${driver.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              onEdit
                ? onEdit(driver)
                : router.push(`/admin/drivers/${driver.id}/edit`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleVerify} disabled={isVerifying}>
            <CheckCircle className="mr-2 h-4 w-4" />
            {driver.verified ? "Unverify" : "Verify"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleActive} disabled={isToggling}>
            <Power className="mr-2 h-4 w-4" />
            {driver.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-orange-600"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Soft Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowHardDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Permanent Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Soft Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Driver?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate the driver account. The driver will not be
              able to accept new trips, but their data will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isDeleting ? "Deactivating..." : "Deactivate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Hard Delete Dialog */}
      <AlertDialog
        open={showHardDeleteDialog}
        onOpenChange={setShowHardDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently Delete Driver?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              driver account and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleHardDelete}
              disabled={isHardDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isHardDeleting ? "Deleting..." : "Delete Permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export const driverColumns = (
  onEdit?: (driver: Driver) => void,
): ColumnDef<Driver>[] => [
  {
    accessorKey: "name",
    header: "Driver",
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {driver.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium">{driver.name}</div>
            <div className="text-sm text-muted-foreground">{driver.phone}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("licenseNumber")}</div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.original.owner;
      return owner ? (
        <div>
          <div className="font-medium">{owner.name}</div>
          <div className="text-sm text-muted-foreground">{owner.email}</div>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "verified",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.getValue("verified") as boolean;
      return (
        <Badge variant={verified ? "default" : "secondary"}>
          {verified ? "Verified" : "Unverified"}
        </Badge>
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
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalTrips",
    header: "Trips",
    cell: ({ row }) => {
      const trips = row.getValue("totalTrips") as number;
      return <div className="font-medium">{trips}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
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
    cell: ({ row }) => <DriverActions driver={row.original} onEdit={onEdit} />,
  },
];
