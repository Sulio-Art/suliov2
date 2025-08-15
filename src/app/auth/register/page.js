"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Card } from "../../Components/ui/card";
import StandardRegistrationForm from "../../Components/auth/register/StandardRegistrationForm";
import { Loader2 } from "lucide-react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[\W_]/, "Must contain a special character");

const baseSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("A valid email is required"),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [flowType, setFlowType] = useState(null); 

  const [completionToken, setCompletionToken] = useState(null);

  const [registrationToken, setRegistrationToken] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userExistsError, setUserExistsError] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const passwordValue = watch("password");

  useEffect(() => {
    const regTokenFromUrl = searchParams.get("regToken");
    const emailFromUrl = searchParams.get("email");

    if (regTokenFromUrl && emailFromUrl) {
      setRegistrationToken(regTokenFromUrl);
      setValue("email", emailFromUrl);
      setFlowType("standard");
      return;
    }

    
    const igTokenFromStorage = sessionStorage.getItem("igCompletionToken");
    const igPrefillFromStorage = sessionStorage.getItem("igPrefillData");

    if (igTokenFromStorage) {
      setCompletionToken(igTokenFromStorage);
      if (igPrefillFromStorage) {
        const prefill = JSON.parse(igPrefillFromStorage);
        setValue("firstName", prefill.firstName || "");
        setValue("lastName", prefill.lastName || "");
      }
      setFlowType("instagram");
    } else {
      setFlowType("none");
    }
  }, [searchParams, setValue]);

  const autoLogin = async (backendToken) => {
    const result = await signIn("credentials", {
      token: backendToken,
      redirect: false,
    });
    if (result?.error) {
      toast.error("Auto-login failed. Please log in manually.");
      router.push("/auth/login");
    } else {
      window.location.href = "/";
    }
  };

  const handleFinalizeRegistration = async (data) => {
    setIsSubmitting(true);
    setUserExistsError(false);

    let apiUrl;
    let payload;

    if (flowType === "standard") {
      apiUrl = `${BACKEND_API_URL}/api/auth/register/finalize`;
      payload = { ...data, registrationToken };
    } else if (flowType === "instagram") {
      apiUrl = `${BACKEND_API_URL}/api/auth/instagram/complete-registration`;
      payload = { ...data, completionToken };
    } else {
      toast.error("Invalid registration flow.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration failed.");
      }

      if (flowType === "instagram") {
        sessionStorage.removeItem("igCompletionToken");
        sessionStorage.removeItem("igPrefillData");
      }

      toast.success(result.message || "Registration successful!");
      await autoLogin(result.token);
    } catch (err) {
      if (err.message.includes("already exists")) {
        setUserExistsError(true);
      } else {
        toast.error(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (flowType === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (flowType === "none") {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Invalid Registration Link</h1>
          <p>Please start the registration process from the homepage.</p>
          <Link href="/" className="text-blue-600 underline mt-4 inline-block">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-gray-600">
            {flowType === "instagram"
              ? "Your Instagram is connected! Just set a password to finish."
              : "Your email is verified! Just set your name and password."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleFinalizeRegistration)}
          className="space-y-4"
          noValidate
        >
          <StandardRegistrationForm
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            userExistsError={userExistsError}
            passwordValue={passwordValue}
            isEmailVerified={flowType === "standard"} 
          />
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}