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
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAIProviderStore } from '@/lib/stores/ai-provider-store'
import { AI_PROVIDERS, type AIProviderId } from '@/lib/constants/ai-providers'
import { useAPIKeysStore } from '@/lib/stores/api-keys-store'

interface AISettings {
  defaultProvider: AIProviderId
  openaiApiKey: string
  geminiApiKey: string
  anthropicApiKey: string
  groqApiKey: string
}

export function AISettings() {
  const { defaultProvider, setDefaultProvider } = useAIProviderStore()
  const { keys, setKey } = useAPIKeysStore()
  const [settings, setSettings] = useState<AISettings>({
    defaultProvider,
    ...keys
  })

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      defaultProvider,
      ...keys
    }))
  }, [defaultProvider, keys])

  const handleSave = () => {
    setDefaultProvider(settings.defaultProvider)
    
    // Save API keys
    AI_PROVIDERS.forEach(provider => {
      const keyName = `${provider.id}ApiKey` as keyof typeof keys
      setKey(provider.id, settings[keyName])
    })
    
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
              {AI_PROVIDERS.map(provider => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* OpenAI Settings */}
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

        {/* Anthropic Settings */}
        <div className="grid gap-2">
          <Label htmlFor="anthropic-key">Anthropic API Key</Label>
          <Input
            id="anthropic-key"
            type="password"
            value={settings.anthropicApiKey}
            onChange={(e) =>
              setSettings(prev => ({ ...prev, anthropicApiKey: e.target.value }))
            }
            placeholder="sk-ant-..."
          />
        </div>

        {/* Gemini Settings */}
        <div className="grid gap-2">
          <Label htmlFor="gemini-key">Google Gemini API Key</Label>
          <Input
            id="gemini-key"
            type="password"
            value={settings.geminiApiKey}
            onChange={(e) =>
              setSettings(prev => ({ ...prev, geminiApiKey: e.target.value }))
            }
            placeholder="AIzaSy..."
          />
        </div>

        {/* Groq Settings */}
        <div className="grid gap-2">
          <Label htmlFor="groq-key">Groq API Key</Label>
          <Input
            id="groq-key"
            type="password"
            value={settings.groqApiKey}
            onChange={(e) =>
              setSettings(prev => ({ ...prev, groqApiKey: e.target.value }))
            }
            placeholder="gsk-..."
          />
        </div>
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
} 