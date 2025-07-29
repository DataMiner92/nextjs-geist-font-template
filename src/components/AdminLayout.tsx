"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/digital-hubs", label: "Digital Hubs", icon: "🏢" },
    { href: "/admin/users", label: "User Management", icon: "👥" },
    { href: "/admin/assets", label: "Asset Management", icon: "💻" },
    { href: "/admin/hub-map", label: "Hub Map", icon: "🗺️" },
    { href: "/admin/impact", label: "Impact Tracking", icon: "📈" },
    { href: "/admin/reports", label: "Reports", icon: "📋" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold text-primary">
            Admin Panel
          </Link>
        </div>
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      
      <div className="flex-1 flex flex-col">
        <header className="border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Link href="/" className="text-sm hover:text-primary transition-colors">
                Info Center
              </Link>
              <Link href="/about" className="text-sm hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-sm hover:text-primary transition-colors">
                Projects
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Admin Dashboard
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
