import * as React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Navigation } from '@/components/layout/navigation'
import { Toaster } from 'sonner'
import { AIProvider } from '@/components/providers/ai-provider'
import { StoreProvider } from '@/components/providers/store-provider'
import { ErrorBoundary } from "@/components/error-boundary"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { DatabaseProvider } from "@/components/providers/database-provider"
import { SettingsMenu } from "@/components/layout/settings-menu"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MobireST',
  description: 'REST API Testing Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <StoreProvider>
            <AIProvider>
              <DatabaseProvider>
                <ErrorBoundary>
                  <div className="flex flex-col min-h-screen">
                    <header className="border-b">
                      <div className="container flex h-14 items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="font-bold">
                            <h1 className="text-xl">MobireSTT</h1>
                          </div>
                          <SidebarNav />
                        </div>
                        <SettingsMenu />
                      </div>
                    </header>
                    <main className="flex-1">
                      {children}
                    </main>
                  </div>
                </ErrorBoundary>
              </DatabaseProvider>
            </AIProvider>
          </StoreProvider>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
