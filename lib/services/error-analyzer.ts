import { ErrorAnalysis, APIError } from '@/lib/types/error-detection'
import { openai } from '@/lib/openai'

export class ErrorAnalyzer {
  private errorPatterns: Map<string, number> = new Map()

  async analyzeError(error: APIError): Promise<ErrorAnalysis> {
    // Track error pattern
    const pattern = `${error.code}:${error.message}`
    this.errorPatterns.set(pattern, (this.errorPatterns.get(pattern) || 0) + 1)

    // Analyze error using AI
    const analysis = await this.getAIAnalysis(error)

    // Add common patterns
    const commonPatterns = Array.from(this.errorPatterns.entries())
      .map(([pattern, frequency]) => ({ pattern, frequency }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5)

    return {
      ...analysis,
      commonPatterns
    }
  }

  private async getAIAnalysis(error: APIError): Promise<ErrorAnalysis> {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an API error analysis expert. Analyze the error and provide possible causes and fixes."
        },
        {
          role: "user",
          content: `Analyze this API error:
            Code: ${error.code}
            Message: ${error.message}
            Details: ${JSON.stringify(error.details)}
          `
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0].message.content)
    
    return {
      error,
      possibleCauses: result.possibleCauses,
      suggestedFixes: result.suggestedFixes
    }
  }

  clearPatterns() {
    this.errorPatterns.clear()
  }
} 