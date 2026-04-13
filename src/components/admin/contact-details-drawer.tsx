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
  MessageSquare,
  Tag,
} from "lucide-react";
import { format } from "date-fns";
import { ContactMessage } from "@/services/contact.service";

const SUBJECT_LABELS: Record<string, string> = {
  booking: "🚗 Taxi Booking",
  package: "📦 Tour Package",
  driver: "🚖 Driver Registration",
  other: "💬 Other",
};

interface ContactDetailsDrawerProps {
  contact: ContactMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (
    id: string,
    status: "pending" | "reviewed" | "resolved" | "closed",
  ) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function ContactDetailsDrawer({
  contact,
  open,
  onOpenChange,
  onStatusUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: ContactDetailsDrawerProps) {
  if (!contact) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: {
        variant: "secondary",
        icon: Clock,
        text: "Pending",
        className: "",
      },
      reviewed: {
        variant: "default",
        icon: Eye,
        text: "Reviewed",
        className: "",
      },
      resolved: {
        variant: "default",
        icon: CheckCircle,
        text: "Resolved",
        className: "bg-green-600 hover:bg-green-700",
      },
      closed: {
        variant: "destructive",
        icon: XCircle,
        text: "Closed",
        className: "",
      },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={`gap-1 ${config.className}`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Contact Message Details</SheetTitle>
          <SheetDescription>
            View and manage contact form submission
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Status */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Status
            </p>
            {getStatusBadge(contact.status)}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Name
                </p>
                <p className="font-medium">{contact.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <p className="font-medium">
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              </div>

              {contact.email && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </p>
                  <p className="font-medium">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Message Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Message</h3>
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Subject
                </p>
                <p className="font-medium">
                  {SUBJECT_LABELS[contact.subject] || contact.subject}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </p>
                <div className="bg-muted rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {contact.message}
                </div>
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          {contact.notes && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Admin Notes
              </p>
              <p className="bg-muted p-3 rounded-md text-sm">{contact.notes}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Submitted At
              </p>
              <p className="text-sm">
                {format(new Date(contact.createdAt), "PPp")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Last Updated
              </p>
              <p className="text-sm">
                {format(new Date(contact.updatedAt), "PPp")}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t px-6 py-4 bg-background">
          <div className="flex flex-wrap gap-2">
            {(contact.status === "pending" ||
              contact.status === "reviewed") && (
              <>
                {contact.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStatusUpdate(contact.id, "reviewed")}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Eye className="w-4 h-4 mr-2" />
                    )}
                    Mark as Reviewed
                  </Button>
                )}
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onStatusUpdate(contact.id, "resolved")}
                  disabled={isUpdating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Mark Resolved
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onStatusUpdate(contact.id, "closed")}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Close
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(contact.id)}
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
