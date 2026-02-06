"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { insightCards } from "@/data/mockInsights";
import { InsightCard } from "@/types";

type InsightState = {
  insights: InsightCard[];
  scrappedIds: string[];
  toggleScrap: (id: string) => void;
};

export const useInsightStore = create<InsightState>()(
  persist(
    (set, get) => ({
      insights: insightCards,
      scrappedIds: ["naver-ai-backend", "toss-zero-trust"],
      toggleScrap: (id) => {
        const current = get().scrappedIds;
        const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
        set({ scrappedIds: next });
      },
    }),
    {
      name: "nalleum-insights",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        scrappedIds: state.scrappedIds,
      }),
    }
  )
);
