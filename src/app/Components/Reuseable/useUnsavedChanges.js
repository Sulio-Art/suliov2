"use client";

import { useSelector, useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  selectIsUnsavedChangesDialogOpen,
  closeUnsavedChangesDialog,
} from "@/redux/UI/uiSlice";

const CHAT_HISTORY_STORAGE_KEY = 'sulioV2TestChatHistories';

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

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You have unsaved changes</DialogTitle>
          <DialogDescription>
            If you log out now, any changes you've made will be lost. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleProceed}>
            Log Out Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}