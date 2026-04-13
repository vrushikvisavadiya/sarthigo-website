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
  Car,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import {
  useSubmissions,
  useUpdateSubmission,
  useDeleteSubmission,
} from "@/services/submissions.service";
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { BookingDetailsDrawer } from "@/components/admin/booking-details-drawer";

type SubmissionStatus =
  | "all"
  | "pending"
  | "reviewed"
  | "approved"
  | "rejected";

export default function SubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  // Fetch submissions with filters and pagination (only bookings)
  const {
    data: submissionsData,
    isLoading,
    error,
  } = useSubmissions({
    type: "booking", // Only fetch bookings
    status: statusFilter === "all" ? undefined : statusFilter,
    page,
    limit,
  });

  // Mutations
  const updateSubmission = useUpdateSubmission();
  const deleteSubmission = useDeleteSubmission();

  const submissions = submissionsData?.data || [];
  const meta = submissionsData?.meta;

  // Get statistics from current page data
  const stats = {
    total: meta?.total || 0,
    pending: submissions.filter((s: any) => s.status === "pending").length,
    reviewed: submissions.filter((s: any) => s.status === "reviewed").length,
    approved: submissions.filter((s: any) => s.status === "approved").length,
  };

  // Reset to page 1 when status filter changes
  const handleStatusChange = (value: string) => {
    setPage(1);
    setStatusFilter(value as SubmissionStatus);
  };

  // Handle status update with confirmation
  const handleStatusUpdate = (
    id: string,
    status: "pending" | "reviewed" | "approved" | "rejected",
  ) => {
    // Show confirmation for approve and reject actions
    if (status === "approved" || status === "rejected") {
      const action = status === "approved" ? "approve" : "reject";
      const actionText = status === "approved" ? "Approve" : "Reject";

      setConfirmDialog({
        open: true,
        title: `${actionText} Submission`,
        description: `Are you sure you want to ${action} this submission? This action cannot be undone.`,
        confirmText: actionText,
        variant: status === "rejected" ? "destructive" : "default",
        onConfirm: async () => {
          try {
            await updateSubmission.mutateAsync({
              id,
              data: { status },
            });
            toast.success(`Submission ${status} successfully`);
            setSelectedSubmission(null);
            setConfirmDialog({ ...confirmDialog, open: false });
          } catch (error) {
            toast.error("Failed to update submission");
          }
        },
      });
    } else {
      // For other status changes, update directly without confirmation
      updateSubmission.mutate(
        {
          id,
          data: { status },
        },
        {
          onSuccess: () => {
            toast.success(`Submission ${status} successfully`);
            setSelectedSubmission(null);
          },
          onError: () => {
            toast.error("Failed to update submission");
          },
        },
      );
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      await deleteSubmission.mutateAsync(id);
      toast.success("Submission deleted successfully");
      setSelectedSubmission(null);
    } catch (error) {
      toast.error("Failed to delete submission");
    }
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Manage all booking requests from customers
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
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
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reviewed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
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
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as SubmissionStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Bookings ({isLoading ? "..." : submissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-destructive">Failed to load submissions</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No submissions found
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission: any) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          {submission?.data?.name}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              {submission.data?.phone || "N/A"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              {submission.data?.email || "N/A"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {submission.type === "driver_registration" ? (
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                {submission.data?.city || "N/A"}
                              </div>
                              <div className="flex items-center gap-1">
                                <Car className="w-3 h-3 text-muted-foreground" />
                                {submission.data?.vehicleModel || "N/A"}
                              </div>
                            </div>
                          ) : submission.type === "booking" ? (
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                {submission.data?.pickupLocation || "N/A"}
                              </div>
                              <div className="flex items-center gap-1">
                                <Car className="w-3 h-3 text-muted-foreground" />
                                {submission.data?.vehicleTypeName ||
                                  submission.data?.vehicleType ||
                                  "N/A"}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm">
                              <p className="font-medium">
                                Subject: {submission.data?.subject || "N/A"}
                              </p>
                              <p className="text-muted-foreground truncate max-w-xs">
                                {submission.data?.message || "N/A"}
                              </p>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            {format(
                              new Date(submission.createdAt),
                              "MMM dd, yyyy HH:mm",
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(submission.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {submission.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      submission.id,
                                      "reviewed",
                                    )
                                  }
                                  disabled={updateSubmission.isPending}
                                  title="Mark as Reviewed"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      submission.id,
                                      "approved",
                                    )
                                  }
                                  disabled={updateSubmission.isPending}
                                  title="Approve"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      submission.id,
                                      "rejected",
                                    )
                                  }
                                  disabled={updateSubmission.isPending}
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(submission.id)}
                              disabled={deleteSubmission.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
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
                submissions
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
                    .filter((p) => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        p === 1 ||
                        p === meta.totalPages ||
                        Math.abs(p - meta.page) <= 1
                      );
                    })
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

      {/* Booking Details Drawer */}
      <BookingDetailsDrawer
        booking={selectedSubmission}
        open={!!selectedSubmission}
        onOpenChange={(open) => !open && setSelectedSubmission(null)}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
        isUpdating={updateSubmission.isPending}
        isDeleting={deleteSubmission.isPending}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText={confirmDialog.confirmText}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
      />
    </div>
  );
}
