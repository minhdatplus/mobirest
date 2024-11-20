import { ThemeProviderProps } from "next-themes/dist/types"

declare module "next-themes/dist/types" {
  export interface ThemeProviderProps {
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
    children?: React.ReactNode
  }
} 