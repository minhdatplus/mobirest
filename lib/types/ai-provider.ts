export interface AIProviderConfig {
  id: string
  name: string
  maxTokens: number
  supportedFeatures: {
    documentation: boolean
    errorAnalysis: boolean
    performance: boolean
  }
}

export const AI_PROVIDER_CONFIGS: Record<string, AIProviderConfig> = {
  'gpt-4': {
    id: 'gpt-4',
    name: 'GPT-4',
    maxTokens: 8192,
    supportedFeatures: {
      documentation: true,
      errorAnalysis: true,
      performance: true
    }
  },
  'gpt-3.5-turbo': {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    maxTokens: 4096,
    supportedFeatures: {
      documentation: true,
      errorAnalysis: true,
      performance: true
    }
  },
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    maxTokens: 30720,
    supportedFeatures: {
      documentation: true,
      errorAnalysis: true,
      performance: true
    }
  }
} 