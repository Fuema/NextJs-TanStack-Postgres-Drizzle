import React from "react";
import { KPICard } from "@/components/dashboard/kpi-card";
import { Users, FileText, Activity, ShieldAlert, Sparkles, Server } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8" id="page-kpi-analytics" data-testid="page-kpi-analytics">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
          System KPI Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time platform metrics, API velocity, traffic rate limits, and security event telemetry.
        </p>
      </div>

      {/* 4 Glassmorphic KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Users"
          value="1,248"
          change="+14.2%"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          id="kpi-total-users"
        />
        <KPICard
          title="Active Posts"
          value="3,890"
          change="+8.5%"
          isPositive={true}
          icon={<FileText className="w-5 h-5" />}
          id="kpi-active-posts"
        />
        <KPICard
          title="API Velocity"
          value="420 req/s"
          change="-2.1%"
          isPositive={false}
          icon={<Activity className="w-5 h-5" />}
          id="kpi-api-velocity"
        />
        <KPICard
          title="Security Alerts"
          value="0"
          change="Optimal"
          isPositive={true}
          icon={<ShieldAlert className="w-5 h-5" />}
          id="kpi-security-alerts"
        />
      </div>

      {/* Diagnostic & Velocity Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-4 glow-border">
          <div className="flex items-center gap-2 text-primary">
            <Server className="w-5 h-5" />
            <h3 className="font-bold text-lg font-display text-foreground">Traffic Throttling Grid</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Upstash Redis sliding-window rate limit is actively tracking incoming client IP addresses. Threshold: 10 req / 10s.
          </p>
          <div className="h-32 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-center text-xs text-muted-foreground font-mono">
            [Redis Velocity Grid: 100% Operational]
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-4 glow-border">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-lg font-display text-foreground">Relational Health</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Drizzle PostgreSQL atomic transaction engine is handling multi-row cascading updates cleanly.
          </p>
          <div className="h-32 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-center text-xs text-muted-foreground font-mono">
            [PostgreSQL Connection Pool: Active]
          </div>
        </div>
      </div>
    </div>
  );
}
