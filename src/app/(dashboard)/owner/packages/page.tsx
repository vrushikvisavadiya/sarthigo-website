"use client";

import { useState } from "react";
import { Search, Filter, ShoppingCart, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  usePackages,
  useCreateSubscription,
  useOwnerSubscriptions,
} from "@/services/packages.service";
import { useCities } from "@/services/cities.service";
import { PackageDetails } from "@/components/admin/package-details";
import { SubscriptionForm } from "@/components/owner/subscription-form";
import { toast } from "sonner";
import type { Package } from "@/types/package.types";

export default function OwnerPackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  const { data: packagesData, isLoading } = usePackages({ isActive: true });
  const { data: cities } = useCities(true);
  const { data: subscriptionsData } = useOwnerSubscriptions();

  // Handle both array and object responses
  const packages = Array.isArray(packagesData) ? packagesData : [];
  const subscriptions = Array.isArray(subscriptionsData)
    ? subscriptionsData
    : [];

  const subscribedPackageIds = new Set(
    subscriptions.map((sub) => sub.packageId),
  );

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.city?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "all" || pkg.cityId === selectedCity;
    return matchesSearch && matchesCity;
  });

  const handleView = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsViewOpen(true);
  };

  const handleSubscribe = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsSubscribeOpen(true);
  };

  const isSubscribed = (packageId: string) => {
    return subscribedPackageIds.has(packageId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Available Packages
        </h1>
        <p className="text-muted-foreground">
          Browse and subscribe to tour packages for your business
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities?.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Packages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading packages...</div>
          </div>
        ) : filteredPackages && filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => {
            const subscribed = isSubscribed(pkg.id);
            return (
              <Card key={pkg.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.city?.name}</CardDescription>
                    </div>
                    {subscribed && (
                      <Badge variant="default" className="ml-2">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Subscribed
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {pkg.isPremium && <Badge variant="outline">Premium</Badge>}
                    {pkg.isPopular && <Badge variant="outline">Popular</Badge>}
                    {pkg.badge && <Badge variant="outline">{pkg.badge}</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">
                        {pkg.duration}D / {pkg.nights}N
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Max Passengers
                      </span>
                      <span className="font-medium">{pkg.maxPassengers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Base Price
                      </span>
                      <span className="text-2xl font-bold">
                        ₹{pkg.basePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Highlights:</p>
                    <ul className="space-y-1">
                      {pkg.highlights.slice(0, 3).map((highlight, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5">✓</span>
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleView(pkg)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    {!subscribed && (
                      <Button
                        className="flex-1"
                        onClick={() => handleSubscribe(pkg)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Subscribe
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No packages found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Package Details</DialogTitle>
          </DialogHeader>
          {selectedPackage && <PackageDetails package={selectedPackage} />}
        </DialogContent>
      </Dialog>

      {/* Subscribe Dialog */}
      <Dialog open={isSubscribeOpen} onOpenChange={setIsSubscribeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Subscribe to Package</DialogTitle>
            <DialogDescription>
              Complete the subscription form to access this package
            </DialogDescription>
          </DialogHeader>
          {selectedPackage && (
            <SubscriptionForm
              package={selectedPackage}
              onSuccess={() => {
                setIsSubscribeOpen(false);
                setSelectedPackage(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
