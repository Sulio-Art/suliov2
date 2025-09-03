"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

// Import the new, reliable RTK Query hook for getting user data
import { useGetMeQuery } from "@/redux/Profile/profileApi";
import Sidebar from "../../Components/User/Sidebar";
import InstagramConnectionGate from "@/app/Components/auth/instagram/InstagramConnectionGate";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function UserLayout({ children }) {
  const { status: sessionStatus } = useSession();
  const pathname = usePathname();
  const token = useSelector(selectBackendToken);

  const [isConnecting, setIsConnecting] = useState(false);

  // Use the new hook to get real-time user data.
  // The query will automatically skip running until the auth token is available.
  const { data: meData, isLoading: isMeLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });
  
  // The definitive source of truth for the connection status now comes from our live API call.
  const isInstagramConnected = meData?.user?.isInstagramConnected || false;

  // The overall loading state now correctly waits for both the session and the fresh user data.
  const isLoading = sessionStatus === "loading" || (token && isMeLoading);

  // This UI logic is UNCHANGED, as requested.
  const isExemptPage =
    pathname.includes("/profile") || pathname.includes("/subscription");

  // This UI logic is UNCHANGED, as requested.
  const isLocked = !isInstagramConnected && !isExemptPage && !isLoading;

  const handleConnectToInstagram = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/auth/instagram/auth-url?state=connect`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not get Instagram auth URL");
      }
      window.location.href = data.authUrl;
    } catch (err) {
      toast.error(err.message || "Failed to start Instagram connection");
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* The Sidebar receives the up-to-date connection status */}
      <Sidebar isInstagramConnected={isInstagramConnected} />

      <main className="flex-1 overflow-y-auto relative">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* The blurring logic is UNCHANGED, as requested */}
            <div className={cn(isLocked && "blur-md pointer-events-none")}>
              {children}
            </div>

            {/* The gate logic is UNCHANGED, as requested */}
            {isLocked && (
              <InstagramConnectionGate
                onConnect={handleConnectToInstagram}
                isConnecting={isConnecting}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}