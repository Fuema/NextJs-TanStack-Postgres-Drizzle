# ANTIGRAVITY PROJECT SPECIFICATION & ARCHITECTURE BLUEPRINT
# Project Name: Next.js 15+ Enterprise Admin Core OS (User, Post & System KPI Management)
# Standard: Antigravity AI Agentic Workflow & Autonomous Pair-Programming Specification

================================================================================
SECTION 1: META-TEMPLATE SPECIFICATION (Reusable Across Any Antigravity Project)
================================================================================

When Antigravity reads this specification file to construct or modify a project, it must strictly adhere to the following execution protocols:

1. AUTONOMOUS PHASE GATING:
   - Never skip phases. Complete each phase sequentially (Phase 1 -> Phase 6).
   - Each phase requires explicit verification before advancing to the next.
   - Run type checks (`npx tsc --noEmit`) and linting (`npm run lint`) after each modification.

2. AESTHETIC & DESIGN EXCELLENCE (Antigravity WOW Standard):
   - Modern Typography: Use Google Fonts (e.g., 'Plus Jakarta Sans' for display/headings, 'Inter' for body/data).
   - Curated Color Palette: Use HSL CSS design tokens. Never use flat default browser colors.
   - Visual Elevation: Implement glassmorphism (`backdrop-blur-md`, subtle translucent borders, ambient glows), rounded pill badges, and refined shadows.
   - Interactive Micro-Animations: Add hover scale transitions, loading skeleton shimmers, stateful submit spinners, and toast confirmations.
   - Theme Support: First-class dark/light mode toggle via CSS variables in `globals.css` with smooth transitions.
   - Testability: All buttons, inputs, modal dialogs, and navigation links MUST have explicit, unique `id` and `data-testid` attributes for automated browser testing.

3. ARCHITECTURAL DISCIPLINE:
   - Unified Directory Layout: Consistently use `src/` (`src/app/`, `src/components/`, `src/lib/`, `src/db/`, `src/config/`).
   - Type Safety: End-to-end validation with Zod. Strict environment variable parsing at startup via `src/config/env.ts`.
   - Modern React 19 Patterns: Leverage React 19 Server Actions, `useActionState`, `useFormStatus`, and `useOptimistic` over legacy client state patterns where appropriate.

================================================================================
SECTION 2: EXECUTIVE SUMMARY & BUSINESS REQUIREMENTS
================================================================================

2.1 Objective:
Build a high-performance, enterprise-grade administrative dashboard and content management system for managing Users, Posts, and System Analytics with real-time audit logging and edge rate limiting.

2.2 Core Business Capabilities:
1. User Management (CRUD):
   - Create, read, update, and soft-delete/delete users.
   - Role-Based Access Control (RBAC): 'admin' vs 'user' permissions.
   - Instant avatar preview and profile updates.
2. Post Management (CRUD):
   - Rich post creation with title, slug generation, markdown content, and publish status.
   - Cascade relationship: Deleting a user cascades or reassigns posts based on business rules.
   - Relational multi-row generation executed inside atomic database transactions.
3. System KPI Analytics Dashboard:
   - Real-time KPI metrics cards: Total Users, Active Posts, System Velocity (Req/min), Security Alerts.
   - Responsive charts and visual distribution metrics.
4. Audit Trail & Security Telemetry:
   - Automated event logging for every sensitive mutation (`CREATE_USER`, `DELETE_USER`, `MUTATE_POST`).
   - Filterable Audit Log Viewer with JSON payload inspector.
   - On-demand CSV/JSON audit report exporter.
   - Resend automated email dispatch upon high-risk destruction actions.
5. High-Scale Data Ingestion & UX:
   - Infinite scroll pagination powered by TanStack Query v5.
   - Search with debounced inputs and instant cursor filtering.
   - Optimistic client updates with rollback on network failure.

================================================================================
SECTION 3: TECHNOLOGICAL STACK MATRIX & JUSTIFICATIONS
================================================================================

Layer                    Technology                      Justification & Implementation Role
------------------------ ------------------------------- ---------------------------------------------------------------------
Core Framework           Next.js 15+ (App Router)        App Router architecture, React 19 Server Components, Server Actions
Language                 TypeScript 5.x                  Strict type compilation (`strict: true`), zero implicit `any`
Styling & Tokens         Tailwind CSS v3/v4 + Variables  Modular utility classes driven by theme-aware HSL CSS variables
UI Component Primitives  shadcn/ui + Radix UI            Accessible, headless, customizable component primitives
Icons                    Lucide React                    Clean, consistent feather-style SVG iconography
Database ORM             Drizzle ORM + Drizzle Kit       Type-safe SQL dialect runner with zero ORM bloat; Postgres driver
Database Engine          PostgreSQL (Neon / Supabase)    Serverless HTTP/TCP relational engine with connection pooling
Client Async State       TanStack Query v5 (React Query) Caching, background invalidation, optimistic updates, infinite scroll
Validation Gateway       Zod                             Single source of truth for runtime validation (Env, Forms, Actions)
Identity & Access        Clerk Authentication            Edge middleware session verification, user claims, and RBAC
Traffic Defense          Upstash Redis + @upstash/rate   Edge memory grid tracking IP addresses via sliding window algorithm
Transactional Email      Resend + React Email            Programmatic security notifications dispatched on destructive operations
Unit & Integration Test  Vitest + Testing Library        Blazing fast test runner verifying Zod schemas, actions, and utilities
End-to-End Test          Playwright                      Headless multi-browser testing simulating critical user flows
Pre-Commit Guard         Husky + lint-staged             Local git hook preventing broken builds and untyped commits
Hosting & CI/CD          Vercel + GitHub Actions         Automated test runs on PR and continuous branch delivery

================================================================================
SECTION 4: COMPLETE TARGET CODE REPOSITORY BLUEPRINT
================================================================================

my-awesome-app/
├── .github/
│   └── workflows/
│       └── ci.yml                         # Automated lint, typecheck, and test runner
├── .husky/
│   └── pre-commit                         # Pre-commit hook running lint-staged & vitest
├── e2e/
│   ├── auth.setup.ts                      # Playwright authentication setup
│   ├── admin-workflow.spec.ts             # CRUD & dialog overlay scenario tests
│   └── infinite-scroll.spec.ts            # Feed scrolling & pagination validation
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/[[...sign-in]]/
│   │   │   │   └── page.tsx               # Branded Clerk sign-in page
│   │   │   └── sign-up/[[...sign-up]]/
│   │   │       └── page.tsx               # Branded Clerk registration page
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                 # Protected dashboard shell (Sidebar, Nav, Guard)
│   │   │   ├── page.tsx                   # Main User Management & Quick Actions
│   │   │   ├── posts/
│   │   │   │   └── page.tsx               # Post Management & Relational Explorer
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx               # KPI dashboard with metric cards & charts
│   │   │   ├── logs/
│   │   │   │   └── page.tsx               # Audit trails viewer & export controls
│   │   │   └── settings/
│   │   │       └── page.tsx               # Workspace configuration & role settings
│   │   ├── api/
│   │   │   └── webhooks/
│   │   │       └── clerk/
│   │   │           └── route.ts           # Clerk user synchronization webhook
│   │   ├── favicon.ico
│   │   ├── globals.css                    # Design tokens, HSL palette & glassmorphism
│   │   ├── layout.tsx                     # Root HTML wrapper with fonts and providers
│   │   └── providers.tsx                  # Context providers (Clerk, QueryClient, Theme)
│   ├── components/
│   │   ├── ui/                            # shadcn/ui components (button, card, dialog, etc.)
│   │   ├── dashboard/
│   │   │   ├── kpi-card.tsx               # Glassmorphic statistic card with trend badge
│   │   │   ├── navigation-sidebar.tsx     # Collapsible sidebar with active link indicator
│   │   │   ├── header-nav.tsx             # Breadcrumbs, user profile, theme toggle
│   │   │   └── mode-toggle.tsx            # Light/Dark mode switcher
│   │   ├── users/
│   │   │   ├── user-crud-modal.tsx        # Add/Edit user dialog with React 19 useActionState
│   │   │   ├── user-table.tsx             # Sortable, filterable user data grid
│   │   │   └── infinite-user-list.tsx     # TanStack Query infinite scroll list
│   │   ├── posts/
│   │   │   ├── post-card.tsx              # Card displaying post details with author badge
│   │   │   └── create-post-dialog.tsx     # Multi-row transaction creator form
│   │   ├── logs/
│   │   │   ├── audit-log-viewer.tsx       # Live event stream with JSON detail drawer
│   │   │   └── export-log-button.tsx      # Client CSV/JSON export trigger
│   │   └── shared/
│   │       ├── submit-button.tsx          # Pending-aware submit button with spinner
│   │       └── error-boundary.tsx         # Graceful error fallback component
│   ├── config/
│   │   ├── env.ts                         # Zod environment variable parsing & validation
│   │   └── site.ts                        # Global site metadata and navigation items
│   ├── db/
│   │   ├── index.ts                       # Drizzle ORM client initialization
│   │   ├── schema.ts                      # Relational schema (users, posts, auditLogs)
│   │   └── migrations/                    # Auto-generated Drizzle SQL migrations
│   ├── lib/
│   │   ├── actions/                       # Next.js Server Actions
│   │   │   ├── users.ts                   # User CRUD server actions
│   │   │   ├── posts.ts                   # Post CRUD & relational transaction actions
│   │   │   ├── audit-logger.ts            # Append-only audit logger helper
│   │   │   └── export-logs.ts             # Server action generating export stream
│   │   ├── email/
│   │   │   ├── email-service.ts           # Resend API integration client
│   │   │   └── templates/
│   │   │       └── security-alert.tsx     # React Email template for destructive action alerts
│   │   ├── rate-limiter.ts                # Upstash Redis sliding window client
│   │   └── utils.ts                       # Class merging (cn) and formatting helpers
│   └── types/
│       ├── index.ts                       # Shared DTOs and API response models
│       └── db.ts                          # Drizzle inferred types (User, Post, AuditLog)
├── .env.example                           # Blueprint of all required environment variables
├── components.json                        # shadcn/ui configuration
├── drizzle.config.ts                      # Drizzle Kit migration & introspect config
├── middleware.ts                          # Edge middleware (Clerk Auth + Upstash Rate Limit)
├── next.config.ts                         # Next.js configuration
├── package.json                           # Scripts and dependencies
├── playwright.config.ts                   # Playwright configuration
├── tailwind.config.ts                     # Tailwind theme extensions & animations
├── tsconfig.json                          # TypeScript paths mapping (@/* -> src/*)
└── vitest.config.ts                       # Vitest unit test environment configuration

================================================================================
SECTION 5: DATA ARCHITECTURE & DATABASE SCHEMAS
================================================================================

5.1 Entity Relationship Diagram (ERD):
- `users`: Primary identity table synchronized with Clerk.
- `posts`: Relational content owned by a user (authorId -> users.id, cascade on delete).
- `auditLogs`: Append-only security & system event log recording actor, action, and payload.

5.2 Drizzle Schema Specification (`src/db/schema.ts`):
```typescript
import { pgTable, text, timestamp, uuid, pgEnum, jsonb, boolean, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("user_role", ["admin", "user"]);
export const auditActionEnum = pgEnum("audit_action", [
  "USER_CREATED",
  "USER_UPDATED",
  "USER_DELETED",
  "POST_CREATED",
  "POST_UPDATED",
  "POST_DELETED",
  "SECURITY_ALERT"
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: roleEnum("role").default("user").notNull(),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  emailIdx: index("users_email_idx").on(table.email),
  clerkIdIdx: index("users_clerk_id_idx").on(table.clerkId)
}));

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  published: boolean("published").default(false).notNull(),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  authorIdx: index("posts_author_idx").on(table.authorId),
  slugIdx: index("posts_slug_idx").on(table.slug)
}));

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: text("actor_id").notNull(),
  action: auditActionEnum("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  actorIdx: index("audit_actor_idx").on(table.actorId),
  actionIdx: index("audit_action_idx").on(table.action),
  createdIdx: index("audit_created_idx").on(table.createdAt)
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

================================================================================
SECTION 6: ENVIRONMENT VARIABLES SPECIFICATION (.env.example)
================================================================================

```bash
# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Database Connection (Neon PostgreSQL / Supabase)
DATABASE_URL="postgresql://user:password@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_sample"
CLERK_SECRET_KEY="sk_test_sample"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
CLERK_WEBHOOK_SECRET="whsec_sample"

# Upstash Redis & Rate Limiting
UPSTASH_REDIS_REST_URL="https://sample.upstash.io"
UPSTASH_REDIS_REST_TOKEN="sample_token"

# Resend Transactional Email
RESEND_API_KEY="re_sample_key"
ADMIN_ALERT_EMAIL="admin@yourdomain.com"
```

Type-safe Validation in `src/config/env.ts`:
Must throw an informative runtime error during build/boot if any required variable is missing or malformed.

================================================================================
SECTION 7: DESIGN SYSTEM & AESTHETICS SPECIFICATION (The Antigravity Look)
================================================================================

7.1 Visual Philosophy:
- Dark Mode Default / High Contrast Light Mode: Deep obsidian dark background (`hsl(224, 71%, 4%)`) with vibrant electric violet/indigo accents (`hsl(250, 84%, 60%)`).
- Glassmorphic Cards: `bg-card/70 backdrop-blur-md border border-border/50 shadow-xl`.
- Glowing Borders & Accents: Subtle gradient border highlights on hover (`border-primary/40`).
- Typography Hierarchy:
  - Font Display: Plus Jakarta Sans / Outfit for Headers (tracking tight, semi-bold to bold).
  - Font Body: Inter for data grids and forms (tabular numbers on metric values).
- Micro-Interactions:
  - Buttons: Smooth scale on press (`active:scale-[0.98] transition-transform`).
  - Tables: Hover highlight row with smooth fade (`hover:bg-muted/40 transition-colors`).
  - Modals: Animated backdrop enter/exit with slight spring curve.

7.2 Element Identifiers (DOM Test IDs):
Every interactive component must include explicit, semantic IDs:
- Search Input: `id="filter-search-input"`
- Add User Button: `id="btn-open-add-user-modal"`
- Submit User Form: `id="btn-submit-user-form"`
- Theme Toggle: `id="btn-theme-toggle"`
- Export Logs: `id="btn-export-audit-logs"`
- Delete Action Button: `id="btn-delete-row-[id]"`

================================================================================
SECTION 8: ARCHITECTURAL PHASE-BY-PHASE EXECUTION BLUEPRINT
================================================================================

PHASE 1: FOUNDATION, CONFIGURATION & TYPE-SAFE GUARDS
--------------------------------------------------------------------------------
Goal: Establish project scaffold, TypeScript configs, environment schema, and database connectivity.
Steps:
1. Initialize Next.js 15+ project with TypeScript, Tailwind CSS, ESLint, and App Router inside `src/`.
2. Install base dependencies: `drizzle-orm`, `drizzle-kit`, `postgres`, `zod`, `dotenv`.
3. Configure `src/config/env.ts` with Zod schema parsing `process.env`.
4. Define Drizzle schema in `src/db/schema.ts` (users, posts, auditLogs, enums, relations).
5. Configure `drizzle.config.ts` and initialize database client in `src/db/index.ts`.
6. Run initial migration test: `npx drizzle-kit generate` and `npx drizzle-kit push`.
7. Configure `globals.css` with CSS variables for Light & Dark mode themes.
Verification Gate 1:
- Execute `npx tsc --noEmit` -> PASS with 0 errors.
- Connect to DB and successfully query current timestamp.

PHASE 2: AUTHENTICATION, ACCESS CONTROL & TRAFFIC DEFENSE
--------------------------------------------------------------------------------
Goal: Implement Clerk authentication with role-based routing and edge rate limiting.
Steps:
1. Install `@clerk/nextjs`, `@upstash/redis`, `@upstash/ratelimit`.
2. Configure `middleware.ts`:
   - Enforce Clerk authentication on protected routes (`/`, `/posts`, `/analytics`, `/logs`, `/settings`).
   - Allow public access to `/sign-in(.*)` and `/sign-up(.*)`.
   - Implement Upstash sliding window rate limiting (10 requests per 10-second window per client IP).
   - Return HTTP 429 JSON response with `Retry-After` header when threshold is breached.
3. Build branded `/sign-in` and `/sign-up` pages matching the glassmorphism theme.
4. Create user session sync webhook (`src/app/api/webhooks/clerk/route.ts`) to persist user records in PostgreSQL upon sign-up.
Verification Gate 2:
- Unauthenticated requests to `/` redirect to `/sign-in`.
- Rapid burst of 12 requests from same client IP triggers HTTP 429 response.

PHASE 3: THE DATA LAYER & RELATIONAL SERVER ACTIONS
--------------------------------------------------------------------------------
Goal: Build robust, transaction-safe Server Actions with audit logging and transactional emails.
Steps:
1. Create `src/lib/actions/users.ts`:
   - `createUserAction(formData)`: Validates input with Zod, inserts user, writes audit log.
   - `updateUserAction(formData)`: Validates user id and fields, updates row, writes audit log.
   - `deleteUserAction(userId)`: Verifies caller is 'admin', executes deletion, triggers Resend security alert email.
2. Create `src/lib/actions/posts.ts`:
   - `createPostWithAuthorTransaction()`: Implements atomic `db.transaction()` creating post and linking author.
   - `getPostsCursorPaginated()`: Cursor-based pagination using `lt(posts.createdAt, cursor)` and `limit()`.
3. Create `src/lib/actions/audit-logger.ts`:
   - Centralized helper `recordAuditEvent({ actorId, action, entity, entityId, metadata })`.
4. Setup `src/lib/email/email-service.ts` using Resend to dispatch alerts on critical actions.
Verification Gate 3:
- Vitest unit tests verify: Zod schema rejects malformed emails, transaction rolls back if authorId is invalid.

PHASE 4: UI SHELL, NAVIGATION & COMPOSABLE FORMS
--------------------------------------------------------------------------------
Goal: Build responsive dashboard layout, KPI widgets, and React 19 interactive forms.
Steps:
1. Install shadcn/ui components:
   `npx shadcn@latest add button card dialog dropdown-menu input label table badge avatar sheet toast skeleton`
2. Create `NavigationSidebar` with responsive desktop collapse and mobile drawer (`Sheet`).
3. Build `HeaderNav` with breadcrumbs, dynamic page title, theme switcher (`ModeToggle`), and `UserButton`.
4. Build `src/app/(dashboard)/page.tsx` (User Management):
   - Interactive data table with columns: Avatar, Name, Email, Role, Status, Created Date, Actions.
   - User CRUD Modal (`user-crud-modal.tsx`) using React 19 `useActionState` and `useFormStatus` for submit loading spinner.
5. Build `src/app/(dashboard)/analytics/page.tsx`:
   - 4 glassmorphic KPI cards (Total Users, Active Posts, API Velocity, Security Alerts).
   - Trend badges (+12.5% this week).
Verification Gate 4:
- Run dev server (`npm run dev`), open browser, confirm UI renders with 0 console errors, modal opens/closes cleanly.

PHASE 5: ADVANCED OPTIMIZATION, INFINITE SCROLL & LOG VIEWER
--------------------------------------------------------------------------------
Goal: Connect TanStack Query v5 for continuous feeds, optimistic UI mutations, and log exporter.
Steps:
1. Setup TanStack Query v5 `QueryClientProvider` with hydration support in `src/app/providers.tsx`.
2. Build `infinite-user-list.tsx` using `useInfiniteQuery`:
   - Dynamically load next page as user scrolls near bottom (`IntersectionObserver`).
   - Smooth skeleton placeholders while fetching next page.
3. Implement optimistic CRUD mutations with `useOptimistic`:
   - Instant visual update in table before server action finishes.
   - Safe rollback with toast notification if server returns error.
4. Build `audit-log-viewer.tsx` in `src/app/(dashboard)/logs/page.tsx`:
   - Filterable event stream with severity badges.
   - Side drawer inspecting full JSON metadata.
   - Client export button (`export-log-button.tsx`) streaming data as `.csv` or `.json`.
Verification Gate 5:
- Scrolling down triggers infinite page fetches.
- Export button downloads valid CSV file with expected headers.

PHASE 6: AUTOMATION, COMPREHENSIVE TESTING & DEPLOYMENT
--------------------------------------------------------------------------------
Goal: Ensure zero regressions with unit tests, Playwright E2E tests, pre-commit hooks, and CI/CD.
Steps:
1. Configure Vitest in `vitest.config.ts`:
   - Add unit tests for Zod validation schemas (`src/config/__tests__/env.test.ts`).
   - Add unit tests for action utilities.
2. Configure Playwright in `playwright.config.ts`:
   - E2E Test 1: Full user creation workflow through modal dialog.
   - E2E Test 2: Rate limit protection and 429 response verification.
   - E2E Test 3: Audit log export download check.
3. Configure Husky & lint-staged (`.husky/pre-commit`):
   - Runs `lint-staged` (ESLint + Prettier) and `vitest run`.
4. Configure GitHub Actions workflow (`.github/workflows/ci.yml`):
   - Triggers on push and pull requests to `main`.
   - Steps: Checkout -> Setup Node 20 -> Install dependencies -> Lint -> Typecheck -> Run Vitest -> Build.
5. Deploy to Vercel:
   - Link project, configure environment variables, enable automatic preview deployments.
Verification Gate 6:
- All unit tests and Playwright E2E tests pass cleanly.
- `npm run build` succeeds with zero TypeScript or bundling errors.

================================================================================
SECTION 9: ANTIGRAVITY AGENT CHECKLIST & RUNBOOK
================================================================================

When starting or continuing this project, Antigravity must execute the following checklist:

[ ] 1. Read `.env.example` and verify `.env.local` contains all valid credentials.
[ ] 2. Check Database connectivity: `npx drizzle-kit check`.
[ ] 3. Run type check: `npx tsc --noEmit`.
[ ] 4. Run unit tests: `npm run test:unit`.
[ ] 5. Run dev server: `npm run dev` and perform verification using the browser subagent.
[ ] 6. Ensure all newly introduced UI elements have semantic IDs and aria attributes.
[ ] 7. Confirm dark mode and light mode contrast ratios meet WCAG AA standards.
[ ] 8. Maintain documentation integrity: Never erase existing configuration comments.





<!-- How to Use This Template for Future Projects
1. Duplicate or Rename: For new projects, copy this structure and adjust Section 2 (Business Scope) and Section 5 (Data Schemas) to match your new domain.
Launch with Antigravity: Feed this file into any Antigravity conversation. The agent will follow the chronological phases, respect the verification gates, and build out the project with clean code, modern aesthetics, and automated test coverage. -->


<!-- Newly Added Configuration Files & Agents
1. Antigravity Agent Framework (.agents/ & AGENTS.md)

AGENTS.md
: Workspace entrypoint automatically read by Antigravity outlining project standards, aesthetics, and agent skills.

.agents/rules/project-rules.md
: Strict workspace rules for TypeScript, src/ directory layout, HSL design system, DOM test IDs, and React 19 Server Action patterns.
2. Specialized Workspace Skills (.agents/skills/)

.agents/skills/github-committer/SKILL.md
: Automated Git Committer: Runs type checking (npx tsc --noEmit), formats Conventional Commits (feat:, fix:, chore:), stages files, and syncs with remote GitHub.

.agents/skills/clerk-auth/SKILL.md
: Clerk Authentication Helper: Manages @clerk/nextjs installation, edge middleware configuration, RBAC session protection, and PostgreSQL user sync webhooks.

.agents/skills/db-drizzle/SKILL.md
: Drizzle ORM & Postgres Helper: Handles drizzle-kit migrations, database schema pushing, atomic relational transactions (db.transaction()), and seed data.
3. Environment & Workspace Foundation

.env.example
: Comprehensive environment blueprint (PostgreSQL Database, Clerk Auth, Upstash Redis, Resend API).

.gitignore
: standard .gitignore covering Next.js, Node modules, .env files, build caches, and IDE configs. -->