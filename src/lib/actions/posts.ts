"use server";

import { z } from "zod";
import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { eq, lt, desc } from "drizzle-orm";
import { recordAuditEvent } from "./audit-logger";
import { auth } from "@clerk/nextjs/server";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  authorId: z.string().uuid("Invalid Author ID"),
  published: z.boolean().default(false),
});

export async function createPostWithAuthorTransaction(rawData: z.infer<typeof createPostSchema>) {
  try {
    const { userId } = await auth();
    const actorId = userId || "system";

    const validated = createPostSchema.parse(rawData);

    // Atomic relational transaction boundary
    const result = await db.transaction(async (tx) => {
      // 1. Verify author exists
      const [author] = await tx.select().from(users).where(eq(users.id, validated.authorId));
      if (!author) {
        throw new Error(`Author with ID ${validated.authorId} does not exist`);
      }

      // 2. Generate slug from title
      const baseSlug = validated.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const slug = `${baseSlug}-${Date.now().toString(36)}`;

      // 3. Insert post
      const [newPost] = await tx
        .insert(posts)
        .values({
          title: validated.title,
          slug,
          content: validated.content,
          authorId: validated.authorId,
          published: validated.published,
        })
        .returning();

      // 4. Append audit log inside transaction
      await recordAuditEvent({
        actorId,
        action: "POST_CREATED",
        entity: "posts",
        entityId: newPost.id,
        metadata: { title: newPost.title, slug: newPost.slug, authorId: newPost.authorId },
      });

      return newPost;
    });

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", fieldErrors: error.flatten().fieldErrors };
    }
    console.error("createPostWithAuthorTransaction Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create post transaction" };
  }
}

export async function getPostsCursorPaginated(params?: {
  cursor?: string;
  limit?: number;
}) {
  try {
    const limit = Math.min(50, Math.max(1, params?.limit || 10));

    let cursorDate: Date | undefined;
    if (params?.cursor) {
      cursorDate = new Date(params.cursor);
    }

    const data = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl,
        },
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(cursorDate ? lt(posts.createdAt, cursorDate) : undefined)
      .orderBy(desc(posts.createdAt))
      .limit(limit + 1);

    let nextCursor: string | null = null;
    if (data.length > limit) {
      const nextItem = data.pop();
      nextCursor = nextItem?.createdAt.toISOString() || null;
    }

    return {
      success: true,
      data,
      nextCursor,
    };
  } catch (error) {
    console.error("getPostsCursorPaginated Error:", error);
    return { success: false, error: "Failed to fetch cursor-paginated posts" };
  }
}

export async function deletePostAction(postId: string) {
  try {
    const { userId } = await auth();
    const actorId = userId || "system";

    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, postId))
      .returning();

    if (!deletedPost) {
      return { success: false, error: "Post not found" };
    }

    await recordAuditEvent({
      actorId,
      action: "POST_DELETED",
      entity: "posts",
      entityId: deletedPost.id,
      metadata: { title: deletedPost.title },
    });

    return { success: true, data: deletedPost };
  } catch (error) {
    console.error("deletePostAction Error:", error);
    return { success: false, error: "Failed to delete post record" };
  }
}
