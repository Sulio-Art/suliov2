"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Receipt } from "lucide-react";
import LogoutButton from "../Reuseable/LogoutButton";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
      title: "Transaction Management",
      href: "/admin/transactions",
      icon: Receipt,
    },
  ];

  return (
    <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
      <div className="p-4 flex items-center justify-center border-b h-16">
        <h1 className="text-xl font-bold text-gray-800">AI Artist - Admin</h1>
      </div>
      <nav className="flex-grow px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 border-t border-gray-200">
        <LogoutButton />
      </div>
    </div>
  );
}
