import { useEffect, useState } from 'react'

export interface ThemeColor {
  year: number
  name: string
  color: string
  class: string
  variables: Record<string, string>
}

export const THEME_YEARS: ThemeColor[] = [
  {
    year: 2024,
    name: "Peach Fuzz",
    color: "hsl(11, 73%, 77%)",
    class: "theme-2024",
    variables: {
      '--primary': 'hsl(11, 73%, 77%)',
      '--primary-foreground': 'hsl(222, 47%, 11%)',
      '--secondary': 'hsl(24, 54%, 87%)',
      '--secondary-foreground': 'hsl(222, 47%, 11%)',
      '--accent': 'hsl(11, 40%, 60%)',
      '--accent-foreground': 'hsl(0, 0%, 100%)',
    }
  },
  {
    year: 2023,
    name: "Viva Magenta",
    color: "hsl(337, 75%, 47%)",
    class: "theme-2023",
    variables: {
      '--primary': 'hsl(337, 75%, 47%)',
      '--primary-foreground': 'hsl(0, 0%, 100%)',
      '--secondary': 'hsl(337, 75%, 37%)',
      '--secondary-foreground': 'hsl(0, 0%, 100%)',
      '--accent': 'hsl(337, 75%, 57%)',
      '--accent-foreground': 'hsl(0, 0%, 100%)',
    }
  },
  {
    year: 2022,
    name: "Very Peri",
    color: "hsl(248, 53%, 58%)",
    class: "theme-2022",
    variables: {
      '--primary': 'hsl(248, 53%, 58%)',
      '--primary-foreground': 'hsl(0, 0%, 100%)',
      '--secondary': 'hsl(248, 53%, 48%)',
      '--secondary-foreground': 'hsl(0, 0%, 100%)',
      '--accent': 'hsl(248, 53%, 68%)',
      '--accent-foreground': 'hsl(222, 47%, 11%)',
    }
  },
  {
    year: 2021,
    name: "Ultimate Gray & Illuminating",
    color: "hsl(83, 44%, 51%)",
    class: "theme-2021",
    variables: {
      '--primary': 'hsl(83, 44%, 51%)',
      '--primary-foreground': 'hsl(222, 47%, 11%)',
      '--secondary': 'hsl(84, 0%, 88%)',
      '--secondary-foreground': 'hsl(222, 47%, 11%)',
      '--accent': 'hsl(83, 44%, 41%)',
      '--accent-foreground': 'hsl(0, 0%, 100%)',
    }
  },
  {
    year: 2020,
    name: "Classic Blue",
    color: "hsl(213, 62%, 45%)",
    class: "theme-2020",
    variables: {
      '--primary': 'hsl(213, 62%, 45%)',
      '--primary-foreground': 'hsl(0, 0%, 100%)',
      '--secondary': 'hsl(213, 62%, 35%)',
      '--secondary-foreground': 'hsl(0, 0%, 100%)',
      '--accent': 'hsl(213, 62%, 55%)',
      '--accent-foreground': 'hsl(0, 0%, 100%)',
    }
  }
]

export function useThemeColor() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor | null>(null)

  useEffect(() => {
    // Restore saved theme
    const savedYear = localStorage.getItem('pantone-year')
    if (savedYear) {
      const theme = THEME_YEARS.find(t => t.year === parseInt(savedYear))
      if (theme) {
        applyTheme(theme)
      }
    }
  }, [])

  const applyTheme = (theme: ThemeColor) => {
    // Remove all theme classes
    THEME_YEARS.forEach(t => {
      document.documentElement.classList.remove(t.class)
    })

    // Add new theme class
    document.documentElement.classList.add(theme.class)

    // Apply CSS variables
    Object.entries(theme.variables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    setCurrentTheme(theme)
    localStorage.setItem('pantone-year', theme.year.toString())
  }

  return {
    currentTheme,
    setTheme: applyTheme,
    themes: THEME_YEARS
  }
} 