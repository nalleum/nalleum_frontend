"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { InsightCard } from "@/types";
import { insightCards } from "@/data/mockInsights";

type InsightState = {
  insights: InsightCard[];
  scrappedIds: string[];
  setInsights: (insights: InsightCard[]) => void;
  toggleScrap: (id: string) => void;
  getById: (id: string) => InsightCard | undefined;
};

export const useInsightStore = create<InsightState>()(
  persist(
    (set, get) => ({
      insights: insightCards,
      scrappedIds: [],
      setInsights: (insights) => set({ insights }),
      toggleScrap: (id) => {
        const { scrappedIds } = get();
        const next = scrappedIds.includes(id)
          ? scrappedIds.filter((s) => s !== id)
          : [...scrappedIds, id];
        set({ scrappedIds: next });
      },
      getById: (id) => get().insights.find((item) => item.id === id),
    }),
    {
      name: "nalleum-insights",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        insights: state.insights,
        scrappedIds: state.scrappedIds,
      }),
    }
  )
);
