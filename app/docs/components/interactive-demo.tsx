'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Play } from "lucide-react"
import { Editor } from "@monaco-editor/react"

export function InteractiveDemo() {
  const [demoCode, setDemoCode] = useState(`{
  "method": "GET",
  "url": "https://api.example.com/users",
  "headers": {
    "Content-Type": "application/json"
  }
}`)
  const [demoResponse, setDemoResponse] = useState('')
  const [theme] = useState('vs-dark')

  const runDemo = async () => {
    try {
      const request = JSON.parse(demoCode)
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
      const data = await response.json()
      setDemoResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setDemoResponse(JSON.stringify({ error: 'Invalid request format' }, null, 2))
    }
  }

  return (
    <div className="my-8 rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Try it yourself</h3>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label>Request</Label>
            <Editor
              value={demoCode}
              onChange={(value) => setDemoCode(value || '')}
              language="json"
              theme={theme}
              height="200px"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>
          <div className="flex-1">
            <Label>Response</Label>
            <Editor
              value={demoResponse}
              language="json"
              theme={theme}
              height="200px"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>
        </div>
        
        <Button onClick={runDemo}>
          <Play className="w-4 h-4 mr-2" />
          Run Example
        </Button>
      </div>
    </div>
  )
} 