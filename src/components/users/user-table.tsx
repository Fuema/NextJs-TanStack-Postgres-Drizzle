"use client";

import React, { useState } from "react";
import { Trash2, Shield, User as UserIcon } from "lucide-react";
import { deleteUserAction } from "@/lib/actions/users";
import { cn } from "@/lib/utils";

export interface UserRecord {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: Date | string;
}

interface UserTableProps {
  users: UserRecord[];
  onRefresh?: () => void;
}

export function UserTable({ users, onRefresh }: UserTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This will trigger a security alert.")) {
      return;
    }
    setDeletingId(id);
    const res = await deleteUserAction(id);
    setDeletingId(null);
    if (res.success && onRefresh) {
      onRefresh();
    }
  };

  return (
    <div
      id="user-table-container"
      data-testid="user-table-container"
      className="glass-card rounded-2xl overflow-hidden border border-border/50 glow-border"
    >
      <div className="overflow-x-auto">
        <table id="user-data-table" data-testid="user-data-table" className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/40 bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 text-sm">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No users found in database.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  id={`user-row-${user.id}`}
                  data-testid={`user-row-${user.id}`}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                        user.role === "admin"
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground border-border/40"
                      )}
                    >
                      {user.role === "admin" ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                      <span className="capitalize">{user.role}</span>
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                      id={`btn-delete-user-${user.id}`}
                      data-testid={`btn-delete-user-${user.id}`}
                      className="p-2 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-all disabled:opacity-50"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
