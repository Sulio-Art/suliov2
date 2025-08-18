import { Suspense } from "react";
import ClientWrapper from "./client-wrapper";
import { Loader2 } from "lucide-react";

export default function TransactionManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      }
    >
      <ClientWrapper />
    </Suspense>
  );
}
