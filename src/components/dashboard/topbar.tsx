"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

// ─── Nav Labels ───────────────────────────────────────────────
const ADMIN_NAV = [
  { label: "Overview", href: "/dashboard/admin" },
  { label: "Drivers", href: "/dashboard/admin/drivers" },
  { label: "Trips", href: "/dashboard/admin/trips" },
  { label: "Analytics", href: "/dashboard/admin/analytics" },
  { label: "Settings", href: "/dashboard/admin/settings" },
];

const DRIVER_NAV = [
  { label: "Overview", href: "/dashboard/driver" },
  { label: "My Trips", href: "/dashboard/driver/trips" },
  { label: "Profile", href: "/dashboard/driver/profile" },
  { label: "Documents", href: "/dashboard/driver/documents" },
];

interface TopbarProps {
  role?: "admin" | "driver";
  userName?: string;
  onMenuClick: () => void;
}

export function DashboardTopbar({
  role = "driver",
  userName = "User",
  onMenuClick,
}: TopbarProps) {
  const pathname = usePathname();
  const navItems = role === "admin" ? ADMIN_NAV : DRIVER_NAV;

  const pageTitle =
    navItems.find((n) =>
      n.href === "/dashboard/admin" || n.href === "/dashboard/driver"
        ? pathname === n.href
        : pathname.startsWith(n.href),
    )?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo */}
        <span className="md:hidden text-lg font-bold text-primary">
          Sarthigo
        </span>

        {/* Page Title — desktop */}
        <span className="hidden md:block text-sm font-medium text-muted-foreground">
          {pageTitle}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Avatar + Name */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-foreground">
            {userName}
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-border" />

        {/* Logout */}
        <button
          onClick={() => console.log("logout")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}
