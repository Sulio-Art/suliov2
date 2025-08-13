"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function RefreshPage() {
  const router = useRouter();

  useEffect(() => {
    const refreshSession = async () => {
      console.log("[REFRESH_PAGE] Component mounted. Looking for refresh token...");
      const token = sessionStorage.getItem("s_refresh_token");

      if (token) {
        console.log("[REFRESH_PAGE] Token found. Removing it from storage and calling signIn().");
        sessionStorage.removeItem("s_refresh_token");

        // This signIn call is in a clean context and WILL trigger the authorize function.
        const result = await signIn("credentials", {
          token: token,
          redirect: false,
        });

        if (result?.error) {
          console.error("[REFRESH_PAGE] signIn failed:", result.error);
          // Fallback to login page on failure
          router.push("/auth/login");
        } else {
          console.log("[REFRESH_PAGE] signIn successful. Redirecting to home ('/') for middleware to handle.");
          // Redirect to home. Middleware will direct the user to their specific dashboard.
          router.push("/");
          router.refresh(); // Force a full page reload to ensure all components get the new session
        }
      } else {
        console.log("[REFRESH_PAGE] No refresh token found. Redirecting to home ('/').");
        // If someone lands here by accident, just send them home.
        router.push("/");
      }
    };

    refreshSession();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-lg text-gray-600">
          Finalizing your session...
        </p>
      </div>
    </div>
  );
}