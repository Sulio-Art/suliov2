"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

function InstagramCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;

    const code = searchParams.get("code");
    const errorDescription = searchParams.get("error_description");

    if (errorDescription) {
      const friendlyError = errorDescription.replace(/\+/g, " ");
      setError(`Login failed: ${friendlyError}`);
      toast.error(friendlyError);
      setIsLoading(false);
      return;
    }

    if (code) {
      signIn("credentials", {
        code: code,
        isInstagramAuth: true,
        redirect: false,
      }).then((result) => {
        setIsLoading(false);
        if (result.ok && !result.error) {
          toast.success("Welcome back! Redirecting to your dashboard...");
          router.push("/dashboard");
          return;
        }

        if (result.error) {
          try {
            const errorResponse = JSON.parse(result.error);

            if (errorResponse.status === 201 && errorResponse.completionToken) {
              toast.success("Welcome! Let's complete your profile.");
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
            toast.error(errorResponse.message || "Could not log you in.");
          } catch (e) {
            setError(result.error);
            toast.error(result.error);
          }
        }
      });
    } else {
      setError("Authorization code not found. Please try again.");
      setIsLoading(false);
    }
  }, [searchParams, router, isLoading]);

  if (!isLoading && error) {
    return (
      <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md">
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
      <p className="text-xl text-gray-700">
        Finalizing connection, please wait...
      </p>
    </div>
  );
}

export default function InstagramCallbackClient() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin" />}>
          <InstagramCallbackHandler />
        </Suspense>
      </div>
    </>
  );
}
