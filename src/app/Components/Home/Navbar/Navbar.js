"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

export default function Navbar() {
  return (
    <div
      id="navbar"
      className="relative top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 bg-black text-white"
    >
      <div className="flex-1">
        <Link href="/">
          <Button
            className="hover:bg-transparent bg-black text-lg md:text-xl text-left h-auto text-white"
            style={{ lineHeight: "1.1rem" }}
          >
            <Image
              alt="Sulio Art Logo"
              src="/images/SulioCurator_logo.png"
              height={200}
              width={200}
              quality={100}
              priority
              className="h-full w-17 md:w-25 object-cover"
            />
          </Button>
        </Link>
      </div>

      <div>
        <Link
          href="/auth/login"
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium bg-[#ff8c43] hover:bg-[#ff8c43]/90"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
