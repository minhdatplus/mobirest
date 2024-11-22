export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group extends BaseEntity {
  name: string;
  parentId: number | null;
  level: number;
  order: number;
}

export interface Prompt extends BaseEntity {
  name: string;
  content: string;
  groupId: number;
  variables: Variable[];
}

export interface Variable {
  key: string;
  value: string;
}