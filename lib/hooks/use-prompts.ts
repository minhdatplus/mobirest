"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import type { Prompt } from "@/lib/db/schema";
import { toast } from "sonner";

interface UsePromptsParams {
  groupId: string | null;
  searchQuery: string | null;
}

export function usePrompts({ groupId, searchQuery }: UsePromptsParams) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPrompts();
  }, [groupId, searchQuery]);

  async function loadPrompts() {
    try {
      setIsLoading(true);
      
      if (groupId) {
        const groupPrompts = await db.getPromptsByGroup(Number(groupId));
        setPrompts(groupPrompts);
      } else {
        const allPrompts = await db.getAllPrompts();
        const filteredPrompts = searchQuery 
          ? allPrompts.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : allPrompts;
        setPrompts(filteredPrompts);
      }
    } catch (error) {
      console.error("Error loading prompts:", error);
      toast.error("Failed to load prompts");
    } finally {
      setIsLoading(false);
    }
  }

  async function createPrompt(groupId?: number) {
    try {
      const newPrompt = await db.createPrompt({
        name: "New Prompt",
        content: "",
        groupId: groupId || null,
        variables: []
      });
      
      toast.success("Prompt created successfully");
      await loadPrompts();
      return newPrompt;
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast.error("Failed to create prompt");
    }
  }

  async function deletePrompt(promptId: string) {
    try {
      await db.deletePrompt(promptId);
      toast.success("Prompt deleted successfully");
      await loadPrompts();
    } catch (error) {
      console.error("Error deleting prompt:", error);
      toast.error("Failed to delete prompt");
    }
  }

  async function getPromptsByGroup(groupId: number) {
    try {
      return await db.getPromptsByGroup(groupId);
    } catch (error) {
      console.error("Error getting prompts by group:", error);
      toast.error("Failed to load group prompts");
      return [];
    }
  }

  return {
    prompts,
    isLoading,
    createPrompt,
    deletePrompt,
    getPromptsByGroup,
    reloadPrompts: loadPrompts
  };
} 