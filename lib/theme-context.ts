import { createContext, useContext } from 'react'
import { ThemeColor } from './themes'

interface ThemeContextType {
  currentTheme: ThemeColor | null
  setCurrentTheme: (theme: ThemeColor) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: null,
  setCurrentTheme: () => {},
})

export const useThemeContext = () => useContext(ThemeContext) 