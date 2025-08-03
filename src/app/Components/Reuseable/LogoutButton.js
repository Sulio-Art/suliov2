"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { status } = useSession();
  const router = useRouter();
  
  const handleLogout = async () => {
   
    const data = await signOut({ redirect: false, callbackUrl: "/auth/login" });
    toast.success("Logged out successfully!");
   
    router.push(data.url);
  };

  if (status !== "authenticated") {
    return null; 
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="flex w-full justify-start items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 hover:text-red-600"
    >
      <LogOut className="h-5 w-5" />
      <span className="text-sm font-medium">Logout</span>
    </Button>
  );
}