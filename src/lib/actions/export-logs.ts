"use server";

import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function exportAuditLogsAction(format: "csv" | "json" = "csv") {
  try {
    const logs = await db
      .select()
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(500);

    if (format === "json") {
      return {
        success: true,
        filename: `audit-logs-${Date.now()}.json`,
        mimeType: "application/json",
        content: JSON.stringify(logs, null, 2),
      };
    }

    // Generate CSV output
    const headers = ["ID", "Actor ID", "Action", "Entity", "Entity ID", "IP Address", "Timestamp"];
    const csvRows = [headers.join(",")];

    for (const log of logs) {
      const row = [
        `"${log.id}"`,
        `"${log.actorId}"`,
        `"${log.action}"`,
        `"${log.entity}"`,
        `"${log.entityId}"`,
        `"${log.ipAddress || "N/A"}"`,
        `"${new Date(log.createdAt).toISOString()}"`,
      ];
      csvRows.push(row.join(","));
    }

    return {
      success: true,
      filename: `audit-logs-${Date.now()}.csv`,
      mimeType: "text/csv",
      content: csvRows.join("\n"),
    };
  } catch (error) {
    console.error("exportAuditLogsAction Error:", error);
    return { success: false, error: "Failed to compile audit logs export stream" };
  }
}
