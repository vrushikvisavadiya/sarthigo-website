"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuthState } from "@/services/auth.service";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthState();

  // Determine role - default to "driver" if not admin or owner
  const userRole = user?.role.name.toLowerCase();
  const role: "admin" | "driver" | "owner" =
    userRole === "admin" || userRole === "superadmin"
      ? "admin"
      : userRole === "owner"
        ? "owner"
        : "driver";

  // Format user display name
  const getDisplayName = () => {
    if (!user) return "User";

    const firstName = user.firstName?.trim();
    const lastName = user.lastName?.trim();

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (firstName) return firstName;
    if (lastName) return lastName;
    return user.email || "User";
  };

  const displayName = getDisplayName();
  const userEmail = user?.email || "";

  return (
    <AuthGuard>
      <div className="flex h-screen w-full overflow-hidden bg-muted/30">
        <DashboardSidebar
          role={role}
          userName={displayName}
          userEmail={userEmail}
          isOpen={sidebarOpen}
          collapsed={collapsed}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <DashboardTopbar
            role={role}
            userName={displayName}
            onMenuClick={() => setSidebarOpen(true)}
            onCollapseClick={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
