import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
        code: { label: "Instagram Code", type: "text" },
        isInstagramAuth: { label: "Is Instagram Auth", type: "boolean" },
      },
      async authorize(credentials) {
      
        if (credentials?.isInstagramAuth && credentials?.code) {
          try {
            const res = await fetch(`${BACKEND_API_URL}/api/auth/instagram/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code: credentials.code }),
            });
            const data = await res.json();
            if (!res.ok || data.completionToken) {
              throw new Error(JSON.stringify({ status: res.status, ...data }));
            }
            return data;
          } catch (e) { throw new Error(e.message); }
        }
        if (credentials?.token && credentials?.email) {
          const meResponse = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${credentials.token}` },
          });
          if (!meResponse.ok) return null;
          const userProfile = await meResponse.json();
          return { user: userProfile.user, token: credentials.token };
        }
        try {
          const res = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          return data;
        } catch (e) { throw new Error(e.message); }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const userPayload = user.user;
        const backendToken = user.token;

        if (userPayload) {
          token.id = userPayload._id || userPayload.id;
          token.name = userPayload.name || `${userPayload.firstName} ${userPayload.lastName}`;
          token.email = userPayload.email;
          token.isInstagramConnected = !!userPayload.instagramUserId;
          token.currentPlan = userPayload.currentPlan;
        }
        if (backendToken) {
          token.backendToken = backendToken;
        }
        return token;
      }

      if (trigger === "update" && session?.isInstagramConnected) {
        token.isInstagramConnected = session.isInstagramConnected;
      }

      try {
        const response = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token.backendToken}` },
        });

       
        if (!response.ok) {
          console.error("[NextAuth] Session refresh failed. Invalidating session.");
          return {};
        }

        const refreshedUser = await response.json();
        if (!refreshedUser) {
          return {}; 
        }

        return {
          ...token,
          name: `${refreshedUser.user.firstName} ${refreshedUser.user.lastName}`,
          isInstagramConnected: !!refreshedUser.user.instagramUserId,
          currentPlan: refreshedUser.user.currentPlan,
        };
      } catch (error) {
        console.error("[NextAuth] CRITICAL: Error refreshing session token:", error);
        return {}; 
      }
    },
    async session({ session, token }) {
      
      if (!token || !token.id) {
       
        return null;
      }
      
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.backendToken = token.backendToken;
        session.isInstagramConnected = token.isInstagramConnected;
        session.user.currentPlan = token.currentPlan;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };