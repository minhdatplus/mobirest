import { AIProvider } from './types'
import { OpenAIProvider } from './openai-provider'
import { GeminiProvider } from './gemini-provider'

export class AIProviderFactory {
  private static providers: Map<string, AIProvider> = new Map()

  static initialize() {
    try {
      // Initialize providers with API keys from environment variables
      if (process.env.OPENAI_API_KEY) {
        this.providers.set('openai', new OpenAIProvider(process.env.OPENAI_API_KEY))
      }
      if (process.env.GEMINI_API_KEY) {
        this.providers.set('gemini', new GeminiProvider(process.env.GEMINI_API_KEY))
      }
      // Add more providers here
    } catch (error) {
      console.error('Error initializing AI providers:', error)
    }
  }

  static getProvider(name: string): AIProvider {
    const provider = this.providers.get(name)
    if (!provider) {
      throw new Error(`AI provider '${name}' not found or failed to initialize`)
    }
    return provider
  }

  static getDefaultProvider(): AIProvider {
    // Return OpenAI as default, or first available provider
    return this.providers.get('openai') || 
           Array.from(this.providers.values())[0] ||
           null
  }

  static getAvailableProviders(): string[] {
    return Array.from(this.providers.keys())
  }
} 