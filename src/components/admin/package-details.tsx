"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Package } from "@/types/package.types";

interface PackageDetailsProps {
  package: Package;
}

export function PackageDetails({ package: pkg }: PackageDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{pkg.name}</h2>
            <p className="text-muted-foreground">{pkg.city?.name}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant={pkg.isActive ? "default" : "secondary"}>
              {pkg.isActive ? "Active" : "Inactive"}
            </Badge>
            {pkg.isPremium && <Badge variant="outline">Premium</Badge>}
            {pkg.isPopular && <Badge variant="outline">Popular</Badge>}
            {pkg.badge && <Badge variant="outline">{pkg.badge}</Badge>}
          </div>
        </div>
      </div>

      <Separator />

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Duration
              </p>
              <p className="text-lg font-semibold">
                {pkg.duration} Days / {pkg.nights} Nights
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Base Price
              </p>
              <p className="text-lg font-semibold">
                ₹{pkg.basePrice.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Max Passengers
              </p>
              <p className="text-lg font-semibold">{pkg.maxPassengers}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Package ID
              </p>
              <p className="text-sm font-mono">{pkg.id}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </p>
            <p className="text-sm">{pkg.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {pkg.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Inclusions */}
      <Card>
        <CardHeader>
          <CardTitle>Inclusions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {pkg.inclusions.map((inclusion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>{inclusion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Exclusions */}
      {pkg.exclusions && pkg.exclusions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Exclusions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pkg.exclusions.map((exclusion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>{exclusion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Itinerary */}
      {pkg.itinerary && pkg.itinerary.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pkg.itinerary.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {day.day}
                  </div>
                  <h4 className="font-semibold">{day.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {day.description}
                </p>
                {day.activities && day.activities.length > 0 && (
                  <ul className="ml-10 space-y-1">
                    {day.activities.map((activity, actIndex) => (
                      <li
                        key={actIndex}
                        className="text-sm flex items-start gap-2"
                      >
                        <span className="text-primary">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {index < pkg.itinerary.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Images */}
      {pkg.images && pkg.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {pkg.images.map((image, index) => (
                <div key={index} className="rounded-lg border p-2">
                  <p className="text-sm truncate">{image}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Created At
              </p>
              <p className="text-sm">
                {new Date(pkg.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Updated At
              </p>
              <p className="text-sm">
                {new Date(pkg.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
