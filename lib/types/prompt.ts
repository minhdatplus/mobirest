export interface Prompt {
  id: string;
  name: string;
  content: string;
  groupId?: string;
  variables: Variable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Variable {
  name: string;
  value: string;
  description?: string;
} 