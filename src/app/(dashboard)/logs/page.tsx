import React from "react";
import { ShieldAlert, Filter } from "lucide-react";

export default function AuditLogsPage() {
  return (
    <div className="space-y-8" id="page-audit-logs" data-testid="page-audit-logs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
            Audit Trails & Telemetry
          </h1>
          <p className="text-sm text-muted-foreground">
            Append-only security log recording programmatic actors, mutation events, and raw JSON payloads.
          </p>
        </div>

        <button
          id="btn-filter-logs"
          data-testid="btn-filter-logs"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-sm font-medium hover:border-primary/40 transition-all"
        >
          <Filter className="w-4 h-4 text-primary" />
          <span>Filter Events</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-border/50 glow-border p-6 text-center text-muted-foreground">
        <ShieldAlert className="w-8 h-8 text-primary mx-auto mb-3 opacity-80" />
        <h3 className="font-semibold text-foreground text-lg font-display">Live Audit Telemetry Stream</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
          Every sensitive mutation action (`USER_CREATED`, `USER_DELETED`, `POST_CREATED`) automatically records an immutable audit log entry in the PostgreSQL database.
        </p>
      </div>
    </div>
  );
}
