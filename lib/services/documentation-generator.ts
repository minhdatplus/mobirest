import { GeneratedDocumentation, APIEndpointDoc } from '@/lib/types/ai-documentation'
import { AIProviderConfig, AI_PROVIDER_CONFIGS } from '@/lib/types/ai-provider'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

export class DocumentationGenerator {
  private openai?: OpenAI
  private gemini?: GoogleGenerativeAI
  private provider: AIProviderConfig

  constructor(apiKey: string, providerId: string = 'gpt-3.5-turbo') {
    this.provider = AI_PROVIDER_CONFIGS[providerId]
    
    if (providerId.startsWith('gpt')) {
      this.openai = new OpenAI({ apiKey })
    } else if (providerId === 'gemini-pro') {
      this.gemini = new GoogleGenerativeAI(apiKey)
    }
  }

  async generateFromResponse(
    endpoint: string,
    method: string,
    response: any,
    requestData?: any
  ): Promise<GeneratedDocumentation> {
    const prompt = this.buildPrompt(endpoint, method, response, requestData)
    
    let endpointDoc: APIEndpointDoc
    if (this.openai) {
      endpointDoc = await this.generateWithOpenAI(prompt)
    } else if (this.gemini) {
      endpointDoc = await this.generateWithGemini(prompt)
    } else {
      throw new Error('No AI provider configured')
    }

    return {
      title: `API Documentation for ${endpoint}`,
      description: `Documentation for ${method} ${endpoint}`,
      version: '1.0.0',
      endpoints: [endpointDoc]
    }
  }

  private async generateWithOpenAI(prompt: string): Promise<APIEndpointDoc> {
    const completion = await this.openai!.chat.completions.create({
      model: this.provider.id,
      messages: [
        {
          role: "system",
          content: `You are an API documentation expert. Generate documentation in JSON format with the following structure:
{
  "endpoint": string,
  "method": string,
  "description": string,
  "parameters": [
    {
      "name": string,
      "type": string,
      "required": boolean,
      "description": string
    }
  ],
  "requestBody": {
    "type": string,
    "properties": {
      [key: string]: {
        "type": string,
        "description": string,
        "example": any
      }
    }
  },
  "responses": [
    {
      "statusCode": number,
      "description": string,
      "schema": {
        "type": string,
        "properties": {
          [key: string]: {
            "type": string,
            "description": string,
            "example": any
          }
        }
      }
    }
  ],
  "examples": [
    {
      "request": {
        "headers": object,
        "body": any
      },
      "response": {
        "status": number,
        "body": any
      }
    }
  ]
}`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: Math.floor(this.provider.maxTokens * 0.8),
      response_format: { type: "json_object" }
    })

    return this.parseAIResponse(completion.choices[0].message.content || '')
  }

  private async generateWithGemini(prompt: string): Promise<APIEndpointDoc> {
    const model = this.gemini!.getGenerativeModel({ model: this.provider.id })
    
    const jsonPrompt = `${prompt}\n\nIMPORTANT: Return response in valid JSON format following this structure:
{
  "endpoint": string,
  "method": string,
  "description": string,
  ...
}`

    const result = await model.generateContent(jsonPrompt)
    const response = await result.response
    return this.parseAIResponse(response.text())
  }

  private buildPrompt(endpoint: string, method: string, response: any, requestData?: any): string {
    const responseStr = JSON.stringify(response)
    const truncatedResponse = responseStr.length > 1000 
      ? responseStr.slice(0, 1000) + '...' 
      : responseStr

    return `
Analyze and generate API documentation for:
Endpoint: ${endpoint}
Method: ${method}
${requestData ? `Request Data: ${JSON.stringify(requestData).slice(0, 500)}` : ''}
Response Sample: ${truncatedResponse}

Generate documentation that includes:
1. Brief endpoint description
2. Request parameters (if any)
3. Request body schema (if applicable)
4. Response schema with types and examples
5. Status codes and their meanings
6. Example request/response pairs

Return the documentation in the specified JSON format.`
  }

  private parseAIResponse(content: string): APIEndpointDoc {
    try {
      const parsedContent = JSON.parse(content)
      return {
        endpoint: parsedContent.endpoint,
        method: parsedContent.method,
        description: parsedContent.description,
        parameters: parsedContent.parameters,
        requestBody: parsedContent.requestBody,
        responses: parsedContent.responses,
        examples: parsedContent.examples
      }
    } catch (error) {
      console.error('Error parsing AI response:', error)
      return {
        endpoint: '',
        method: '',
        description: 'Failed to parse documentation',
        responses: [],
        examples: []
      }
    }
  }
} 