'use client'

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Palette } from "lucide-react"
import { useEffect, useState } from "react"
import { useAIProviderStore } from '@/lib/stores/ai-provider-store'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const THEME_YEARS = [
  { year: "2024", name: "Peach Fuzz", color: "#ff8c7f" },
  { year: "2023", name: "Viva Magenta", color: "#BE3455" },
  { year: "2022", name: "Very Peri", color: "#6667AB" },
  { year: "2021", name: "Ultimate Gray", color: "#939597" },
  { year: "2020", name: "Classic Blue", color: "#0F4C81" },
]

export function ThemeSettings() {
  const { defaultProvider, setDefaultProvider, isHydrated } = useAIProviderStore()
  const [currentTheme, setCurrentTheme] = useState("2024")

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('pantone-theme') || "2024"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (year: string) => {
    // Remove all theme classes
    THEME_YEARS.forEach(theme => {
      document.documentElement.classList.remove(`theme-${theme.year}`)
    })
    // Add new theme class
    document.documentElement.classList.add(`theme-${year}`)
    // Save to localStorage
    localStorage.setItem('pantone-theme', year)
    setCurrentTheme(year)
  }

  const handleThemeChange = (year: string) => {
    applyTheme(year)
    toast.success(`Theme updated to ${THEME_YEARS.find(t => t.year === year)?.name}`)
  }

  // Load initial value from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('ai-provider-storage')
    if (stored) {
      try {
        const { defaultProvider } = JSON.parse(stored)
        setDefaultProvider(defaultProvider)
      } catch (e) {
        console.error('Error loading stored provider:', e)
      }
    }
  }, [setDefaultProvider])

  if (!isHydrated) {
    return null // hoặc loading state
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Color Theme</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred Pantone Color of the Year theme
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Pantone Color of the Year</Label>
          <RadioGroup
            value={currentTheme}
            onValueChange={handleThemeChange}
            className="grid grid-cols-3 gap-4"
          >
            {THEME_YEARS.map((theme) => (
              <div key={theme.year}>
                <RadioGroupItem
                  value={theme.year}
                  id={theme.year}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={theme.year}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Palette 
                    className="mb-2 h-6 w-6" 
                    style={{ color: theme.color }}
                  />
                  <span>{theme.name}</span>
                  <span className="text-xs text-muted-foreground">{theme.year}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Default AI Provider</Label>
        <Select 
          value={defaultProvider}
          onValueChange={(value) => {
            setDefaultProvider(value)
            // Đảm bảo giá trị được lưu ngay lập tức
            localStorage.setItem('ai-provider-storage', JSON.stringify({ defaultProvider: value }))
            toast.success(`Default AI provider set to ${value}`)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select AI provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai">OpenAI</SelectItem>
            <SelectItem value="anthropic">Anthropic</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
            <SelectItem value="groq">Groq</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 