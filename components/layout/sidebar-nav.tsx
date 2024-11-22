"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Settings, FileText, MessageSquare } from "lucide-react";

const navigation = [
  {
    title: "Home",
    href: "/",
    icon: Home
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: FileText
  },
  {
    title: "Prompts",
    href: "/prompts",
    icon: MessageSquare
  }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href 
                ? "text-foreground" 
                : "text-muted-foreground"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
} 