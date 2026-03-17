"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/services/auth.service";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  redirectTo?: string;
}

/**
 * AuthGuard Component
 *
 * Protects routes by checking authentication status and optionally role permissions.
 * Redirects to login page if user is not authenticated.
 *
 * @example
 * // Protect any authenticated route
 * <AuthGuard>
 *   <DashboardContent />
 * </AuthGuard>
 *
 * @example
 * // Protect admin-only route
 * <AuthGuard requiredRole="admin">
 *   <AdminPanel />
 * </AuthGuard>
 *
 * @example
 * // Protect route with multiple allowed roles
 * <AuthGuard requiredRole={["admin", "superadmin"]}>
 *   <AdminPanel />
 * </AuthGuard>
 */
export function AuthGuard({
  children,
  requiredRole,
  redirectTo = "/login",
}: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthState();

  useEffect(() => {
    // Wait for loading to complete
    if (isLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check role if required
    if (requiredRole && user) {
      const userRole = user.role.name.toLowerCase();
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole.map((r) => r.toLowerCase())
        : [requiredRole.toLowerCase()];

      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on user's actual role
        if (userRole === "driver") {
          router.push("/driver");
        } else if (userRole === "admin" || userRole === "superadmin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Check role permission
  if (requiredRole && user) {
    const userRole = user.role.name.toLowerCase();
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole.map((r) => r.toLowerCase())
      : [requiredRole.toLowerCase()];

    if (!allowedRoles.includes(userRole)) {
      return null;
    }
  }

  // Render protected content
  return <>{children}</>;
}
