import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        data: { label: "Data", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.data) {
          return null;
        }

        try {
          const userData = JSON.parse(credentials.data);

          if (userData.user && userData.backendToken) {
            return { ...userData.user, backendToken: userData.backendToken };
          }
          
          return null;

        } catch (error) {
          console.error("Failed to parse credentials data in authorize:", error);
          return null;
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
        token.id = user._id; 
        token.backendToken = user.backendToken;
        token.instagramUserId = user.instagramUserId;
        token.email = user.email;
        token.role = user.role;
        token.subscriptionStatus = user.subscriptionStatus;
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