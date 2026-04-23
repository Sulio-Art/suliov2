"use client";

import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { openUnsavedChangesDialog } from "@/redux/UI/uiSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(openUnsavedChangesDialog());
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