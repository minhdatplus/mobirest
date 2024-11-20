"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Code2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"

const routes = [
  {
    href: "/",
    label: "Home",
    icon: Code2
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-[1200px] items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-6">
            <nav className="flex flex-col gap-4">
              {routes.map((route) => {
                const Icon = route.icon
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors",
                      "hover:text-primary",
                      pathname === route.href 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="font-bold">
            MobireST
          </Link>
          
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors",
                    "hover:text-primary",
                    pathname === route.href 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Guest User</p>
                  <p className="text-xs text-muted-foreground">
                    Sign in to save your collections
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 