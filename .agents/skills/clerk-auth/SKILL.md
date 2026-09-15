---
name: clerk-auth
description: >-
  Automates the installation, configuration, and integration of Clerk Authentication,
  Edge Middleware, custom sign-in/sign-up pages, PostgreSQL user sync webhooks, and RBAC role helpers.
---

# Clerk Authentication Automation Skill

Use this skill when setting up, configuring, or debugging authentication, authorization roles, session middleware, or user webhooks with Clerk.

## Workflow Steps

### 1. Dependency Setup
Install `@clerk/nextjs` package:
```bash
npm install @clerk/nextjs
```

### 2. Environment Variables Verification
Ensure `.env.local` contains valid Clerk credentials:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `CLERK_WEBHOOK_SECRET`

### 3. Middleware Configuration (`src/middleware.ts`)
Set up Clerk middleware with public route matchers and protected route enforcement:
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|png|jpg|webp|svg|ico|csv|txt)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### 4. Provider Wrapper (`src/app/providers.tsx`)
Wrap the application inside `ClerkProvider`:
```tsx
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
```

### 5. Webhook User Sync (`src/app/api/webhooks/clerk/route.ts`)
Implement Svix signature verification and PostgreSQL sync when `user.created` or `user.updated` events fire.
