"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { FaInstagram } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { cn } from "../../../../lib/utils";

const CustomDialogContent = ({ className, children, ...props }) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
);

export default function InstagramConnectModal({ open }) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    const instagramConnectUrl = new URL(
      "https://www.instagram.com/oauth/authorize"
    );

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

  return (
    <Dialog open={open}>
      <CustomDialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
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
      </CustomDialogContent>
    </Dialog>
  );
}
