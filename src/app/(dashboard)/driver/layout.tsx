"use client";

import { AuthGuard } from "@/components/auth/auth-guard";

/**
 * Driver Layout
 *
 * Wraps all driver routes with role-based authentication.
 * Only users with "driver" role can access these routes.
 */
export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard requiredRole="driver">{children}</AuthGuard>;
}
