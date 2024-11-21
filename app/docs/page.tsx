'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { BasicGuide } from "./components/basic-guide"
import { AdvancedFeatures } from "./components/advanced-features"
import { AIFeatures } from "./components/ai-features"
import { Customization } from "./components/customization"
import { BlogLayout } from "./components/blog-layout"
import { DocsSidebar } from "./components/docs-sidebar"
import { TableOfContents } from "./components/table-of-contents"
import { VideoTutorial } from "./components/video-tutorial"
import { InteractiveDemo } from "./components/interactive-demo"
import { FeatureCard } from "./components/feature-card"
import { Settings, Link } from "lucide-react"

export default function DocsPage() {
  return (
    <BlogLayout
      sidebar={<DocsSidebar />}
      toc={<TableOfContents />}
    >
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <h1 className="text-4xl font-bold mb-4">MobireST Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Complete guide to using MobireST - from basics to advanced AI features
          </p>
          
          <VideoTutorial 
            title="Quick Start Guide"
            videoId="xyz123"
          />
        </section>

        {/* Getting Started */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
          <div className="prose prose-lg max-w-none">
            <BasicGuide />
          </div>
          <InteractiveDemo />
        </section>

        {/* Advanced Features */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Advanced Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              title="Environment Variables"
              description="..."
              icon={Settings}
            />
            <FeatureCard
              title="Request Chaining"
              description="..."
              icon={Link}
            />
            {/* More feature cards */}
          </div>
        </section>

        {/* AI Features */}
        <section>
          <h2 className="text-3xl font-bold mb-6">AI-Powered Features</h2>
          <Tabs defaultValue="docs">
            <TabsList>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
            </TabsList>
            <TabsContent value="docs">
              <AIFeatures />
              <InteractiveDemo />
            </TabsContent>
            {/* Other tabs content */}
          </Tabs>
        </section>
      </div>
    </BlogLayout>
  )
} 