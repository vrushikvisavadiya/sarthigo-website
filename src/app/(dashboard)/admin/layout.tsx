"use client";

import { AuthGuard } from "@/components/auth/auth-guard";

/**
 * Admin Layout
 *
 * Wraps all admin routes with role-based authentication.
 * Only users with "admin" or "superadmin" roles can access these routes.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole={["admin", "superadmin"]}>{children}</AuthGuard>
  );
}
