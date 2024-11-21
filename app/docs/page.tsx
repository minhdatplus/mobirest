'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { BasicGuide } from "./components/basic-guide"
import { AdvancedFeatures } from "./components/advanced-features"
import { AIFeatures } from "./components/ai-features"
import { Customization } from "./components/customization"

export default function DocsPage() {
  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documentation</h1>
        <p className="text-muted-foreground">
          Complete guide to using MobireST - from basics to advanced AI features
        </p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="w-full border-b">
          <TabsTrigger value="basic">Basic Guide</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
          <TabsTrigger value="ai">AI Features</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card className="p-6">
            <BasicGuide />
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card className="p-6">
            <AdvancedFeatures />
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="p-6">
            <AIFeatures />
          </Card>
        </TabsContent>

        <TabsContent value="customization">
          <Card className="p-6">
            <Customization />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 