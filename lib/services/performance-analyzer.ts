import { PerformanceAnalysis, PerformanceMetrics, PerformanceIssue } from '@/lib/types/performance'

export class PerformanceAnalyzer {
  private historySize = 50
  private metricsHistory: PerformanceMetrics[] = []

  analyze(
    responseTime: number,
    responseData: any,
    headers: Record<string, string>,
    timing: PerformanceResourceTiming
  ): PerformanceAnalysis {
    // Calculate metrics
    const metrics = this.calculateMetrics(responseTime, responseData, headers, timing)
    
    // Track history
    this.metricsHistory.push(metrics)
    if (this.metricsHistory.length > this.historySize) {
      this.metricsHistory.shift()
    }

    // Analyze issues
    const issues = this.analyzeIssues(metrics)

    // Calculate score
    const score = this.calculateScore(metrics, issues)

    // Compare with benchmarks
    const benchmark = this.getBenchmark(metrics)

    // Get trends
    const trends = this.getTrends()

    return {
      metrics,
      issues,
      score,
      benchmark,
      trends
    }
  }

  private calculateMetrics(
    responseTime: number,
    responseData: any,
    headers: Record<string, string>,
    timing: PerformanceResourceTiming
  ): PerformanceMetrics {
    return {
      responseTime,
      payloadSize: new Blob([JSON.stringify(responseData)]).size,
      headersSize: new Blob([JSON.stringify(headers)]).size,
      compressionEnabled: !!headers['content-encoding']?.includes('gzip'),
      cachingEnabled: !!headers['cache-control'] || !!headers['etag'],
      ttfb: timing.responseStart - timing.requestStart,
      transferSize: timing.transferSize,
      encodingTime: timing.responseEnd - timing.responseStart,
      decodingTime: timing.domContentLoadedEventEnd - timing.responseEnd
    }
  }

  private analyzeIssues(metrics: PerformanceMetrics): PerformanceIssue[] {
    const issues: PerformanceIssue[] = []

    // Response time analysis
    if (metrics.responseTime > 1000) {
      issues.push({
        type: 'critical',
        message: 'High response time',
        impact: 'Poor user experience and reduced application performance',
        suggestion: 'Consider implementing caching or optimizing the API endpoint',
        autoFixAvailable: false
      })
    }

    // Payload size analysis
    if (metrics.payloadSize > 100000) {
      issues.push({
        type: 'warning',
        message: 'Large response payload',
        impact: 'Increased bandwidth usage and slower response times',
        suggestion: 'Enable compression and consider pagination or response filtering',
        autoFixAvailable: true,
        autoFix: () => {
          // Implement compression
        }
      })
    }

    // Add more issue checks...

    return issues
  }

  private calculateScore(metrics: PerformanceMetrics, issues: PerformanceIssue[]): number {
    let score = 100

    // Response time impact (-30 max)
    if (metrics.responseTime > 1000) score -= 30
    else if (metrics.responseTime > 500) score -= 15

    // Payload size impact (-30 max)
    if (metrics.payloadSize > 100000) score -= 30
    else if (metrics.payloadSize > 50000) score -= 15

    // Critical issues impact (-10 each)
    const criticalIssues = issues.filter(i => i.type === 'critical').length
    score -= criticalIssues * 10

    return Math.max(0, score)
  }

  private getBenchmark(metrics: PerformanceMetrics) {
    // Compare with industry standards
    const industryAvg = 500 // ms
    const percentile = this.calculatePercentile(metrics.responseTime)
    
    return {
      industry: industryAvg,
      percentile,
      rating: this.getRating(percentile)
    }
  }

  private calculatePercentile(value: number): number {
    // Implementation of percentile calculation
    return 75 // Placeholder
  }

  private getRating(percentile: number): 'excellent' | 'good' | 'needs-improvement' | 'poor' {
    if (percentile >= 90) return 'excellent'
    if (percentile >= 75) return 'good'
    if (percentile >= 50) return 'needs-improvement'
    return 'poor'
  }

  private getTrends() {
    if (this.metricsHistory.length < 2) return undefined

    return {
      responseTime: this.metricsHistory.map(m => m.responseTime),
      payloadSize: this.metricsHistory.map(m => m.payloadSize),
      timestamp: this.metricsHistory.map((_, i) => Date.now() - (i * 1000))
    }
  }
} 