"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  FileText,
  BarChart3,
  ShieldAlert,
  Settings,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Users", href: "/", icon: Users, id: "nav-link-users" },
  { name: "Posts", href: "/posts", icon: FileText, id: "nav-link-posts" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, id: "nav-link-analytics" },
  { name: "Audit Logs", href: "/logs", icon: ShieldAlert, id: "nav-link-logs" },
  { name: "Settings", href: "/settings", icon: Settings, id: "nav-link-settings" },
];

export function NavigationSidebar() {
  const pathname = usePathname();

  return (
    <aside
      id="navigation-sidebar"
      data-testid="navigation-sidebar"
      className="w-64 glass-card border-r border-border/50 flex flex-col justify-between p-4 min-h-screen sticky top-0"
    >
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="p-2 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base font-display text-foreground tracking-tight">
              Admin Core OS
            </span>
            <span className="text-xs text-muted-foreground">Enterprise Engine</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                id={item.id}
                data-testid={item.id}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-primary-foreground")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer Card */}
      <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>System Healthy</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Next.js 15 & Drizzle active
        </p>
      </div>
    </aside>
  );
}
