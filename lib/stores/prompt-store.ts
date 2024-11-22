import { create } from 'zustand';
import type { PromptGroup } from '@/lib/db/schema';

interface PromptStore {
  activeGroupId?: string;
  activePromptId?: string;
  setActiveGroupId: (id?: string) => void;
  setActivePromptId: (id?: string) => void;
  reset: () => void;
}

export const usePromptStore = create<PromptStore>((set) => ({
  activeGroupId: undefined,
  activePromptId: undefined,
  setActiveGroupId: (id) => set({ activeGroupId: id }),
  setActivePromptId: (id) => set({ activePromptId: id }),
  reset: () => set({ activeGroupId: undefined, activePromptId: undefined })
})); 