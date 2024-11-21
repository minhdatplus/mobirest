export interface APIError {
  type: 'validation' | 'network' | 'auth' | 'rate_limit' | 'unknown'
  code: string
  message: string
  details?: any
}

export interface ErrorSolution {
  description: string
  code?: string
  canAutoFix: boolean
  autoFix?: () => void
}

export interface ErrorAnalysis {
  error: APIError
  solutions: ErrorSolution[]
  commonPattern?: boolean
} 