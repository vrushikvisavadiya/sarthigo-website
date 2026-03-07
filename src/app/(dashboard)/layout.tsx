"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/30">
      <DashboardSidebar
        role="admin"
        userName="Sarthak"
        userEmail="admin@sarthigo.com"
        isOpen={sidebarOpen}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <DashboardTopbar
          role="admin"
          userName="Sarthak"
          onMenuClick={() => setSidebarOpen(true)}
          onCollapseClick={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
