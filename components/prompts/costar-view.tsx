"use client";

import { usePromptEditor } from "@/lib/hooks/use-prompt-editor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CostarView() {
  const { contents, pattern } = usePromptEditor();

  if (!pattern || !contents.length) return null;

  const costarSections = {
    context: contents.find(c => pattern.sections.find(s => s.id === c.sectionId)?.key === 'costar.context'),
    objective: contents.find(c => pattern.sections.find(s => s.id === c.sectionId)?.key === 'costar.objective'),
    style: contents.find(c => pattern.sections.find(s => s.id === c.sectionId)?.key === 'costar.style'),
    tone: contents.find(c => pattern.sections.find(s => s.id === c.sectionId)?.key === 'costar.tone'),
    audience: contents.find(c => pattern.sections.find(s => s.id === c.sectionId)?.key === 'costar.audience'),
    response: contents.find(c => pattern.sections.find(s => s.id === c.sectionId)?.key === 'costar.response'),
  };

  const formattedPrompt = `Context:
${costarSections.context?.content || ''}

Objective:
${costarSections.objective?.content || ''}

Style:
${costarSections.style?.content || ''}

Tone:
${costarSections.tone?.content || ''}

Audience:
${costarSections.audience?.content || ''}

Response Format:
${costarSections.response?.content || ''}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedPrompt);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">CoSTAR Format</h3>
        <Button size="sm" onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Textarea
            value={formattedPrompt}
            readOnly
            className="min-h-[400px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
} 