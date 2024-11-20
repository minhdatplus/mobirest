"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-[calc(2.5rem/2)]", // 40px height = 20px radius
        xs: "h-7 px-2 text-xs rounded-[calc(1.75rem/2)]", // 28px height = 14px radius
        sm: "h-9 px-3 rounded-[calc(2.25rem/2)]", // 36px height = 18px radius
        lg: "h-11 px-8 rounded-[calc(2.75rem/2)]", // 44px height = 22px radius
        xl: "h-12 px-10 text-base rounded-[calc(3rem/2)]", // 48px height = 24px radius
        
        // Icon buttons - perfect circle
        icon: "h-10 w-10 rounded-full", // 40x40px = circle
        'icon-xs': "h-7 w-7 rounded-full", // 28x28px = circle
        'icon-sm': "h-9 w-9 rounded-full", // 36x36px = circle
        'icon-lg': "h-11 w-11 rounded-full", // 44x44px = circle
        'icon-xl': "h-12 w-12 rounded-full", // 48x48px = circle
      },
      roundedness: {
        none: "rounded-none",
        sm: "rounded-[calc(var(--height)/6)]", // 25% of height
        md: "rounded-[calc(var(--height)/5)]", // 33% of height
        lg: "rounded-[calc(var(--height)/4)]", // 50% of height
        full: "rounded-full",
      },
      width: {
        default: "w-auto",
        full: "w-full",
        icon: "aspect-square", // Maintain square aspect ratio for icon buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      roundedness: "md",
      width: "default",
    },
    // Compound variants for special cases
    compoundVariants: [
      // Icon buttons are always square and fully rounded
      {
        size: ["icon", "icon-xs", "icon-sm", "icon-lg", "icon-xl"],
        class: "p-0 rounded-full aspect-square",
      },
      // Link variant doesn't need rounding
      {
        variant: "link",
        class: "rounded-none h-auto p-0",
      },
      // Ghost variant with reduced padding
      {
        variant: "ghost",
        class: "hover:bg-accent/50",
      },
    ],
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, roundedness, width, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Calculate height based on size for custom CSS variable
    const getHeight = () => {
      switch (size) {
        case 'xs': return '1.75rem' // 28px
        case 'sm': return '2.25rem' // 36px
        case 'lg': return '2.75rem' // 44px
        case 'xl': return '3rem'    // 48px
        default: return '2.5rem'    // 40px
      }
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, roundedness, width, className }))}
        ref={ref}
        style={{
          ...style,
          '--height': getHeight(),
        } as React.CSSProperties}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
