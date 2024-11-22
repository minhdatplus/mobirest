import { useState, useEffect } from "react";
import { AIFeature } from "@/lib/types/ai";
import { supabase } from "@/lib/supabase";

export function useAIFeatures() {
  const [features, setFeatures] = useState<AIFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeatures() {
      try {
        const { data, error } = await supabase
          .from("ai_features")
          .select("*")
          .order("name");

        if (error) throw error;
        setFeatures(data);
      } catch (error) {
        console.error("Error loading AI features:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeatures();
  }, []);

  return { features, isLoading };
} 