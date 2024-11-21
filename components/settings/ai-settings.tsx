'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"

export function AISettings() {
  const [settings, setSettings] = useState({
    defaultProvider: 'openai',
    openaiApiKey: '',
    geminiApiKey: '',
    anthropicApiKey: '',
    groqApiKey: '',
  })

  const handleSave = () => {
    // In production, you should send these to your backend
    localStorage.setItem('aiSettings', JSON.stringify(settings))
    toast.success('AI settings saved successfully')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">AI Provider Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure AI providers and their API keys
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Default AI Provider</Label>
          <Select
            value={settings.defaultProvider}
            onValueChange={(value) =>
              setSettings(prev => ({ ...prev, defaultProvider: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select default provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="gemini">Google Gemini</SelectItem>
              <SelectItem value="anthropic">Anthropic</SelectItem>
              <SelectItem value="groq">Groq</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="openai-key">OpenAI API Key</Label>
          <Input
            id="openai-key"
            type="password"
            value={settings.openaiApiKey}
            onChange={(e) =>
              setSettings(prev => ({ ...prev, openaiApiKey: e.target.value }))
            }
            placeholder="sk-..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gemini-key">Google Gemini API Key</Label>
          <Input
            id="gemini-key"
            type="password"
            value={settings.geminiApiKey}
            onChange={(e) =>
              setSettings(prev => ({ ...prev, geminiApiKey: e.target.value }))
            }
          />
        </div>

        {/* Add more provider settings as needed */}
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
} 