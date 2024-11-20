'use client'

import { ApiTester } from '@/components/api-tester'
import { AIRequestBuilder } from '@/components/ai/ai-request-builder'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'classic')

  // Listen to localStorage changes for tab switching
  useEffect(() => {
    const handleStorageChange = () => {
      const transferredRequest = localStorage.getItem('transferredRequest')
      if (transferredRequest) {
        setActiveTab('classic')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    // Also check on mount
    handleStorageChange()

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/?tab=${value}`)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">MobireST - REST API Testing Tool</h1>
        <p className="text-muted-foreground">
          Test your API endpoints with ease, powered by AI assistance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="classic">Classic Mode</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="classic" className="mt-6">
          <ApiTester />
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <AIRequestBuilder />
        </TabsContent>
      </Tabs>
    </div>
  )
}
