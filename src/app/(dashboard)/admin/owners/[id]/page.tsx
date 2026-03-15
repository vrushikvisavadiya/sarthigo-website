"use client";

import { useParams, useRouter } from "next/navigation";
import { useOwner } from "@/services/owners.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Car,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

export default function OwnerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const ownerId = params.id as string;

  const { data: owner, isLoading, error } = useOwner(ownerId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !owner) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load owner details</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Owner not found"}
          </p>
          <Button
            onClick={() => router.push("/admin/owners")}
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Owners
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
            onClick={() => router.push("/admin/owners")}
            variant="outline"
            size="icon"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {owner.ownerProfile?.companyName}
            </h1>
            <p className="text-muted-foreground mt-1">
              {owner.firstName} {owner.lastName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge
            variant={owner.ownerProfile?.verified ? "default" : "secondary"}
          >
            {owner.ownerProfile?.verified ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                Pending
              </>
            )}
          </Badge>
          <Badge variant={owner.isActive ? "default" : "destructive"}>
            {owner.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Company Name</p>
              <p className="font-medium">{owner.ownerProfile?.companyName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner Name</p>
              <p className="font-medium">
                {owner.firstName} {owner.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {owner.ownerProfile?.city}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {owner.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {owner.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(owner.createdAt), "MMMM dd, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Drivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-primary">
                {owner.ownerProfile?.drivers?.length || 0}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total Drivers
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-primary">
                {owner.ownerProfile?.cars?.length || 0}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total Vehicles
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Information */}
      {owner.ownerProfile?.verified && owner.ownerProfile?.verifiedAt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Verification Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Verified On</p>
              <p className="font-medium">
                {format(
                  new Date(owner.ownerProfile.verifiedAt),
                  "MMMM dd, yyyy 'at' hh:mm a",
                )}
              </p>
            </div>
            {owner.ownerProfile.verifiedBy && (
              <div>
                <p className="text-sm text-muted-foreground">Verified By</p>
                <p className="font-medium">{owner.ownerProfile.verifiedBy}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          onClick={() => router.push(`/admin/owners/${ownerId}/edit`)}
          variant="outline"
        >
          Edit Owner
        </Button>
        <Button onClick={() => router.push("/admin/owners")}>
          Back to List
        </Button>
      </div>
    </div>
  );
}
