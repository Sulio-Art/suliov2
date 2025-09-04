"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetOtpMutation,
  useResetPasswordMutation,
} from "@/redux/auth/authApi";
import { setCredentials } from "@/redux/auth/authSlice";
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
  const dispatch = useDispatch();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState("");

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [requestOtp, { isLoading: isRequestingOtp }] =
    useRequestPasswordResetMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] =
    useVerifyPasswordResetOtpMutation();
  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetPasswordMutation();

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
    control: resetControl,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    watch: watchReset,
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "onChange",
  });
  const newPasswordValue = watchReset("newPassword");

const onLogin = async (data) => {
    try {
      const userData = await login(data).unwrap();
      dispatch(
        setCredentials({ user: userData.user, backendToken: userData.backendToken })
      );

      const result = await signIn("credentials", {
        data: JSON.stringify(userData),
        redirect: false,
      });

      if (result?.error) {
        toast.error("Session could not be created. Please try again.");
      } else if (result?.ok) {
       
        const user = userData.user;

        const targetUrl = user.role === "admin" 
          ? "/admin" 
          : `/user/${user._id}/dashboard`;

        router.push(targetUrl);
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await requestOtp({ email: resetEmail }).unwrap();
      toast.success("OTP sent! Check your email.");
      setMode("reset-otp");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send OTP.");
    }
  };

  const onVerifyOtp = async (data) => {
    try {
      await verifyOtp({ email: resetEmail, otp: data.otp }).unwrap();
      setVerifiedOtp(data.otp);
      setMode("reset-password");
      toast.success("OTP verified! You can now set your new password.");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid or expired OTP.");
    }
  };

  const onResetPassword = async (data) => {
    try {
      await resetPassword({
        email: resetEmail,
        otp: verifiedOtp,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password reset successfully! You can now log in.");
      setMode("login");
      setResetEmail("");
      setVerifiedOtp("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password.");
    }
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
            <Button type="submit" className="w-full" disabled={isLoginLoading}>
              {isLoginLoading ? (
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
              Don't have an account?
              <Link href="/" className="text-blue-600 hover:text-blue-800">
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
            <Button type="submit" className="w-full" disabled={isRequestingOtp}>
              {isRequestingOtp && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isRequestingOtp ? "Sending OTP..." : "Send OTP"}
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
              isSubmitting={isVerifyingOtp}
            />
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
          <form
            onSubmit={handleResetSubmit(onResetPassword)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Controller
                name="newPassword"
                control={resetControl}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showResetPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowResetPassword((s) => !s)}
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      {showResetPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                )}
              />
              <PasswordStrengthIndicator password={newPasswordValue} />
              {resetErrors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {resetErrors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Controller
                name="confirmPassword"
                control={resetControl}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showResetConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowResetConfirm((s) => !s)}
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      {showResetConfirm ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                )}
              />
              {resetErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {resetErrors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              disabled={isResettingPassword}
              type="submit"
              className="w-full"
            >
              {isResettingPassword && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Reset Password
            </Button>
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