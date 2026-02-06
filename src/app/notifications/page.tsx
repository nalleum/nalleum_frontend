"use client";

import { Bell, Bolt, CalendarCheck, ChevronLeft, Flame, Info, Bookmark, UserPlus } from "lucide-react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import BottomNav from "@/components/BottomNav";
import { useNotificationStore } from "@/store/useNotificationStore";

const filters = ["전체", "면접 브리핑", "활동", "공지사항"] as const;

const toneMap = {
  indigo: "bg-indigo-600 text-white",
  amber: "bg-amber-100 text-amber-600",
  purple: "bg-purple-100 text-purple-600",
  blue: "bg-blue-100 text-blue-600",
  slate: "bg-slate-100 text-slate-500",
  green: "bg-green-100 text-green-600",
};

function IconByTone({ tone }: { tone: keyof typeof toneMap }) {
  if (tone === "indigo") return <Bolt size={18} />;
  if (tone === "amber") return <CalendarCheck size={18} />;
  if (tone === "purple") return <Bookmark size={18} />;
  if (tone === "blue") return <Flame size={18} />;
  if (tone === "green") return <UserPlus size={18} />;
  return <Info size={18} />;
}

export default function NotificationsPage() {
  const router = useRouter();
  const items = useNotificationStore((state) => state.items);
  const activeFilter = useNotificationStore((state) => state.activeFilter);
  const setFilter = useNotificationStore((state) => state.setFilter);
  const markAllRead = useNotificationStore((state) => state.markAllRead);

  const filtered = useMemo(() => {
    if (activeFilter === "전체") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  return (
    <AppShell className="page-enter" padded={false}>
      <div className="mx-auto min-h-screen w-full max-w-[430px] pb-24">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/95 px-5 py-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => router.back()} className="rounded-full p-1 text-text"><ChevronLeft /></button>
            <h1 className="text-[31px] font-black text-text">알림</h1>
          </div>
          <button type="button" onClick={markAllRead} className="text-[13px] font-bold text-muted">모두 읽음</button>
        </header>

        <section className="border-b border-line bg-white px-5 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-bold whitespace-nowrap ${activeFilter === filter ? "bg-[#111a37] text-white" : "bg-[#f1f4fb] text-[#6b7ba2]"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="divide-y divide-line">
          {filtered.map((item) => (
            <article key={item.id} className={`relative flex gap-3 px-5 py-4 ${item.unread ? "bg-indigo-50/40" : "bg-white"}`}>
              {item.unread ? <span className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-primary" /> : null}
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${toneMap[item.iconTone]}`}>
                <IconByTone tone={item.iconTone} />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold text-primary">{item.category}</p>
                  <p className="text-[11px] font-medium text-muted">{item.timeLabel}</p>
                </div>
                <h3 className="text-[15px] font-black leading-snug text-text">{item.title}</h3>
                <p className="mt-1 text-[14px] font-medium leading-relaxed text-[#4e618e]">{item.body}</p>
              </div>
            </article>
          ))}

          {filtered.length === 0 ? (
            <div className="px-5 py-20 text-center">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-[#f0f3fa] text-muted"><Bell /></div>
              <p className="text-[16px] font-bold text-text">알림이 없습니다</p>
              <p className="mt-1 text-[13px] font-medium text-muted">새로운 소식이 도착하면 이곳에서 확인할 수 있어요.</p>
            </div>
          ) : null}
        </section>

        <BottomNav />
      </div>
    </AppShell>
  );
}
