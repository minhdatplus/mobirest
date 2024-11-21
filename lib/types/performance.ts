export interface PerformanceMetrics {
  responseTime: number
  payloadSize: number
  headersSize: number
  compressionEnabled: boolean
  cachingEnabled: boolean
  ttfb: number // Time to First Byte
  transferSize: number
  encodingTime: number
  decodingTime: number
}

export interface PerformanceIssue {
  type: 'critical' | 'warning' | 'info'
  message: string
  impact: string
  suggestion: string
  autoFixAvailable: boolean
  autoFix?: () => void
}

export interface PerformanceAnalysis {
  metrics: PerformanceMetrics
  issues: PerformanceIssue[]
  score: number // 0-100
  benchmark: {
    industry: number
    percentile: number
    rating: 'excellent' | 'good' | 'needs-improvement' | 'poor'
  }
  trends?: {
    responseTime: number[]
    payloadSize: number[]
    timestamp: number[]
  }
} 