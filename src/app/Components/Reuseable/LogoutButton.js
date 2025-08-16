"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 disabled:opacity-50"
    >
      {isLoggingOut ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <LogOut className="h-5 w-5" />
      )}
      <span>{isLoggingOut ? "Logging Out..." : "Logout"}</span>
    </button>
  );
}