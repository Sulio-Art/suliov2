"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGetMySubscriptionQuery } from "@/redux/Subscription/subscriptionApi";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Palette,
  BookOpen,
  Bot,
  CreditCard,
  Layers,
  Calendar,
  User,
  Lock,
  Loader2,
} from "lucide-react";
import LogoutButton from "../Reuseable/LogoutButton";

export default function Sidebar({ isInstagramConnected }) {
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();
  const token = useSelector(selectBackendToken); 
  const userId = session?.user?.id;

  
  const {
    data: subscription,
    isLoading: isSubscriptionLoading,
  } = useGetMySubscriptionQuery(undefined, {
    skip: sessionStatus !== "authenticated" || !token,
  });

  const hasAccess = (featureKey) => {
    if (!subscription?.entitlements?.features) return false;
    return !!subscription.entitlements.features[featureKey];
  };

  const allItems = [
    {
      title: "Dashboard",
      icon: LayoutGrid,
      href: userId ? `/user/${userId}/dashboard` : "#",
    },
    {
      title: "Artwork Management",
      icon: Palette,
      href: userId ? `/user/${userId}/artwork-management` : "#",
    },
    {
      title: "Daily Diary",
      icon: BookOpen,
      href: userId ? `/user/${userId}/daily-diary` : "#",
    },
    {
      title: "AI Chatbot",
      icon: Bot,
      href: userId ? `/user/${userId}/ai-chatbot` : "#",
    },
    {
      title: "Transaction Management",
      icon: Layers,
      href: userId ? `/user/${userId}/transaction-management` : "#",
      feature: "transactionManagement",
    },
    {
      title: "Event Management",
      icon: Calendar,
      href: userId ? `/user/${userId}/event-management` : "#",
    },
    {
      title: "Subscription",
      icon: CreditCard,
      href: userId ? `/user/${userId}/subscription` : "#",
      isExempt: true,
    },
  ];

  const mainItems = allItems.filter(
    (item) => !item.feature || hasAccess(item.feature)
  );

  if (sessionStatus === "loading" || (token && isSubscriptionLoading)) {
    return (
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
      <div className="p-4 flex justify-center py-8">
        <Link href={userId ? `/user/${userId}/dashboard` : "#"}>
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        {mainItems.map((item) => {
          const isActive = item.href !== "#" && pathname.startsWith(item.href);
          const isLocked = !isInstagramConnected && !item.isExempt;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
                isLocked && "opacity-50 pointer-events-none"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-blue-700" : "text-gray-400"
                )}
              />
              <span>{item.title}</span>
              {isLocked && <Lock className="h-4 w-4 ml-auto text-gray-400" />}
            </Link>
          );
        })}

        <Link
          href={userId ? `/user/${userId}/profile` : "#"}
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
            pathname.includes("/profile")
              ? "bg-blue-50 text-blue-700"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          )}
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <User
              className={cn(
                "h-5 w-5",
                pathname.includes("/profile")
                  ? "text-blue-700"
                  : "text-gray-400"
              )}
            />
          )}
          <span>Profile</span>
        </Link>
      </nav>

      <div className="mt-auto p-4 border-t border-gray-100">
        <LogoutButton />
      </div>
    </div>
  );
}