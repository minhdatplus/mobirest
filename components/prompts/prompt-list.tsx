"use client";

import { usePrompts } from "@/lib/hooks/use-prompts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function PromptList() {
  const { prompts, isLoading, searchPrompts, createPrompt } = usePrompts();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            className="pl-9"
            onChange={(e) => searchPrompts(e.target.value)}
          />
        </div>
        <Select onValueChange={(value) => createPrompt(value)}>
          <SelectTrigger className="w-auto">
            <Plus className="h-4 w-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="costar">CoSTAR Prompt</SelectItem>
            <SelectItem value="tag">TAG Prompt</SelectItem>
            <SelectItem value="bab">BAB Prompt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="p-3 border rounded-lg hover:bg-accent cursor-pointer"
          >
            <h3 className="font-medium">{prompt.name}</h3>
            {prompt.description && (
              <p className="text-sm text-muted-foreground">{prompt.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 