"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { promptService } from "@/lib/services/prompt-service";
import type { Prompt, PromptContent, PromptPattern } from "@/lib/db/schema";

export function usePromptEditor(promptId?: string) {
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [contents, setContents] = useState<PromptContent[]>([]);
  const [pattern, setPattern] = useState<PromptPattern | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (promptId) {
      loadPrompt(promptId);
    }
  }, [promptId]);

  async function loadPrompt(id: string) {
    try {
      setIsLoading(true);
      const prompt = await db.prompts.get(id);
      if (!prompt) return;

      const promptContents = await db.contents
        .where('promptId')
        .equals(id)
        .sortBy('order');

      const promptPattern = await db.patterns.get(prompt.patternId);

      setActivePrompt(prompt);
      setContents(promptContents);
      setPattern(promptPattern);
    } catch (error) {
      console.error("Error loading prompt:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateContent(contentId: string, newContent: string) {
    try {
      await db.contents.update(contentId, {
        content: newContent,
        updatedAt: new Date()
      });
      
      const updatedContents = await db.contents
        .where('promptId')
        .equals(activePrompt?.id || '')
        .sortBy('order');
        
      setContents(updatedContents);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  }

  async function addVariable() {
    if (!activePrompt) return;

    try {
      const variable: Variable = {
        id: crypto.randomUUID(),
        key: `var_${Date.now()}`,
        name: "New Variable",
        type: "text",
        scope: "prompt",
        scopeId: activePrompt.id,
        isRequired: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.variables.add(variable);
      await loadPrompt(activePrompt.id);
    } catch (error) {
      console.error("Error adding variable:", error);
    }
  }

  async function updateVariable(id: string, data: Partial<Variable>) {
    try {
      await db.variables.update(id, {
        ...data,
        updatedAt: new Date()
      });
      if (activePrompt) {
        await loadPrompt(activePrompt.id);
      }
    } catch (error) {
      console.error("Error updating variable:", error);
    }
  }

  async function deleteVariable(id: string) {
    try {
      await db.variables.delete(id);
      if (activePrompt) {
        await loadPrompt(activePrompt.id);
      }
    } catch (error) {
      console.error("Error deleting variable:", error);
    }
  }

  return {
    activePrompt,
    contents,
    pattern,
    isLoading,
    updateContent,
    loadPrompt,
    addVariable,
    updateVariable,
    deleteVariable,
  };
} 