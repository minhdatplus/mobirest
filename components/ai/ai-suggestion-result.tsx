'use client'

import { useAI } from '@/lib/ai-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export function AISuggestionResult() {
  const { suggestions, requestDetails, isProcessing } = useAI()
  const [copied, setCopied] = useState(false)

  if (!suggestions.length || isProcessing) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(requestDetails, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Suggestion</h3>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge>{requestDetails.method}</Badge>
          <span className="text-sm font-mono">{requestDetails.endpoint}</span>
        </div>

        {requestDetails.parameters?.headers && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Headers</h4>
            <pre className="bg-muted p-2 rounded-md text-sm">
              {JSON.stringify(requestDetails.parameters.headers, null, 2)}
            </pre>
          </div>
        )}

        {requestDetails.parameters?.body && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Body</h4>
            <pre className="bg-muted p-2 rounded-md text-sm">
              {JSON.stringify(requestDetails.parameters.body, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  )
} 