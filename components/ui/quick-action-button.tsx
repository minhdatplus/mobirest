import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface QuickActionButtonProps {
  icon: React.ReactNode
  onClick: () => void
  className?: string
}

export function QuickActionButton({
  icon,
  onClick,
  className
}: QuickActionButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "hover:bg-accent/50 active:bg-accent/70",
        className
      )}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
} 