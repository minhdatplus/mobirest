"use client";

import { useEffect } from "react";
import { initDatabase } from "@/lib/db";
import { toast } from "sonner";

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initDatabase(false).catch((error) => {
      console.error("Failed to initialize database:", error);
      toast.error("Failed to initialize database");
    });
  }, []);

  return <>{children}</>;
} 