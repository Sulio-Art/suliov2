"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa";
import { Input } from "../../ui/input";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import ConnectInstagramButton from "../../auth/ConnectInstagramButton";

export default function Hero() {
  const router = useRouter();

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    router.push("/auth/register");
  };

  const instagramAuthUrl = new URL("https://www.instagram.com/oauth/authorize");
  instagramAuthUrl.searchParams.set(
    "client_id",
    process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID
  );
  instagramAuthUrl.searchParams.set(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_APP_URL}/auth/instagram/callback`
  );
  instagramAuthUrl.searchParams.set("response_type", "code");
  instagramAuthUrl.searchParams.set(
    "scope",
    "instagram_business_basic,instagram_business_content_publish"
  );

  return (
    <div className="min-h-screen md:px-2 snap-y snap-mandatory flex justify-evenly items-start">
      <div className="gap-16 flex flex-col lg:flex-row justify-around items-center">
        <div className="flex flex-col justify-start">
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
              />
            </div>
          </div>
        </div>
        <div className="max-w-72 md:max-w-sm space-y-2">
          <Card className="bg-white text-black max-w-72 md:max-w-sm shrink-0 shadow-2xl rounded-3xl">
            <div className="text-center -rotate-3 text-lg md:text-3xl font-extrabold flex flex-col justify-center items-center -translate-y-4 text-[#ff8c43]">
              <span className="rounded-xl px-2 py-1 w-fit bg-[#FBF2B3] font-extrabold">
                {"SEE HOW AI"}
              </span>
              <span className="rounded-xl px-2 py-1 w-fit bg-[#FBF2B3] font-extrabold">
                CHATBOT WORKS
              </span>
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <CardContent className="space-y-4">
                <div className="flex flex-row justify-center items-center gap-2">
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="First Name"
                      className="pl-10 pr-4 py-6 rounded-3xl bg-gray-100"
                    />
                  </div>
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="Last Name"
                      className="pl-10 pr-4 py-6 rounded-3xl bg-gray-100"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10 pr-4 py-6 rounded-3xl bg-gray-100 w-full"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="pl-10 pr-4 py-6 rounded-3xl bg-gray-100 w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#ff8c43] hover:bg-[#ff8c43]/90 text-white rounded-3xl py-4 h-auto text-sm md:text-lg lg:text-xl font-semibold"
                >
                  TRY FOR FREE
                </Button>
                <div className="flex flex-nowrap items-center w-full">
                  <hr className="w-full" />
                  <span className="p-1">Or</span>
                  <hr className="w-full" />
                </div>
                <Link
                  href={instagramAuthUrl.toString()}
                  className="w-full hover:scale-105 transition-all duration-300 ease-in-out bg-gradient-to-r flex gap-4 items-center justify-center from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-3xl py-4 h-auto text-sm md:text-lg lg:text-xl font-semibold"
                >
                  <FaInstagram className="" size="30" />
                  Login with Instagram
                </Link>
              </CardContent>
            </form>
          </Card>
          <ConnectInstagramButton />
          <p className="leading-tight text-lg px-10 text-center">
            Start today and see upto 40% time-saving on client interations in
            the first month!
          </p>
        </div>
      </div>
    </div>
  );
}