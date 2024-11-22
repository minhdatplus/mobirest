import { db } from '@/lib/db';
import type { Group, Prompt } from './schema';

export const promptService = {
  // Group operations
  async createGroup(data: Partial<Group>): Promise<number> {
    try {
      console.log("Creating group with data:", data);
      
      const group = {
        name: data.name || 'New Group',
        parentId: data.parentId ?? null,
        level: data.level ?? 0,
        order: data.order ?? 0
      };
      
      console.log("Constructed group:", group);
      
      const id = await db.createGroup(group);
      console.log("Added group to database, id:", id);
      
      return id;
    } catch (error) {
      console.error("Error in createGroup:", error);
      throw error;
    }
  },

  async updateGroup(id: number, data: Partial<Group>): Promise<void> {
    try {
      await db.groups.update(id, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Error in updateGroup:", error);
      throw error;
    }
  },

  async deleteGroup(id: number): Promise<void> {
    try {
      // Delete all child groups
      const children = await db.getGroupChildren(id);
      for (const child of children) {
        await this.deleteGroup(child.id);
      }

      // Delete all prompts in this group
      const prompts = await db.prompts
        .where('groupId')
        .equals(id)
        .toArray();
        
      for (const prompt of prompts) {
        await this.deletePrompt(prompt.id);
      }

      await db.groups.delete(id);
    } catch (error) {
      console.error("Error in deleteGroup:", error);
      throw error;
    }
  },

  // Prompt operations
  async createPrompt(data: Partial<Prompt>): Promise<number> {
    try {
      const prompt = {
        name: data.name || 'New Prompt',
        content: data.content || '',
        groupId: data.groupId!,
        variables: data.variables || []
      };
      
      return await db.createPrompt(prompt);
    } catch (error) {
      console.error("Error in createPrompt:", error);
      throw error;
    }
  },

  async updatePrompt(id: number, data: Partial<Prompt>): Promise<void> {
    try {
      await db.prompts.update(id, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Error in updatePrompt:", error);
      throw error;
    }
  },

  async deletePrompt(id: number): Promise<void> {
    try {
      await db.prompts.delete(id);
    } catch (error) {
      console.error("Error in deletePrompt:", error);
      throw error;
    }
  }
}; 