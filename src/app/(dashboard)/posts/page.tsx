import React from "react";
import { getPostsCursorPaginated } from "@/lib/actions/posts";
import { InfinitePostList } from "@/components/posts/infinite-post-list";

export default async function PostsPage() {
  const result = await getPostsCursorPaginated({ limit: 6 });
  const initialPosts = result.success && result.data ? result.data : [];

  return (
    <div className="space-y-8" id="page-post-management" data-testid="page-post-management">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
              Post Feed Streams
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              TanStack Query v5
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Continuous infinite scroll pagination stream powered by TanStack Query v5 and IntersectionObserver.
          </p>
        </div>
      </div>

      <InfinitePostList initialData={initialPosts} />
    </div>
  );
}
