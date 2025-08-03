"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Palette, Settings, User } from "lucide-react";
import LogoutButton from "../Reuseable/LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession(); 
  const userId = session?.user?.id; 

  
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      
      href: userId ? `/user/${userId}/dashboard` : "#",
    },
    {
      title: "Artwork Management",
      icon: Palette,
      
      href: userId ? `/user/${userId}/artwork-management` : "#",
    },
    { title: "Settings", icon: Settings, href: "/settings" }, 
    { title: "Profile", icon: User, href: "/profile" }, 
  ];

 
  if (status === "loading") {
    return (
      <div className="hidden lg:flex h-screen w-64 flex-col border-r bg-slate-900 text-white">
        
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="hidden lg:flex h-screen w-64 flex-col border-r bg-slate-900 text-white">
        <div className="flex items-center justify-center p-6 border-b border-slate-700">
          <Link href={userId ? `/user/${userId}/dashboard` : "#"}>
            <span className="text-2xl font-bold">Sulio AI</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
                  isActive && "bg-slate-700 text-white font-medium"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.title}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 border-t border-slate-700">
          <div className="text-center text-xs text-slate-500 mb-4">
            © 2023 Sulio AI
          </div>
        
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
