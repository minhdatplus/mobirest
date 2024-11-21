import { PerformanceAnalysis } from '@/lib/types/performance'
import { Card } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Clock, FileText, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PerformanceAnalysisProps {
  analysis: PerformanceAnalysis
  className?: string
}

export function PerformanceAnalysis({ analysis, className }: PerformanceAnalysisProps) {
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    else return `${(bytes / 1048576).toFixed(1)} MB`
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card className={cn("p-4 space-y-4", className)}>
      {/* Performance Score */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Performance Analysis</h3>
        <span className={cn(
          "text-2xl font-bold",
          getScoreColor(analysis.score)
        )}>
          {analysis.score}/100
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            Response Time
          </div>
          <p className="text-lg font-medium">{analysis.metrics.responseTime}ms</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="w-4 h-4 mr-1" />
            Payload Size
          </div>
          <p className="text-lg font-medium">{formatBytes(analysis.metrics.payloadSize)}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            Compression
          </div>
          <p className="text-lg font-medium">
            {analysis.metrics.compressionEnabled ? 'Enabled' : 'Disabled'}
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            Caching
          </div>
          <p className="text-lg font-medium">
            {analysis.metrics.cachingEnabled ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>

      {/* Issues */}
      <div className="space-y-2">
        {analysis.issues.map((issue, index) => (
          <Alert key={index} variant={
            issue.type === 'critical' ? 'destructive' :
            issue.type === 'warning' ? 'warning' : 'default'
          }>
            <AlertTitle className="flex items-center gap-2">
              {issue.type === 'critical' ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
              {issue.message}
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <p><strong>Impact:</strong> {issue.impact}</p>
              <p><strong>Suggestion:</strong> {issue.suggestion}</p>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </Card>
  )
} 