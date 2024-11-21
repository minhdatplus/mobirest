import * as React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Navigation } from '@/components/layout/navigation'
import { Toaster } from 'sonner'
import { AIProvider } from '@/components/providers/ai-provider'
import { StoreProvider } from '@/components/providers/store-provider'

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
              <div className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1 container py-6">
                  <a href="#main-content" className="sr-only focus:not-sr-only">
                    Skip to main content
                  </a>
                  {children}
                </main>
              </div>
            </AIProvider>
          </StoreProvider>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
