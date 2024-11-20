import { createContext, useContext } from 'react'

export interface RequestContext {
  parameters: string[]
  dataTypes: Record<string, string>
  auth: Record<string, any>
}

export interface RequestDetails {
  method?: string
  endpoint?: string
  parameters?: Record<string, any>
  context?: RequestContext
}

interface AIContextType {
  isProcessing: boolean
  lastQuery: string | null
  suggestions: string[]
  error: string | null
  requestDetails: RequestDetails
  requestHistory: RequestDetails[]
  selectedProvider: string
  setSelectedProvider: (provider: string) => void
  processNaturalLanguage: (query: string) => Promise<void>
  generateDocumentation: (response: any) => Promise<void>
  analyzeError: (error: any) => Promise<void>
  optimizePerformance: (metrics: any) => Promise<void>
}

export const AIContext = createContext<AIContextType | undefined>(undefined)

export function useAI() {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within AIProvider')
  }
  return context
} 