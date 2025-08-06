import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoggedIn = !!token;
    const { pathname } = req.nextUrl;

    if (isLoggedIn && pathname === "/dashboard") {
      const userId = token.id;
      if (userId) {
        return NextResponse.redirect(
          new URL(`/user/${userId}/dashboard`, req.url)
        );
      }
    }

    if (
      isLoggedIn &&
      pathname.startsWith("/auth") &&
      pathname !== "/auth/instagram/callback"
    ) {
      const userId = token.id;
      if (userId) {
        return NextResponse.redirect(
          new URL(`/user/${userId}/dashboard`, req.url)
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/auth")) {
          return true;
        }

        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: ["/user/:path*", "/dashboard", "/auth/:path*"],
};