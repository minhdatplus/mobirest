import { ThemeProviderProps } from "next-themes/dist/types"
import { CSSProperties } from 'react'

declare module "next-themes/dist/types" {
  export interface ThemeProviderProps {
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
    children?: React.ReactNode
  }
}

declare module 'react' {
  interface CSSProperties {
    '--button-color'?: string
  }
} 