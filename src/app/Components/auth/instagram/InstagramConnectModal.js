"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
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
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

export default function InstagramConnectModal({
  open,
  onClose,
  onConnect,
  isConnecting,
}) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <CustomDialogContent>
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
            onClick={onConnect} 
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