"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Phone,
  Mail,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  InboxIcon,
} from "lucide-react";
import { format } from "date-fns";
import {
  useContactMessages,
  useUpdateContact,
  useDeleteContact,
  ContactStatus,
} from "@/services/contact.service";
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { ContactDetailsDrawer } from "@/components/admin/contact-details-drawer";
import type { ContactMessage } from "@/services/contact.service";

const SUBJECT_LABELS: Record<string, string> = {
  booking: "🚗 Taxi Booking",
  package: "📦 Tour Package",
  driver: "🚖 Driver Registration",
  other: "💬 Other",
};

export default function ContactSubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">(
    "all",
  );
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const limit = 10;
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    confirmText: string;
    variant: "default" | "destructive";
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    confirmText: "",
    variant: "default",
    onConfirm: () => {},
  });

  const {
    data: contactData,
    isLoading,
    error,
  } = useContactMessages({
    status: statusFilter === "all" ? undefined : statusFilter,
    page,
    limit,
  });

  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();

  const messages = contactData?.data || [];
  const meta = contactData?.meta;

  const stats = {
    total: meta?.total || 0,
    pending: messages.filter((m) => m.status === "pending").length,
    reviewed: messages.filter((m) => m.status === "reviewed").length,
    resolved: messages.filter((m) => m.status === "resolved").length,
  };

  const handleStatusChange = (value: string) => {
    setPage(1);
    setStatusFilter(value as ContactStatus | "all");
  };

  const handleStatusUpdate = (
    id: string,
    status: "pending" | "reviewed" | "resolved" | "closed",
  ) => {
    if (status === "resolved" || status === "closed") {
      const label =
        status === "resolved" ? "Mark as Resolved" : "Close Message";
      const desc =
        status === "resolved"
          ? "Mark this contact message as resolved?"
          : "Close this contact message?";

      setConfirmDialog({
        open: true,
        title: label,
        description: desc,
        confirmText: label,
        variant: status === "closed" ? "destructive" : "default",
        onConfirm: async () => {
          try {
            await updateContact.mutateAsync({ id, data: { status } });
            toast.success(
              status === "resolved" ? "Marked as resolved" : "Message closed",
            );
            setSelectedContact(null);
            setConfirmDialog((prev) => ({ ...prev, open: false }));
          } catch {
            toast.error("Failed to update status");
          }
        },
      });
    } else {
      updateContact.mutate(
        { id, data: { status } },
        {
          onSuccess: () => {
            toast.success("Status updated");
            setSelectedContact(null);
          },
          onError: () => toast.error("Failed to update status"),
        },
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact message?")) return;
    try {
      await deleteContact.mutateAsync(id);
      toast.success("Deleted successfully");
      setSelectedContact(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Contact Messages</h1>
        <p className="text-muted-foreground mt-1">
          Manage contact form submissions from the website
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <InboxIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.reviewed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.resolved}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-64">
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Contact Messages ({isLoading ? "..." : (meta?.total ?? 0)})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">
                Failed to load contact messages
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <InboxIcon className="w-10 h-10 opacity-30" />
                          <p>No contact messages found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    messages.map((msg) => (
                      <TableRow
                        key={msg.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedContact(msg)}
                      >
                        <TableCell className="font-medium">
                          {msg.name}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              {msg.phone}
                            </div>
                            {msg.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <span className="truncate max-w-[160px]">
                                  {msg.email}
                                </span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Tag className="w-3 h-3 text-muted-foreground" />
                            {SUBJECT_LABELS[msg.subject] || msg.subject}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {msg.message}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(msg.createdAt), "MMM dd, yyyy")}
                          </div>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          {getStatusBadge(msg.status)}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedContact(msg)}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {msg.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleStatusUpdate(msg.id, "reviewed")
                                  }
                                  disabled={updateContact.isPending}
                                  title="Mark as Reviewed"
                                >
                                  <Eye className="w-4 h-4 text-blue-600" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() =>
                                    handleStatusUpdate(msg.id, "resolved")
                                  }
                                  disabled={updateContact.isPending}
                                  title="Mark Resolved"
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleStatusUpdate(msg.id, "closed")
                                  }
                                  disabled={updateContact.isPending}
                                  title="Close"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(msg.id)}
                              disabled={deleteContact.isPending}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {(meta.page - 1) * meta.limit + 1} to{" "}
                {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}{" "}
                messages
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!meta.hasPreviousPage || isLoading}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                    .filter(
                      (p) =>
                        p === 1 ||
                        p === meta.totalPages ||
                        Math.abs(p - meta.page) <= 1,
                    )
                    .map((p, idx, arr) => (
                      <div key={p} className="flex items-center">
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        )}
                        <Button
                          variant={p === meta.page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(p)}
                          disabled={isLoading}
                          className="min-w-[40px]"
                        >
                          {p}
                        </Button>
                      </div>
                    ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) => Math.min(meta.totalPages, p + 1))
                  }
                  disabled={!meta.hasNextPage || isLoading}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Details Drawer */}
      <ContactDetailsDrawer
        contact={selectedContact}
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
        isUpdating={updateContact.isPending}
        isDeleting={deleteContact.isPending}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText={confirmDialog.confirmText}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
      />
    </div>
  );
}
