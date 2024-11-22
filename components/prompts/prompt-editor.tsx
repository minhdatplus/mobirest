"use client";

import { usePromptEditor } from "@/lib/hooks/use-prompt-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptBlockEditor } from "./prompt-block-editor";
import { PromptVariables } from "./prompt-variables";
import { CostarView } from "./costar-view";
import { Skeleton } from "@/components/ui/skeleton";

export function PromptEditor() {
  const { activePrompt, isLoading } = usePromptEditor();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!activePrompt) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a prompt to edit
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{activePrompt.name}</h2>
        {activePrompt.description && (
          <p className="text-sm text-muted-foreground">{activePrompt.description}</p>
        )}
      </div>

      <Tabs defaultValue="blocks">
        <TabsList>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="costar">CoSTAR</TabsTrigger>
        </TabsList>

        <TabsContent value="blocks" className="mt-4">
          <PromptBlockEditor />
        </TabsContent>

        <TabsContent value="variables" className="mt-4">
          <PromptVariables />
        </TabsContent>

        <TabsContent value="costar" className="mt-4">
          <CostarView />
        </TabsContent>
      </Tabs>
    </div>
  );
} 