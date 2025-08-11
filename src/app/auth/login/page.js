"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { Loader2, Eye, EyeOff } from "lucide-react";
import PasswordStrengthIndicator from "../../Components/auth/register/PasswordStrengthIndicator";
import OtpForm from "../../Components/auth/register/OtpForm";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[\W_]/, "Must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function LoginPageContent() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirm, setResetConfirm] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const {
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
    values: { newPassword: resetPassword, confirmPassword: resetConfirm },
    mode: "onChange",
  });

  const onLogin = async (data) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsSubmitting(false);
    if (result?.error) {
      toast.error("Login failed. Please check your credentials.");
    } else if (result?.ok) {
      router.push("/");
      router.refresh();
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");
    try {
      const res = await fetch(
        `${BACKEND_API_URL}/api/auth/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resetEmail }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("OTP sent! Check your email.");
      setOtpSent(true);
      setMode("reset-otp");
    } catch (err) {
      setResetError(err.message);
    }
    setResetLoading(false);
  };

  const onVerifyOtp = async (data) => {
    setResetLoading(true);
    setResetError("");
    setOtp(data.otp);
    try {
      setMode("reset-password");
      setOtpVerified(true);
      toast.success("OTP verified! Set your new password.");
    } catch (err) {
      setResetError(err.message);
    }
    setResetLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmail,
          otp,
          newPassword: resetPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Password reset successfully! You can now log in.");
      setMode("login");
      setOtpSent(false);
      setOtpVerified(false);
      setResetEmail("");
      setOtp("");
      setResetPassword("");
      setResetConfirm("");
    } catch (err) {
      setResetError(err.message);
    }
    setResetLoading(false);
  };

  if (mode === "login") {
    return (
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-600">Please sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((show) => !show)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                  in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="text-right mt-2">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
                onClick={() => setMode("reset-email")}
              >
                Forgot password?
              </button>
            </div>
          </form>
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (mode === "reset-email") {
    return (
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <p className="text-gray-600">Enter your email to receive an OTP</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="your@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            {resetError && (
              <p className="text-red-500 text-sm mt-1">{resetError}</p>
            )}
            <Button type="submit" className="w-full" disabled={resetLoading}>
              {resetLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {resetLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
                onClick={() => setMode("login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (mode === "reset-otp") {
    return (
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">Enter OTP</CardTitle>
          <p className="text-gray-600">Enter the code sent to your email</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOtpSubmit(onVerifyOtp)} className="space-y-4">
            <OtpForm
              control={otpControl}
              errors={otpErrors}
              isSubmitting={resetLoading}
            />
            {resetError && (
              <p className="text-red-500 text-sm mt-1">{resetError}</p>
            )}
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
                onClick={() => setMode("login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (mode === "reset-password") {
    return (
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
          <p className="text-gray-600">Create your new password</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showResetPassword ? "text" : "password"}
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  autoComplete="new-password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={
                    showResetPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowResetPassword((show) => !show)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showResetPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <PasswordStrengthIndicator password={resetPassword} />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showResetConfirm ? "text" : "password"}
                  value={resetConfirm}
                  onChange={(e) => setResetConfirm(e.target.value)}
                  autoComplete="new-password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={
                    showResetConfirm ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowResetConfirm((show) => !show)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showResetConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {resetConfirm && resetPassword !== resetConfirm && (
                <div className="text-red-500 text-sm mt-1">
                  Passwords do not match.
                </div>
              )}
            </div>
            {(resetErrors.newPassword || resetErrors.confirmPassword) && (
              <div className="text-red-500 text-sm mt-1">
                {resetErrors.newPassword?.message ||
                  resetErrors.confirmPassword?.message}
              </div>
            )}
            <Button
              disabled={
                resetLoading ||
                !resetPassword ||
                !resetConfirm ||
                resetPassword !== resetConfirm
              }
              type="submit"
              className="w-full"
            >
              {resetLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Reset Password
            </Button>
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
                onClick={() => setMode("login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default function LoginPage() {
  return (
    <>
      <Toaster position="top-center" />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        }
      >
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoginPageContent />
        </div>
      </Suspense>
    </>
  );
}