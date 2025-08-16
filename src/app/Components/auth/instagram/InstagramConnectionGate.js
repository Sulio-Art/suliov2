// frontend/src/Components/auth/instagram/InstagramConnectionGate.js
"use client";

import { Button } from "../../ui/button";
import { FaInstagram } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function InstagramConnectionGate({ onConnect, isConnecting }) {
  return (
    // This div creates the full-screen overlay within its parent container (<main>)
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all">
        <h2 className="text-2xl font-bold text-gray-900">One Last Step!</h2>
        <p className="mt-2 text-gray-600">
          To unlock your dashboard and AI features, please connect your
          Instagram professional account.
        </p>
        <div className="mt-6">
          <Button
            onClick={onConnect}
            disabled={isConnecting}
            // --- THIS IS THE KEY CHANGE ---
            // The classes below apply the official Instagram gradient and styling.
            className="w-full hover:scale-105 transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full py-4 h-auto text-base font-semibold flex gap-3 items-center justify-center"
          >
            {isConnecting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <FaInstagram size={22} />
            )}
            Connect with Instagram
          </Button>
        </div>
      </div>
    </div>
  );
}
