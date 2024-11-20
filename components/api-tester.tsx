"use client"

import * as React from "react"
import { Send, Save, Clock, Copy, Check, Code, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CollectionDialog } from "./collections/collection-dialog"
import { HistoryDialog } from "./history/history-dialog"
import { SettingsDialog } from "./settings/settings-dialog"
import { HistoryItem, Collection } from "@/types"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApiTesterProps {
  className?: string
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
type ResponseData = {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  error?: string
}

interface CollectionSaveProps extends Omit<Collection, "id"> {}

export function ApiTester({ className }: ApiTesterProps) {
  const [method, setMethod] = React.useState<Method>("GET")
  const [url, setUrl] = React.useState("")
  const [headers, setHeaders] = React.useState([
    { key: "Content-Type", value: "application/json" }
  ])
  const [body, setBody] = React.useState("")
  const [response, setResponse] = React.useState<ResponseData | null>(null)
  const [responseTime, setResponseTime] = React.useState<number | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [history, setHistory] = React.useState<HistoryItem[]>([])
  const [settings, setSettings] = React.useState({
    autoFormat: true,
    saveHistory: true,
    maxHistoryItems: 50
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const methods: Method[] = ["GET", "POST", "PUT", "DELETE", "PATCH"]
  const methodsWithBody = ["POST", "PUT", "PATCH"]
  const showBodyTab = methodsWithBody.includes(method)

  const handleSend = async () => {
    if (!url) {
      toast.error("Please enter a URL")
      return
    }

    setIsLoading(true)
    try {
      const startTime = performance.now()
      setResponse(null)
      setResponseTime(null)

      const headerObj = headers.reduce((acc, h) => {
        if (h.key && h.value) acc[h.key] = h.value
        return acc
      }, {} as Record<string, string>)

      const proxyResponse = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          method,
          headers: headerObj,
          data: method !== 'GET' && body ? JSON.parse(body) : undefined
        })
      })

      const responseData = await proxyResponse.json()
      const endTime = performance.now()
      
      setResponseTime(Math.round(endTime - startTime))
      
      if (responseData.error) {
        throw new Error(responseData.error)
      }

      setResponse(responseData)

      if (settings.saveHistory) {
        const historyItem: HistoryItem = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          method,
          url,
          status: responseData.status
        }
        setHistory(prev => [historyItem, ...prev].slice(0, settings.maxHistoryItems))
      }

      toast.success("Request completed successfully")
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
      setResponse({
        error: error.message,
        status: 0,
        statusText: "Error",
        headers: {},
        data: null
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStatusColor = (status: number) => {
    if (!status) return "bg-gray-100"
    if (status < 300) return "bg-green-100 text-green-800"
    if (status < 400) return "bg-blue-100 text-blue-800"
    if (status < 500) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className={cn("space-y-4 w-full max-w-full overflow-hidden", className)}>
      {/* Request Section */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={method} onValueChange={(value: Method) => setMethod(value)}>
            <SelectTrigger className="w-full sm:w-[100px]">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              {methods.map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1"
          />
        </div>

        <div className="space-y-4">
          {/* Headers Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Headers</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHeaders([...headers, { key: "", value: "" }])}
                className="h-8"
              >
                Add Header
              </Button>
            </div>
            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    value={header.key}
                    onChange={(e) => {
                      const newHeaders = [...headers]
                      newHeaders[index].key = e.target.value
                      setHeaders(newHeaders)
                    }}
                    placeholder="Key"
                    className="flex-1"
                  />
                  <Input
                    value={header.value}
                    onChange={(e) => {
                      const newHeaders = [...headers]
                      newHeaders[index].value = e.target.value
                      setHeaders(newHeaders)
                    }}
                    placeholder="Value"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setHeaders(headers.filter((_, i) => i !== index))}
                    className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Body Section - Only show for specific methods */}
          {showBodyTab && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Request Body</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      try {
                        const formatted = JSON.stringify(JSON.parse(body), null, 2)
                        setBody(formatted)
                      } catch (e) {
                        toast.error("Invalid JSON format")
                      }
                    }}
                    className="h-8"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Format JSON
                  </Button>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[200px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                  placeholder="Enter request body (JSON)"
                />
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Recent History */}
      {history.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Recent Requests</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHistory([])}
              className="h-8 text-muted-foreground hover:text-destructive"
            >
              Clear All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {history.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMethod(item.method as Method)
                  setUrl(item.url)
                  toast.success("Request loaded from history")
                }}
                className={cn(
                  "group flex items-center w-full p-2 rounded-md",
                  "hover:bg-accent/50 transition-colors",
                  "border border-border/50",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium shrink-0",
                    item.status ? getStatusColor(item.status) : "bg-gray-100"
                  )}>
                    {item.method}
                  </span>
                  <span className="truncate text-sm text-left text-muted-foreground group-hover:text-foreground">
                    {item.url}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground ml-2 shrink-0">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Response Section */}
      {response && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors whitespace-nowrap",
                  getStatusColor(response.status)
                )}>
                  {response.status} {response.statusText}
                </span>
                {responseTime && (
                  <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                    <Clock className="mr-1 h-4 w-4" />
                    {responseTime}ms
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyResponse}
                  className="hover:bg-accent whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-success mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Response
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="border-t bg-muted/50 p-4 overflow-hidden">
              <div className="relative">
                <pre className="text-sm overflow-x-auto max-h-[400px] font-mono">
                  <code className="block whitespace-pre">
                    {response.error ? (
                      <span className="text-destructive">{response.error}</span>
                    ) : (
                      JSON.stringify(response.data, null, 2)
                    )}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={handleSend}
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Sending..." : "Send Request"}
        </Button>
        <div className="flex items-center gap-2 justify-end">
          <CollectionDialog
            onSave={(collection: CollectionSaveProps) => {
              toast.success("Saved to collection")
            }}
            method={method}
            url={url}
            headers={headers}
            body={body}
          />
          <HistoryDialog
            history={history}
            onSelect={(item: HistoryItem) => {
              setMethod(item.method as Method)
              setUrl(item.url)
              toast.success("Request loaded from history")
            }}
          />
          <SettingsDialog
            settings={settings}
            onSettingsChange={(newSettings: typeof settings) => {
              setSettings(newSettings)
              toast.success("Settings updated")
            }}
          />
        </div>
      </div>
    </div>
  )
}