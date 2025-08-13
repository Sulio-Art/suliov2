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
          // --- SCENARIO 1: Token-based sign-in (after registration, IG connect, etc.) ---
          // This is now the most important flow for session refreshes.
          if (credentials?.token) {
            console.log("--- [NEXTAUTH] Detected Token-based Sign-In flow.");

            // --- CRITICAL FIX: Use the token to fetch the FULL user object from the backend ---
            // This ensures we get the most up-to-date data, including the instagramUserId.
            const res = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
              headers: {
                Authorization: `Bearer ${credentials.token}`,
              },
            });

            const data = await res.json();
            if (!res.ok || !data.user) {
              throw new Error(
                data.message || "Failed to fetch user data with token."
              );
            }

            // Return the full user object from the backend, and include the token
            // so it can be passed to the JWT callback.
            return {
              ...data.user, // The user object from /api/auth/me
              backendToken: credentials.token,
            };
          }

          // --- SCENARIO 2: Standard Email/Password Login ---
          if (credentials?.email && credentials?.password) {
            console.log("--- [NEXTAUTH] Detected Email/Password flow.");
            const res = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });

            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || "Login failed.");
            }

            const data = await res.json();
            if (data.user) {
              return {
                ...data.user,
                backendToken: data.token,
              };
            }
            return null;
          }

          console.error(
            "--- [NEXTAUTH] ERROR: No valid credential scenario was met."
          );
          throw new Error("Invalid authentication method.");
        } catch (error) {
          console.error(
            "--- [NEXTAUTH] CATCH BLOCK ERROR in authorize:",
            error.message
          );
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // The 'user' object is what is returned from the 'authorize' function.
      if (user) {
        token.id = user._id || user.id; // Handle both _id and id for consistency
        token.role = user.role;
        token.backendToken = user.backendToken;
        token.instagramUserId = user.instagramUserId; // <-- This will now be correctly populated
        token.subscriptionStatus = user.subscriptionStatus;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.backendToken = token.backendToken;
        // --- THIS IS THE KEY ---
        // It now correctly reflects the latest DB state because the JWT token is built correctly.
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
