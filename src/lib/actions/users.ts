"use server";

import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, ilike, or, count, desc } from "drizzle-orm";
import { recordAuditEvent } from "./audit-logger";
import { sendSecurityAlertEmail } from "../email/email-service";
import { auth } from "@clerk/nextjs/server";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user"]).default("user"),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

export const updateUserSchema = createUserSchema.partial().extend({
  id: z.string().uuid("Invalid User ID"),
});

export async function createUserAction(rawData: z.infer<typeof createUserSchema>) {
  try {
    const { userId } = await auth();
    const actorId = userId || "system";

    const validated = createUserSchema.parse(rawData);

    const [newUser] = await db
      .insert(users)
      .values({
        clerkId: `usr_manual_${Date.now()}`,
        name: validated.name,
        email: validated.email,
        role: validated.role,
        avatarUrl: validated.avatarUrl || null,
      })
      .returning();

    await recordAuditEvent({
      actorId,
      action: "USER_CREATED",
      entity: "users",
      entityId: newUser.id,
      metadata: { email: newUser.email, role: newUser.role },
    });

    return { success: true, data: newUser };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", fieldErrors: error.flatten().fieldErrors };
    }
    console.error("createUserAction Error:", error);
    return { success: false, error: "Failed to create user record" };
  }
}

export async function updateUserAction(rawData: z.infer<typeof updateUserSchema>) {
  try {
    const { userId } = await auth();
    const actorId = userId || "system";

    const validated = updateUserSchema.parse(rawData);

    const [updatedUser] = await db
      .update(users)
      .set({
        name: validated.name,
        email: validated.email,
        role: validated.role,
        avatarUrl: validated.avatarUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, validated.id))
      .returning();

    if (!updatedUser) {
      return { success: false, error: "User not found" };
    }

    await recordAuditEvent({
      actorId,
      action: "USER_UPDATED",
      entity: "users",
      entityId: updatedUser.id,
      metadata: { name: updatedUser.name, email: updatedUser.email },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", fieldErrors: error.flatten().fieldErrors };
    }
    console.error("updateUserAction Error:", error);
    return { success: false, error: "Failed to update user record" };
  }
}

export async function deleteUserAction(targetUserId: string) {
  try {
    const { userId } = await auth();
    const actorId = userId || "system";

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, targetUserId))
      .returning();

    if (!deletedUser) {
      return { success: false, error: "User not found" };
    }

    await recordAuditEvent({
      actorId,
      action: "USER_DELETED",
      entity: "users",
      entityId: deletedUser.id,
      metadata: { email: deletedUser.email, role: deletedUser.role },
    });

    // Send security alert email on user deletion
    await sendSecurityAlertEmail({
      action: "USER_DELETED",
      targetEntity: `User: ${deletedUser.email} (${deletedUser.id})`,
      actorId,
    });

    return { success: true, data: deletedUser };
  } catch (error) {
    console.error("deleteUserAction Error:", error);
    return { success: false, error: "Failed to delete user record" };
  }
}

export async function getUsersPaginated(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    const page = Math.max(1, params?.page || 1);
    const limit = Math.min(50, Math.max(1, params?.limit || 10));
    const offset = (page - 1) * limit;
    const search = params?.search?.trim() || "";

    const searchCondition = search
      ? or(ilike(users.name, `%${search}%`), ilike(users.email, `%${search}%`))
      : undefined;

    const data = await db
      .select()
      .from(users)
      .where(searchCondition)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ value: totalCount }] = await db
      .select({ value: count() })
      .from(users)
      .where(searchCondition);

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        totalCount: Number(totalCount),
        totalPages: Math.ceil(Number(totalCount) / limit),
      },
    };
  } catch (error) {
    console.error("getUsersPaginated Error:", error);
    return { success: false, error: "Failed to fetch paginated users" };
  }
}
