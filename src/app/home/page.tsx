"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import BottomNav from "@/components/BottomNav";
import InsightCardView from "@/components/InsightCard";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useInsightStore } from "@/store/useInsightStore";
import { useProfileStore } from "@/store/useProfileStore";

export default function HomePage() {
  const router = useRouter();
  const hydrated = useHydratedStore();
  const profile = useProfileStore((state) => state.profile);
  const insightsRaw = useInsightStore((state) => state.insights);

  const insights = useMemo(
    () =>
      insightsRaw.filter((item) =>
        profile.targetCompanies.length > 0 ? profile.targetCompanies.includes(item.companyName) : true
      ),
    [insightsRaw, profile.targetCompanies]
  );

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  const hero = insights[0] ?? insightsRaw[0];

  return (
    <AppShell className="page-enter">
      <div className="space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/main_icon.png"
              alt="profile"
              width={48}
              height={48}
              className="h-12 w-12 rounded-2xl object-cover"
            />
            <div>
              <p className="text-[11px] font-semibold text-muted">반가워요!</p>
              <p className="text-[19px] font-extrabold text-text">{profile.nickname || "회원"}님</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="rounded-xl border border-line bg-white px-3 py-2 text-[11px] font-semibold text-muted"
          >
            설정
          </button>
        </header>

        <section className="rounded-[30px] bg-gradient-to-br from-primary to-[#6d55ff] p-6 text-white shadow-[0_18px_30px_rgba(79,45,255,0.25)]">
          <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-extrabold">UPCOMING</div>
          <p className="mt-3 text-[12px] font-bold">{hero.companyName} 하반기 공채</p>
          <div className="mt-1 flex items-end gap-2">
            <p className="text-[48px] font-black leading-none">D-12</p>
            <p className="pb-2 text-[13px] font-bold">최종 면접까지</p>
          </div>
          <p className="mt-5 text-[11px] font-semibold opacity-95">반갑습니다, {profile.targetRole} 개발자님</p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[23px] font-black tracking-[-0.02em] text-text">IT/서비스 업계 HOT 이슈</h2>
            <span className="text-[11px] font-semibold text-muted">전체보기</span>
          </div>
          <div className="space-y-3">
            {insights.slice(0, 3).map((item) => (
              <InsightCardView key={item.id} item={item} onClick={() => router.push(`/detail/${item.id}`)} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[23px] font-black tracking-[-0.02em] text-text">관심 기업 최신 동향</h2>
            <span className="text-[11px] font-semibold text-muted">{profile.targetCompanies.length}개 기업</span>
          </div>

          {hero ? (
            <article className="rounded-[30px] border border-line bg-card p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2">
                <Image
                  src={hero.companyIconUrl}
                  alt={hero.companyName}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-md bg-white p-0.5"
                />
                <span className="text-[12px] font-bold text-text">{hero.companyName}</span>
              </div>
              <div className="mt-3 overflow-hidden rounded-2xl">
                <Image
                  src={hero.coverImageUrl ?? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"}
                  alt={hero.title}
                  width={900}
                  height={480}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="mt-4 rounded-2xl bg-[#f9fbff] p-4">
                <p className="text-[11px] font-extrabold text-primary">AI 요약</p>
                <p className="mt-2 text-[11px] font-semibold leading-relaxed text-[#33456c]">{hero.summary}</p>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/detail/${hero.id}`)}
                className="mt-4 w-full rounded-full border border-line bg-white py-3 text-[11px] font-black text-primary"
              >
                관련 예상 질문 확인하기
              </button>
            </article>
          ) : null}
        </section>
      </div>
      <BottomNav />
    </AppShell>
  );
}
