import React from "react";
import { getUsersPaginated } from "@/lib/actions/users";
import { UserTable } from "@/components/users/user-table";
import { UserCRUDModal } from "@/components/users/user-crud-modal";
import { Users, Shield, Sparkles } from "lucide-react";

export default async function UserManagementPage() {
  const result = await getUsersPaginated({ page: 1, limit: 10 });
  const usersList = result.success && result.data ? result.data : [];

  return (
    <div className="space-y-8" id="page-user-management" data-testid="page-user-management">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
              User Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              Live DB
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage system access roles, user identities, and security access states.
          </p>
        </div>

        <UserCRUDModal />
      </div>

      {/* Main Table */}
      <UserTable users={usersList} />
    </div>
  );
}
