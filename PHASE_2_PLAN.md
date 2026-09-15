# Implementation Plan: Phase 2 — Core Infrastructure (Auth, Global Rate Limiting & Webhooks)

This phase establishes the security and traffic defense layer for the **Next.js 15+ Enterprise Admin Core OS** application using Clerk Authentication, Upstash Redis rate limiting, and PostgreSQL user sync webhooks.

## Proposed Changes

### 1. Dependencies & Environment Updates
- Install `svix` package for webhook header signature verification.

---

### 2. Upstash Redis Rate Limiting Layer
- Create `src/lib/rate-limiter.ts`: Upstash Redis rate limiter instance with `Ratelimit.slidingWindow(10, "10 s")`.
- Include safe fallback when Redis credentials are unconfigured during local development.

---

### 3. Unified Edge Security Middleware
- Create `src/middleware.ts`: Implement Clerk edge authentication gateway (`clerkMiddleware`).
- Public routes matcher: `/sign-in(.*)`, `/sign-up(.*)`, `/api/webhooks(.*)`.
- Client IP fingerprinting and velocity throttling: intercept requests, check Upstash rate limiter, return HTTP 429 Too Many Requests response with `Retry-After` header when limit is exceeded.

---

### 4. Custom Branded Auth Routing Nodes
- Create `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`: Custom branded login view embedding Clerk `<SignIn />` component styled with glassmorphism HSL dark theme tokens.
- Create `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`: Custom branded sign-up view embedding Clerk `<SignUp />` component matching HSL design system.

---

### 5. App Shell Provider Update
- Update `src/app/providers.tsx`: Wrap application with `<ClerkProvider>` alongside `<QueryClientProvider>`.

---

### 6. Clerk User Sync Webhook
- Create `src/app/api/webhooks/clerk/route.ts`: Implement webhook endpoint verifying `svix` headers (`svix-id`, `svix-timestamp`, `svix-signature`).
- Synchronize Clerk user events (`user.created`, `user.updated`, `user.deleted`) directly into PostgreSQL Drizzle `users` table.

---

## Verification Plan

### Automated Verification
- Run `npx tsc --noEmit` to verify type safety across middleware, providers, and webhook handlers.
- Run `npm run build` to ensure edge middleware bundles cleanly without bundling errors.

### Manual Verification
- Unauthenticated access to `/` redirects cleanly to `/sign-in`.
- Verify `/sign-in` and `/sign-up` render branded glassmorphic auth cards.
