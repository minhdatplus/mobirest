import { AIRequestContext } from './ai-providers/types'
import { useAPIKeysStore } from './stores/api-keys-store'
import { AIProviderId } from './constants/ai-providers'

interface QueryResult {
  suggestions: string[]
  method?: string
  endpoint?: string
  parameters?: {
    headers?: Record<string, string>
    body?: any
  }
  context?: AIRequestContext
}

export async function processQuery(query: string, provider: AIProviderId): Promise<QueryResult> {
  const apiKey = useAPIKeysStore.getState().getKey(provider)
  
  if (!apiKey) {
    throw new Error(`API key for ${provider} is not configured`)
  }

  const response = await fetch('/api/ai/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({ query, provider })
  })

  if (!response.ok) {
    throw new Error('Failed to process query')
  }

  const result = await response.json()
  
  if (!result.success) {
    throw new Error(result.error)
  }

  const { method, url, headers, body, context } = result.data

  return {
    suggestions: [`${method} ${url}`],
    method,
    endpoint: url,
    parameters: {
      headers,
      body
    },
    context
  }
} 