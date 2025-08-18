"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";

// --- RTK AND REDUX IMPORTS ---
import {
  useFinalizeRegistrationMutation,
  useCompleteInstagramRegistrationMutation,
} from "@/redux/auth/authApi";
import { setCredentials } from "@/redux/auth/authSlice";

// --- UI COMPONENT IMPORTS (Unchanged) ---
import { Card } from "../../Components/ui/card";
import StandardRegistrationForm from "../../Components/auth/register/StandardRegistrationForm";
import { Loader2 } from "lucide-react";

// --- SCHEMA (Unchanged) ---
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
  const dispatch = useDispatch();

  const [flowType, setFlowType] = useState(null);
  const [completionToken, setCompletionToken] = useState(null);
  const [registrationToken, setRegistrationToken] = useState(null);
  const [userExistsError, setUserExistsError] = useState(false);

  const [finalizeRegistration, { isLoading: isFinalizingStandard }] =
    useFinalizeRegistrationMutation();
  const [completeInstagramRegistration, { isLoading: isFinalizingInstagram }] =
    useCompleteInstagramRegistrationMutation();

  const isSubmitting = isFinalizingStandard || isFinalizingInstagram;

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

  const autoLogin = async (backendToken, userData) => {
    dispatch(setCredentials({ user: userData, backendToken }));

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

  const handleFinalizeRegistration = async (formData) => {
    setUserExistsError(false);
    let registrationPromise;

    if (flowType === "standard") {
      const payload = { ...formData, registrationToken };
      registrationPromise = finalizeRegistration(payload).unwrap();
    } else if (flowType === "instagram") {
      const payload = { ...formData, completionToken };
      registrationPromise = completeInstagramRegistration(payload).unwrap();
    } else {
      toast.error("Invalid registration flow.");
      return;
    }

    try {
      const result = await registrationPromise;

      if (flowType === "instagram") {
        sessionStorage.removeItem("igCompletionToken");
        sessionStorage.removeItem("igPrefillData");
      }

      toast.success(result.message || "Registration successful!");

      await autoLogin(result.token, result.user);
    } catch (err) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred.";
      if (errorMessage.includes("already exists")) {
        setUserExistsError(true);
      } else {
        toast.error(errorMessage);
      }
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