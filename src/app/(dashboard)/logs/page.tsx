import React from "react";
import { ShieldAlert } from "lucide-react";
import { ExportLogButton } from "@/components/logs/export-log-button";

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

        <ExportLogButton />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-border/50 glow-border p-6 text-center text-muted-foreground space-y-4">
        <ShieldAlert className="w-8 h-8 text-primary mx-auto opacity-80" />
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground text-lg font-display">Live Audit Telemetry Exporter Stream</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Click "Export CSV" to compile operational audit records into a downloadable string stream delivered directly to your browser runtimes.
          </p>
        </div>
      </div>
    </div>
  );
}
