import localforage from 'localforage';
import type { Group, Prompt } from './schema';

// Khởi tạo stores riêng biệt
const groupStore = localforage.createInstance({
  name: 'prompty',
  storeName: 'groups'
});

const promptStore = localforage.createInstance({
  name: 'prompty',
  storeName: 'prompts'  
});

class PromptyDB {
  // Basic CRUD for groups
  async getAllGroups(): Promise<Group[]> {
    const groups: Group[] = [];
    await groupStore.iterate((value: Group) => {
      groups.push(value);
    });
    return groups;
  }

  async getGroup(id: number): Promise<Group | null> {
    return groupStore.getItem(String(id));
  }

  async createGroup(data: Partial<Group>): Promise<number> {
    const id = Date.now();
    const group: Group = {
      id,
      name: data.name || 'New Group',
      parentId: data.parentId || null,
      level: data.level || 0,
      order: data.order || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await groupStore.setItem(String(id), group);
    return id;
  }

  async updateGroup(id: number, data: Partial<Group>): Promise<void> {
    const group = await this.getGroup(id);
    if (!group) throw new Error('Group not found');
    
    const updatedGroup = {
      ...group,
      ...data,
      updatedAt: new Date()
    };
    
    await groupStore.setItem(String(id), updatedGroup);
  }

  async deleteGroup(id: number): Promise<void> {
    await groupStore.removeItem(String(id));
  }

  // Helper methods
  async getGroupChildren(parentId?: number | null): Promise<Group[]> {
    const allGroups = await this.getAllGroups();
    return allGroups
      .filter(group => group.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  }

  // Basic CRUD for prompts
  async getAllPrompts(): Promise<Prompt[]> {
    const prompts: Prompt[] = [];
    await promptStore.iterate((value: Prompt) => {
      prompts.push(value);
    });
    return prompts;
  }

  async getPromptsByGroup(groupId: number): Promise<Prompt[]> {
    const allPrompts = await this.getAllPrompts();
    return allPrompts.filter(prompt => prompt.groupId === groupId);
  }

  async createPrompt(data: Partial<Prompt>): Promise<number> {
    const id = Date.now();
    const prompt: Prompt = {
      id,
      name: data.name || 'New Prompt',
      content: data.content || '',
      groupId: data.groupId!,
      variables: data.variables || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await promptStore.setItem(String(id), prompt);
    return id;
  }

  // Database management
  async clear(): Promise<void> {
    await Promise.all([
      groupStore.clear(),
      promptStore.clear()
    ]);
  }
}

// Create instance
const db = new PromptyDB();

// Initialize database
let isInitializing = false;
let isInitialized = false;

export async function initDatabase(shouldReset: boolean = false) {
  if (isInitialized && !shouldReset) return;
  if (isInitializing) return;

  try {
    isInitializing = true;
    console.log('Starting database initialization...');
    
    if (shouldReset) {
      await db.clear();
      console.log('Database cleared');
      
      // Create root group
      await db.createGroup({
        name: 'Root',
        level: 0,
        order: 0,
        parentId: null
      });
      console.log('Root group created');
    } else {
      // Check if root group exists
      const allGroups = await db.getAllGroups();
      if (allGroups.length === 0) {
        // Create root group only if no groups exist
        await db.createGroup({
          name: 'Root',
          level: 0,
          order: 0,
          parentId: null
        });
        console.log('Root group created');
      }
    }

    isInitialized = true;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  } finally {
    isInitializing = false;
  }
}

export { db };