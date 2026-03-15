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
} from "lucide-react";
import {
  Owner,
  useVerifyOwner,
  useToggleOwnerActive,
  useDeleteOwner,
  useHardDeleteOwner,
} from "@/services/owners.service";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

function OwnerActions({ owner }: { owner: Owner }) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showHardDeleteDialog, setShowHardDeleteDialog] = useState(false);

  const { mutate: verifyOwner, isPending: isVerifying } = useVerifyOwner();
  const { mutate: toggleActive, isPending: isToggling } =
    useToggleOwnerActive();
  const { mutate: deleteOwner, isPending: isDeleting } = useDeleteOwner();
  const { mutate: hardDeleteOwner, isPending: isHardDeleting } =
    useHardDeleteOwner();

  const handleVerify = () => {
    verifyOwner(owner.id, {
      onSuccess: () => {
        toast.success("Owner verified successfully");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to verify owner");
      },
    });
  };

  const handleToggleActive = () => {
    toggleActive(owner.id, {
      onSuccess: (data) => {
        toast.success(
          `Owner ${data.isActive ? "activated" : "deactivated"} successfully`,
        );
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update owner status",
        );
      },
    });
  };

  const handleDelete = () => {
    deleteOwner(owner.id, {
      onSuccess: () => {
        toast.success("Owner deactivated successfully");
        setShowDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to deactivate owner",
        );
      },
    });
  };

  const handleHardDelete = () => {
    hardDeleteOwner(owner.id, {
      onSuccess: () => {
        toast.success("Owner permanently deleted");
        setShowHardDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to delete owner");
      },
    });
  };

  const handleViewDetails = () => {
    router.push(`/admin/owners/${owner.id}`);
  };

  const handleEdit = () => {
    router.push(`/admin/owners/${owner.id}/edit`);
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
          <DropdownMenuItem onClick={handleViewDetails}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Owner
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {!owner.ownerProfile?.verified && (
            <DropdownMenuItem onClick={handleVerify} disabled={isVerifying}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {isVerifying ? "Verifying..." : "Verify Owner"}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={handleToggleActive} disabled={isToggling}>
            <Power className="mr-2 h-4 w-4" />
            {isToggling
              ? "Updating..."
              : owner.isActive
                ? "Deactivate"
                : "Activate"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-orange-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Soft Delete
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setShowHardDeleteDialog(true)}
            className="text-red-600"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Permanent Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Soft Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Owner?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate {owner.ownerProfile?.companyName}. The owner
              account will be disabled but data will be preserved. You can
              reactivate it later.
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

      {/* Hard Delete Confirmation Dialog */}
      <AlertDialog
        open={showHardDeleteDialog}
        onOpenChange={setShowHardDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently Delete Owner?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {owner.ownerProfile?.companyName} and
              all associated data. This action cannot be undone.
              <br />
              <br />
              <strong className="text-red-600">Warning:</strong> This will fail
              if the owner has any drivers or vehicles. Please remove them
              first.
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

export const ownerColumns: ColumnDef<Owner>[] = [
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => {
      const owner = row.original;
      return (
        <div>
          <div className="font-medium">{owner.ownerProfile?.companyName}</div>
          <div className="text-sm text-muted-foreground">
            {owner.firstName} {owner.lastName}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Contact",
    cell: ({ row }) => {
      const owner = row.original;
      return (
        <div>
          <div className="text-sm">{owner.email}</div>
          <div className="text-sm text-muted-foreground">{owner.phone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => {
      return <div>{row.original.ownerProfile?.city}</div>;
    },
  },
  {
    accessorKey: "drivers",
    header: "Drivers",
    cell: ({ row }) => {
      const driversCount = row.original.ownerProfile?.drivers?.length || 0;
      return <div className="text-center">{driversCount}</div>;
    },
  },
  {
    accessorKey: "cars",
    header: "Vehicles",
    cell: ({ row }) => {
      const carsCount = row.original.ownerProfile?.cars?.length || 0;
      return <div className="text-center">{carsCount}</div>;
    },
  },
  {
    accessorKey: "verified",
    header: "Status",
    cell: ({ row }) => {
      const owner = row.original;
      const isVerified = owner.ownerProfile?.verified;
      const isActive = owner.isActive;

      return (
        <div className="flex flex-col gap-1">
          <Badge variant={isVerified ? "default" : "secondary"}>
            {isVerified ? "Verified" : "Pending"}
          </Badge>
          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
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
    cell: ({ row }) => <OwnerActions owner={row.original} />,
  },
];
