import { db } from "@/db";
import { auditLogs, auditActionEnum } from "@/db/schema";
import { z } from "zod";

export type AuditActionType = (typeof auditActionEnum.enumValues)[number];

export interface RecordAuditEventParams {
  actorId: string;
  action: AuditActionType;
  entity: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}

export async function recordAuditEvent(params: RecordAuditEventParams) {
  try {
    const [log] = await db
      .insert(auditLogs)
      .values({
        actorId: params.actorId,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        metadata: params.metadata || {},
        ipAddress: params.ipAddress || null,
      })
      .returning();
    return log;
  } catch (error) {
    console.error("Failed to record audit log event:", error);
    // Audit logging failure should not crash the main business transaction
    return null;
  }
}
