"use client";

import { useParams, useRouter } from "next/navigation";
import { useDriver } from "@/services/drivers.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  Building2,
  Calendar,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
  Loader2,
  IdCard,
  User,
} from "lucide-react";
import { format } from "date-fns";

export default function DriverDetailPage() {
  const params = useParams();
  const router = useRouter();
  const driverId = params.id as string;

  const { data: driver, isLoading, error } = useDriver(driverId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load driver details</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Driver not found"}
          </p>
          <Button
            onClick={() => router.push("/admin/drivers")}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Drivers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/drivers")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Driver Details</h1>
            <p className="text-muted-foreground mt-1">
              View and manage driver information
            </p>
          </div>
        </div>
        <Button onClick={() => router.push(`/admin/drivers/${driverId}/edit`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Driver
        </Button>
      </div>

      {/* Status Badges */}
      <div className="flex gap-2">
        <Badge variant={driver.isActive ? "default" : "secondary"}>
          {driver.isActive ? "Active" : "Inactive"}
        </Badge>
        <Badge variant={driver.verified ? "default" : "secondary"}>
          {driver.verified ? (
            <>
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3 mr-1" />
              Unverified
            </>
          )}
        </Badge>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Driver Information Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Driver Information</h2>
          <div className="space-y-4">
            {/* Avatar and Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">
                  {driver.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">Driver</p>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{driver.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <IdCard className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    License Number
                  </p>
                  <p className="font-medium font-mono">
                    {driver.licenseNumber}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Dates */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">
                    {format(new Date(driver.createdAt), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>

              {driver.verified && driver.verifiedAt && (
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Verified On</p>
                    <p className="font-medium">
                      {format(new Date(driver.verifiedAt), "MMMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Owner Information Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Fleet Owner</h2>
          {driver.owner ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{driver.owner.name}</h3>
                  <p className="text-sm text-muted-foreground">Fleet Owner</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Owner Name</p>
                    <p className="font-medium">{driver.owner.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{driver.owner.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No owner information available</p>
            </div>
          )}
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="text-2xl font-bold">{driver.rating.toFixed(1)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Trips</p>
              <p className="text-2xl font-bold">{driver.totalTrips}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              {driver.isActive ? (
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-2xl font-bold">
                {driver.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No recent activity to display</p>
          <p className="text-sm mt-1">
            Trip assignments and activity will appear here
          </p>
        </div>
      </Card>
    </div>
  );
}
