'use client'

import { NaturalLanguageInput } from './natural-language-input'
import { AISuggestionResult } from './ai-suggestion-result'

export function AIRequestBuilder() {
  return (
    <div className="space-y-4">
      <NaturalLanguageInput />
      <AISuggestionResult />
    </div>
  )
} 