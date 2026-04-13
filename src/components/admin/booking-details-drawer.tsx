"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Loader2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
} from "lucide-react";
import { format } from "date-fns";
import { Submission } from "@/services/submissions.service";

interface BookingDetailsDrawerProps {
  booking: Submission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (
    id: string,
    status: "pending" | "reviewed" | "approved" | "rejected",
  ) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function BookingDetailsDrawer({
  booking,
  open,
  onOpenChange,
  onStatusUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: BookingDetailsDrawerProps) {
  if (!booking) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: "secondary", icon: Clock, text: "Pending" },
      reviewed: { variant: "default", icon: Eye, text: "Reviewed" },
      approved: { variant: "default", icon: CheckCircle, text: "Approved" },
      rejected: { variant: "destructive", icon: XCircle, text: "Rejected" },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Booking Details</SheetTitle>
          <SheetDescription>
            View and manage booking information
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Status */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Status
            </p>
            {getStatusBadge(booking.status)}
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Information</h3>

            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Name
                </p>
                <p className="font-medium">{booking.data?.name || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <p className="font-medium">{booking.data?.phone || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="font-medium">{booking.data?.email || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Booking Details</h3>

            <div className="grid gap-4">
              {/* Vehicle Type */}
              {booking.data?.vehicleTypeName && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Vehicle Type
                  </p>
                  <p className="font-medium">{booking.data.vehicleTypeName}</p>
                </div>
              )}

              {/* Pickup Location */}
              {booking.data?.pickupLocation && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Pickup Location
                  </p>
                  <p className="font-medium">{booking.data.pickupLocation}</p>
                </div>
              )}

              {/* Drop Location */}
              {booking.data?.dropLocation && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Drop Location
                  </p>
                  <p className="font-medium">{booking.data.dropLocation}</p>
                </div>
              )}

              {/* Pickup Date */}
              {booking.data?.pickupDate && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Pickup Date
                  </p>
                  <p className="font-medium">
                    {format(new Date(booking.data.pickupDate), "PPP")}
                  </p>
                </div>
              )}

              {/* Pickup Time */}
              {booking.data?.pickupTime && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Pickup Time
                  </p>
                  <p className="font-medium">{booking.data.pickupTime}</p>
                </div>
              )}

              {/* Additional fields */}
              {Object.entries(booking.data || {}).map(([key, value]) => {
                // Skip already displayed fields and internal fields
                if (
                  [
                    "name",
                    "phone",
                    "email",
                    "vehicleTypeName",
                    "vehicleType", // Skip the ID field
                    "pickupLocation",
                    "dropLocation",
                    "pickupDate",
                    "pickupTime",
                  ].includes(key)
                ) {
                  return null;
                }

                return (
                  <div key={key}>
                    <p className="text-sm font-medium text-muted-foreground mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-medium break-all">
                      {typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Notes
              </p>
              <p className="font-medium bg-muted p-3 rounded-md">
                {booking.notes}
              </p>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Created At
              </p>
              <p className="text-sm">
                {format(new Date(booking.createdAt), "PPp")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Updated At
              </p>
              <p className="text-sm">
                {format(new Date(booking.updatedAt), "PPp")}
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Footer with Actions */}
        <div className="border-t px-6 py-4 bg-background">
          <div className="flex flex-wrap gap-2">
            {booking.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStatusUpdate(booking.id, "reviewed")}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4 mr-2" />
                  )}
                  Mark as Reviewed
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onStatusUpdate(booking.id, "approved")}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onStatusUpdate(booking.id, "rejected")}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(booking.id)}
              disabled={isDeleting}
              className="ml-auto"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
