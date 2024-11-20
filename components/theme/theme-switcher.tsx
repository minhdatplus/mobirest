"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const THEME_YEARS = [
  { year: 2024, name: "Peach Fuzz", color: "hsl(11, 73%, 77%)", class: "theme-2024" },
  { year: 2023, name: "Viva Magenta", color: "hsl(337, 75%, 47%)", class: "theme-2023" },
  { year: 2022, name: "Very Peri", color: "hsl(248, 53%, 58%)", class: "theme-2022" },
  { year: 2021, name: "Ultimate Gray", color: "hsl(83, 44%, 51%)", class: "theme-2021" },
  { year: 2020, name: "Classic Blue", color: "hsl(213, 62%, 45%)", class: "theme-2020" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [activeYear, setActiveYear] = React.useState<number | null>(null)

  React.useEffect(() => {
    setMounted(true)
    // Restore saved theme year
    const savedYear = localStorage.getItem('theme-year')
    if (savedYear) {
      const year = parseInt(savedYear)
      setActiveYear(year)
      applyThemeYear(year)
    }
  }, [])

  const applyThemeYear = (year: number) => {
    const selectedTheme = THEME_YEARS.find(t => t.year === year)
    if (!selectedTheme) return

    // Remove existing theme classes
    THEME_YEARS.forEach(t => {
      document.documentElement.classList.remove(t.class)
    })

    // Add new theme class
    document.documentElement.classList.add(selectedTheme.class)
    
    // Apply CSS variables directly
    const [hue, saturation, lightness] = selectedTheme.color.match(/\d+/g)!.map(Number)
    document.documentElement.style.setProperty('--primary', `${hue} ${saturation}% ${lightness}%`)
    document.documentElement.style.setProperty('--primary-hsl', selectedTheme.color)
    
    // Determine text color based on background lightness
    const textColor = lightness > 60 ? "222 47% 11%" : "0 0% 100%"
    document.documentElement.style.setProperty('--primary-foreground', textColor)
    
    // Update accent colors
    document.documentElement.style.setProperty('--accent', `${hue} ${saturation}% ${Math.max(lightness - 20, 0)}%`)
    document.documentElement.style.setProperty('--accent-foreground', textColor)
    
    // Save to localStorage
    localStorage.setItem('theme-year', year.toString())
    setActiveYear(year)

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { 
        theme: selectedTheme,
        variables: {
          primary: selectedTheme.color,
          foreground: textColor
        }
      } 
    }))
  }

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Palette className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Pantone Colors</DropdownMenuLabel>
        {THEME_YEARS.map((theme) => (
          <DropdownMenuItem
            key={theme.year}
            onClick={() => applyThemeYear(theme.year)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              activeYear === theme.year && "bg-accent"
            )}
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: theme.color }}
            />
            <span>{theme.name} ({theme.year})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 