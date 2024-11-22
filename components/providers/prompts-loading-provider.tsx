"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function PromptsLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Loading prompts...");

  useEffect(() => {
    async function init() {
      const steps = [
        { progress: 20, status: "Loading database..." },
        { progress: 40, status: "Loading groups..." },
        { progress: 60, status: "Loading prompts..." },
        { progress: 80, status: "Loading patterns..." },
        { progress: 100, status: "Almost ready..." }
      ];

      for (const step of steps) {
        setProgress(step.progress);
        setStatus(step.status);
        await new Promise(r => setTimeout(r, 400));
      }

      setIsReady(true);
    }

    init();
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
        <div className="container flex h-screen items-center justify-center">
          <div className="w-[400px] space-y-4 rounded-lg border bg-card p-8 shadow-lg">
            <div className="space-y-2 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <h2 className="text-lg font-semibold">{status}</h2>
              <p className="text-sm text-muted-foreground">
                This may take a few moments
              </p>
            </div>
            
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {progress}% complete
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 