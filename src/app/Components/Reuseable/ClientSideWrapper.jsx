// "use client";

// import { useState, useEffect } from "react";
// import { useProtection } from "../../user/[userId]/layout";
// import InstagramConnectModal from "../auth/instagram/InstagramConnectModal";

// export default function ClientSideWrapper({ children }) {
//   const { lockReason, handleConnectToInstagram, isConnecting } =
//     useProtection();

//   const isPageLocked = lockReason === "instagram";

//   const [isIgModalOpen, setIsIgModalOpen] = useState(false);

//   useEffect(() => {
//     if (isPageLocked) {
//       setIsIgModalOpen(true);
//     } else {
//       setIsIgModalOpen(false);
//     }
//   }, [isPageLocked]);

//   return (
//     <div className="relative h-full w-full">
//       <div className={isPageLocked ? "blur-md pointer-events-none" : ""}>
//         {children}
//       </div>

//       <InstagramConnectModal
//         open={isIgModalOpen}
//         onClose={() => setIsIgModalOpen(false)}
//         onConnect={handleConnectToInstagram}
//         isConnecting={isConnecting}
//       />

//     </div>
//   );
// }
