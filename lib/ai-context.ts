import { createContext, useContext } from 'react'

interface AIContextType {
  isProcessing: boolean
  lastQuery: string | null
  suggestions: string[]
  error: string | null
  requestDetails: {
    method?: string
    endpoint?: string
    parameters?: Record<string, any>
  }
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