"use client";

import { useState, useEffect } from "react";
import { useProtection } from "../../user/[userId]/layout";
import InstagramConnectModal from "../auth/instagram/InstagramConnectModal";
import UpgradePlanPrompt from "./UpgradePlanprompt";

export default function ClientSideWrapper({ children }) {
  const { lockReason, pathname, handleConnectToInstagram, isConnecting } =
    useProtection();

  const isExempt =
    pathname.includes("/subscription") || pathname.includes("/profile");
  const isPageLocked = !isExempt && lockReason !== null;

  const [isIgModalOpen, setIsIgModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    if (isPageLocked) {
      
      if (lockReason === "instagram") {
        setIsIgModalOpen(true);
        setIsUpgradeModalOpen(false); 
      }
      
      else if (lockReason === "subscription") {
        setIsUpgradeModalOpen(true);
        setIsIgModalOpen(false); 
      }
    } else {
     
      setIsIgModalOpen(false);
      setIsUpgradeModalOpen(false);
    }
  }, [isPageLocked, lockReason, pathname]);

  return (
    <div className="relative h-full w-full">
      <div className={isPageLocked ? "blur-md pointer-events-none" : ""}>
        {children}
      </div>

      <InstagramConnectModal
        open={isIgModalOpen}
        onClose={() => setIsIgModalOpen(false)}
        onConnect={handleConnectToInstagram}
        isConnecting={isConnecting}
      />

     
      <UpgradePlanPrompt
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan="Free (Trial Expired)"
      />
    </div>
  );
}
