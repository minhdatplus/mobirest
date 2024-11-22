"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePrompts } from "@/lib/hooks/use-prompts";
import { useState, useEffect } from "react";
import type { Prompt } from "@/lib/db/schema";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function PromptEditor() {
  const searchParams = useSearchParams();
  const promptId = searchParams.get('promptId');
  const [openPrompts, setOpenPrompts] = useState<Prompt[]>([]);
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const { prompts } = usePrompts({ groupId: null, searchQuery: null });

  useEffect(() => {
    if (promptId) {
      const prompt = prompts.find(p => p.id.toString() === promptId);
      if (prompt && !openPrompts.find(p => p.id === prompt.id)) {
        setOpenPrompts(prev => [...prev, prompt]);
      }
      setActivePromptId(promptId);
    }
  }, [promptId, prompts]);

  const handleCloseTab = (promptId: string) => {
    setOpenPrompts(prev => prev.filter(p => p.id.toString() !== promptId));
    if (activePromptId === promptId) {
      const remaining = openPrompts.filter(p => p.id.toString() !== promptId);
      setActivePromptId(remaining[0]?.id.toString() || null);
    }
  };

  if (!activePromptId) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        Select a prompt to edit
      </div>
    );
  }

  return (
    <Tabs value={activePromptId} className="w-full">
      <TabsList className="w-full justify-start">
        {openPrompts.map(prompt => (
          <div key={prompt.id} className="flex items-center">
            <TabsTrigger 
              value={prompt.id.toString()}
              onClick={() => setActivePromptId(prompt.id.toString())}
              className="relative pr-8"
            >
              {prompt.name}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(prompt.id.toString());
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      
      {openPrompts.map(prompt => (
        <TabsContent key={prompt.id} value={prompt.id.toString()} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input 
              value={prompt.name}
              onChange={() => {}}
              placeholder="Prompt name..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea 
              value={prompt.content}
              onChange={() => {}}
              placeholder="Write your prompt content..."
              className="min-h-[200px]"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
} 