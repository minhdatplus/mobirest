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
  responseTime: number
  size: number
  cacheStatus: 'hit' | 'miss' | 'none'
  compressionUsed: boolean
  suggestions: string[]
  score: number
  metrics: {
    ttfb: number
    downloadTime: number
    headerSize: number
    bodySize: number
  }
} 