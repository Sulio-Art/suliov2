import Sidebar from "@/app/Components/User/Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="h-screen  flex flex-row">
        <Sidebar />
        <div className="w-full bg-gray-600">{children}</div>
      </div>
    </>
  );
}
