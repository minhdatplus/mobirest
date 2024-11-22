"use client";

import { PromptGroups } from "@/components/prompts/prompt-groups";
import { PromptEditor } from "@/components/prompts/prompt-editor";
import { PromptsLoadingProvider } from "@/components/providers/prompts-loading-provider";

export default function PromptsPage() {
  return (
    <PromptsLoadingProvider>
      <div className="container mx-auto p-6">
        <div className="flex gap-6">
          {/* Left: Groups Tree */}
          <div className="w-80 shrink-0">
            <PromptGroups />
          </div>

          {/* Right: Editor */}
          <div className="flex-1">
            <PromptEditor />
          </div>
        </div>
      </div>
    </PromptsLoadingProvider>
  );
} 