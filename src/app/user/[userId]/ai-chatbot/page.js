import SubscriptionGuard from "@/app/Components/Reuseable/SubscitpionGuard";
import ClientWrapper from "./client-wrapper";


export default function AiChatbotPage() {
  return (
    <SubscriptionGuard>
      <ClientWrapper />
    </SubscriptionGuard>
  );
}

