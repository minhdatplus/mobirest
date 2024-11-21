'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { InteractiveDemo } from './components/interactive-demo'

// Raw content
const gettingStartedContent = `
# Getting Started with MobireST

## What is MobireST?
MobireST is a modern REST API client that helps you test APIs and generate documentation - no coding required!

## Quick Start Guide
1. **Send Your First Request**
   - Choose a method (GET, POST, etc.)
   - Enter your API URL
   - Click "Send"
   - View the response instantly

2. **View & Save Results**
   - See response data nicely formatted
   - Check response time and status
   - Save requests for later use
   - View request history

3. **Generate Documentation**
   - Click "Generate Docs" after a request
   - Get instant API documentation
   - Download in Markdown or OpenAPI format
   - Share with your team

## Key Features
- 🚀 Simple, intuitive interface
- 📝 AI-powered documentation
- 🔄 Request history tracking
- 🌙 Dark/Light theme support

## Try It Yourself
Below is an interactive demo where you can try making API requests:
`

const aiContent = `
# AI Documentation Features

## What It Does
Our AI automatically creates clear, professional API documentation from your requests and responses.

## How to Use
1. **Make an API Request**
   - Send any API request normally
   - Get a successful response

2. **Generate Documentation**
   - Click the "Generate Docs" button
   - Wait a few seconds
   - Get complete documentation!

3. **Use Your Docs**
   - View in Markdown or OpenAPI format
   - Download and share
   - Add to your project

## Tips for Best Results
- Include all necessary headers
- Test with real data examples
- Try both success and error cases

## Example Documentation
Here's an example of generated documentation:
\`\`\`json
{
  "endpoint": "/api/users",
  "method": "GET",
  "description": "Retrieves a list of users",
  "responses": [
    {
      "status": 200,
      "description": "Success",
      "schema": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": "number",
            "name": "string",
            "email": "string"
          }
        }
      }
    }
  ]
}
\`\`\`
`

const customizationContent = `
# Customization Options

## Theme Settings
- Switch between Light & Dark modes
- Matches your system theme
- Persists your preference

## Documentation Settings
- Choose AI provider
- Set output format
- Control example count
- Manage response length

## Request Defaults
- Save common headers
- Set default timeout
- Configure history size
- Organize collections

## Keyboard Shortcuts
| Action | Shortcut |
|--------|----------|
| Send Request | Ctrl/⌘ + Enter |
| Save Request | Ctrl/⌘ + S |
| Clear Form | Ctrl/⌘ + K |
| Format JSON | Ctrl/⌘ + Shift + F |
`

const commonClasses = cn(
  "prose prose-sm max-w-none dark:prose-invert",
  "prose-headings:scroll-m-20",
  "prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tight",
  "prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:mt-10",
  "prose-h3:text-xl prose-h3:font-semibold prose-h3:tracking-tight prose-h3:mt-8",
  "prose-h4:text-lg prose-h4:font-medium prose-h4:tracking-tight",
  "prose-p:leading-7 prose-p:mt-4",
  "prose-ul:mt-4 prose-ul:list-disc prose-ul:pl-6",
  "prose-ol:mt-4 prose-ol:list-decimal prose-ol:pl-6",
  "prose-li:mt-2",
  "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm",
  "prose-pre:rounded-lg prose-pre:border prose-pre:bg-muted prose-pre:p-4"
)

export default function DocsPage() {
  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use MobireST - your AI-powered API testing companion
        </p>
      </div>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList className="w-full border-b bg-transparent p-0">
          <TabsTrigger 
            value="getting-started"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Getting Started
          </TabsTrigger>
          <TabsTrigger 
            value="ai-features"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            AI Features
          </TabsTrigger>
          <TabsTrigger 
            value="customization"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Customization
          </TabsTrigger>
        </TabsList>

        <div className="p-6 border rounded-lg bg-card">
          <TabsContent value="getting-started" className={commonClasses}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {gettingStartedContent}
            </ReactMarkdown>
            <InteractiveDemo />
          </TabsContent>

          <TabsContent value="ai-features" className={commonClasses}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {aiContent}
            </ReactMarkdown>
          </TabsContent>

          <TabsContent value="customization" className={commonClasses}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {customizationContent}
            </ReactMarkdown>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
} 