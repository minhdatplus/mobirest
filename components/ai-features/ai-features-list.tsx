"use client";

import { useAIFeatures } from "@/lib/hooks/use-ai-features";
import { AIFeatureCard } from "./ai-feature-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function AIFeaturesList() {
  const { features, isLoading } = useAIFeatures();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <AIFeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  );
} 