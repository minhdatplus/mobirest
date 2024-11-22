export interface Prompt {
  id: string;
  name: string;
  description?: string;
  content: PromptBlock[];
  groupId: string;
  variables?: PromptVariable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptBlock {
  id: string;
  content: string;
  order: number;
  isVisible: boolean;
}

export interface PromptVariable {
  name: string;
  value: string;
  description?: string;
}

export interface PromptGroup {
  id: string;
  name: string;
  parentId?: string;
  children?: PromptGroup[];
} 