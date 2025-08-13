"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

function InstagramCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast.error(`Instagram connection failed: ${error}`);
      router.push(`/user/${session?.user?.id}/profile` || "/");
      return;
    }

    if (code && session?.backendToken) {
      const connectAndRedirect = async () => {
        try {
          // Step 1: Call the backend to get the new, updated token
          const res = await fetch(`${BACKEND_API_URL}/api/instagram/connect`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.backendToken}`,
            },
            body: JSON.stringify({ code }),
          });

          const data = await res.json();
          if (!res.ok || !data.token) {
            throw new Error(
              data.message || "Failed to get new token from backend."
            );
          }

          // Step 2: Store the new token in sessionStorage for the refresh page
          console.log(
            "[CALLBACK_PAGE] Storing new token and redirecting to /auth/refresh"
          );
          sessionStorage.setItem("s_refresh_token", data.token);

          // Step 3: Redirect to the dedicated refresh page
          router.push("/auth/refresh");
        } catch (err) {
          toast.error(err.message);
          router.push(`/user/${session?.user?.id}/profile` || "/");
        }
      };

      connectAndRedirect();
    }
  }, [searchParams, router, session]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-lg text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
}

export default function InstagramCallbackPage() {
  return <InstagramCallbackClient />;
}
