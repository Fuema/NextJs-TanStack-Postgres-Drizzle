"use client";

import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsCursorPaginated } from "@/lib/actions/posts";
import { Calendar, Loader2, Sparkles } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  author: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
}

interface InfinitePostListProps {
  initialData?: PostItem[];
}

export function InfinitePostList({ initialData = [] }: InfinitePostListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: async ({ pageParam }) => {
      const res = await getPostsCursorPaginated({
        cursor: pageParam as string | undefined,
        limit: 6,
      });
      if (!res.success) {
        throw new Error(res.error || "Failed to fetch posts page");
      }
      return res;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Fallback to initial data if query hasn't loaded yet
  const pages = data?.pages;
  const postsList = pages
    ? pages.flatMap((page) => page.data || [])
    : initialData;

  return (
    <div className="space-y-6" id="infinite-post-list" data-testid="infinite-post-list">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postsList.length === 0 && status !== "pending" ? (
          <div className="col-span-2 glass-card p-12 rounded-2xl text-center text-muted-foreground">
            No posts found in database.
          </div>
        ) : (
          postsList.map((post) => (
            <div
              key={post.id}
              id={`post-card-${post.id}`}
              data-testid={`post-card-${post.id}`}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all glow-border"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    {post.author.name.charAt(0)}
                  </div>
                  <span>{post.author.name}</span>
                </div>
                <span className="font-mono text-muted-foreground/70">/{post.slug}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Intersection Observer Sentinel Trigger */}
      <div ref={loadMoreRef} className="py-6 flex justify-center text-sm text-muted-foreground">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Streaming next data batch...</span>
          </div>
        ) : hasNextPage ? (
          <span className="text-xs text-muted-foreground">Scroll down to load more</span>
        ) : (
          <span className="text-xs text-muted-foreground/60">• End of feed •</span>
        )}
      </div>
    </div>
  );
}
