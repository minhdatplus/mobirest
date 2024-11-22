import { Skeleton } from "@/components/ui/skeleton";

export function PromptListSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="p-4 border-b">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="divide-y">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4">
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
} 