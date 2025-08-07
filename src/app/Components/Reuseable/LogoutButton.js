"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
// Removed unused Button import

export default function LogoutButton() {
  const { status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/auth/login" });
    console.log("Logged out successfully!");
    router.push(data.url);
  };

  if (status !== "authenticated") {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
    >
      <LogOut className="h-5 w-5" />
      <span>Logout</span>
    </button>
  );
}
