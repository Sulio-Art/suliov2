import ClientWrapper from "./client-wrapper";
import ClientSideWrapper from "@/app/Components/Reuseable/ClientSideWrapper";

export default function DashboardPage() {
  return (
    <ClientSideWrapper>
      <ClientWrapper />
    </ClientSideWrapper>
  );
}
