import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AIFeature } from "@/lib/types/ai";
import { Badge } from "@/components/ui/badge";

interface AIFeatureCardProps {
  feature: AIFeature;
}

export function AIFeatureCard({ feature }: AIFeatureCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {feature.name}
          <Badge variant={feature.isEnabled ? "success" : "secondary"}>
            {feature.isEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
} 