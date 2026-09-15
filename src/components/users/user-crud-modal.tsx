"use client";

import React, { useActionState, useState } from "react";
import { createUserAction } from "@/lib/actions/users";
import { SubmitButton } from "../shared/submit-button";
import { X, UserPlus } from "lucide-react";

interface UserCRUDModalProps {
  onSuccess?: () => void;
}

export function UserCRUDModal({ onSuccess }: UserCRUDModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const role = (formData.get("role") as "admin" | "user") || "user";

      const res = await createUserAction({ name, email, role });
      if (res.success) {
        setIsOpen(false);
        if (onSuccess) onSuccess();
        return { success: true, error: null };
      }
      return { success: false, error: res.error || "Failed to create user" };
    },
    { success: false, error: null }
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        id="btn-open-user-modal"
        data-testid="btn-open-user-modal"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/25"
      >
        <UserPlus className="w-4 h-4" />
        <span>Add User</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            id="user-crud-modal"
            data-testid="user-crud-modal"
            className="w-full max-w-md glass-card p-6 rounded-2xl glow-border space-y-6 relative"
          >
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h3 className="text-xl font-bold font-display text-foreground">Add New User</h3>
              <button
                onClick={() => setIsOpen(false)}
                id="btn-close-user-modal"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {state?.error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                {state.error}
              </div>
            )}

            <form action={formAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase font-display">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  id="input-user-name"
                  data-testid="input-user-name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase font-display">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  id="input-user-email"
                  data-testid="input-user-email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase font-display">
                  Role
                </label>
                <select
                  name="role"
                  id="select-user-role"
                  data-testid="select-user-role"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="user" className="bg-card text-foreground">User</option>
                  <option value="admin" className="bg-card text-foreground">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                >
                  Cancel
                </button>
                <SubmitButton id="btn-submit-user">Save User</SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
