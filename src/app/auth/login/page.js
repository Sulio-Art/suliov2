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
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

function LoginComponent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
    });

    setIsSubmitting(false);
    if (result?.error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-600">Please sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
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
    </div>
  );
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
        <LoginComponent />
      </Suspense>
    </>
  );
}