"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { promptService } from "@/lib/services/prompt-service";
import type { Prompt } from "@/lib/db/schema";
import { toast } from "sonner";

export function usePrompts(groupId?: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  async function createPrompt(patternId: string) {
    if (!groupId) {
      toast.error("Please select a group first");
      return;
    }
    
    try {
      await db.createPrompt({
        name: "New Prompt",
        content: "",
        groupId: Number(groupId),
        variables: []
      });
      
      toast.success("Prompt created");
      await loadPrompts();
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast.error("Failed to create prompt");
    }
  }

  return {
    prompts,
    isLoading,
    searchPrompts: setSearchQuery,
    createPrompt,
    reloadPrompts: loadPrompts
  };
} 