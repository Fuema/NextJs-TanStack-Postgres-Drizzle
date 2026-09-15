# Implementation Plan: Phase 3 — The Data Layer (Server Actions, Relational Transactions & Resend Email)

This phase builds the data access and mutation layer for the **Next.js 15+ Enterprise Admin Core OS** application using pure React 19 Server Actions, atomic Drizzle database transactions, centralized audit logging, and Resend email alerts.

## Proposed Changes

### 1. Centralized Audit Logger
- Create `src/lib/actions/audit-logger.ts`: Implement `recordAuditEvent({ actorId, action, entity, entityId, metadata, ipAddress })` helper inserting structured audit records into `audit_logs` table.

---

### 2. Transactional Email Security Service
- Create `src/lib/email/email-service.ts`: Implement Resend email client (`new Resend(env.RESEND_API_KEY)`).
- Create `sendSecurityAlertEmail({ recipient, action, details })` dispatches email notifications when critical data destruction actions occur.

---

### 3. User Management Server Actions
- Create `src/lib/actions/users.ts`: Zod validation schemas for User creation and update payloads.
- `createUserAction(data)`: Validates input, inserts user, records `USER_CREATED` audit log.
- `updateUserAction(data)`: Validates input, updates record, records `USER_UPDATED` audit log.
- `deleteUserAction(userId)`: Deletes user record, records `USER_DELETED` audit log, dispatches Resend security alert email.
- `getUsersPaginated({ page, limit, search })`: Queries paginated user rows with count and search filter.

---

### 4. Post Management & Atomic Relational Transactions
- Create `src/lib/actions/posts.ts`: Zod validation schemas for Post creation and update payloads.
- `createPostWithAuthorTransaction(data)`: Enforces `db.transaction()` boundary ensuring slug generation, post insertion, and `POST_CREATED` audit log execute atomically.
- `getPostsCursorPaginated({ cursor, limit })`: Cursor-based pagination logic using `lt(posts.createdAt, cursor)` and `limit()`.
- `deletePostAction(postId)`: Deletes post and records `POST_DELETED` audit log.

---

## Verification Plan

### Automated Verification
- Run `npx tsc --noEmit` to verify type safety across all Server Actions, Zod schemas, and database calls.
- Run `npm run build` to verify clean compilation without missing exports.

### Manual Verification
- Test action return contracts ensuring standardized `{ success: true, data }` or `{ success: false, error }` response structures.
