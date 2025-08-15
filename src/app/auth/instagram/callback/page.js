"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

function InstagramCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status, update } = useSession(); 

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("Processing authentication...");
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (hasProcessed || status === "loading") {
      return;
    }

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const errorDescription = searchParams.get("error_description");

    if (errorDescription) {
      setHasProcessed(true);
      setError(`Connection failed: ${errorDescription.replace(/\+/g, " ")}`);
      return;
    }

    if (!code) {
      setHasProcessed(true);
      setError("Authorization code not found. Please try again.");
      return;
    }

    const handleConnectFlow = async () => {
      setHasProcessed(true);
      if (status !== "authenticated") {
        setError("You must be logged in to connect an account.");
        return;
      }
      setMessage("Connecting your account...");
      try {
        const response = await fetch(
          `${BACKEND_API_URL}/api/auth/instagram/connect`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.backendToken}`,
            },
            body: JSON.stringify({ code }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to connect account.");
        }

        
        await update();

        toast.success("Instagram connected successfully!");
        router.push(`/user/${session.user.id}/dashboard`);
      } catch (err) {
        console.error("Error in handleConnectFlow:", err);
        setError(err.message);
      }
    };

    const handleLoginFlow = async () => {
      setHasProcessed(true);
      setMessage("Finalizing login...");
      try {
        const response = await fetch(
          `${BACKEND_API_URL}/api/auth/instagram/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        if (response.status === 200 && data.token) {
          await signIn("credentials", { token: data.token, redirect: false });
          router.push("/");
          router.refresh();
        } else if (response.status === 201 && data.completionToken) {
          sessionStorage.setItem("igCompletionToken", data.completionToken);
          sessionStorage.setItem("igPrefillData", JSON.stringify(data.prefill));
          router.push("/auth/register");
        } else {
          throw new Error(
            "An unexpected response was received from the server."
          );
        }
      } catch (err) {
        console.error("[Callback Page] Error in handleLoginFlow:", err);
        setError(err.message);
      }
    };

    if (state === "connect") {
      if (status === "authenticated") handleConnectFlow();
    } else if (state === "login") {
      handleLoginFlow();
    } else {
      setHasProcessed(true);
      setError("Invalid or missing 'state' parameter.");
    }
  }, [status, searchParams, router, session, hasProcessed, update]);

  if (error) {
    return (
      <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md mx-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Connection Failed
        </h1>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-xl text-gray-700 mt-4">{message}</p>
    </div>
  );
}

export default function InstagramCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      }
    >
      <InstagramCallbackHandler />
    </Suspense>
  );
}