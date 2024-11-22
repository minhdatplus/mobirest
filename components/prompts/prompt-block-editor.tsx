"use client";

import { usePromptEditor } from "@/lib/hooks/use-prompt-editor";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function PromptBlockEditor() {
  const { contents, pattern, updateContent } = usePromptEditor();

  if (!pattern || !contents.length) {
    return (
      <div className="text-center text-muted-foreground">
        No content blocks available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <Card key={content.id}>
          <CardHeader className="flex flex-row items-center space-x-4 py-2">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
            <div className="flex-1 font-medium">
              {pattern.sections.find(s => s.id === content.sectionId)?.name}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "px-2",
                !content.isEnabled && "text-muted-foreground"
              )}
            >
              {content.isEnabled ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content.content}
              onChange={(e) => updateContent(content.id, e.target.value)}
              className="min-h-[100px]"
              placeholder={`Enter ${pattern.sections.find(s => s.id === content.sectionId)?.name} content...`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 