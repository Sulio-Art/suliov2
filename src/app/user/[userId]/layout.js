"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

import { useInstagramConnection } from "@/hooks/useInstagramConnection";
import Sidebar from "../../Components/User/Sidebar";
import InstagramConnectionGate from "@/app/Components/auth/instagram/InstagramConnectionGate"; // <-- IMPORT THE NEW GATE

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function UserLayout({ children }) {
  const { status: sessionStatus } = useSession();
  const pathname = usePathname();

  const { isConnected: isInstagramConnected, loading: isConnectionLoading } =
    useInstagramConnection();

  const [isConnecting, setIsConnecting] = useState(false);

  const isLoading = sessionStatus === "loading" || isConnectionLoading;

  // --- MODIFICATION START ---
  // Define which pages are EXEMPT from the Instagram connection lock.
  const isExemptPage =
    pathname.includes("/profile") || pathname.includes("/subscription");

  // Determine if the UI should be in the "locked" state.
  const isLocked = !isInstagramConnected && !isExemptPage && !isLoading;
  // --- MODIFICATION END ---

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
      {/* The Sidebar is a direct child of the flex container, so it will not be blurred. */}
      <Sidebar isInstagramConnected={isInstagramConnected} />

      {/* The <main> tag will contain the page content and our new gate */}
      <main className="flex-1 overflow-y-auto relative">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* This div wraps the actual page content. It gets blurred and disabled when locked. */}
            <div className={cn(isLocked && "blur-md pointer-events-none")}>
              {children}
            </div>

            {/* If the UI is locked, render the Gate component ON TOP of the blurred content. */}
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

//TODO need to get original ui of hero page
