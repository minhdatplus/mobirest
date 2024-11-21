import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'
import { BaseAIProvider } from './base-provider'
import { AIRequest, AIResponse } from './types'

export class GeminiProvider extends BaseAIProvider {
  private client: GoogleGenerativeAI
  private model: GenerativeModel

  constructor(apiKey: string) {
    super(
      'gemini',
      apiKey,
      `You are an API assistant. Convert natural language to REST API requests.
      Return response in JSON format with following structure:
      {
        "method": "HTTP_METHOD",
        "url": "full_url_with_query_params",
        "headers": {
          "key": "value"
        },
        "body": {}, // if applicable
        "suggestions": [
          "suggestion1",
          "suggestion2"
        ]
      }`
    )
    this.client = new GoogleGenerativeAI(apiKey)
    this.model = this.client.getGenerativeModel({ model: "gemini-1.5-pro" })
  }

  async process(request: AIRequest): Promise<AIResponse> {
    try {
      const result = await this.model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: this.systemPrompt }]
          },
          {
            role: "model",
            parts: [{ text: "I understand. I will help convert natural language to REST API requests in the specified JSON format." }]
          },
          {
            role: "user",
            parts: [{ text: request.query }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      })

      const response = await result.response.text()
      
      let parsedResponse: AIResponse
      try {
        parsedResponse = JSON.parse(response)
        console.log('Parsed Response:', parsedResponse)
      } catch (e) {
        console.error('Parse error:', e)
        // If response is not valid JSON, try to extract JSON from the text
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
          throw new Error('Invalid response format from Gemini')
        }
        parsedResponse = JSON.parse(jsonMatch[0])
      }

      return this.validateResponse(parsedResponse)
    } catch (error) {
      console.error('Gemini processing error:', error)
      if (error instanceof Error) {
        throw new Error(`Failed to process request with Gemini: ${error.message}`)
      }
      throw new Error('Failed to process request with Gemini')
    }
  }
} 