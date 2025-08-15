"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaInstagram } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Input } from "../../ui/input";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Loader2, Mail, KeyRound, CheckCircle2 } from "lucide-react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Hero() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const handleInstagramAuth = async (state) => {
    setIsConnecting(true);
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auth/instagram/auth-url?state=${state}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not get Instagram auth URL.");
      }
      window.location.href = data.authUrl;
    } catch (err) {
      toast.error(err.message);
      setIsConnecting(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmailExists(false);
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || "Failed to send OTP.");
        error.status = response.status;
        throw error;
      }
      toast.success(data.message || "OTP sent successfully!");
      setShowOtpInput(true);
    } catch (err) {
      if (err.status === 409) {
        setEmailExists(true);
      } else {
        toast.error(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtpAndRegister = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auth/verify-hero-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "OTP verification failed.");

      if (data.registrationToken) {
        const params = new URLSearchParams({
          regToken: data.registrationToken,
          email: email,
        });
        router.push(`/auth/register?${params.toString()}`);
      } else {
        toast.error("Could not create registration session. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Invalid or expired OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!showOtpInput) {
      handleSendOtp();
    } else {
      handleVerifyOtpAndRegister();
    }
  };


  const renderGuestForm = () => (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4 p-6">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailExists(false);
            }}
            readOnly={showOtpInput}
            className="pl-12 pr-4 py-6 rounded-full bg-gray-100 placeholder:text-gray-500"
          />
          {emailExists && !showOtpInput && (
            <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 mt-2 text-blue-700 text-sm flex items-center gap-1">
              <span>🚩 You already have an account.</span>
              <Link
                href="/auth/login"
                className="font-semibold underline hover:text-blue-800"
              >
                Go to login
              </Link>
            </div>
          )}
        </div>
        {showOtpInput && (
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="pl-12 pr-4 py-6 rounded-full bg-gray-100 placeholder:text-gray-500"
            />
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-[#ff8c43] hover:bg-[#ff8c43]/90 text-white rounded-full py-4 h-auto text-base font-semibold"
          disabled={isSubmitting || (emailExists && !showOtpInput)}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {showOtpInput ? "VERIFY & CONTINUE" : "TRY FOR FREE"}
        </Button>
        <div className="flex items-center w-full !my-2">
          <hr className="w-full border-gray-200" />
          <span className="px-2 text-sm text-gray-400">Or</span>
          <hr className="w-full border-gray-200" />
        </div>
        <Button
          type="button"
          onClick={() => handleInstagramAuth("login")}
          disabled={isConnecting}
          className="w-full hover:scale-105 transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full py-4 h-auto text-base font-semibold flex gap-3 items-center justify-center"
        >
          {isConnecting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <FaInstagram size={22} />
          )}
          Login with Instagram
        </Button>
      </CardContent>
    </form>
  );

  const renderLoggedInView = () => (
    <CardContent className="space-y-4 text-center p-6">
      <h3 className="text-2xl font-bold">
        You're all set, {session.user?.name}!
      </h3>
      <p className="text-gray-600">Ready to continue creating?</p>
      <Link href={`/user/${session.user.id}/dashboard`}>
        <Button className="w-full bg-[#ff8c43] hover:bg-[#ff8c43]/90 text-white rounded-full py-4 h-auto text-base font-semibold">
          GO TO DASHBOARD
        </Button>
      </Link>
      {session.isInstagramConnected ? (
        <div className="flex items-center justify-center text-green-600 font-semibold pt-2">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Instagram Account Connected
        </div>
      ) : (
        <Button
          onClick={() => handleInstagramAuth("connect")}
          disabled={isConnecting}
          className="w-full hover:scale-105 transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full py-4 h-auto text-base font-semibold flex gap-3 items-center justify-center"
        >
          {isConnecting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaInstagram size={22} />
          )}
          Connect Your Instagram
        </Button>
      )}
    </CardContent>
  );

  const renderLoadingSkeleton = () => (
    <CardContent className="flex items-center justify-center h-[348px]">
      <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
    </CardContent>
  );

  return (
    <div className="min-h-screen md:px-2 snap-y snap-mandatory flex justify-center items-center">
      <div className="gap-16 flex flex-col lg:flex-row justify-around items-center w-full max-w-6xl">
        <div className="flex flex-col justify-start w-full lg:w-1/2">
          <div className="text-left px-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Artists Using AI Assistants Have Increased Engagement by 85%.
            </h1>
            <p className="py-3 text-md md:text-xl">
              Simplify your workflow, connect with buyers and focus on creating
              art.
            </p>
            <div className="relative w-full aspect-video">
              <Image
                src="/images/section1.gif"
                alt="AI Assistant demonstration"
                fill
                priority
                className="object-cover"
                quality={100}
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="max-w-xs md:max-w-sm w-full space-y-4">
          <Card className="bg-white text-black shrink-0 shadow-2xl rounded-3xl relative pt-12">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-center -rotate-3 w-max">
              <div className="bg-[#FBF2B3] px-4 py-2 rounded-xl shadow-md">
                <span className="text-xl md:text-2xl font-extrabold text-[#ff8c43] block">
                  {status === "authenticated" ? "WELCOME BACK!" : "SEE HOW AI"}
                </span>
                {status !== "authenticated" && (
                  <span className="text-xl md:text-2xl font-extrabold text-[#ff8c43] block">
                    CHATBOT WORKS
                  </span>
                )}
              </div>
            </div>
            {status === "loading" && renderLoadingSkeleton()}
            {status === "authenticated" && renderLoggedInView()}
            {status === "unauthenticated" && renderGuestForm()}
          </Card>
          <p className="leading-tight text-lg px-10 text-center">
            Start today and see upto 40% time-saving on client interations in
            the first month!
          </p>
        </div>
      </div>
    </div>
  );
}