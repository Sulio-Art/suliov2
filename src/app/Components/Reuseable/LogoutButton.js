"use client";

import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { selectIsFormDirty, openUnsavedChangesDialog } from "@/redux/UI/uiSlice";

const CHAT_HISTORY_STORAGE_KEY = 'sulioV2TestChatHistories';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const isFormDirty = useSelector(selectIsFormDirty);

  const handleLogout = async () => {
    if (isFormDirty) {
      dispatch(openUnsavedChangesDialog());
      return;
    }
    
    try {
      localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      <LogOut className="mr-3 h-5 w-5" />
      <span>Logout</span>
    </Button>
  );
}