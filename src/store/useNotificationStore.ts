"use client";

import { create } from "zustand";
import { mockNotifications } from "@/data/mockNotifications";
import { NotificationCategory, NotificationItem } from "@/types";

type NotificationState = {
  items: NotificationItem[];
  activeFilter: NotificationCategory;
  setFilter: (filter: NotificationCategory) => void;
  markAllRead: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  items: mockNotifications,
  activeFilter: "전체",
  setFilter: (filter) => set({ activeFilter: filter }),
  markAllRead: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, unread: false })),
    })),
}));
