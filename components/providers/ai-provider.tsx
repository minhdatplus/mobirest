'use client'

import { useState } from 'react'
import { AIContext } from '@/lib/ai-context'
import { processQuery } from '@/lib/ai-service'
import { toast } from 'sonner'
import type { RequestDetails } from '@/lib/ai-context'
import { useRouter } from 'next/navigation'

interface AIProviderProps {
  children: React.ReactNode
}

export function AIProvider({ children }: AIProviderProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastQuery, setLastQuery] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [requestDetails, setRequestDetails] = useState<RequestDetails>({})
  const [requestHistory, setRequestHistory] = useState<RequestDetails[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string>('openai')

  const processNaturalLanguage = async (query: string) => {
    try {
      setIsProcessing(true)
      setLastQuery(query)
      const result = await processQuery(query, selectedProvider)
      
      setSuggestions(result.suggestions)
      setRequestDetails({
        method: result.method,
        endpoint: result.endpoint,
        parameters: result.parameters,
        context: result.context
      })

      setRequestHistory(prev => [...prev, requestDetails])

      toast.success('Successfully processed query')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const transferToClassic = (details: RequestDetails) => {
    // Save request details to localStorage for classic mode to pick up
    localStorage.setItem('transferredRequest', JSON.stringify({
      method: details.method,
      url: details.endpoint,
      headers: details.parameters?.headers || {},
      body: details.parameters?.body || {}
    }))
    
    // Trigger storage event manually since we're in the same window
    window.dispatchEvent(new Event('storage'))
    
    // Switch to classic tab via URL
    router.push('/?tab=classic')
    toast.success('Request transferred to Classic mode')
  }

  return (
    <AIContext.Provider 
      value={{
        isProcessing,
        lastQuery,
        suggestions,
        error,
        requestDetails,
        requestHistory,
        selectedProvider,
        setSelectedProvider,
        processNaturalLanguage,
        generateDocumentation: async () => {},
        analyzeError: async () => {},
        optimizePerformance: async () => {},
        transferToClassic
      }}
    >
      {children}
    </AIContext.Provider>
  )
} 