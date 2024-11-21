"use client"

import * as React from "react"
import { Send, Save, Clock, Copy, Check, Code, Loader2, RotateCcw, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CollectionDialog } from "./collections/collection-dialog"
import { HistoryDialog } from "./history/history-dialog"
import { SettingsDialog } from "./settings/settings-dialog"
import { HistoryItem, Collection } from "@/types"
import { showToast } from '@/lib/utils/toast-manager'
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAIProviderStore } from '@/lib/stores/ai-provider-store'
import { AI_PROVIDERS } from '@/lib/constants/ai-providers'
import { useSearchParams } from 'next/navigation'
import { useClassicFormStore } from '@/lib/stores/classic-form-store'
import { Method, Header } from '@/lib/stores/classic-form-store'
import { DocumentationViewer } from './ai/documentation-viewer'
import { DocumentationGenerator } from '@/lib/services/documentation-generator'
import { GeneratedDocumentation } from '@/lib/types/ai-documentation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ClientErrorAnalyzer } from '@/lib/services/client-error-analyzer'
import { ErrorAnalysis } from '@/lib/types/error-detection'
import { ErrorDialog } from './error-dialog'

interface ApiTesterProps {
  className?: string
}

type ResponseData = {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  error?: string
}

interface CollectionSaveProps extends Omit<Collection, "id"> {}

export function ApiTester({ className }: ApiTesterProps) {
  const {
    method, url, headers, body,
    setMethod, setUrl, setHeaders, setBody, resetForm
  } = useClassicFormStore()
  
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
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  const [documentation, setDocumentation] = React.useState<GeneratedDocumentation | null>(null)
  const [isGeneratingDocs, setIsGeneratingDocs] = React.useState(false)
  const [errorAnalysis, setErrorAnalysis] = React.useState<ErrorAnalysis | null>(null)
  const errorAnalyzer = new ClientErrorAnalyzer()
  const [showErrorDialog, setShowErrorDialog] = React.useState(false)

  const methods: Method[] = ["GET", "POST", "PUT", "DELETE", "PATCH"]
  const methodsWithBody = ["POST", "PUT", "PATCH"]
  const showBodyTab = methodsWithBody.includes(method)

  // Load transferred request when tab changes to classic
  React.useEffect(() => {
    if (currentTab === 'classic') {
      const loadTransferredRequest = () => {
        const transferredRequest = localStorage.getItem('transferredRequest')
        if (transferredRequest) {
          try {
            const request = JSON.parse(transferredRequest)
            setMethod(request.method as Method)
            setUrl(request.url)
            
            // Convert headers object to array format
            const headerArray = Object.entries(request.headers).map(([key, value]) => ({
              key,
              value: value as string
            }))
            setHeaders(headerArray.length > 0 ? headerArray : [{ key: "Content-Type", value: "application/json" }])
            
            // Format body if exists
            if (request.body) {
              setBody(JSON.stringify(request.body, null, 2))
            }
            
            // Clear transferred request after loading
            localStorage.removeItem('transferredRequest')
            showToast.success('Request loaded from AI Assistant')
          } catch (error) {
            console.error('Error loading transferred request:', error)
            showToast.error('Failed to load transferred request')
          }
        }
      }

      loadTransferredRequest()
    }
  }, [currentTab, setMethod, setUrl, setHeaders, setBody])

  const handleSend = async () => {
    if (!url) {
      showToast.error("Please enter a URL")
      return
    }

    setIsLoading(true)
    try {
      const startTime = performance.now()
      setResponse(null)
      setResponseTime(null)

      const headerObj = headers.reduce((acc: Record<string, string>, h: Header) => {
        if (h.key && h.value) acc[h.key] = h.value
        return acc
      }, {})

      // Tách riêng phần fetch và toast
      const fetchPromise = fetch('/api/proxy', {
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

      // Hiển thị toast trong khi đợi fetch
      showToast.promise(fetchPromise, {
        loading: 'Sending request...',
        success: 'Request completed successfully',
        error: 'Failed to send request'
      })

      // Đợi response và parse JSON
      const response = await fetchPromise
      const responseData = await response.json()
      
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

    } catch (error) {
      const analysis = errorAnalyzer.analyzeError(error)
      setErrorAnalysis(analysis)
      
      // Show error UI with solutions
      if (analysis.solutions.length > 0) {
        showToast.error(analysis.error.message, {
          action: {
            label: 'View Solutions',
            onClick: () => setShowErrorDialog(true)
          }
        })
      } else {
        showToast.error(analysis.error.message)
      }
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

  const handleReset = () => {
    resetForm()
    setResponse(null)
    setResponseTime(null)
    showToast.success("Request form cleared")
  }

  const handleGenerateDocs = async () => {
    if (!response) return

    setIsGeneratingDocs(true)
    try {
      const result = await fetch('/api/ai/generate-docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: url,
          method,
          response: response.data,
          requestData: methodsWithBody.includes(method) ? JSON.parse(body) : undefined
        }),
      })

      if (!result.ok) throw new Error('Failed to generate documentation')

      const { documentation } = await result.json()
      setDocumentation(documentation)
      showToast.success('Documentation generated successfully')
    } catch (error) {
      showToast.error('Failed to generate documentation')
      console.error(error)
    } finally {
      setIsGeneratingDocs(false)
    }
  }

  return (
    <div className={cn("space-y-4 w-full max-w-full overflow-hidden", className)}>
      <Card className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
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
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            className="ml-2 hover:bg-secondary/80"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

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
            {headers.map((header: Header, index: number) => (
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
                  onClick={() => setHeaders(headers.filter((_: Header, i: number) => i !== index))}
                  className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Body Section */}
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
                      showToast.error("Invalid JSON format")
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
                  showToast.success("Request loaded from history")
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
                  onClick={handleGenerateDocs}
                  disabled={isGeneratingDocs}
                >
                  {isGeneratingDocs ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Docs...
                    </>
                  ) : (
                    <>
                      <Book className="h-4 w-4 mr-2" />
                      Generate Docs
                    </>
                  )}
                </Button>
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

            <Tabs defaultValue="response" className="w-full">
              <TabsList className="px-4">
                <TabsTrigger value="response">Response</TabsTrigger>
                <TooltipProvider delayDuration={200} skipDelayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <TabsTrigger 
                          value="documentation" 
                          disabled={!documentation}
                          className="cursor-help"
                        >
                          Documentation
                        </TabsTrigger>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="max-w-[200px]"
                      sideOffset={5}
                      align="center"
                    >
                      {documentation 
                        ? "View API documentation" 
                        : "Click 'Generate Docs' button to create documentation for this endpoint"
                      }
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>

              <TabsContent value="response" className="m-0">
                <div className="bg-muted/50 p-4 overflow-hidden">
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
              </TabsContent>

              <TabsContent value="documentation" className="m-0">
                {documentation && (
                  <DocumentationViewer 
                    documentation={documentation}
                    className="border-0 rounded-none"
                  />
                )}
              </TabsContent>
            </Tabs>
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
              showToast.success("Saved to collection")
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
              showToast.success("Request loaded from history")
            }}
          />
          <SettingsDialog
            settings={settings}
            onSettingsChange={(newSettings: typeof settings) => {
              setSettings(newSettings)
              showToast.success("Settings updated")
            }}
          />
        </div>
      </div>

      {errorAnalysis && (
        <ErrorDialog
          analysis={errorAnalysis}
          onApplyFix={(fix: () => void) => {
            fix()
            setErrorAnalysis(null)
            setShowErrorDialog(false)
          }}
          onClose={() => setShowErrorDialog(false)}
        />
      )}
    </div>
  )
}