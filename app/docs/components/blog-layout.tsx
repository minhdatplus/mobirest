'use client'

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BlogLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  toc?: ReactNode
}

export function BlogLayout({ children, sidebar, toc }: BlogLayoutProps) {
  return (
    <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Sticky Sidebar */}
        {sidebar && (
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              {sidebar}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className={cn(
          "min-w-0",
          sidebar ? "lg:col-span-6" : "lg:col-span-9",
          !sidebar && !toc && "lg:col-span-12"
        )}>
          {children}
        </main>

        {/* Table of Contents */}
        {toc && (
          <div className="hidden xl:block xl:col-span-3">
            <div className="sticky top-20">
              {toc}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 