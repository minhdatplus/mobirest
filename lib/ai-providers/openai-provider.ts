import OpenAI from 'openai'
import { BaseAIProvider } from './base-provider'
import { AIRequest, AIResponse } from './types'

export class OpenAIProvider extends BaseAIProvider {
  private client: OpenAI

  constructor(apiKey: string) {
    super(
      'openai',
      apiKey,
      `You are an API assistant. Analyze the natural language request and convert it to a REST API request.
      Follow these rules:
      1. Identify HTTP method, URL, parameters, headers, and body
      2. Suggest appropriate content-type and accept headers
      3. Format body data according to content-type
      4. Include authentication headers if mentioned
      5. Suggest query parameters for GET requests
      6. Learn from context if provided

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
    this.client = new OpenAI({ apiKey })
  }

  async process(request: AIRequest): Promise<AIResponse> {
    const completion = await this.client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: this.systemPrompt
        },
        {
          role: 'user',
          content: request.query
        }
      ],
      model: 'gpt-4-turbo-preview',
      response_format: { type: "json_object" }
    })

    const response = completion.choices[0].message.content
    return this.validateResponse(JSON.parse(response || '{}'))
  }
} 