import { NextResponse } from 'next/server'
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory'

// Initialize providers
AIProviderFactory.initialize()

export async function POST(req: Request) {
  try {
    const { query, context, provider: providerName } = await req.json()

    // Get specified provider or default
    const provider = providerName ? 
      AIProviderFactory.getProvider(providerName) :
      AIProviderFactory.getDefaultProvider()

    if (!provider) {
      throw new Error('No AI provider available')
    }

    const result = await provider.process({ query, context })

    return NextResponse.json({ 
      success: true,
      data: {
        suggestions: result.suggestions,
        method: result.method,
        url: result.url,
        headers: result.headers,
        body: result.body,
        context: result.context
      }
    })
    
  } catch (error) {
    console.error('AI Processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
} 