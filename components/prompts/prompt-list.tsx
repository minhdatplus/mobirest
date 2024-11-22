"use client";

import { usePrompts } from "@/lib/hooks/use-prompts";
import { useSearchParams } from "next/navigation";
import { PromptListSkeleton } from "./prompt-list-skeleton";
import { PromptListItem } from "./prompt-list-item";

interface UsePromptsParams {
  groupId: string | null;
  searchQuery: string | null;
}

export function PromptList() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');
  const searchQuery = searchParams.get('q');
  
  const { prompts, isLoading } = usePrompts({
    groupId,
    searchQuery
  } as UsePromptsParams);

  if (isLoading) return <PromptListSkeleton />;

  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold">
          {groupId ? 'Group Prompts' : 'All Prompts'}
          <span className="ml-2 text-muted-foreground text-sm">
            ({prompts.length})
          </span>
        </h2>
      </div>
      
      <div className="divide-y">
        {prompts.map((prompt) => (
          <PromptListItem key={prompt.id} prompt={prompt} />
        ))}
        
        {prompts.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No prompts found
          </div>
        )}
      </div>
    </div>
  );
} 