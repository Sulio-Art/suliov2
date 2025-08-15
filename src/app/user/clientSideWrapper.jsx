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
            console.log("--- [NEXTAUTH] Detected Token-based Sign-In flow.");

           
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

            
            return {
              ...data.user, 
              backendToken: credentials.token,
            };
          }

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
      if (user) {
        token.id = user._id || user.id; 
        token.role = user.role;
        token.backendToken = user.backendToken;
        token.instagramUserId = user.instagramUserId;
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
