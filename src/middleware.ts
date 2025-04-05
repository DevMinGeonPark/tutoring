import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    // 세션 새로고침
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // 쿠키에서 세션 정보 확인
    const sessionCookie = request.cookies.get("sb-sgypverywcewrbvvemky-auth-token");
    console.log("Session cookie:", sessionCookie?.value ? "exists" : "not found");

    // 세션 정보 로깅
    console.log("Middleware session check:", {
      hasSession: !!session,
      hasCookie: !!sessionCookie,
      user: session?.user?.email,
      expiresAt: session?.expires_at,
      path: request.nextUrl.pathname,
      cookies: request.cookies.getAll().map((cookie) => cookie.name),
    });

    // 로그인이 필요한 페이지 목록
    const protectedRoutes = ["/", "/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    // 로그인이 필요한 페이지나 콜백 페이지는 체크하지 않음
    if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/auth/callback")) {
      return res;
    }

    // 로그인이 필요한 페이지에 접근 시도
    if (isProtectedRoute && !session && !sessionCookie) {
      console.log("No session found, redirecting to login");
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // 세션이 있는 경우 응답 헤더에 세션 정보 추가
    if (session) {
      res.headers.set("x-session-user", session.user?.email || "");
    }

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
