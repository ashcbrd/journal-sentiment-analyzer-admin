import { NextRequest, NextResponse } from "next/server";

import { checkAuth } from "./lib/check-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/journals", "/messages", "/students"];
  const publicRoutes = ["/auth"];

  const isAuthenticated = checkAuth();

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  } else if (publicRoutes.includes(pathname) && isAuthenticated) {
    const referer = request.headers.get("referer");
    const url = request.nextUrl.clone();

    if (referer) {
      url.href = referer;
      return NextResponse.redirect(url);
    } else {
      url.pathname = "/students";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
