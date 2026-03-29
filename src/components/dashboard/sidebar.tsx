"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";

// ─── Nav Constants ────────────────────────────────────────────
const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: <HomeIcon /> },
  { label: "Owners", href: "/admin/owners", icon: <OwnersIcon /> },
  { label: "Drivers", href: "/admin/drivers", icon: <DriversIcon /> },
  { label: "Vehicles", href: "/admin/cars", icon: <VehiclesIcon /> },
  {
    label: "Vehicle Types",
    href: "/admin/vehicle-types",
    icon: <VehicleTypesIcon />,
  },
  { label: "Cities", href: "/admin/cities", icon: <CitiesIcon /> },
  { label: "Packages", href: "/admin/packages", icon: <PackagesIcon /> },
  {
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: <SubscriptionsIcon />,
  },
  { label: "Trips", href: "/admin/trips", icon: <TripsIcon /> },
  { label: "Roles & Permissions", href: "/admin/roles", icon: <RolesIcon /> },
  { label: "Analytics", href: "/admin/analytics", icon: <AnalyticsIcon /> },
  { label: "Settings", href: "/admin/settings", icon: <SettingsIcon /> },
];

const OWNER_NAV = [
  { label: "Overview", href: "/owner", icon: <HomeIcon /> },
  { label: "Packages", href: "/owner/packages", icon: <PackagesIcon /> },
  { label: "Drivers", href: "/owner/drivers", icon: <DriversIcon /> },
  { label: "Vehicles", href: "/owner/cars", icon: <VehiclesIcon /> },
  { label: "Trips", href: "/owner/trips", icon: <TripsIcon /> },
  { label: "Profile", href: "/owner/profile", icon: <ProfileIcon /> },
];

const DRIVER_NAV = [
  { label: "Overview", href: "/driver", icon: <HomeIcon /> },
  { label: "My Trips", href: "/driver/trips", icon: <TripsIcon /> },
  { label: "Profile", href: "/driver/profile", icon: <ProfileIcon /> },
  { label: "Documents", href: "/driver/documents", icon: <DocsIcon /> },
];

// ─── Icons ────────────────────────────────────────────────────
function HomeIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function OwnersIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}
function DriversIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function VehiclesIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
      />
    </svg>
  );
}
function VehicleTypesIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  );
}
function CitiesIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function TripsIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
function DocsIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function RolesIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}
function PackagesIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}
function SubscriptionsIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────
interface SidebarProps {
  role?: "admin" | "driver" | "owner";
  userName?: string;
  userEmail?: string;
  isOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
}

// ─── Sidebar ──────────────────────────────────────────────────
export function DashboardSidebar({
  role = "driver",
  userName = "User",
  userEmail = "",
  isOpen,
  collapsed,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const navItems =
    role === "admin" ? ADMIN_NAV : role === "owner" ? OWNER_NAV : DRIVER_NAV;

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* ── Logo ──────────────────────────────────────────── */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-border flex-shrink-0 transition-all duration-300",
          collapsed ? "justify-center px-3" : "justify-between px-5",
        )}
      >
        {collapsed ? (
          /* Icon only when collapsed */
          <Image
            src={siteConfig.logoSingle}
            alt={siteConfig.name}
            width={32}
            height={32}
            className="flex-shrink-0"
          />
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Image
                src={siteConfig.logoSingle}
                alt={siteConfig.name}
                width={28}
                height={28}
                className="flex-shrink-0"
              />
              <span className="text-xl font-bold text-primary">
                {siteConfig.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">
                {role}
              </span>
            </div>
            {/* Close — mobile only */}
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* ── Nav ───────────────────────────────────────────── */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin" || item.href === "/driver"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-lg text-sm font-medium transition-all duration-150 group relative",
                collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.icon}

              {/* Label */}
              {!collapsed && item.label}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-popover border border-border text-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── User ──────────────────────────────────────────── */}
      <div className="p-2 border-t border-border flex-shrink-0">
        {collapsed ? (
          <div className="flex justify-center py-2 group relative">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            {/* Tooltip when collapsed */}
            <div className="absolute left-full ml-3 px-3 py-2 bg-popover border border-border text-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              <p className="font-medium">{userName}</p>
              <p className="text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {userName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userEmail}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar ──────────────────────────────── */}
      <aside
        className={cn(
          "hidden md:flex flex-col sticky top-0 h-screen border-r bg-sidebar border-border flex-shrink-0 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {SidebarContent}
      </aside>

      {/* ── Mobile Overlay ───────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* ── Mobile Drawer ────────────────────────────────── */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-sidebar border-r border-border flex flex-col md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {SidebarContent}
      </aside>
    </>
  );
}
