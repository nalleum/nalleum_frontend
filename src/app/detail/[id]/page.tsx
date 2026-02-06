"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import InsightCardView from "@/components/InsightCard";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useInsightStore } from "@/store/useInsightStore";
import { useProfileStore } from "@/store/useProfileStore";

export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const hydrated = useHydratedStore();
  const insights = useInsightStore((state) => state.insights);
  const scrappedIds = useInsightStore((state) => state.scrappedIds);
  const toggleScrap = useInsightStore((state) => state.toggleScrap);
  const profile = useProfileStore((state) => state.profile);

  const insight = useMemo(() => insights.find((item) => item.id === params.id), [insights, params.id]);
  const relatedInsights = useMemo(() => {
    if (!insight) return [];
    return insight.relatedIds
      .map((id) => insights.find((item) => item.id === id))
      .filter((item): item is (typeof insights)[number] => Boolean(item));
  }, [insight, insights]);

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!insight) {
    return (
      <AppShell>
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted"
        >
          홈으로 이동
        </button>
      </AppShell>
    );
  }

  const qa = insight.roleSpecificContent[profile.targetRole];
  const isScrapped = scrappedIds.includes(insight.id);

  return (
    <AppShell className="page-enter">
      <div className="space-y-6 pb-20">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-line bg-white px-3 py-2 text-[13px] font-bold text-muted"
          >
            ← 뒤로
          </button>
          <p className="text-[20px] font-extrabold text-text">이슈 상세</p>
          <button
            type="button"
            onClick={() => toggleScrap(insight.id)}
            className={`rounded-xl px-3 py-2 text-[13px] font-bold ${
              isScrapped ? "bg-primary text-white" : "border border-line bg-white text-muted"
            }`}
          >
            {isScrapped ? "저장됨" : "저장"}
          </button>
        </header>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-soft px-2 py-1 text-[11px] font-extrabold text-primary">
              {insight.badge ?? "TECH TREND"}
            </span>
            <span className="text-[12px] font-bold text-muted">{insight.date}</span>
          </div>
          <h1 className="text-[44px] font-black leading-[1.12] tracking-[-0.03em] text-text">{insight.title}</h1>
          <div className="overflow-hidden rounded-[30px]">
            <Image
              src={insight.coverImageUrl ?? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"}
              alt={insight.title}
              width={1200}
              height={680}
              className="h-64 w-full object-cover"
            />
          </div>
        </section>

        <section className="space-y-3 rounded-[28px] border border-line bg-white p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-[32px] font-black text-text">핵심 요약</h2>
          <div className="space-y-3 rounded-2xl bg-[#f8faff] p-4">
            {insight.summaryBullets.map((bullet, index) => (
              <div key={bullet} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[12px] font-extrabold text-white">
                  {index + 1}
                </span>
                <p className="text-[17px] font-semibold leading-relaxed text-[#33456c]">{bullet}</p>
              </div>
            ))}
          </div>
          <a
            href={insight.originalLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-between rounded-2xl border border-line bg-white px-4 py-4 text-[16px] font-bold text-[#3c4d74]"
          >
            <span>Original Article</span>
            <span className="text-primary">원문 보러가기 ↗</span>
          </a>
        </section>

        <section className="space-y-3 rounded-[28px] border border-line bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="text-[32px] font-black text-text">[{profile.targetRole}] 면접 예상 질문</h2>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-extrabold text-primary">1 Question</span>
          </div>
          <div className="rounded-2xl bg-[#f8faff] p-4">
            <p className="text-[26px] font-black text-primary">Q1.</p>
            <p className="mt-2 text-[28px] font-black leading-[1.2] tracking-[-0.02em] text-text">{qa.question}</p>
            <div className="mt-4 rounded-xl border border-line bg-white p-3">
              <p className="text-[12px] font-extrabold text-primary">IDEAL ANSWER GUIDE</p>
              <p className="mt-2 text-[16px] font-semibold leading-relaxed text-[#3c4d74]">{qa.answerTip}</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-[32px] font-black text-text">관련 이슈 더보기</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {relatedInsights.map((related) => (
              <div key={related.id} className="min-w-[320px]">
                <InsightCardView item={related} onClick={() => router.push(`/detail/${related.id}`)} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => toggleScrap(insight.id)}
        className={`fixed bottom-6 right-6 z-30 rounded-full px-6 py-4 text-[16px] font-black shadow-[0_12px_24px_rgba(79,45,255,0.25)] ${
          isScrapped ? "bg-navy text-white" : "bg-primary text-white"
        }`}
      >
        {isScrapped ? "스크랩 해제" : "스크랩"}
      </button>
    </AppShell>
  );
}
