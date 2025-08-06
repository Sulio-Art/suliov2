"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Card } from "../../Components/ui/card";
import StandardRegistrationForm from "../../Components/auth/register/StandardRegistrationForm";
import InstagramRegistrationForm from "../../Components/auth/register/InstagramRegistrationForm";
import OtpForm from "../../Components/auth/register/OtpForm";

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
  const [formStep, setFormStep] = useState("DETAILS");
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [userExistsError, setUserExistsError] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    getValues,
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

  const {
    handleSubmit: handleStandardOtpSubmit,
    control: standardOtpControl,
    formState: { errors: standardOtpErrors },
  } = useForm({ resolver: zodResolver(otpSchema), defaultValues: { otp: "" } });

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

  const autoLogin = async (token, email, status) => {
    const loginResult = await signIn("credentials", {
      token,
      email,
      redirect: false,
    });
    if (loginResult?.error) {
      toast.error("Auto-login failed. Please log in manually.");
      router.push("/auth/login");
    } else {
      router.push(`/dashboard?status=${status}`);
    }
  };

  const handleCompleteInstagramRegistration = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auth/instagram/complete-registration`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, completionToken }),
        }
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Registration failed.");
      await autoLogin(result.token, data.email, "registration_complete");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStandardRegistration = async (data) => {
    setIsSubmitting(true);
    setUserExistsError(false);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, isEmailPreverified: false }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Registration failed.");
      setRegisteredEmail(data.email);
      setShowOtpForm(true);
      toast.success(
        "Registration successful! An OTP has been sent to your email."
      );
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

  const onStandardOtpSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registeredEmail, otp: data.otp }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "OTP verification failed.");
      await autoLogin(result.token, registeredEmail, "registration_complete");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendInstagramOtp = async () => {
    const email = getValues("email");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsOtpLoading(true);
    setUserExistsError(false);
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auth/instagram/send-email-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, completionToken }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      toast.success(data.message);
      setFormStep("OTP_VERIFICATION");
    } catch (err) {
      if (err.message.includes("already exists")) {
        setUserExistsError(true);
      } else {
        toast.error(err.message);
      }
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerifyInstagramOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }
    setIsOtpLoading(true);
    try {
      const email = getValues("email");
      const response = await fetch(
        `${BACKEND_API_URL}/api/auth/instagram/verify-email-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      toast.success(data.message);
      setFormStep("PASSWORD_SETUP");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsOtpLoading(false);
    }
  };

  const renderMainForm = () => {
    if (isInstagramFlow) {
      return (
        <form
          onSubmit={handleSubmit(handleCompleteInstagramRegistration)}
          className="space-y-4"
          noValidate
        >
          <InstagramRegistrationForm
            control={control}
            errors={errors}
            formStep={formStep}
            userExistsError={userExistsError}
            passwordValue={passwordValue}
            onSendOtp={handleSendInstagramOtp}
            onVerifyOtp={handleVerifyInstagramOtp}
            isOtpLoading={isOtpLoading}
            onOtpChange={(e) => setOtp(e.target.value)}
            otpValue={otp}
            isSubmitting={isSubmitting}
          />
        </form>
      );
    }
    if (showOtpForm) {
      return (
        <form
          onSubmit={handleStandardOtpSubmit(onStandardOtpSubmit)}
          className="space-y-4"
          noValidate
        >
          <OtpForm
            control={standardOtpControl}
            errors={standardOtpErrors}
            isSubmitting={isSubmitting}
          />
        </form>
      );
    }
    return (
      <form
        onSubmit={handleSubmit(handleStandardRegistration)}
        className="space-y-4"
        noValidate
      >
        <StandardRegistrationForm
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          userExistsError={userExistsError}
          passwordValue={passwordValue}
        />
      </form>
    );
  };

  return (
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
                ? "Your Instagram is connected! Just confirm your email and set a password to finish creating your account."
                : "Get started with your new account"}
          </p>
        </div>
        {renderMainForm()}
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