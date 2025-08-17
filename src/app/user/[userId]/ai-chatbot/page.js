import SubscriptionGuard from "@/app/Components/Reuseable/SubscitpionGuard";
import ClientWrapper from "./client-wrapper";


export default function AiChatbotPage() {
  return (
    <SubscriptionGuard>
      <ClientWrapper />
    </SubscriptionGuard>
  );
}

//TODO race behaviour when clicked to page , upgrade showng for 1 sec
