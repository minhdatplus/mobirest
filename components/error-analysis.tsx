'use client'

import { ErrorAnalysis } from '@/lib/types/error-detection'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Lightbulb, Tool, History } from 'lucide-react'

interface ErrorAnalysisProps {
  analysis: ErrorAnalysis
  onApplyFix?: (fix: string) => void
}

export function ErrorAnalysisView({ analysis, onApplyFix }: ErrorAnalysisProps) {
  return (
    <Alert variant="destructive" className="mt-4">
      <AlertTitle className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4" />
        Error Analysis
      </AlertTitle>
      <AlertDescription>
        <div className="mt-2 space-y-4">
          <div>
            <h4 className="font-medium">Possible Causes:</h4>
            <ul className="mt-2 list-disc pl-4 space-y-1">
              {analysis.possibleCauses.map((cause, i) => (
                <li key={i} className="text-sm">{cause}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Suggested Fixes:</h4>
            <ul className="mt-2 space-y-2">
              {analysis.suggestedFixes.map((fix, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-sm">{fix}</span>
                  {onApplyFix && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onApplyFix(fix)}
                    >
                      <Tool className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {analysis.commonPatterns && analysis.commonPatterns.length > 0 && (
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <History className="h-4 w-4" />
                Common Error Patterns:
              </h4>
              <ul className="mt-2 list-disc pl-4 space-y-1">
                {analysis.commonPatterns.map((pattern, i) => (
                  <li key={i} className="text-sm">
                    {pattern.pattern} (seen {pattern.frequency} times)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
} 