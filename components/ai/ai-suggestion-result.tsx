'use client'

import { useAI } from '@/lib/ai-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Copy, ExternalLink, Code, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function AISuggestionResult() {
  const { suggestions, requestDetails, isProcessing, transferToClassic, clearRequest } = useAI()
  const [copied, setCopied] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  console.log('Suggestions:', suggestions)
  console.log('IsProcessing:', isProcessing)
  console.log('RequestDetails:', requestDetails)

  if (!suggestions?.length || isProcessing) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(requestDetails, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTransfer = () => {
    transferToClassic(requestDetails)
  }

  const handleSwipe = (event: TouchEvent) => {
    if (Math.abs(event.changedTouches[0].clientX - touchStart) > 100) {
      clearRequest()
    }
  }

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">AI Suggestion</h3>
          <Button 
            variant="secondary"
            size="sm" 
            onClick={clearRequest}
            className="h-8 hover:bg-secondary/80"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Request
              </>
            )}
          </Button>
          <Button variant="default" size="sm" onClick={handleTransfer}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Test in Classic Mode
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-medium">
            {requestDetails.method}
          </Badge>
          <span className="text-sm font-mono text-muted-foreground">
            {requestDetails.endpoint}
          </span>
        </div>

        {requestDetails.parameters?.headers && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Headers</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="h-8"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Format JSON
                </Button>
              </div>
              <pre className="min-h-[100px] w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm font-mono">
                {JSON.stringify(requestDetails.parameters.headers, null, 2)}
              </pre>
            </div>
          </>
        )}

        {requestDetails.parameters?.body && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Request Body</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="h-8"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Format JSON
                </Button>
              </div>
              <pre className="min-h-[200px] w-full rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm font-mono">
                {JSON.stringify(requestDetails.parameters.body, null, 2)}
              </pre>
            </div>
          </>
        )}
      </div>
    </Card>
  )
} 