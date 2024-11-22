"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ErrorAnalysis } from "@/lib/types/error-detection"
import { AlertCircle, ArrowRight } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"

interface ErrorDialogProps {
  analysis: ErrorAnalysis
  onApplyFix: (fix: () => void) => void
  onClose: () => void
}

export function ErrorDialog({ analysis, onApplyFix, onClose }: ErrorDialogProps) {
  const [isClosing, setIsClosing] = React.useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  return (
    <Dialog 
      open={!isClosing} 
      onOpenChange={handleClose}
    >
      <DialogContent
        className={cn(
          "transition-opacity duration-300",
          isClosing && "opacity-0"
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Error Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error Message */}
          <div className="p-3 bg-destructive/10 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              {analysis.error.message}
            </p>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Suggested Solutions:</h4>
            {analysis.solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{solution.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {solution.description}
                  </p>
                </div>
                {solution.fix && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApplyFix(solution.fix!)}
                  >
                    Apply Fix
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 