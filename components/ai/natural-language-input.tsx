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
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { AI_PROVIDERS } from '@/lib/constants/ai-providers'

export function NaturalLanguageInput() {
  const [query, setQuery] = useState('')
  const { processNaturalLanguage, isProcessing, selectedProvider, setSelectedProvider } = useAI()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    await processNaturalLanguage(query)
  }

  const suggestions = [
    "Get all users with sample data",
    "Create new user with sample data",
    "Update user profile with sample data",
    "Delete user"
  ]

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
              <SelectValue placeholder="Select AI provider" />
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
        
        <div className="flex gap-2">
          <Command className="rounded-lg bg-background shadow-none border-none flex-1">
            <CommandInput
              placeholder="e.g. Get all users"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No suggestions found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {suggestions.map(suggestion => (
                  <CommandItem
                    key={suggestion}
                    onSelect={(value) => setQuery(value)}
                  >
                    {suggestion}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
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