"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, createContext, useContext } from "react";
import { Loader2 } from "lucide-react";
import Sidebar from "../../Components/User/Sidebar";
import { useInstagramConnection } from "@/hooks/useInstagramConnection";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "react-hot-toast";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const ProtectionContext = createContext(null);

export const useProtection = () => {
  const context = useContext(ProtectionContext);
  if (!context) {
    throw new Error("useProtection must be used within a ProtectionProvider");
  }
  return context;
};

export default function UserLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const { isConnected: isInstagramConnected, loading: isConnectionLoading } =
    useInstagramConnection();
  const { entitlements, isLoading: isSubscriptionLoading } = useSubscription();

  const [isConnecting, setIsConnecting] = useState(false);

  const isLoading =
    status === "loading" || isConnectionLoading || isSubscriptionLoading;

  let lockReason = null;
  if (!isLoading) {
    if (!isInstagramConnected) {
      lockReason = "instagram";
    }
  }

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

  const protectionContextValue = {
    isLoading,
    lockReason,
    pathname,
    handleConnectToInstagram,
    isConnecting,
  };

  return (
    <ProtectionContext.Provider value={protectionContextValue}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isInstagramConnected={isInstagramConnected} />
        <main className="flex-1 overflow-y-auto relative">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </ProtectionContext.Provider>
  );
}