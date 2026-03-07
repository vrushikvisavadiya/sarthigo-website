"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { siteConfig } from "@/constants/site";

// ─── Nav Labels ───────────────────────────────────────────────
const ADMIN_NAV = [
  { label: "Overview", href: "/admin" },
  { label: "Drivers", href: "/admin/drivers" },
  { label: "Trips", href: "/admin/trips" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Settings", href: "/admin/settings" },
];

const DRIVER_NAV = [
  { label: "Overview", href: "/driver" },
  { label: "My Trips", href: "/driver/trips" },
  { label: "Profile", href: "/driver/profile" },
  { label: "Documents", href: "/driver/documents" },
];

interface TopbarProps {
  role?: "admin" | "driver";
  userName?: string;
  onMenuClick: () => void;
  onCollapseClick: () => void;
  collapsed: boolean;
}

export function DashboardTopbar({
  role = "driver",
  userName = "User",
  onMenuClick,
  onCollapseClick,
  collapsed,
}: TopbarProps) {
  const pathname = usePathname();
  const navItems = role === "admin" ? ADMIN_NAV : DRIVER_NAV;

  const pageTitle =
    navItems.find((n) =>
      n.href === "/admin" || n.href === "/driver"
        ? pathname === n.href
        : pathname.startsWith(n.href),
    )?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onCollapseClick}
          className="hidden md:flex p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>

        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2">
          <Image
            src={siteConfig.logoSingle}
            alt={siteConfig.name}
            width={24}
            height={24}
          />
          <span className="text-lg font-bold text-primary">
            {siteConfig.name}
          </span>
        </div>

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
