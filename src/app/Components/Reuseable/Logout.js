"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Using your shadcn/ui Button
import { LogOut } from "lucide-react"; // Optional: for a nice icon

export default function LogoutButton() {
  
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/", 
    });
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleSignOut}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}