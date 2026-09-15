import React from "react";
import { NavigationSidebar } from "@/components/dashboard/navigation-sidebar";
import { HeaderNav } from "@/components/dashboard/header-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <NavigationSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderNav />
        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
