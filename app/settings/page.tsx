'use client'

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AISettings } from "@/components/settings/ai-settings"
import { GeneralSettings } from "@/components/settings/general-settings"
import { ThemeSettings } from "@/components/settings/theme-settings"

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and configurations
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Providers</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <GeneralSettings />
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="p-6">
            <AISettings />
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card className="p-6">
            <ThemeSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 