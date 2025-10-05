import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { ROUTES } from "./shared/constants";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const response = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = request.nextUrl.pathname.startsWith("/admin");
  const isFlowSignIn = request.nextUrl.pathname === ROUTES.SIGN_IN;
  const isFlowSignUp = request.nextUrl.pathname === ROUTES.SIGN_UP;

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
  }

  if (isLoggedIn && (isFlowSignIn || isFlowSignUp)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
