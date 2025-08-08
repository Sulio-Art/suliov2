import ClientSideWrapper from "../../clientSideWrapper";

export default function DashboardPage() {
  return (
    <ClientSideWrapper>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Main Dashboard</h1>
        <p className="mt-2 text-gray-600">
          This is the main content area. The sidebar is on the left.
        </p>
      </div>
    </ClientSideWrapper>
  );
}
