import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md bg-muted/30 px-3 py-2 text-sm",
          "ring-offset-background placeholder:text-muted-foreground",
          
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2",
          
          // Hover styles
          "hover:bg-muted/40",
          
          // Disabled styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          
          // Input types specific styles
          "[&[type='file']]:border-0 [&[type='file']]:bg-transparent",
          "[&[type='file']]:text-sm [&[type='file']]:font-medium",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
