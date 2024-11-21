export interface AIRequestContext {
  parameters: string[]
  dataTypes: Record<string, string>
  auth: Record<string, any>
}

export interface AIRequest {
  query: string
  context?: AIRequestContext
}

export interface AIResponse {
  method: string
  url: string
  headers?: Record<string, string>
  body?: any
  suggestions: string[]
  context?: AIRequestContext
}

export interface AIProvider {
  name: string
  process: (request: AIRequest) => Promise<AIResponse>
} 