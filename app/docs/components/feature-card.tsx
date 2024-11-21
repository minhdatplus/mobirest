import { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  className?: string
}

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
  return (
    <Card className={cn("p-6 hover:shadow-lg transition-shadow", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </Card>
  )
} 