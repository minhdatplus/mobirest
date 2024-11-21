export const AI_PROVIDERS = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'groq', name: 'Groq' }
] as const

export type AIProviderId = typeof AI_PROVIDERS[number]['id'] 