"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { useOwnerSubscriptions } from "@/services/packages.service";
import { useMyOwnerProfile } from "@/services/owners.service";
import Link from "next/link";

export default function OwnerDashboard() {
  const { data: profile } = useMyOwnerProfile();
  const { data: subscriptionsData } = useOwnerSubscriptions();

  // Handle both array and object responses
  const subscriptions = Array.isArray(subscriptionsData)
    ? subscriptionsData
    : [];

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "active",
  );
  const pendingSubscriptions = subscriptions.filter(
    (sub) => sub.status === "pending",
  );
  const totalRevenue = activeSubscriptions.reduce(
    (sum, sub) => sum + sub.price,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile?.firstName || "Owner"}!
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Packages
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeSubscriptions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently subscribed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingSubscriptions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting admin approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Investment
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">In active packages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verification Status
            </CardTitle>
            {profile?.ownerProfile?.verified ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.ownerProfile?.verified ? "Verified" : "Pending"}
            </div>
            <p className="text-xs text-muted-foreground">Account status</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Subscriptions */}
      {pendingSubscriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Package Subscriptions</CardTitle>
            <CardDescription>
              These subscriptions are awaiting admin approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingSubscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-semibold">
                      {subscription.package.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {subscription.package.city?.name} •{" "}
                      {subscription.package.duration}D/
                      {subscription.package.nights}N
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">
                        {subscription.paymentStatus === "paid"
                          ? "Payment Complete"
                          : "Payment Pending"}
                      </Badge>
                      <Badge variant="secondary">Pending Approval</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ₹{subscription.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(subscription.startDate).toLocaleDateString()} -{" "}
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Subscriptions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Package Subscriptions</CardTitle>
              <CardDescription>
                Your currently active tour packages
              </CardDescription>
            </div>
            <Link href="/owner/packages">
              <Button>Browse Packages</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {activeSubscriptions.length > 0 ? (
            <div className="space-y-4">
              {activeSubscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-semibold">
                      {subscription.package.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {subscription.package.city?.name} •{" "}
                      {subscription.package.duration}D/
                      {subscription.package.nights}N
                    </p>
                    <div className="flex gap-2 mt-2">
                      {subscription.package.isPremium && (
                        <Badge variant="outline">Premium</Badge>
                      )}
                      {subscription.package.isPopular && (
                        <Badge variant="outline">Popular</Badge>
                      )}
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ₹{subscription.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires:{" "}
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                No active package subscriptions
              </p>
              <Link href="/owner/packages">
                <Button>Browse Available Packages</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/owner/packages">
              <Button variant="outline" className="w-full">
                Browse Packages
              </Button>
            </Link>
            <Link href="/owner/drivers">
              <Button variant="outline" className="w-full">
                Manage Drivers
              </Button>
            </Link>
            <Link href="/owner/cars">
              <Button variant="outline" className="w-full">
                Manage Vehicles
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
