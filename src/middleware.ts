import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/auth";
import { ratelimit } from "./lib/ratelimit";

const authRoutes = ["/signup", "/login", "/email-verified"];
const adminRoutes = ["/admin"];
// Add any API routes that should be accessible without a login
const publicApiPrefixes = ["/api/student/admit", "/api/auth"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);
  const isApiRoute = pathName.startsWith("/api");
  const isPublicApi = publicApiPrefixes.some((prefix) =>
    pathName.startsWith(prefix),
  );

  // 1. Rate Limiting
  if (isApiRoute) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
    const { success } = await ratelimit.limit(`ip:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 },
      );
    }
  }

  // 2. Skip session fetching for public API routes
  if (isPublicApi) {
    return NextResponse.next();
  }

  // 3. Fetch Session (only for non-public routes)
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // 4. Unauthenticated User Logic
  if (!session) {
    if (isAuthRoute || isPublicApi) {
      return NextResponse.next();
    }

    // If it's a private API route, return 401 instead of redirecting to HTML
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Redirect browser requests to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 5. Authenticated User Logic
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role Based Access Control
  if (session.user.role === "super-admin") {
    return NextResponse.next();
  }

  if (isAdminRoute && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signup", "/login", "/admin/:path*", "/api/:path*"],
};
