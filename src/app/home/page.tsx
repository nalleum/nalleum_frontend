"use client";

import Image from "next/image";
import { Bell, Flame, Menu } from "lucide-react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import BottomNav from "@/components/BottomNav";
import ProfileAvatar from "@/components/ProfileAvatar";
import { imageFallback } from "@/data/mockInsights";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useInsightStore } from "@/store/useInsightStore";
import { useProfileStore } from "@/store/useProfileStore";

export default function HomePage() {
  const router = useRouter();
  const hydrated = useHydratedStore();
  const profile = useProfileStore((state) => state.profile);
  const insights = useInsightStore((state) => state.insights);

  const filtered = useMemo(
    () => insights.filter((item) => (profile.targetCompanies.length ? profile.targetCompanies.includes(item.companyName) : true)),
    [insights, profile.targetCompanies]
  );

  const hero = filtered[0] ?? insights[0];

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  return (
    <AppShell className="page-enter">
      <header className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <ProfileAvatar nickname={profile.nickname} size={46} className="h-11 w-11 rounded-full border-2 border-primary-soft" />
          <div>
            <p className="text-[11px] font-semibold text-muted">반가워요!</p>
            <p className="text-[21px] font-black text-text">{profile.nickname || "김민수"}님</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => router.push("/notifications")} className="relative rounded-full p-2 text-[#7f8fb1]">
            <Bell size={22} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button type="button" className="rounded-full p-2 text-[#7f8fb1]"><Menu size={22} /></button>
        </div>
      </header>

      <main className="space-y-7 pt-6 pb-8">
        <section className="rounded-3xl bg-gradient-to-br from-[#6a37ff] to-[#4e2cf7] p-5 text-white shadow-[0_18px_34px_rgba(90,53,255,0.35)]">
          <div className="inline-flex rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase">Upcoming</div>
          <p className="mt-2 text-[13px] font-semibold">삼성전자 하반기 공채</p>
          <div className="mt-1 flex items-end gap-2">
            <h2 className="text-[38px] font-black leading-none">D-12</h2>
            <p className="pb-1 text-[13px] font-semibold">최종 면접까지</p>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-black/10 px-3 py-2">
            <div className="flex -space-x-1.5">
              <ProfileAvatar nickname="a" size={24} className="h-6 w-6 rounded-full border-2 border-[#6f4dff]" />
              <ProfileAvatar nickname="b" size={24} className="h-6 w-6 rounded-full border-2 border-[#6f4dff]" />
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#6f4dff] bg-[#8e74ff] text-[8px] font-bold">+12</span>
            </div>
            <p className="text-[11px]">동일 직무 <strong>42명</strong> 준비 중</p>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-[22px] font-black text-text"><Flame size={18} className="text-orange-500" />IT/서비스 업계 HOT 이슈</h3>
            <span className="text-[12px] font-semibold text-muted">전체보기</span>
          </div>
          {filtered.slice(0, 2).map((item) => (
            <button key={item.id} type="button" onClick={() => router.push(`/detail/${item.id}`)} className="w-full rounded-2xl border border-line bg-white p-4 text-left shadow-[var(--shadow-card)]">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-primary-soft px-2 py-1 text-[10px] font-bold text-primary">{item.badge || "NEW"}</span>
                <span className="text-[11px] font-medium text-muted">{item.date}</span>
              </div>
              <p className="text-[15px] font-black leading-snug text-text">{item.title}</p>
            </button>
          ))}
        </section>

        <section>
          <h3 className="mb-3 text-[22px] font-black text-text">관심 기업 최신 동향</h3>
          {hero ? (
            <button
              type="button"
              onClick={() => router.push(`/detail/${hero.id}`)}
              className="w-full rounded-3xl border border-line bg-white p-4 text-left shadow-[var(--shadow-card)]"
            >
              <div className="mb-3 flex items-center gap-2">
                <Image src={hero.companyIconUrl} alt={hero.companyName} width={20} height={20} className="h-5 w-5 rounded bg-white p-[2px]" />
                <p className="text-[14px] font-bold text-text">{hero.companyName}</p>
              </div>
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hero.coverImageUrl ?? imageFallback} alt={hero.title} className="h-40 w-full object-cover" onError={(event) => { event.currentTarget.src = imageFallback; }} />
              </div>
              <div className="mt-3 rounded-xl bg-[#f7f9ff] p-3">
                <p className="mb-1 text-[12px] font-bold text-primary">AI 요약</p>
                <p className="text-[14px] font-medium leading-relaxed text-[#44557f]">{hero.summary}</p>
              </div>
              <p className="mt-4 w-full border-t border-line pt-3 text-center text-[16px] font-black text-primary">
                관련 예상 질문 확인하기
              </p>
            </button>
          ) : null}
        </section>
      </main>
      <BottomNav />
    </AppShell>
  );
}
