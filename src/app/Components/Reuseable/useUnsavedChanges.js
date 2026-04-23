"use client";

import { useSelector, useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import {
  selectIsUnsavedChangesDialogOpen,
  closeUnsavedChangesDialog,
} from "@/redux/UI/uiSlice";

const CHAT_HISTORY_STORAGE_KEY = "sulioV2TestChatHistories";

export default function UnsavedChangesDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsUnsavedChangesDialogOpen);

  const handleProceed = async () => {
    try {
      localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Failed to proceed with logout after confirmation:", error);
    }
    dispatch(closeUnsavedChangesDialog());
  };

  const handleCancel = () => {
    dispatch(closeUnsavedChangesDialog());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all">
        <h2 className="text-xl font-bold text-gray-900">
          Are you sure you want to log out?
        </h2>
        <div className="mt-6 flex gap-3 justify-center">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
