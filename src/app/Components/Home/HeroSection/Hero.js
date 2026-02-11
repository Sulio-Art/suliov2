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
        `${BACKEND_API_URL}/api/auth/instagram/auth-url?state=${state}`,
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
        },
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
      <CardContent className="space-y-4 p-7">
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
            className="pl-11 pr-4 py-6 rounded-full bg-gray-50 border-2 border-gray-200 focus:border-orange-500 placeholder:text-gray-500 text-base"
          />
          {emailExists && !showOtpInput && (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg px-3 py-2 mt-2 text-blue-800 text-sm flex items-center gap-2">
              <span>🚩 Already have an account?</span>
              <Link
                href="/auth/login"
                className="font-bold underline hover:text-blue-900"
              >
                Login
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
              className="pl-11 pr-4 py-6 rounded-full bg-gray-50 border-2 border-gray-200 focus:border-orange-500 placeholder:text-gray-500 text-base"
            />
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full py-6 h-auto text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          disabled={isSubmitting || (emailExists && !showOtpInput)}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : null}
          {showOtpInput ? "VERIFY & CONTINUE" : "TRY FOR FREE"}
        </Button>
        <div className="flex items-center w-full !my-3">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-sm text-gray-500 font-medium">Or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <Button
          type="button"
          onClick={() => handleInstagramAuth("login")}
          disabled={isConnecting}
          className="w-full hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full py-6 h-auto text-base font-bold shadow-lg hover:shadow-xl flex gap-3 items-center justify-center"
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
    <CardContent className="space-y-5 text-center p-7">
      <div className="mb-2">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome Back, {session.user?.name}!
        </h3>
        <p className="text-gray-600 text-base">Ready to continue creating?</p>
      </div>
      <Link href={`/user/${session.user.id}/dashboard`}>
        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full py-6 h-auto text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
          GO TO DASHBOARD
        </Button>
      </Link>
      {session.isInstagramConnected ? (
        <div className="flex items-center justify-center text-green-600 font-bold pt-2 text-base">
          <CheckCircle2 className="h-6 w-6 mr-2" />
          Instagram Connected
        </div>
      ) : (
        <Button
          onClick={() => handleInstagramAuth("connect")}
          disabled={isConnecting}
          className="w-full hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full py-6 h-auto text-base font-bold shadow-lg hover:shadow-xl flex gap-3 items-center justify-center"
        >
          {isConnecting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <FaInstagram size={22} />
          )}
          Connect Instagram
        </Button>
      )}
    </CardContent>
  );

  const renderLoadingSkeleton = () => (
    <CardContent className="flex items-center justify-center h-[380px]">
      <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
    </CardContent>
  );

  return (
    <div className="bg-black text-white flex justify-center items-center py-10 md:py-12 min-h-[85vh]">
      <div className="gap-8 flex flex-col lg:flex-row justify-between items-center w-full max-w-7xl px-6">
        {/* LEFT SIDE - Text and Image */}
        <div className="flex flex-col justify-start w-full lg:w-[55%]">
          <div className="text-left space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white">
              Artists Using AI Assistants Have{" "}
              <span className="block text-orange-500">Increased</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                Engagement by 85%
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed pt-2">
              Simplify your workflow, connect with buyers and focus on creating
              art.
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mt-6">
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

        {/* RIGHT SIDE - Registration Form Card */}
        <div className="w-full lg:w-[40%] flex flex-col items-center">
          <Card className="bg-white text-black w-full max-w-md shadow-2xl rounded-3xl relative pt-14 border-2 border-gray-100">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-center -rotate-2 w-max z-10">
              <div className="bg-yellow-400 px-5 py-2.5 rounded-xl shadow-lg border-2 border-white">
                <span className="text-xl md:text-2xl font-black text-gray-900 block tracking-tight leading-tight">
                  {status === "authenticated" ? "WELCOME BACK!" : "SEE HOW AI"}
                </span>
                {status !== "authenticated" && (
                  <span className="text-xl md:text-2xl font-black text-gray-900 block tracking-tight leading-tight">
                    CHATBOT WORKS
                  </span>
                )}
              </div>
            </div>
            {status === "loading" && renderLoadingSkeleton()}
            {status === "authenticated" && renderLoggedInView()}
            {status === "unauthenticated" && renderGuestForm()}
          </Card>
          <p className="leading-snug text-base px-4 text-center font-bold text-white mt-4">
            Start today and see up to{" "}
            <span className="text-orange-500 font-black">40% time-saving</span>{" "}
            on client interactions in the first month!
          </p>
        </div>
      </div>
    </div>
  );
}
