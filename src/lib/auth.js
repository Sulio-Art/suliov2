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
        // This function will now correctly be called by the callback page.
        try {
          if (credentials?.token) {
            const res = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
              headers: { Authorization: `Bearer ${credentials.token}` },
              cache: "no-store",
            });
            const data = await res.json();
            if (res.ok && data.user) {
              return { ...data.user, backendToken: credentials.token };
            }
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
          console.error("AUTHORIZE ERROR: ", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log(
        `\n--- [NEXTAUTH jwt] Callback Called (Trigger: ${trigger}) ---`
      );

      // Case 1: Initial sign-in or session refresh after IG connect
      if (user) {
        console.log(
          "[NEXTAUTH jwt] 'user' object is present. Populating token."
        );
        token.id = user.id || user._id;
        token.backendToken = user.backendToken;
        token.instagramUserId = user.instagramUserId;
        token.email = user.email;
        token.role = user.role;
        token.subscriptionStatus = user.subscriptionStatus;
      }

      // --- THIS IS THE NEW, CRITICAL LOGIC ---
      // Case 2: A session update is manually triggered from the client
      if (trigger === "update") {
        console.log(
          "[NEXTAUTH jwt] 'update' trigger detected. Refetching user from backend..."
        );
        try {
          const res = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token.backendToken}` },
            cache: "no-store",
          });
          const freshUser = await res.json();
          if (res.ok && freshUser.user) {
            console.log(
              "[NEXTAUTH jwt] Successfully re-fetched user. Updating token."
            );
            token.instagramUserId = freshUser.user.instagramUserId; // Update the specific field
          } else {
            console.log(
              "[NEXTAUTH jwt] Failed to re-fetch user during update."
            );
          }
        } catch (error) {
          console.error(
            "[NEXTAUTH jwt] Error during session update fetch:",
            error
          );
        }
      }

      console.log("[NEXTAUTH jwt] SUCCESS: Returning this token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("\n--- [NEXTAUTH session] Callback Called ---");
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.backendToken = token.backendToken;
        // This will now be correct because the token is fresh
        session.isInstagramConnected = !!token.instagramUserId;
        session.subscriptionStatus = token.subscriptionStatus;
      }
      console.log(
        "[NEXTAUTH session] SUCCESS: Returning this final session object:",
        session
      );
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};