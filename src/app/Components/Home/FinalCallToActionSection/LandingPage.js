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
      {/* Top Image - Enhanced positioning with better mobile responsiveness */}
      <div className="absolute top-0 right-0 w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 opacity-80 md:opacity-90">
        <Image
          src="/images/FinalCallToAction1.gif"
          alt="Decorative top"
          width={800}
          height={600}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Bottom Image - Enhanced positioning with better mobile responsiveness */}
      <div className="absolute bottom-0 left-0 w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 opacity-80 md:opacity-90">
        <Image
          src="/images/FinalCallToAction2.gif"
          alt="Decorative bottom"
          width={800}
          height={600}
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Main Content Container - Improved responsive padding and spacing */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col justify-center items-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Hero Card - Enhanced with better mobile spacing */}
        <Card className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl sm:rounded-3xl text-white text-center mb-8 sm:mb-10 md:mb-12 w-full border-2 sm:border-4 border-gray-800 shadow-2xl">
          <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12 space-y-5 sm:space-y-6 md:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              The all-in-one solution for artists to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                elevate their business
              </span>{" "}
              with AI
            </h1>
            <p className="text-gray-200 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto px-2">
              Sulio AI Chatbot Assistant helps artists automate client
              interactions, manage sales, and enhance their engagement—giving
              you more time to create. Seamlessly integrate AI into your
              workflow and experience the freedom to focus on what matters most:
              your art.
            </p>

            <div className="pt-2 sm:pt-4">
              <Link href="#navbar">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 rounded-full text-base sm:text-lg md:text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-auto">
                  Try for Free
                </Button>
              </Link>
            </div>

            <p className="text-sm sm:text-base text-gray-400 font-medium px-2">
              ✨ Start your free 30-day trial today • No credit card required
            </p>
          </CardContent>
        </Card>

        {/* Mobile & Tablet Footer - Improved spacing and touch targets */}
        <footer className="flex flex-col items-center gap-6 sm:gap-8 w-full md:hidden pb-6 sm:pb-8">
          {/* Navigation Links - Better mobile wrapping */}
          <nav className="px-4 flex flex-wrap justify-center items-center text-xs sm:text-sm text-center text-gray-700 font-bold gap-3 sm:gap-4 max-w-md">
            <a
              href="#"
              className="hover:text-orange-600 transition-colors py-1"
            >
              Contact Us
            </a>
            <Link
              href="/privacy-policy"
              className="hover:text-orange-600 transition-colors py-1"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-orange-600 transition-colors py-1"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-orange-600 transition-colors py-1"
            >
              Cookie Policy
            </Link>
          </nav>

          <div className="px-5 flex justify-center items-center w-full max-w-sm">
            <svg
              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
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
              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-60 -52 120 104"
            >
              <polygon
                points="50,0 25,43.3 -25,43.3 -50,0 -25,-43.3 25,-43.3"
                fill="#f97316"
              />
            </svg>
          </div>

          {/* Logo and Brand - Better mobile sizing */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Sulio Art Logo"
                width={50}
                height={50}
                className="object-contain w-12 h-12 sm:w-14 sm:h-14"
              />
              <div className="text-left">
                <span className="font-black text-gray-900 text-base sm:text-lg block">
                  Sulio Art
                </span>
                <span className="text-gray-600 text-xs sm:text-sm font-semibold">
                  Artist AI Chatbot
                </span>
              </div>
            </div>
          </div>

          {/* Social Links - Better touch targets for mobile */}
          <div className="flex gap-5 sm:gap-6">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full h-12 w-12 sm:h-auto sm:w-auto"
            >
              <a href="#" aria-label="Instagram">
                <Instagram className="w-6 h-6 text-gray-700 hover:text-orange-600" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full h-12 w-12 sm:h-auto sm:w-auto"
            >
              <a href="#" aria-label="Facebook">
                <Facebook className="w-6 h-6 text-gray-700 hover:text-orange-600" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full h-12 w-12 sm:h-auto sm:w-auto"
            >
              <a href="#" aria-label="Email">
                <Mail className="w-6 h-6 text-gray-700 hover:text-orange-600" />
              </a>
            </Button>
          </div>

          {/* Copyright - Better mobile text sizing */}
          <div className="mb-16 sm:mb-20 text-xs text-gray-600 px-6 sm:px-8 text-center leading-relaxed font-medium max-w-lg">
            <p className="mb-2">
              © 2024 All Rights Reserved. Sulio Art Trademarks, product names,
              logos and other marks and designs are trademarks of Sulio Art Co.,
              Ltd or its subsidiaries and may be used without permission.
            </p>
            <p className="font-bold text-gray-900 text-xs sm:text-sm">
              service@sulio-art.com
            </p>
          </div>
        </footer>

        {/* Desktop Footer - Tablet responsive improvements */}
        <footer className="flex-col items-center gap-6 sm:gap-8 w-full hidden md:flex mt-8 lg:mt-12 py-6 lg:py-8 relative">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between items-center w-full px-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 lg:gap-4 font-bold text-lg lg:text-xl">
              <Image
                alt="Sulio Art Logo"
                src="/images/logo.png"
                height={100}
                width={100}
                quality={100}
                priority
                className="h-full w-14 md:w-16 lg:w-20 object-cover"
              />
              <span className="font-black text-gray-900 text-left leading-tight">
                Sulio Art
                <br />
                <span className="text-gray-600 text-sm lg:text-base font-semibold">
                  Artist AI Chatbot
                </span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 lg:gap-4 text-gray-700">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
              >
                <a href="#" aria-label="Instagram">
                  <Instagram className="w-6 h-6 hover:text-orange-600" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
              >
                <a href="#" aria-label="Facebook">
                  <Facebook className="w-6 h-6 hover:text-orange-600" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform hover:bg-orange-100 rounded-full"
              >
                <a href="#" aria-label="Email">
                  <Mail className="w-6 h-6 hover:text-orange-600" />
                </a>
              </Button>
            </div>

            {/* Navigation Links - Better tablet wrapping */}
            <nav className="flex flex-wrap items-center justify-center text-xs lg:text-sm text-gray-700 font-bold gap-2 max-w-xl text-center">
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
              className="h-2.5 w-2.5 lg:h-3 lg:w-3 absolute left-6 top-1/2 transform -translate-y-1/2"
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
          <div className="text-xs lg:text-sm text-gray-600 text-center px-4 font-medium leading-relaxed max-w-3xl">
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
