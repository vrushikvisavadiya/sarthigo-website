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

  // Determine role - default to "driver" if not admin
  const userRole = user?.role.name.toLowerCase();
  const role: "admin" | "driver" =
    userRole === "admin" || userRole === "superadmin" ? "admin" : "driver";

  return (
    <AuthGuard>
      <div className="flex h-screen w-full overflow-hidden bg-muted/30">
        <DashboardSidebar
          role={role}
          userName={user?.firstName || user?.email || "User"}
          userEmail={user?.email || ""}
          isOpen={sidebarOpen}
          collapsed={collapsed}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <DashboardTopbar
            role={role}
            userName={user?.firstName || user?.email || "User"}
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
