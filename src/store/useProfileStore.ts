"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PushHistoryEntry, PushSource, Role, UserProfile } from "@/types";
import { mockPushHistorySeed } from "@/data/mockPushHistorySeed";

const defaultProfile: UserProfile = {
  nickname: "",
  targetCompanies: ["삼성전자", "네이버"],
  targetRole: "Backend",
  interestKeywords: ["AI", "아키텍처"],
  pushTime: "09:00",
  pushEnabled: true,
  onboardingCompleted: false,
};

const makeId = () => (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`);

type CompleteOnboardingInput = {
  nickname: string;
  targetCompanies: string[];
  targetRole: Role;
  interestKeywords: string[];
  pushTime: string;
  pushEnabled: boolean;
};

type ProfileState = {
  profile: UserProfile;
  pushEnabled: boolean;
  pushPermission: NotificationPermission;
  pushHistory: PushHistoryEntry[];
  setProfile: (profile: UserProfile) => void;
  completeOnboarding: (input: CompleteOnboardingInput) => void;
  updateRole: (role: Role) => void;
  toggleCompany: (company: string) => void;
  setPushTime: (time: string) => void;
  togglePush: (enabled?: boolean) => void;
  setPushPermission: (permission: NotificationPermission) => void;
  addPushHistory: (entry: Omit<PushHistoryEntry, "id" | "receivedAt" | "source"> & { source?: PushSource }) => void;
  clearHistory: () => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      pushEnabled: defaultProfile.pushEnabled,
      pushPermission: "default",
      pushHistory: mockPushHistorySeed,
      setProfile: (profile) => set({ profile, pushEnabled: profile.pushEnabled }),
      completeOnboarding: (input) =>
        set({
          profile: {
            ...get().profile,
            ...input,
            onboardingCompleted: true,
          },
          pushEnabled: input.pushEnabled,
        }),
      updateRole: (role) => {
        const current = get().profile;
        set({ profile: { ...current, targetRole: role } });
      },
      toggleCompany: (company) => {
        const current = get().profile;
        const exists = current.targetCompanies.includes(company);
        const targetCompanies = exists
          ? current.targetCompanies.filter((c) => c !== company)
          : [...current.targetCompanies, company];
        set({ profile: { ...current, targetCompanies } });
      },
      setPushTime: (time) => {
        const current = get().profile;
        set({ profile: { ...current, pushTime: time } });
      },
      togglePush: (enabled) => {
        const current = get().profile;
        const pushEnabled = enabled ?? !get().pushEnabled;
        set({
          pushEnabled,
          profile: { ...current, pushEnabled },
        });
      },
      setPushPermission: (permission) => set({ pushPermission: permission }),
      addPushHistory: (entry) => {
        const newEntry: PushHistoryEntry = {
          id: makeId(),
          receivedAt: new Date().toISOString(),
          source: entry.source ?? "mock-system",
          ...entry,
        };
        set({ pushHistory: [newEntry, ...get().pushHistory].slice(0, 50) });
      },
      clearHistory: () => set({ pushHistory: [] }),
    }),
    {
      name: "nalleum-profile",
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<ProfileState>;
        return {
          ...currentState,
          ...persisted,
          profile: {
            ...currentState.profile,
            ...(persisted.profile ?? {}),
          },
          pushHistory: persisted.pushHistory ?? currentState.pushHistory,
          pushPermission: persisted.pushPermission ?? currentState.pushPermission,
        };
      },
      partialize: (state) => ({
        profile: state.profile,
        pushEnabled: state.pushEnabled,
        pushPermission: state.pushPermission,
        pushHistory: state.pushHistory,
      }),
    }
  )
);
