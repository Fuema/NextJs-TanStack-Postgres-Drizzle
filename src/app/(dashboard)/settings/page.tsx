import React from "react";
import { Settings, Shield, Key, Bell, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8" id="page-settings" data-testid="page-settings">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
          Workspace Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          System configuration, Clerk RBAC controls, Resend alert parameters, and Upstash Redis thresholds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-4 glow-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base font-display">Clerk Identity & RBAC</h3>
              <p className="text-xs text-muted-foreground">Manage user roles and session tokens</p>
            </div>
          </div>
          <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground">
            Status: Clerk Edge Middleware Active
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-4 glow-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base font-display">Resend Alert Service</h3>
              <p className="text-xs text-muted-foreground">Programmatic security notification emails</p>
            </div>
          </div>
          <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground">
            Status: Email Dispatcher Configured
          </div>
        </div>
      </div>
    </div>
  );
}
