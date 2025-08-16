import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (token && pathname === "/") {
    const targetUrl =
      token.role === "admin" ? "/admin" : `/user/${token.id}/dashboard`;
    const url = new URL(targetUrl, req.url);
    return NextResponse.redirect(url);
  }

  if (
    !token &&
    (pathname.startsWith("/user") || pathname.startsWith("/admin"))
  ) {
    const url = new URL("/auth/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (token && pathname.startsWith("/admin") && token.role !== "admin") {
    const url = new URL(`/user/${token.id}/dashboard`, req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};