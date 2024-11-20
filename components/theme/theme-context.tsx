"use client"

import * as React from "react"
import { createContext, useContext } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({
  children,
  defaultTheme = "system",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider")
  }
  return context
} 