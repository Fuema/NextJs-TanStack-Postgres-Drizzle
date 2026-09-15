"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { exportAuditLogsAction } from "@/lib/actions/export-logs";

export function ExportLogButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: "csv" | "json") => {
    try {
      setIsExporting(true);
      const res = await exportAuditLogsAction(format);

      if (res.success && res.content) {
        // Stream directly into user browser runtimes as binary blob file element
        const blob = new Blob([res.content], { type: res.mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = res.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert(res.error || "Failed to export audit logs");
      }
    } catch (err) {
      console.error("Export Error:", err);
      alert("Error generating export stream");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleExport("csv")}
        disabled={isExporting}
        id="btn-export-audit-logs"
        data-testid="btn-export-audit-logs"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50"
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        <span>Export CSV</span>
      </button>

      <button
        onClick={() => handleExport("json")}
        disabled={isExporting}
        id="btn-export-audit-logs-json"
        data-testid="btn-export-audit-logs-json"
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl glass-card text-xs font-medium text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
      >
        JSON
      </button>
    </div>
  );
}
