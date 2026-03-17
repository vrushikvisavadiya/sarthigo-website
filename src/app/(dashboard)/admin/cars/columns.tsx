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
  Car as CarIcon,
  Users,
  Wind,
  AirVent,
} from "lucide-react";
import {
  Car,
  useVerifyCar,
  useToggleCarActive,
  useDeleteCar,
  useHardDeleteCar,
  getCarTypeLabel,
} from "@/services/cars.service";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CarActions({
  car,
  onEdit,
}: {
  car: Car;
  onEdit?: (car: Car) => void;
}) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showHardDeleteDialog, setShowHardDeleteDialog] = useState(false);

  const { mutate: verifyCar, isPending: isVerifying } = useVerifyCar();
  const { mutate: toggleActive, isPending: isToggling } = useToggleCarActive();
  const { mutate: deleteCar, isPending: isDeleting } = useDeleteCar();
  const { mutate: hardDeleteCar, isPending: isHardDeleting } =
    useHardDeleteCar();

  const handleVerify = () => {
    verifyCar(car.id, {
      onSuccess: () => {
        toast.success("Car verification status updated");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to verify car");
      },
    });
  };

  const handleToggleActive = () => {
    toggleActive(car.id, {
      onSuccess: (data) => {
        toast.success(
          `Car ${data.isActive ? "activated" : "deactivated"} successfully`,
        );
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update car status",
        );
      },
    });
  };

  const handleDelete = () => {
    deleteCar(car.id, {
      onSuccess: () => {
        toast.success("Car deactivated successfully");
        setShowDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to deactivate car",
        );
      },
    });
  };

  const handleHardDelete = () => {
    hardDeleteCar(car.id, {
      onSuccess: () => {
        toast.success("Car permanently deleted");
        setShowHardDeleteDialog(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete car permanently",
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
            onClick={() => router.push(`/admin/cars/${car.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              onEdit ? onEdit(car) : router.push(`/admin/cars/${car.id}/edit`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleVerify} disabled={isVerifying}>
            <CheckCircle className="mr-2 h-4 w-4" />
            {car.verified ? "Unverify" : "Verify"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleActive} disabled={isToggling}>
            <Power className="mr-2 h-4 w-4" />
            {car.isActive ? "Deactivate" : "Activate"}
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
            <AlertDialogTitle>Deactivate Car?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate the car. It will not be available for new
              trips, but its data will be preserved.
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
            <AlertDialogTitle>Permanently Delete Car?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the car
              and remove all associated data from our servers.
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

export const carColumns = (onEdit?: (car: Car) => void): ColumnDef<Car>[] => [
  {
    accessorKey: "carModel",
    header: "Vehicle",
    cell: ({ row }) => {
      const car = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <CarIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{car.carModel}</div>
            <div className="text-sm text-muted-foreground">
              {getCarTypeLabel(car.carType)}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "carNumber",
    header: "Car Number",
    cell: ({ row }) => (
      <div className="font-mono text-sm font-semibold">
        {row.getValue("carNumber")}
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.original.owner;
      return owner ? (
        <div>
          <div className="font-medium">{owner.companyName}</div>
          <div className="text-sm text-muted-foreground">
            {owner.user.firstName} {owner.user.lastName}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "seats",
    header: "Capacity",
    cell: ({ row }) => {
      const seats = row.getValue("seats") as number;
      return (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{seats} seats</span>
        </div>
      );
    },
  },
  {
    accessorKey: "ac",
    header: "AC",
    cell: ({ row }) => {
      const ac = row.getValue("ac") as boolean;
      return (
        <Badge variant={ac ? "default" : "secondary"}>
          {ac ? (
            <>
              <Wind className="mr-1 h-3 w-3" />
              AC
            </>
          ) : (
            <>
              <AirVent className="mr-1 h-3 w-3" />
              Non-AC
            </>
          )}
        </Badge>
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
    accessorKey: "createdAt",
    header: "Added",
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
    cell: ({ row }) => <CarActions car={row.original} onEdit={onEdit} />,
  },
];
