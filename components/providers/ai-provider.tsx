'use client'

import { useState, useEffect, useRef } from 'react'
import { AIContext } from '@/lib/ai-context'
import { processQuery } from '@/lib/ai-service'
import { showToast } from '@/lib/utils/toast-manager'
import type { RequestDetails } from '@/lib/ai-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAIProviderStore } from '@/lib/stores/ai-provider-store'
import { AIProviderId } from '@/lib/constants/ai-providers'

interface AIProviderProps {
  children: React.ReactNode
}

export function AIProvider({ children }: AIProviderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { defaultProvider } = useAIProviderStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastQuery, setLastQuery] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [requestDetails, setRequestDetails] = useState<RequestDetails>({})
  const [requestHistory, setRequestHistory] = useState<RequestDetails[]>([])
  const [selectedProvider, setSelectedProvider] = useState<AIProviderId>(defaultProvider)
  const [lastTransferredRequest, setLastTransferredRequest] = useState<string | null>(null)

  const transferToClassic = (details: RequestDetails) => {
    if (!details.method || !details.endpoint) {
      showToast.error('Invalid request details')
      return
    }

    const transferData = {
      method: details.method,
      url: details.endpoint,
      headers: details.parameters?.headers || {},
      body: details.parameters?.body || {}
    }
    
    // Save to localStorage
    const transferString = JSON.stringify(transferData)
    localStorage.setItem('transferredRequest', transferString)
    setLastTransferredRequest(transferString)
    
    // Create URL with classic tab
    const params = new URLSearchParams(searchParams)
    params.set('tab', 'classic')
    
    // Switch to classic tab and trigger storage event
    router.push(`/?${params.toString()}`)
    window.dispatchEvent(new Event('storage'))
    showToast.success('Request transferred to Classic mode')
  }

  const clearRequest = () => {
    setSuggestions([])
    setRequestDetails({})
    setLastQuery(null)
    setError(null)
    setLastTransferredRequest(null)
    localStorage.removeItem('transferredRequest')
    showToast.success('Request cleared')
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
        setSelectedProvider: (provider: AIProviderId) => {
          setSelectedProvider(provider)
        },
        processNaturalLanguage: async (query: string) => {
          try {
            setIsProcessing(true)
            setLastQuery(query)
            
            await showToast.promise(
              processQuery(query, selectedProvider),
              {
                loading: 'Processing your request...',
                success: 'Successfully processed query',
                error: 'Failed to process query'
              }
            )
            
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
            showToast.success('Successfully processed query')
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
            setError(errorMessage)
            showToast.error(errorMessage)
          } finally {
            setIsProcessing(false)
          }
        },
        generateDocumentation: async () => {},
        analyzeError: async () => {},
        optimizePerformance: async () => {},
        transferToClassic,
        lastTransferredRequest,
        clearRequest
      }}
    >
      {children}
    </AIContext.Provider>
  )
} 