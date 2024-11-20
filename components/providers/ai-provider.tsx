'use client'

import { useState } from 'react'
import { AIContext } from '@/lib/ai-context'
import { processQuery } from '@/lib/ai-service'
import { toast } from 'sonner'
import type { RequestDetails } from '@/lib/ai-context'

interface AIProviderProps {
  children: React.ReactNode
}

export function AIProvider({ children }: AIProviderProps) {
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

      // Add to history
      setRequestHistory(prev => [...prev, result])

      toast.success('Successfully processed query')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
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
        optimizePerformance: async () => {}
      }}
    >
      {children}
    </AIContext.Provider>
  )
} 