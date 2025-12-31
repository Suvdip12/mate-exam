import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/auth";
import { ratelimit } from "./lib/ratelimit";
import crypto from "crypto";

const authRoutes = ["/signup", "/login", "/email-verified"];
const adminRoutes = ["/admin"];
export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);

  if (request.nextUrl.pathname.startsWith("/api")) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;

    const ua = request.headers.get("user-agent");
    const uaHash = ua
      ? `ua:${crypto.createHash("sha256").update(ua).digest("hex")}`
      : "anonymous";

    const rateLimitKey = ip ? `ip:${ip}` : uaHash;
    const { success } = await ratelimit.limit(rateLimitKey);

    if (!success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 },
      );
    }
  }

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",

    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );
  // console.log(session);

  if (!session) {
    if (isAuthRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (session.user.role === "super-admin") {
    return NextResponse.next();
  }
  if (isAdminRoute && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/signup", "/login", "/admin/:path*"],
};
