"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { siteConfig } from "@/constants";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DRIVER_NAV = [
  { href: "/driver", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/driver/profile", label: "My Profile", icon: User },
];

export function DriverSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const isAdmin = pathname.startsWith("/admin");
  const navItems = DRIVER_NAV;

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-secondary-foreground text-lg font-bold">🚗</div>
        <div className="flex flex-col">
          <span className="font-heading font-bold text-foreground text-sm">{siteConfig.name}</span>
          <span className="text-[10px] text-muted-foreground">Driver Portal</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all", active ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}>
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
              {active && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-border flex flex-col gap-1">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all">
          <span>🌐</span> View Website
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-60 shrink-0 border-r border-border bg-card flex-col h-screen sticky top-0">
        <NavContent />
      </aside>
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border shadow-sm">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50 flex flex-col">
            <NavContent />
          </aside>
        </>
      )}
    </>
  );
}
