"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  User,
} from "lucide-react";
import { siteConfig } from "@/constants/site";
import { useLogout, useAuthState } from "@/services/auth.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthState();
  const { mutate: logout } = useLogout();
  const navItems = role === "admin" ? ADMIN_NAV : DRIVER_NAV;

  const pageTitle =
    navItems.find((n) =>
      n.href === "/admin" || n.href === "/driver"
        ? pathname === n.href
        : pathname.startsWith(n.href),
    )?.label ?? "Dashboard";

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

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
        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {userName}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
