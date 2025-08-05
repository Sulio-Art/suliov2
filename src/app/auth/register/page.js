"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const baseSchema = {
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("A valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
};

const registerSchema = z.object(baseSchema);
const instagramCompletionSchema = z.object(baseSchema);
const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [isInstagramFlow, setIsInstagramFlow] = useState(false);
  const [completionToken, setCompletionToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const formSchema = isInstagramFlow
    ? instagramCompletionSchema
    : registerSchema;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const {
    handleSubmit: handleOtpSubmit,
    control: otpControl,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("igCompletionToken");
    const prefillDataStr = sessionStorage.getItem("igPrefillData");

    if (token && prefillDataStr) {
      setIsInstagramFlow(true);
      setCompletionToken(token);

      const prefillData = JSON.parse(prefillDataStr);
      setValue("firstName", prefillData.firstName || "");
      setValue("lastName", prefillData.lastName || "");

      sessionStorage.removeItem("igCompletionToken");
      sessionStorage.removeItem("igPrefillData");
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (isInstagramFlow) {
      await handleCompleteInstagramRegistration(data);
    } else {
      await handleStandardRegistration(data);
    }
    setIsSubmitting(false);
  };

  const handleCompleteInstagramRegistration = async (data) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auth/instagram/complete-registration`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            completionToken: completionToken,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration completion failed.");
      }

      toast.success("Profile complete! Logging you in...");

      const loginResult = await signIn("credentials", {
        email: result.user.email,
        token: result.token,
        redirect: true,
        callbackUrl: "/dashboard",
      });

      if (loginResult?.error) {
        throw new Error(loginResult.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStandardRegistration = async (data) => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration failed.");
      }
      setRegisteredEmail(data.email);
      setShowOtpForm(true);
      toast.success(
        "Registration successful! An OTP has been sent to your email."
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onOtpSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registeredEmail, otp: data.otp }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "OTP verification failed.");
      }
      toast.success("Account verified! Please log in.");
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const RegistrationForm = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <Input id="firstName" {...field} />}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <Input id="lastName" {...field} />}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...field}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input id="phoneNumber" type="tel" {...field} />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input id="password" type="password" {...field} />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isInstagramFlow ? "Complete Registration" : "Create Account"}
      </Button>
    </form>
  );

  const OtpForm = (
    <form
      onSubmit={handleOtpSubmit(onOtpSubmit)}
      className="space-y-4"
      noValidate
    >
      <div>
        <Label htmlFor="otp">Verification Code</Label>
        <Controller
          name="otp"
          control={otpControl}
          render={({ field }) => (
            <Input id="otp" placeholder="Enter 6 digit code" {...field} />
          )}
        />
        {otpErrors.otp && (
          <p className="text-red-500 text-sm mt-1">{otpErrors.otp.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Verify Email
      </Button>
    </form>
  );

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">
              {showOtpForm
                ? "Verify Your Account"
                : isInstagramFlow
                  ? "Complete Your Profile"
                  : "Create an Account"}
            </h1>
            <p className="text-gray-600">
              {showOtpForm
                ? `We've sent a code to ${registeredEmail}`
                : isInstagramFlow
                  ? "Welcome! Please confirm your details and choose an email."
                  : "Get started with your new account"}
            </p>
          </div>

          {showOtpForm ? OtpForm : RegistrationForm}

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
    </>
  );
}