import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limiter";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Rate limiting check
  if (rateLimiter) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { success, reset, limit, remaining } = await rateLimiter.limit(`mw_${ip}`);

    if (!success) {
      const secondsLeft = Math.ceil((reset - Date.now()) / 1000);
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: `Velocity threshold reached. Limit is ${limit} requests per 10s.`,
          retryAfter: secondsLeft,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": secondsLeft.toString(),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }
  }

  // Auth protection check
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|png|jpg|webp|svg|ico|csv|txt)).*)",
    "/(api|trpc)(.*)",
  ],
};
