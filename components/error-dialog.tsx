interface ErrorDialogProps {
  analysis: ErrorAnalysis
  onApplyFix: (fix: () => void) => void
  onClose: () => void
}

export function ErrorDialog({ analysis, onApplyFix, onClose }: ErrorDialogProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Error Analysis</DialogTitle>
          <DialogDescription>
            {analysis.error.message}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Suggested Solutions:</h4>
            <ul className="mt-2 space-y-2">
              {analysis.solutions.map((solution, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>{solution.description}</span>
                  {solution.canAutoFix && (
                    <Button 
                      size="sm" 
                      onClick={() => solution.autoFix && onApplyFix(solution.autoFix)}
                    >
                      Apply Fix
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {analysis.commonPattern && (
            <Alert>
              <AlertTitle>Common Error Pattern</AlertTitle>
              <AlertDescription>
                This is a frequently occurring error. Consider adding it to your documentation.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 