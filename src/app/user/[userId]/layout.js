"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Sidebar from "../../Components/User/Sidebar";
import InstagramConnectModal from "../../Components/auth/instagram/InstagramConnectModal";
import { FaInstagram } from "react-icons/fa";

// This is the new component for the overlay
function ConnectionRequiredOverlay({ onConnectClick }) {
  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-10">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Connect Your Account
        </h2>
        <p className="text-gray-600 mb-6">
          You must connect your Instagram professional account to access this
          feature.
        </p>
        <button
          onClick={onConnectClick}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold py-3 px-6 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FaInstagram size={22} />
          Connect with Instagram
        </button>
      </div>
    </div>
  );
}

export default function UserLayout({ children }) {
  const { data: session, status } = useSession();

  // We now need two pieces of state:
  // 1. Should the modal be forced open?
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 2. Has the user dismissed the modal at least once?
  const [modalDismissed, setModalDismissed] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      if (!session.isInstagramConnected) {
        // If not connected, we always want the modal logic to be active
        setIsModalOpen(true);
      } else {
        // If connected, turn everything off.
        setIsModalOpen(false);
        setModalDismissed(false);
      }
    }
  }, [session, status]);

  // Handler for closing the modal from the "X" button
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalDismissed(true);
  };

  // Handler for clicking the "Connect" button on the overlay
  const handleOverlayConnect = () => {
    setIsModalOpen(true);
    setModalDismissed(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        {" "}
        {/* Added 'relative' for positioning the overlay */}
        {status === "loading" ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : status === "authenticated" ? (
          <>
            {/* The actual page content is always rendered */}
            <div className="p-4 sm:p-6 lg:p-8 h-full">{children}</div>

            {/* The blur overlay is shown ONLY if not connected AND the user has dismissed the modal */}
            {modalDismissed && !session.isInstagramConnected && (
              <ConnectionRequiredOverlay
                onConnectClick={handleOverlayConnect}
              />
            )}

            {/* The modal is controlled separately */}
            <InstagramConnectModal
              open={isModalOpen}
              onClose={handleModalClose}
            />
          </>
        ) : null}
      </main>
    </div>
  );
}
