"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Search, Bell } from "lucide-react";

export function HeaderNav() {
  return (
    <header
      id="header-nav"
      data-testid="header-nav"
      className="h-16 border-b border-border/50 glass-card px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md"
    >
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search resources, users..."
          id="global-search-input"
          data-testid="global-search-input"
          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-muted/40 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <button
          id="btn-notifications"
          data-testid="btn-notifications"
          className="p-2 rounded-xl glass-card text-muted-foreground hover:text-foreground transition-all relative"
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-primary absolute top-2 right-2" />
        </button>

        <ModeToggle />

        <div className="pl-2 border-l border-border/40">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 rounded-xl border border-primary/30",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
