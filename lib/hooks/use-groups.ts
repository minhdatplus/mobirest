"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import type { Group } from "@/lib/db/schema";
import { toast } from "sonner";

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    try {
      setIsLoading(true);
      const allGroups = await db.getAllGroups();
      setGroups(allGroups);
    } catch (error) {
      console.error("Error loading groups:", error);
      toast.error("Failed to load groups");
    } finally {
      setIsLoading(false);
    }
  }

  async function createGroup(name: string, parentId: number | null = null) {
    try {
      const newGroup = await db.createGroup({
        name,
        parentId
      });
      
      toast.success("Group created successfully");
      await loadGroups();
      return newGroup;
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group");
    }
  }

  async function renameGroup(groupId: number, newName: string) {
    try {
      await db.updateGroup(groupId, { name: newName });
      toast.success("Group renamed successfully");
      await loadGroups();
    } catch (error) {
      console.error("Error renaming group:", error);
      toast.error("Failed to rename group");
    }
  }

  async function deleteGroup(groupId: number) {
    try {
      await db.deleteGroup(groupId);
      toast.success("Group deleted successfully");
      await loadGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error("Failed to delete group");
    }
  }

  return {
    groups,
    isLoading,
    createGroup,
    renameGroup,
    deleteGroup,
    reloadGroups: loadGroups
  };
} 