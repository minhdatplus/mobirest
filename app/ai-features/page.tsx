"use client";

import { AIFeaturesList } from "@/components/ai-features/ai-features-list";
import { PageHeader } from "@/components/ui/page-header";

export default function AIFeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="AI Features"
        description="Explore and manage AI capabilities"
      />
      <AIFeaturesList />
    </div>
  );
} 