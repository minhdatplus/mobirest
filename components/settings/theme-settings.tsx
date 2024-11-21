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
import { cn } from "@/lib/utils"

const THEME_YEARS = [
  { 
    year: "2024", 
    name: "Peach Fuzz", 
    color: "#ff8c7f", 
    hsl: "hsl(6, 100%, 75%)",
    description: "A warm and cozy shade that captures the essence of tenderness"
  },
  { 
    year: "2023", 
    name: "Viva Magenta", 
    color: "#BE3455", 
    hsl: "hsl(343, 57%, 47%)",
    description: "A brave and fearless pulsating color"
  },
  { 
    year: "2022", 
    name: "Very Peri", 
    color: "#6667AB", 
    hsl: "hsl(239, 31%, 54%)",
    description: "A dynamic periwinkle blue with violet undertones"
  },
  { 
    year: "2021", 
    name: "Ultimate Gray", 
    color: "#8FB94B", 
    hsl: "hsl(210, 2%, 58%)",
    description: "A solid and dependable foundation"
  },
  { 
    year: "2020", 
    name: "Classic Blue", 
    color: "#0F4C81", 
    hsl: "hsl(210, 79%, 28%)",
    description: "A timeless and enduring blue hue"
  },
] as const

export function ThemeSettings() {
  const { defaultProvider, setDefaultProvider, isHydrated } = useAIProviderStore()
  const [currentTheme, setCurrentTheme] = useState("2024")
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('pantone-theme') || "2024"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (year: string) => {
    THEME_YEARS.forEach(theme => {
      document.documentElement.classList.remove(`theme-${theme.year}`)
    })
    document.documentElement.classList.add(`theme-${year}`)
    localStorage.setItem('pantone-theme', year)
    setCurrentTheme(year)
  }

  const handleThemeChange = (year: string) => {
    applyTheme(year)
    toast.success(`Theme updated to ${THEME_YEARS.find(t => t.year === year)?.name}`)
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {THEME_YEARS.map((theme) => (
              <div 
                key={theme.year}
                onMouseEnter={() => setHoveredTheme(theme.year)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={cn(
                  "group relative rounded-lg overflow-hidden transition-all duration-300",
                  "transform hover:scale-[1.02] hover:shadow-lg",
                  currentTheme === theme.year && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <RadioGroupItem
                  value={theme.year}
                  id={theme.year}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={theme.year}
                  className={cn(
                    "relative flex flex-col h-full",
                    "cursor-pointer rounded-lg border-2 border-muted",
                    "transition-all duration-300",
                    hoveredTheme === theme.year && "border-primary/50"
                  )}
                >
                  {/* Color Preview Bar */}
                  <div 
                    className="h-20 w-full"
                    style={{ backgroundColor: theme.color }}
                  />
                  
                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{theme.name}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {theme.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>

                  {/* Selected Indicator */}
                  {currentTheme === theme.year && (
                    <div className="absolute inset-0 border-2 border-primary rounded-lg">
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary" />
                    </div>
                  )}
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