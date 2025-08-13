"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent, // Using the standard DialogContent for simplicity
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose, // Import DialogClose for the X button
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { FaInstagram } from "react-icons/fa";
import { Loader2, X } from "lucide-react";

// The 'open' prop controls visibility, and 'onClose' is the function to call when the X is clicked.
export default function InstagramConnectModal({ open, onClose }) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    const instagramConnectUrl = new URL(
      "https://www.instagram.com/oauth/authorize"
    );

    // This logic remains the same
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/instagram/callback`;

    if (!clientId || !process.env.NEXT_PUBLIC_APP_URL) {
      console.error(
        "CRITICAL ERROR: Frontend environment variables for Instagram are not loaded."
      );
      alert("Configuration error. Please contact support.");
      setIsConnecting(false);
      return;
    }

    instagramConnectUrl.searchParams.set("client_id", clientId);
    instagramConnectUrl.searchParams.set("redirect_uri", redirectUri);
    instagramConnectUrl.searchParams.set("response_type", "code");
    instagramConnectUrl.searchParams.set("state", "connect");
    instagramConnectUrl.searchParams.set(
      "scope",
      "instagram_business_basic,instagram_business_content_publish"
    );

    window.location.href = instagramConnectUrl.toString();
  };

  // We use the onOpenChange handler to trigger our onClose function.
  // This ensures that clicking the "X" or pressing Escape calls our logic.
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()} // Prevent closing on outside click
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            One Last Step!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            To unlock your dashboard and AI features, please connect your
            Instagram professional account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full hover:scale-105 transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full py-4 h-auto text-base font-semibold flex gap-3 items-center justify-center"
          >
            {isConnecting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <FaInstagram size={22} />
            )}
            Connect with Instagram
          </Button>
        </DialogFooter>

        {/* --- THIS IS THE NEW CLOSE BUTTON --- */}
        {/* It's wrapped in DialogClose which handles the closing logic */}
        <DialogClose
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}