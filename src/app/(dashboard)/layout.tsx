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

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/30">
      {/* Sidebar */}
      <DashboardSidebar
        role="admin"
        userName="Sarthak"
        userEmail="admin@sarthigo.com"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Sticky Topbar */}
        <DashboardTopbar
          role="admin"
          userName="Sarthak"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
