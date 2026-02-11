"use client";

import Link from "next/link";
import React from "react";
import { Mail, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden flex flex-col items-center">
      {/* Top Image - Enhanced positioning */}
      <div className="absolute top-0 right-0 w-full sm:w-2/3 md:w-1/2 opacity-90">
        <Image
          src="/images/FinalCallToAction1.gif"
          alt="Decorative top"
          width={800}
          height={600}
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Bottom Image - Enhanced positioning */}
      <div className="absolute bottom-0 left-0 w-full sm:w-2/3 md:w-1/2 opacity-90">
        <Image
          src="/images/FinalCallToAction2.gif"
          alt="Decorative bottom"
          width={800}
          height={600}
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col justify-center items-center pt-32 md:pt-24 px-6 md:px-8 lg:px-16">
        {/* Hero Card - Enhanced */}
        <Card className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl text-white text-center mb-12 w-full border-4 border-gray-800 shadow-2xl">
          <CardContent className="p-8 lg:p-12 space-y-8">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-tight">
              The all-in-one solution for artists to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                elevate their business
              </span>{" "}
              with AI
            </h1>
            <p className="text-gray-200 text-lg lg:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Sulio AI Chatbot Assistant helps artists automate client
              interactions, manage sales, and enhance their engagement—giving
              you more time to create. Seamlessly integrate AI into your
              workflow and experience the freedom to focus on what matters most:
              your art.
            </p>

            <div className="pt-4">
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black px-12 py-7 rounded-full text-lg lg:text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Try for Free
                </Button>
              </Link>
            </div>

            <p className="text-base text-gray-400 font-medium">
              ✨ Start your free 30-day trial today • No credit card required
            </p>
          </CardContent>
        </Card>

        {/* Mobile Footer */}
        <footer className="flex flex-col items-center gap-8 w-full md:hidden pb-8">
          {/* Navigation Links */}
          <nav className="px-4 flex flex-wrap justify-center items-center text-sm text-center text-gray-700 font-bold gap-4">
            <a href="#" className="hover:text-orange-600 transition-colors">
              Contact Us
            </a>
            <Link
              href="/privacy-policy"
              className="hover:text-orange-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-orange-600 transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-orange-600 transition-colors"
            >
              Cookie Policy
            </Link>
          </nav>

          <div className="px-5 flex justify-center items-center w-full">
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-60 -52 120 104"
            >
              <polygon
                points="50,0 25,43.3 -25,43.3 -50,0 -25,-43.3 25,-43.3"
                fill="#f97316"
              />
            </svg>
            <Separator className="h-[0.15rem] bg-orange-500" />
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-60 -52 120 104"
            >
              <polygon
                points="50,0 25,43.3 -25,43.3 -50,0 -25,-43.3 25,-43.3"
                fill="#f97316"
              />
            </svg>
          </div>

          {/* Logo and Brand */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Sulio Art Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <div className="text-left">
                <span className="font-black text-gray-900 text-lg block">
                  Sulio Art
                </span>
                <span className="text-gray-600 text-sm font-semibold">
                  Artist AI Chatbot
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
            >
              <a href="#">
                <Instagram className="w-6 h-6 text-gray-700 hover:text-orange-600" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
            >
              <a href="#">
                <Facebook className="w-6 h-6 text-gray-700 hover:text-orange-600" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
            >
              <a href="#">
                <Mail className="w-6 h-6 text-gray-700 hover:text-orange-600" />
              </a>
            </Button>
          </div>

          {/* Copyright */}
          <div className="mb-20 text-xs text-gray-600 px-8 text-center leading-relaxed font-medium">
            <p className="mb-2">
              © 2024 All Rights Reserved. Sulio Art Trademarks, product names,
              logos and other marks and designs are trademarks of Sulio Art Co.,
              Ltd or its subsidiaries and may be used without permission.
            </p>
            <p className="font-bold text-gray-900">service@sulio-art.com</p>
          </div>
        </footer>

        {/* Desktop Footer */}
        <footer className="flex-col items-center gap-8 w-full hidden md:flex mt-12 py-8 relative">
          <div className="flex gap-8 justify-between items-center w-full px-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4 font-bold text-xl">
              <Image
                alt="Sulio Art Logo"
                src="/images/logo.png"
                height={100}
                width={100}
                quality={100}
                priority
                className="h-full w-16 md:w-20 object-cover"
              />
              <span className="font-black text-gray-900 text-left leading-tight">
                Sulio Art
                <br />
                <span className="text-gray-600 text-base font-semibold">
                  Artist AI Chatbot
                </span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 text-gray-700">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
              >
                <a href="#">
                  <Instagram className="w-6 h-6 hover:text-orange-600" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
              >
                <a href="#">
                  <Facebook className="w-6 h-6 hover:text-orange-600" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
              >
                <a href="#">
                  <Mail className="w-6 h-6 hover:text-orange-600" />
                </a>
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center justify-center text-sm text-gray-700 font-bold gap-2">
              <a href="#" className="hover:text-orange-600 transition-colors">
                Contact Us
              </a>
              {" • "}
              <Link
                href="/privacy-policy"
                className="hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </Link>
              {" • "}
              <Link
                href="/terms"
                className="hover:text-orange-600 transition-colors"
              >
                Terms and Conditions
              </Link>
              {" • "}
              <Link
                href="/cookie-policy"
                className="hover:text-orange-600 transition-colors"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

          <div className="flex justify-end items-center w-full px-6 relative">
            <Separator className="h-[0.15rem] bg-orange-500" />
            <svg
              className="h-3 w-3 absolute left-6 top-1/2 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-60 -52 120 104"
            >
              <polygon
                points="50,0 25,43.3 -25,43.3 -50,0 -25,-43.3 25,-43.3"
                fill="#f97316"
              />
            </svg>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 text-center px-4 font-medium leading-relaxed">
            <p className="mb-2">
              © 2024 All Rights Reserved. Sulio Art Trademarks, product names,
              logos and other marks and designs are trademarks of Sulio Art Co.,
              Ltd or its subsidiaries and may be used without permission.
            </p>
            <p className="font-bold text-gray-900">service@sulio-art.com</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
