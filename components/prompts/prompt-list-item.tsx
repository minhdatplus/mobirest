import { Prompt } from "@/lib/types/prompt";

interface PromptListItemProps {
  prompt: Prompt;
}

export function PromptListItem({ prompt }: PromptListItemProps) {
  return (
    <div className="p-4 hover:bg-muted/50 cursor-pointer">
      <h3 className="font-medium">{prompt.name}</h3>
      <p className="text-sm text-muted-foreground truncate">
        {prompt.content}
      </p>
    </div>
  );
} 