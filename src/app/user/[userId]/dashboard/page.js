import ClientWrapper from "./client-wrapper";
import ClientSideWrapper from "@/app/Components/Reuseable/ClientSideWrapper";
import SubscriptionGuard from "@/app/Components/Reuseable/SubscitpionGuard";

export default function DashboardPage() {
  return (
    <ClientSideWrapper>
      <SubscriptionGuard>
        <ClientWrapper />
      </SubscriptionGuard>
    </ClientSideWrapper>
  );
}
