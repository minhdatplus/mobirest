"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings, Home, History, Star, Book } from "lucide-react"
import { QuickActionButton } from "@/components/ui/quick-action-button"

const routes = [
  {
    href: "/",
    label: "Home",
    icon: Home
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings
  },
  {
    href: "/docs",
    label: "Documentation",
    icon: Book
  }
]

export function Navigation() {
  const pathname = usePathname()
  
  const showRecentRequests = () => {
    // Implement show recent requests logic
    console.log("Show recent requests")
  }

  const showFavorites = () => {
    // Implement show favorites logic
    console.log("Show favorites")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">MobireST</span>
          </Link>
          <nav className="flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <QuickActionButton
              icon={<History className="h-4 w-4" />}
              onClick={showRecentRequests}
            />
            <QuickActionButton
              icon={<Star className="h-4 w-4" />}
              onClick={showFavorites}
            />
          </div>
        </div>
      </div>
    </header>
  )
} 