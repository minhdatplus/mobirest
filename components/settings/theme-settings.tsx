'use client'

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Palette } from "lucide-react"
import { useEffect, useState } from "react"
import { useAIProviderStore } from '@/lib/stores/ai-provider-store'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { AI_PROVIDERS } from '@/lib/constants/ai-providers'

const THEME_YEARS = [
  { year: "2024", name: "Peach Fuzz", color: "#ff8c7f", hsl: "hsl(6, 100%, 75%)" },
  { year: "2023", name: "Viva Magenta", color: "#BE3455", hsl: "hsl(343, 57%, 47%)" },
  { year: "2022", name: "Very Peri", color: "#6667AB", hsl: "hsl(239, 31%, 54%)" },
  { year: "2021", name: "Ultimate Gray", color: "#939597", hsl: "hsl(210, 2%, 58%)" },
  { year: "2020", name: "Classic Blue", color: "#0F4C81", hsl: "hsl(210, 79%, 28%)" },
] as const

export function ThemeSettings() {
  const { defaultProvider, setDefaultProvider, isHydrated } = useAIProviderStore()
  const [currentTheme, setCurrentTheme] = useState("2024")
  const [previewTheme, setPreviewTheme] = useState<string | null>(null)

  useEffect(() => {
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

  const getThemePreviewStyle = (year: string) => {
    const theme = THEME_YEARS.find(t => t.year === year)
    if (!theme) return {}
    
    return {
      '--theme-preview-color': theme.hsl,
      '--theme-preview-foreground': 
        year === "2024" || year === "2021" 
          ? "hsl(222, 47%, 11%)" 
          : "hsl(0, 0%, 100%)",
    } as React.CSSProperties
  }

  if (!isHydrated) return null

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
              <div 
                key={theme.year}
                className="theme-preview-container"
                style={getThemePreviewStyle(theme.year)}
              >
                <RadioGroupItem
                  value={theme.year}
                  id={theme.year}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={theme.year}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-[var(--theme-preview-color)] hover:text-[var(--theme-preview-foreground)] peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-200"
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
            setDefaultProvider(value as AIProviderId)
            toast.success(`Default AI provider set to ${value}`)
          }}
        >
          <SelectTrigger>
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
    </div>
  )
} 