import Sidebar from "../../Components/User/Sidebar"; 

export default function UserLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        
        {children}
      </main>
    </div>
  );
}
