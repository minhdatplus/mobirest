"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { PromptGroup } from "@/lib/db/schema";

interface TreeViewProps {
  items: PromptGroup[];
  activeId?: string;
  onSelect?: (id: string) => void;
  renderItem: (item: PromptGroup) => React.ReactNode;
  level?: number;
}

export function TreeView({ 
  items, 
  activeId,
  onSelect,
  renderItem, 
  level = 0 
}: TreeViewProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newExpanded = new Set(expandedItems);
    
    const collectParentIds = (items: PromptGroup[], targetId: string, parents: Set<string>) => {
      for (const item of items) {
        if (item.id === targetId) {
          return true;
        }
        if (item.children?.length) {
          if (collectParentIds(item.children, targetId, parents)) {
            parents.add(String(item.id));
            return true;
          }
        }
      }
      return false;
    };

    if (activeId) {
      const parents = new Set<string>();
      collectParentIds(items, activeId, parents);
      parents.forEach(id => newExpanded.add(id));
    }

    const expandWithChildren = (items: PromptGroup[]) => {
      items.forEach(item => {
        if (item.children?.length) {
          newExpanded.add(String(item.id));
          expandWithChildren(item.children);
        }
      });
    };
    expandWithChildren(items);

    setExpandedItems(newExpanded);
  }, [items, activeId]);

  const toggleExpand = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.has(String(item.id));
        const isActive = String(item.id) === activeId;

        return (
          <div key={item.id}>
            <div
              className={cn(
                "flex items-center",
                level > 0 && "ml-4",
                "cursor-pointer",
                isActive && "bg-accent"
              )}
              onClick={() => onSelect?.(String(item.id))}
            >
              <div
                className="p-1 hover:bg-accent rounded-sm"
                onClick={(e) => hasChildren && toggleExpand(String(item.id), e)}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform",
                    isExpanded && "rotate-90",
                    !hasChildren && "opacity-0"
                  )}
                />
              </div>
              <div className="flex-1">{renderItem(item)}</div>
            </div>

            {hasChildren && isExpanded && (
              <TreeView
                items={item.children}
                activeId={activeId}
                onSelect={onSelect}
                renderItem={renderItem}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
} 