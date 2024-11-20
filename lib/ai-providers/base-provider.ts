import { AIProvider, AIRequest, AIResponse } from './types'

export abstract class BaseAIProvider implements AIProvider {
  constructor(
    public name: string,
    protected apiKey: string,
    protected systemPrompt: string
  ) {}

  abstract process(request: AIRequest): Promise<AIResponse>

  protected validateResponse(response: any): AIResponse {
    // Implement common validation logic
    if (!response.method || !response.url) {
      throw new Error('Invalid AI response format')
    }
    return response as AIResponse
  }
} 