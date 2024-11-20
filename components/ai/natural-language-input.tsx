'use client'

import { useState } from 'react'
import { useAI } from '@/lib/ai-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Wand2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function NaturalLanguageInput() {
  const [query, setQuery] = useState('')
  const { processNaturalLanguage, isProcessing, selectedProvider, setSelectedProvider } = useAI()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    await processNaturalLanguage(query)
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Describe your API request in natural language
            </p>
          </div>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select AI Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Get all users from api.example.com"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
} 