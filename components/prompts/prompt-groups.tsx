"use client";

import { useEffect } from "react";
import { usePromptGroups } from "@/lib/hooks/use-prompt-groups";
import { Button } from "@/components/ui/button";
import { Plus, Folder, MoreVertical } from "lucide-react";
import { TreeView } from "@/components/ui/tree-view";
import { Skeleton } from "@/components/ui/skeleton";
import { usePromptStore } from "@/lib/stores/prompt-store";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { events } from "@/lib/events";

export function PromptGroups() {
  const { groups, isLoading, createGroup, updateGroup, deleteGroup, reloadGroups } = usePromptGroups();
  const { activeGroupId, setActiveGroupId } = usePromptStore();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    events.on('database.reset', () => {
      reloadGroups();
    });
    
    return () => {
      events.off('database.reset', reloadGroups);
    };
  }, [reloadGroups]);

  if (isLoading) {
    return (
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    );
  }

  const handleCreateGroup = async (parentId?: number) => {
    try {
      await createGroup(parentId);
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  const handleStartEdit = (group: any) => {
    setEditingId(group.id);
    setEditingName(group.name);
  };

  const handleSaveEdit = async (id: number) => {
    await updateGroup(id, { name: editingName });
    setEditingId(null);
  };

  const renderItem = (group: any) => (
    <div className="flex items-center gap-2 p-2 w-full">
      <Folder className="h-4 w-4" />
      {editingId === group.id ? (
        <Input
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          onBlur={() => handleSaveEdit(group.id)}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(group.id)}
          className="h-6 py-1"
          autoFocus
        />
      ) : (
        <>
          <span className="text-sm flex-1">{group.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStartEdit(group)}>
                Rename
              </DropdownMenuItem>
              {group.level < 2 && (
                <DropdownMenuItem onClick={() => handleCreateGroup(group.id)}>
                  Add Subgroup
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => deleteGroup(group.id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Groups</h2>
        <Button 
          size="sm" 
          onClick={() => handleCreateGroup()}
          disabled={isLoading}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Group
        </Button>
      </div>
      
      {groups.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No groups yet. Create your first group!
        </div>
      ) : (
        <TreeView
          items={groups}
          activeId={activeGroupId}
          onSelect={setActiveGroupId}
          renderItem={renderItem}
        />
      )}
    </div>
  );
} 