"use client";

import { Button } from "../ui/button";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ConnectInstagramButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (session?.error === "InstagramLinkError") {
      toast.error("Failed to connect Instagram account. Please try again.");
     
    }
  }, [session]);

  const handleConnect = () => {
    setIsLoading(true);
    
    signIn("instagram");
  };

  
  if (status === "loading") {
    return <div className="h-10 mt-4" />; 
  }

 
  if (status !== "authenticated") {
    return null;
  }

  
  if (session.isInstagramConnected) {
    return (
      <p className="text-green-600 font-medium mt-4">
        ✓ Instagram Account Connected
      </p>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      size="lg"
      className="mt-4"
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Connect Your Instagram Account
    </Button>
  );
}
