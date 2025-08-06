"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

function InstagramCallbackHandler() {
  const { data: session, status, update } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(
    "Finalizing connection, please wait..."
  );
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (hasProcessed || status === "loading") return;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const errorDescription = searchParams.get("error_description");

    if (errorDescription) {
      setHasProcessed(true);
      const friendlyError = errorDescription.replace(/\+/g, " ");
      setError(`Login failed: ${friendlyError}`);
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
        setError(
          "You must be logged in to connect an account. Please log in and try again."
        );
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
          throw new Error(
            data.message || "Failed to connect Instagram account."
          );
        }

        await update({ isInstagramConnected: true });
        router.push("/dashboard?status=instagram_connected");
      } catch (err) {
        setError(err.message);
      }
    };

    const handleLoginFlow = () => {
      setHasProcessed(true);
      setMessage("Logging you in...");
      signIn("credentials", {
        code: code,
        isInstagramAuth: true,
        redirect: false,
      }).then((result) => {
        if (result.ok && !result.error) {
          router.push("/dashboard?status=login_success");
          return;
        }

        if (result.error) {
          try {
            const errorResponse = JSON.parse(result.error);
            if (errorResponse.status === 201 && errorResponse.completionToken) {
              sessionStorage.setItem(
                "igCompletionToken",
                errorResponse.completionToken
              );
              sessionStorage.setItem(
                "igPrefillData",
                JSON.stringify(errorResponse.prefill)
              );
              router.push("/auth/register");
              return;
            }
            setError(errorResponse.message || "An unknown error occurred.");
          } catch (e) {
            setError(result.error);
          }
        }
      });
    };

    if (state === "connect") {
      handleConnectFlow();
    } else if (state === "login") {
      handleLoginFlow();
    } else {
      setHasProcessed(true);
      setError(
        "Invalid or missing 'state' parameter. This action is not allowed."
      );
    }
  }, [status, searchParams, router, session, update, hasProcessed]);

  if (error) {
    return (
      <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md mx-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Failed
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
    <div className="flex items-center space-x-3">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-xl text-gray-700">{message}</p>
    </div>
  );
}

export default function InstagramCallbackClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin" />}>
        <InstagramCallbackHandler />
      </Suspense>
    </div>
  );
}