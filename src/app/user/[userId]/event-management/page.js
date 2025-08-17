import ClientWrapper from "./client-wrapper";
import SubscriptionGuard from "@/app/Components/Reuseable/SubscitpionGuard";

export default function EventManagementPage() {
  return (
    <SubscriptionGuard>
      <ClientWrapper />
    </SubscriptionGuard>
  );
}
