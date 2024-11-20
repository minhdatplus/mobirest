"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History } from "lucide-react"
import { HistoryItem } from "@/types"
import { cn } from "@/lib/utils"

interface HistoryDialogProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

export function HistoryDialog({ history, onSelect }: HistoryDialogProps) {
  const getStatusColor = (status: number) => {
    if (!status) return "bg-gray-100"
    if (status < 300) return "bg-green-100 text-green-800"
    if (status < 400) return "bg-blue-100 text-blue-800"
    if (status < 500) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('default', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <History className="h-4 w-4" />
          <span className="sr-only">View history</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Request History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 max-h-[70vh] pr-4">
          <div className="space-y-2">
            {history.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">
                No history yet
              </p>
            ) : (
              history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={cn(
                    "w-full group text-left",
                    "p-3 rounded-lg",
                    "border border-border/50",
                    "hover:bg-accent/50 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium",
                        getStatusColor(item.status)
                      )}>
                        {item.method}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs",
                        getStatusColor(item.status)
                      )}>
                        {item.status || "Error"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground truncate">
                    {item.url}
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 