"use client";

import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export function DashboardTopbar() {
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("AD");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setEmail(user.email);
        setInitials(user.email.slice(0, 2).toUpperCase());
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
      <div className="lg:hidden w-10" />  {/* space for hamburger on mobile */}
      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {/* Notification bell placeholder */}
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
          <Bell className="h-4 w-4" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xs font-bold">
            {initials}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-foreground">Admin</span>
            <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">{email}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
