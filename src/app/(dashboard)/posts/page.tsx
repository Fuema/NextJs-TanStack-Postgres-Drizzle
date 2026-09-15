import React from "react";
import { getPostsCursorPaginated } from "@/lib/actions/posts";
import { FileText, Plus, Calendar, User as UserIcon } from "lucide-react";

export default async function PostsPage() {
  const result = await getPostsCursorPaginated({ limit: 10 });
  const postsList = result.success && result.data ? result.data : [];

  return (
    <div className="space-y-8" id="page-post-management" data-testid="page-post-management">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
            Post Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Relational post Explorer with author cascade rules and atomic transaction creation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postsList.length === 0 ? (
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
    </div>
  );
}
