"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import InstagramConnectModal from "../../Components/auth/instagram/InstagramConnectModal";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ClientSideWrapper({ children }) {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const toastStatus = searchParams.get("status");
    if (toastStatus) {
      if (toastStatus === "instagram_connected") {
        toast.success("Account connected successfully!");
      } else if (
        toastStatus === "registration_complete" ||
        toastStatus === "login_success"
      ) {
        toast.success("Welcome! You are now logged in.");
      }

      router.replace(pathname, undefined, { shallow: true });
    }
  }, [searchParams, router, pathname]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (!session.isInstagramConnected) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <InstagramConnectModal open={isModalOpen} />
      {children}
    </>
  );
}
