import Sidebar from "../../Components/User/Sidebar"; 

export default function UserLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 h-full">{children}</div>
      </main>
    </div>
  );
}