"use client";

import { Button } from "../../ui/button";
import { FaInstagram } from "react-icons/fa";
import { Loader2 } from "lucide-react";


export default function ConnectInstagramButton({ onConnect, isConnecting }) {
  return (
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
  );
}