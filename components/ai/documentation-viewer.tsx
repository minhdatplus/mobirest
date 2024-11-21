'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GeneratedDocumentation } from '@/lib/types/ai-documentation'
import { Download, Code, Book } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateMarkdown, generateOpenAPI } from '@/lib/utils/documentation-formatter'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

interface DocumentationViewerProps {
  documentation: GeneratedDocumentation
  className?: string
}

export function DocumentationViewer({ documentation, className }: DocumentationViewerProps) {
  const [activeFormat, setActiveFormat] = useState<'markdown' | 'openapi'>('markdown')

  if (!documentation) {
    return null
  }

  const downloadDoc = () => {
    const content = activeFormat === 'markdown' 
      ? generateMarkdown(documentation)
      : JSON.stringify(generateOpenAPI(documentation), null, 2)
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `api-documentation.${activeFormat === 'markdown' ? 'md' : 'json'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {documentation.title || 'API Documentation'}
        </h2>
        <div className="flex items-center gap-2">
          <Tabs value={activeFormat} onValueChange={(v) => setActiveFormat(v as 'markdown' | 'openapi')}>
            <TabsList>
              <TabsTrigger value="markdown">
                <Book className="w-4 h-4 mr-2" />
                Markdown
              </TabsTrigger>
              <TabsTrigger value="openapi">
                <Code className="w-4 h-4 mr-2" />
                OpenAPI
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" onClick={downloadDoc}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Tabs value={activeFormat}>
        <TabsContent value="markdown" className="mt-0">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                // Tùy chỉnh styling cho các elements
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                pre: ({node, ...props}) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-auto my-4" {...props} />
                ),
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />
                    : <code className="block" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border" {...props} />
                  </div>
                ),
                th: ({node, ...props}) => (
                  <th className="px-4 py-2 text-left text-sm font-medium bg-muted" {...props} />
                ),
                td: ({node, ...props}) => (
                  <td className="px-4 py-2 text-sm border-t" {...props} />
                )
              }}
            >
              {generateMarkdown(documentation)}
            </ReactMarkdown>
          </div>
        </TabsContent>
        <TabsContent value="openapi" className="mt-0">
          <pre className="p-4 bg-muted rounded-lg overflow-auto">
            <code>{JSON.stringify(generateOpenAPI(documentation), null, 2)}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 