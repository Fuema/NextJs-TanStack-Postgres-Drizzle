import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  id?: string;
}

export function KPICard({ title, value, change, isPositive = true, icon, id }: KPICardProps) {
  const cardId = id || `kpi-card-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div
      id={cardId}
      data-testid={cardId}
      className="glass-card p-6 rounded-2xl flex flex-col space-y-4 hover:border-primary/40 transition-all glow-border"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <h3 className="text-3xl font-bold font-display tracking-tight text-foreground">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}
