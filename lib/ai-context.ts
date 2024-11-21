import { createContext, useContext } from 'react'
import { AIRequestContext } from './ai-providers/types'
import { AIProviderId } from './constants/ai-providers'

export interface RequestDetails {
  method?: string
  endpoint?: string
  parameters?: {
    headers?: Record<string, string>
    body?: any
  }
  context?: AIRequestContext
}

interface AIContextType {
  isProcessing: boolean
  lastQuery: string | null
  suggestions: string[]
  error: string | null
  requestDetails: RequestDetails
  requestHistory: RequestDetails[]
  selectedProvider: AIProviderId
  setSelectedProvider: (provider: AIProviderId) => void
  processNaturalLanguage: (query: string) => Promise<void>
  generateDocumentation: (response: any) => Promise<void>
  analyzeError: (error: any) => Promise<void>
  optimizePerformance: (metrics: any) => Promise<void>
  transferToClassic: (details: RequestDetails) => void
  lastTransferredRequest: string | null
  clearRequest: () => void
}

export const AIContext = createContext<AIContextType | undefined>(undefined)

export function useAI() {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within AIProvider')
  }
  return context
} 