"use client";

import { Button } from "@/components/ui/button";
import { useGroups } from "@/lib/hooks/use-groups";
import { 
  Plus, 
  Folder, 
  ChevronRight, 
  ChevronDown,
  MoreHorizontal,
  FolderPlus,
  Pencil,
  Trash2,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrompts } from "@/lib/hooks/use-prompts";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputDialog } from "@/components/prompts/dialogs/input-dialog";
import { ConfirmDialog } from "@/components/prompts/dialogs/confirm-dialog";
import type { Prompt } from "@/lib/db/schema";
import { db } from "@/lib/db";

interface GroupNode {
  id: number;
  name: string;
  level: number;
  parentId: number | null;
  children: GroupNode[];
  prompts: Prompt[];
}

export function PromptGroups() {
  const { groups, isLoading, createGroup, renameGroup, deleteGroup } = useGroups();
  const { createPrompt, prompts, deletePrompt, getPromptsByGroup } = usePrompts({ groupId: null, searchQuery: null });
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGroupId = searchParams.get('groupId');
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
  const [inputDialog, setInputDialog] = useState({
    isOpen: false,
    title: "",
    defaultValue: "",
    onSubmit: (value: string) => {},
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });
  const [groupPrompts, setGroupPrompts] = useState<Map<number, Prompt[]>>(new Map());

  // Transform flat groups into tree structure
  const groupsTree = useMemo(() => {
    const rootGroup: GroupNode = {
      id: 0,
      name: "Root",
      level: 0,
      parentId: null,
      children: [],
      prompts: []
    };

    const groupsMap = new Map<number, GroupNode>();
    groupsMap.set(0, rootGroup);

    // First pass: create all nodes
    groups.forEach(group => {
      groupsMap.set(group.id, {
        ...group,
        level: 0,
        children: [],
        prompts: []
      });
    });

    // Second pass: build tree and calculate levels
    groups.forEach(group => {
      const node = groupsMap.get(group.id)!;
      const parent = groupsMap.get(group.parentId || 0)!;
      
      if (parent) {
        node.level = parent.level + 1;
        if (node.level <= 3) { // Only add if within 3 levels
          parent.children.push(node);
        }
      }
    });

    return rootGroup;
  }, [groups]);

  // Load prompts cho mỗi group
  useEffect(() => {
    const loadGroupPrompts = async () => {
      const newGroupPrompts = new Map<number, Prompt[]>();
      
      for (const group of groups) {
        const groupPrompts = await getPromptsByGroup(group.id);
        newGroupPrompts.set(group.id, groupPrompts);
      }
      
      setGroupPrompts(newGroupPrompts);
    };

    if (groups.length > 0) {
      loadGroupPrompts();
    }
  }, [groups]);

  // Cập nhật prompts trong group tree
  useEffect(() => {
    if (groups.length > 0) {
      const node = findGroupNode(groupsTree, Number(selectedGroupId));
      if (node) {
        node.prompts = prompts.filter(p => p.groupId === node.id);
      }
    }
  }, [groups, prompts, selectedGroupId, groupsTree]);

  // Helper function to find group node
  const findGroupNode = (root: GroupNode, id: number): GroupNode | null => {
    if (root.id === id) return root;
    for (const child of root.children) {
      const found = findGroupNode(child, id);
      if (found) return found;
    }
    return null;
  };

  const handleCreatePrompt = async (groupId: number) => {
    try {
      const newPrompt = await createPrompt(groupId);
      
      if (newPrompt?.id) {
        // Tự động expand group chứa prompt mới
        setExpandedGroups(prev => {
          if (!prev.includes(groupId)) {
            return [...prev, groupId];
          }
          return prev;
        });

        // Cập nhật state groupPrompts
        setGroupPrompts(prev => {
          const newMap = new Map(prev);
          const currentPrompts = newMap.get(groupId) || [];
          newMap.set(groupId, [...currentPrompts, newPrompt]);
          return newMap;
        });

        // Redirect to new prompt
        const params = new URLSearchParams(searchParams);
        params.set('groupId', groupId.toString());
        params.set('promptId', newPrompt.id.toString());
        router.push(`/prompts?${params.toString()}`);
      }
    } catch (error) {
      console.error("Error handling prompt creation:", error);
    }
  };

  const toggleGroup = (groupId: number) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleCreateGroup = async (parentId: number | null) => {
    setInputDialog({
      isOpen: true,
      title: "Create New Group",
      defaultValue: "",
      onSubmit: async (name) => {
        if (name) {
          await createGroup(name, parentId);
          setInputDialog({ ...inputDialog, isOpen: false });
        }
      },
    });
  };

  const handleRenameGroup = async (groupId: number, currentName: string) => {
    setInputDialog({
      isOpen: true,
      title: "Rename Group",
      defaultValue: currentName,
      onSubmit: async (newName) => {
        if (newName && newName !== currentName) {
          await renameGroup(groupId, newName);
          setInputDialog({ ...inputDialog, isOpen: false });
        }
      },
    });
  };

  const handleDeleteGroup = async (groupId: number) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Group",
      description: "Are you sure you want to delete this group and all its contents?",
      onConfirm: async () => {
        await deleteGroup(groupId);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const handleDeletePrompt = async (promptId: string) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;
    await deletePrompt(promptId);
  };

  const renderGroupNode = (node: GroupNode) => {
    const isExpanded = expandedGroups.includes(node.id);
    const hasChildren = node.children.length > 0;
    const isSelected = selectedGroupId === node.id.toString();
    const nodePrompts = groupPrompts.get(node.id) || [];

    return (
      <div key={node.id} style={{ marginLeft: node.level * 16 }}>
        <div className={cn(
          "flex items-center justify-between p-2 rounded-md hover:bg-muted/50 group",
          isSelected && "bg-muted"
        )}>
          <div 
            className="flex items-center gap-2 flex-1 cursor-pointer"
            onClick={() => toggleGroup(node.id)}
          >
            {hasChildren && (
              <div className="h-4 w-4 flex items-center justify-center">
                {isExpanded ? 
                  <ChevronDown className="h-3 w-3" /> : 
                  <ChevronRight className="h-3 w-3" />
                }
              </div>
            )}
            <Folder className="h-4 w-4" />
            <span className="text-sm">{node.name}</span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Group Actions */}
            {node.id !== 0 && ( // Don't show for root
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRenameGroup(node.id, node.name)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDeleteGroup(node.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Create Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleCreatePrompt(node.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Prompt
                </DropdownMenuItem>
                {node.level < 3 && (
                  <DropdownMenuItem onClick={() => handleCreateGroup(node.id)}>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Group
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && (
          <div className="ml-4">
            {/* Prompts */}
            {nodePrompts.map(prompt => (
              <div 
                key={prompt.id}
                className="flex items-center justify-between p-2 text-sm hover:bg-muted/50 group/prompt"
              >
                <span 
                  className="flex items-center gap-2 flex-1 cursor-pointer"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('groupId', node.id.toString());
                    params.set('promptId', prompt.id.toString());
                    router.push(`/prompts?${params.toString()}`);
                  }}
                >
                  <MessageSquare className="h-3 w-3" />
                  {prompt.name}
                </span>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 opacity-0 group-hover/prompt:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePrompt(prompt.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {/* Child Groups */}
            {node.children.map(child => renderGroupNode(child))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-md border p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Prompt Groups</h2>
          {/* Root level actions */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCreateGroup(null)}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            New Group
          </Button>
        </div>
        <div className="p-2">
          {renderGroupNode(groupsTree)}
        </div>
      </div>
      <InputDialog
        {...inputDialog}
        onClose={() => setInputDialog({ ...inputDialog, isOpen: false })}
      />
      <ConfirmDialog
        {...confirmDialog}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </>
  );
} 