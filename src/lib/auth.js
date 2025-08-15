import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Backend Token", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          if (credentials?.token) {
            const res = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
              headers: { Authorization: `Bearer ${credentials.token}` },
              cache: "no-store",
            });
            const data = await res.json();
            if (!res.ok || !data.user) {
              return null;
            }
            return { ...data.user, backendToken: credentials.token };
          }

          if (credentials?.email && credentials?.password) {
            const res = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
            const data = await res.json();
            if (data.user) {
              return { ...data.user, backendToken: data.token };
            }
          }

          return null;
        } catch (error) {
          console.error("[Authorize] CATCH BLOCK ERROR: ", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id || user._id;
        token.backendToken = user.backendToken;
        token.instagramUserId = user.instagramUserId;
        token.email = user.email;
        token.role = user.role;
        token.subscriptionStatus = user.subscriptionStatus;
        return token;
      }

      if (trigger === "update" && token.backendToken) {
        console.log(
          "[JWT Callback] Update triggered. Refetching user from /me..."
        );
        const res = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token.backendToken}` },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          token.instagramUserId = data.user.instagramUserId;
          console.log(
            "[JWT Callback] Token refreshed with new instagramUserId:",
            token.instagramUserId
          );
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.backendToken = token.backendToken;
        session.isInstagramConnected = !!token.instagramUserId;
        session.subscriptionStatus = token.subscriptionStatus;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};