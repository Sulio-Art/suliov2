"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { ShieldAlert } from "lucide-react";

export default function SubscriptionGate({ children }) {
  const { data: session } = useSession();

  const isExpired = session?.subscriptionStatus === "expired";

  return (
    <>
      <AlertDialog open={isExpired}>
        <AlertDialogContent className="max-w-md text-center">
          <AlertDialogHeader>
            <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <ShieldAlert className="h-8 w-8 text-red-500" />
            </div>
            <AlertDialogTitle className="text-2xl">
              Your Trial Has Expired
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 pt-2">
              Please upgrade your plan to continue accessing all features of the
              application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Link href="/pricing" className="w-full">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
            >
              View Pricing Plans
            </Button>
          </Link>
        </AlertDialogContent>
      </AlertDialog>

      {!isExpired && children}
    </>
  );
}
