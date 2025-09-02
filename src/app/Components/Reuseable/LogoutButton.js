"use client";

import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { persistor } from "@/redux/store";
import { clearCredentials } from "@/redux/auth/authSlice";
import { Button } from "../ui/button"; // Assuming you have a Button component
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // 1. Clear the Redux state
      dispatch(clearCredentials());
      
      // 2. Purge the persisted state from storage
      await persistor.purge();
      
      // 3. Sign out of the NextAuth session and redirect
      await signOut({ callbackUrl: "/auth/login" });

    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;