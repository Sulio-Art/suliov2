"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    handleSubmit: handleRegisterSubmit,
    control: registerControl,
    formState: { errors: registerErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const {
    handleSubmit: handleOtpSubmit,
    control: otpControl,
    formState: { errors: otpErrors },
  } = useForm({ resolver: zodResolver(otpSchema), defaultValues: { otp: "" } });

  const onRegisterSubmit = async (data) => {
    setIsRegistering(true);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Registration failed.");
      setRegisteredEmail(data.email);
      setShowOtpForm(true);
      toast.success(
        "Registration successful! Please check your email for an OTP."
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsRegistering(false);
    }
  };

  const onOtpSubmit = async (data) => {
    setIsVerifying(true);
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
      toast.success("Account verified! Please log in to complete setup.");
      router.push("/auth/login?verified=true");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">
              {showOtpForm ? "Verify Your Account" : "Create an Account"}
            </h1>
            <p className="text-gray-600">
              {showOtpForm
                ? `We've sent a code to ${registeredEmail}`
                : "Get started with your new account"}
            </p>
          </div>
          {!showOtpForm ? (
            <form
              onSubmit={handleRegisterSubmit(onRegisterSubmit)}
              className="space-y-4"
              noValidate
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Controller
                    name="firstName"
                    control={registerControl}
                    render={({ field }) => (
                      <Input
                        id="firstName"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  {registerErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerErrors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Controller
                    name="lastName"
                    control={registerControl}
                    render={({ field }) => (
                      <Input
                        id="lastName"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  {registerErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerErrors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={registerControl}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {registerErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerErrors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Controller
                  name="password"
                  control={registerControl}
                  render={({ field }) => (
                    <Input
                      id="password"
                      type="password"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {registerErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerErrors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isRegistering}>
                {isRegistering && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                {isRegistering ? "Creating..." : "Create Account"}
              </Button>
            </form>
          ) : (
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
                    <Input
                      id="otp"
                      placeholder="Enter 6 digit code"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {otpErrors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {otpErrors.otp.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
          )}
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
