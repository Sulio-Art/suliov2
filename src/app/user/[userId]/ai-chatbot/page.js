import SubscriptionGuard from "@/app/Components/Reuseable/SubscitpionGuard";
import ClientWrapper from "./client-wrapper";
import ClientSideWrapper from "@/app/Components/Reuseable/ClientSideWrapper";

export default function AiChatbotPage() {
  return (
    <ClientSideWrapper>
      <SubscriptionGuard>
        <ClientWrapper />
      </SubscriptionGuard>
    </ClientSideWrapper>
  );
}
