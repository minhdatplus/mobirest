import { NextResponse } from 'next/server'
import { DocumentationGenerator } from '@/lib/services/documentation-generator'

export async function POST(req: Request) {
  try {
    const { endpoint, method, response, requestData, provider = 'gpt-3.5-turbo' } = await req.json()

    const apiKey = provider.startsWith('gpt') 
      ? process.env.OPENAI_API_KEY
      : process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw new Error(`API key not configured for provider: ${provider}`)
    }

    const docGenerator = new DocumentationGenerator(apiKey, provider)
    const documentation = await docGenerator.generateFromResponse(
      endpoint,
      method,
      response,
      requestData
    )

    return NextResponse.json({ documentation })
  } catch (error) {
    console.error('Documentation generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    )
  }
} 