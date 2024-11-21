'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [lastTransferredRequest, setLastTransferredRequest] = useState<string | null>(null)
  const undoStack = useRef<RequestDetails[]>([])

  // Load last transferred request on mount
  useEffect(() => {
    const transferredRequest = localStorage.getItem('transferredRequest')
    if (transferredRequest) {
      setLastTransferredRequest(transferredRequest)
    }
  }, [])

  const processNaturalLanguage = async (query: string) => {
    try {
      setIsProcessing(true)
      setLastQuery(query)
      const result = await processQuery(query, selectedProvider)
      
      setSuggestions(result.suggestions)
      setRequestDetails({
        method: result.method,
        endpoint: result.endpoint,
        parameters: {
          headers: result.parameters?.headers,
          body: result.parameters?.body
        },
        context: result.context
      })

      setRequestHistory(prev => [...prev, requestDetails])
      setLastTransferredRequest(null)
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
    const transferData = {
      method: details.method,
      url: details.endpoint,
      headers: details.parameters?.headers || {},
      body: details.parameters?.body || {}
    }
    
    // Save to localStorage and state
    const transferString = JSON.stringify(transferData)
    localStorage.setItem('transferredRequest', transferString)
    setLastTransferredRequest(transferString)
    
    // Trigger storage event manually since we're in the same window
    window.dispatchEvent(new Event('storage'))
    
    // Switch to classic tab via URL
    router.push('/?tab=classic')
    toast.success('Request transferred to Classic mode')
  }

  const clearRequest = () => {
    setSuggestions([])
    setRequestDetails({})
    setLastQuery(null)
    setError(null)
    setLastTransferredRequest(null)
    toast.success('Request cleared')
  }

  const undoLastAction = () => {
    const lastState = undoStack.current.pop()
    if (lastState) {
      setRequestDetails(lastState)
      toast.success('Action undone')
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
        optimizePerformance: async () => {},
        transferToClassic,
        lastTransferredRequest,
        clearRequest,
        undoLastAction,
      }}
    >
      {children}
    </AIContext.Provider>
  )
} 