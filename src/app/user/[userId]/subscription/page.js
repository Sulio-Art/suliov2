import ClientWrapper from "./client-wrapper";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 p-8 flex items-center justify-center h-full">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      }
    >
      <ClientWrapper />
    </Suspense>
  );
}
