import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import InstagramProvider from "next-auth/providers/instagram";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error('Missing environment variable: "BACKEND_API_URL"');
}

export const authOptions = {
  
  providers: [
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    CredentialsProvider({
      
      id: "credentials", 
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
     
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required.");
        }

        try {
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
            
            throw new Error(errorData.message || "Invalid credentials.");
          }

          const data = await res.json();

          
          if (data && data.user && data.token) {
            return data;
          }
          
         
          return null;
        } catch (e) {
          
          throw new Error(e.message || "An unexpected error occurred during authorization.");
        }
      },
    }),
  ],

 
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  
  callbacks: {
   
    async jwt({ token, user, account }) {
      
      if (user) {
       
        const userPayload = user.user;
        const tokenPayload = user.token;

        
        token.id = userPayload._id;
        token.backendToken = tokenPayload;
        token.name = `${userPayload.firstName || ''} ${userPayload.lastName || ''}`.trim();
        token.email = userPayload.email;
      }
      
     
      if (account && account.provider === "instagram") {
         try {
          await fetch(`${BACKEND_API_URL}/api/auth/instagram/connect`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.backendToken}`
            },
            body: JSON.stringify({ instagramAccessToken: account.access_token }),
          });
          token.isInstagramConnected = true; 
        } catch (error) {
          console.error("INSTAGRAM ACCOUNT LINKING FAILED:", error);
          token.error = "InstagramLinkError";
        }
      }
      
      return token;
    },
    
    
    async session({ session, token }) {
    
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.backendToken = token.backendToken;
        session.isInstagramConnected = token.isInstagramConnected;
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