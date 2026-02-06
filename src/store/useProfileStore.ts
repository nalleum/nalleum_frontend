"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mockPushHistorySeed } from "@/data/mockPushHistorySeed";
import { PushHistoryEntry, PushSource, Role, UserProfile } from "@/types";

const defaultProfile: UserProfile = {
  nickname: "김민수",
  targetCompanies: ["삼성전자", "네이버", "카카오"],
  targetRole: "Backend",
  targetIndustries: ["금융/핀테크"],
  interestKeywords: ["AI", "클라우드"],
  pushTime: "09:00",
  pushEnabled: true,
  onboardingCompleted: false,
};

const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

type CompleteOnboardingInput = {
  nickname: string;
  targetCompanies: string[];
  targetRole: Role;
  targetIndustries: string[];
  interestKeywords: string[];
  pushTime: string;
  pushEnabled: boolean;
  ddayDate?: string;
};

type ProfileState = {
  profile: UserProfile;
  pushEnabled: boolean;
  pushPermission: NotificationPermission;
  pushHistory: PushHistoryEntry[];
  completeOnboarding: (input: CompleteOnboardingInput) => void;
  updateRole: (role: Role) => void;
  toggleCompany: (company: string) => void;
  toggleIndustry: (industry: string) => void;
  setPushTime: (time: string) => void;
  setDdayDate: (date?: string) => void;
  togglePush: (enabled?: boolean) => void;
  setPushPermission: (permission: NotificationPermission) => void;
  addPushHistory: (entry: Omit<PushHistoryEntry, "id" | "receivedAt" | "source"> & { source?: PushSource }) => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      pushEnabled: defaultProfile.pushEnabled,
      pushPermission: "default",
      pushHistory: mockPushHistorySeed,
      completeOnboarding: (input) =>
        set({
          profile: {
            ...get().profile,
            ...input,
            onboardingCompleted: true,
          },
          pushEnabled: input.pushEnabled,
        }),
      updateRole: (role) => set({ profile: { ...get().profile, targetRole: role } }),
      toggleCompany: (company) => {
        const current = get().profile;
        const exists = current.targetCompanies.includes(company);
        const next = exists ? current.targetCompanies.filter((c) => c !== company) : [...current.targetCompanies, company];
        set({ profile: { ...current, targetCompanies: next.slice(0, 5) } });
      },
      toggleIndustry: (industry) => {
        const current = get().profile;
        const exists = current.targetIndustries.includes(industry);
        const next = exists ? current.targetIndustries.filter((i) => i !== industry) : [...current.targetIndustries, industry];
        set({ profile: { ...current, targetIndustries: next } });
      },
      setPushTime: (time) => set({ profile: { ...get().profile, pushTime: time } }),
      setDdayDate: (date) => set({ profile: { ...get().profile, ddayDate: date } }),
      togglePush: (enabled) => {
        const value = enabled ?? !get().pushEnabled;
        set({ pushEnabled: value, profile: { ...get().profile, pushEnabled: value } });
      },
      setPushPermission: (permission) => set({ pushPermission: permission }),
      addPushHistory: (entry) => {
        const newItem: PushHistoryEntry = {
          id: makeId(),
          receivedAt: new Date().toISOString(),
          source: entry.source ?? "mock-system",
          ...entry,
        };
        set({ pushHistory: [newItem, ...get().pushHistory].slice(0, 50) });
      },
    }),
    {
      name: "nalleum-profile",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        pushEnabled: state.pushEnabled,
        pushPermission: state.pushPermission,
        pushHistory: state.pushHistory,
      }),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<ProfileState>;
        return {
          ...currentState,
          ...persisted,
          profile: { ...currentState.profile, ...(persisted.profile ?? {}) },
        };
      },
    }
  )
);
