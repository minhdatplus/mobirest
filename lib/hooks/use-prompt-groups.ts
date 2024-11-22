"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import type { Group } from "@/lib/db/schema";
import { toast } from "sonner";
import { usePromptStore } from "@/lib/stores/prompt-store";

export function usePromptGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setActiveGroupId } = usePromptStore();

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    try {
      setIsLoading(true);
      
      // Get all groups
      const allGroups = await db.getAllGroups();
      console.log("All groups loaded:", allGroups);
      
      // Build tree structure recursively
      function buildGroupTree(parentId: number | null = null): any[] {
        return allGroups
          .filter(g => g.parentId === parentId)
          .sort((a, b) => a.order - b.order)
          .map(group => ({
            ...group,
            children: buildGroupTree(group.id)
          }));
      }

      const groupsTree = buildGroupTree(null);
      console.log("Groups tree:", groupsTree);
      setGroups(groupsTree);
    } catch (error) {
      console.error("Error loading groups:", error);
      toast.error("Failed to load groups");
    } finally {
      setIsLoading(false);
    }
  }

  async function createGroup(parentId?: number) {
    try {
      setIsLoading(true);
      
      // Get parent group if parentId is provided
      const parent = parentId ? await db.getGroup(parentId) : null;
      const level = (parent?.level ?? -1) + 1;
      
      if (level > 2) {
        toast.error("Maximum nesting level reached (2)");
        return;
      }

      // Get siblings for order
      const siblings = await db.getGroupChildren(parentId);
      
      const newGroup = {
        name: "New Group",
        parentId: parentId || null,
        level,
        order: siblings.length
      };

      const groupId = await db.createGroup(newGroup);
      toast.success("Group created");
      
      // Set as active group
      setActiveGroupId(String(groupId));
      
      // Reload groups to update UI
      await loadGroups();
      
      return groupId;
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateGroup(id: number, data: Partial<Group>) {
    try {
      setIsLoading(true);
      
      await db.updateGroup(id, data);
      toast.success("Group updated");
      
      await loadGroups();
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Failed to update group");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteGroup(id: number) {
    try {
      setIsLoading(true);
      
      // Check if group has children
      const children = await db.getGroupChildren(id);
      if (children.length > 0) {
        toast.error("Cannot delete group with children");
        return;
      }
      
      await db.deleteGroup(id);
      toast.success("Group deleted");
      
      setActiveGroupId(undefined);
      await loadGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error("Failed to delete group");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    groups,
    isLoading,
    createGroup,
    updateGroup,
    deleteGroup,
    reloadGroups: loadGroups
  };
} 