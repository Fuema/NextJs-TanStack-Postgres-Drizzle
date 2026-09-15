# Implementation Plan: Phase 5 — Advanced Optimization (Optimistic CRUD, Infinite Scroll & Telemetry Exporter)

This phase integrates advanced client-side optimization patterns, infinite feed scrolling streams using TanStack Query v5, instant optimistic state updates, and an on-demand audit telemetry data exporter.

## Proposed Changes

### 1. Telemetry Data Exporter Server Action & UI Component
- Create `src/lib/actions/export-logs.ts`: `exportAuditLogsAction({ format: "csv" | "json" })` queries all `audit_logs` records and formats them as a clean CSV or JSON data string.
- Create `src/components/logs/export-log-button.tsx`: Client component triggering audit log export, encoding data into a Blob stream, and downloading as `.csv` or `.json` directly in user browser (`id="btn-export-audit-logs"`).
- Update `src/app/(dashboard)/logs/page.tsx`: Integrate `ExportLogButton` into Audit Logs display view.

---

### 2. Infinite Data Streams (TanStack Query v5)
- Create `src/components/posts/infinite-post-list.tsx`: Implement infinite scrolling list view using `@tanstack/react-query` `useInfiniteQuery` and `IntersectionObserver` sentinel (`id="infinite-post-list"`).
- Update `src/app/(dashboard)/posts/page.tsx`: Replace static post cards with `InfinitePostList` continuous feed.

---

### 3. Multi-Action Optimistic UI Updates
- Update `src/components/users/user-table.tsx`: Implement React 19 `useOptimistic` hook to instantly remove deleted user rows from UI while background server action executes, with automatic state rollback if action fails.

---

## Verification Plan

### Automated Verification
- Run `npx tsc --noEmit` to verify type safety across TanStack Query hooks, export actions, and optimistic handlers.
- Run `npm run build` to ensure production compilation succeeds without errors.

### Manual Verification
- Test Audit Logs export button in browser (`/logs`), verifying downloaded `.csv` file contains valid event headers.
- Test infinite scrolling stream on `/posts`.
- Test optimistic deletion on `/` user management grid.
