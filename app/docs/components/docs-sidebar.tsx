'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Quick Start", href: "#quick-start" },
      { title: "Basic Concepts", href: "#basic-concepts" },
    ]
  },
  {
    title: "Advanced Features",
    items: [
      { title: "Environment Variables", href: "#environment-variables" },
      { title: "Request Chaining", href: "#request-chaining" },
      { title: "Batch Operations", href: "#batch-operations" },
    ]
  },
  {
    title: "AI Features",
    items: [
      { title: "Documentation Generator", href: "#documentation-generator" },
      { title: "Response Analysis", href: "#response-analysis" },
      { title: "Performance Optimization", href: "#performance-optimization" },
    ]
  }
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="font-medium text-sm">{section.title}</h4>
            <div className="flex flex-col space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm text-muted-foreground hover:text-foreground transition-colors",
                    "rounded px-2 py-1 hover:bg-accent",
                    pathname === item.href && "text-foreground font-medium bg-accent"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 