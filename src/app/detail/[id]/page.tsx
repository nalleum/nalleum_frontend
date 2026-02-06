"use client";

import { Bookmark, ChevronLeft, Link2, Share2 } from "lucide-react";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { imageFallback } from "@/data/mockInsights";
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
  const role = useProfileStore((state) => state.profile.targetRole);

  const insight = useMemo(() => insights.find((item) => item.id === params.id), [insights, params.id]);
  const related = useMemo(() => {
    if (!insight) return [];
    return insight.relatedIds.map((id) => insights.find((item) => item.id === id)).filter((item): item is (typeof insights)[number] => Boolean(item));
  }, [insight, insights]);

  if (!hydrated) return <div className="min-h-screen bg-background" />;
  if (!insight) return <div className="min-h-screen bg-background" />;

  const qa = insight.roleSpecificContent[role];
  const isScrapped = scrappedIds.includes(insight.id);

  return (
    <AppShell className="page-enter" padded={false}>
      <div className="mx-auto w-full max-w-[430px] pb-28">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/95 px-4 py-3">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.back()} className="rounded-full p-2 text-text"><ChevronLeft /></button>
            <h1 className="text-[30px] font-black text-text">이슈 상세</h1>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => toggleScrap(insight.id)} className="rounded-full p-2 text-[#52658f]"><Bookmark size={20} fill={isScrapped ? "currentColor" : "none"} /></button>
            <button type="button" className="rounded-full p-2 text-[#52658f]"><Share2 size={20} /></button>
          </div>
        </header>

        <main className="px-5 pb-6 pt-5">
          <section className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded bg-primary-soft px-2 py-1 text-[10px] font-bold text-primary">{insight.badge || "TECH TREND"}</span>
              <span className="text-[11px] font-medium text-muted">{insight.date}</span>
            </div>
            <h2 className="mb-5 text-[44px] font-black leading-[1.18] tracking-[-0.03em] text-text">{insight.title}</h2>
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={insight.coverImageUrl ?? imageFallback} alt={insight.title} className="h-52 w-full object-cover" onError={(event) => { event.currentTarget.src = imageFallback; }} />
            </div>
          </section>

          <section className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-primary" />
              <h3 className="text-[34px] font-black text-text">핵심 요약</h3>
            </div>
            <div className="rounded-2xl border border-line bg-[#f8faff] p-4">
              <ul className="space-y-3">
                {insight.summaryBullets.map((bullet, index) => (
                  <li key={bullet} className="flex gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{index + 1}</span>
                    <p className="text-[14px] font-medium leading-relaxed text-[#374a75]">{bullet}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <a href={insight.originalLink} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f2f5fc] text-[#61719a]"><Link2 size={17} /></span>
                <div>
                  <p className="text-[11px] font-medium text-muted">Original Article</p>
                  <p className="text-[15px] font-bold text-text">IT 테크 뉴스 원문 보러가기</p>
                </div>
              </div>
            </a>
          </section>

          <section className="mb-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-primary" />
                <h3 className="text-[34px] font-black text-text">면접 대비 질문</h3>
              </div>
              <span className="rounded bg-primary-soft px-2 py-1 text-[11px] font-bold text-primary">2 Questions</span>
            </div>

            <article className="rounded-3xl border border-line bg-white p-5 shadow-[var(--shadow-card)]">
              <div className="mb-4 flex items-start gap-2">
                <p className="text-[30px] font-black text-primary">Q1.</p>
                <p className="text-[18px] font-black leading-snug text-text">{qa.question}</p>
              </div>
              <div className="rounded-2xl border border-line bg-[#f5f8ff] p-4">
                <p className="text-[11px] font-bold uppercase text-primary">Ideal Answer Guide</p>
                <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#3c4f7a]">{qa.answerTip}</p>
              </div>
            </article>

            <article className="rounded-3xl border border-line bg-white p-5 shadow-[var(--shadow-card)]">
              <div className="mb-4 flex items-start gap-2">
                <p className="text-[30px] font-black text-primary">Q2.</p>
                <p className="text-[18px] font-black leading-snug text-text">{insight.secondaryQuestion}</p>
              </div>
              <div className="rounded-2xl border border-line bg-[#f5f8ff] p-4">
                <p className="text-[11px] font-bold uppercase text-primary">Ideal Answer Guide</p>
                <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#3c4f7a]">{insight.secondaryAnswerTip}</p>
              </div>
            </article>
          </section>

          <section>
            <h3 className="mb-3 text-[31px] font-black text-text">관련 이슈 더보기</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {related.map((item) => (
                <button key={item.id} type="button" onClick={() => router.push(`/detail/${item.id}`)} className="min-w-[250px] rounded-2xl border border-line bg-white p-3 text-left">
                  <p className="text-[11px] font-semibold text-muted">{item.date}</p>
                  <p className="mt-1 text-[14px] font-black leading-snug text-text">{item.title}</p>
                </button>
              ))}
            </div>
          </section>
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-[430px] items-center gap-3 border-t border-line bg-white/95 px-5 py-4">
          <button type="button" onClick={() => toggleScrap(insight.id)} className="grid h-12 w-12 place-items-center rounded-xl border border-line text-[#66779d]">
            <Bookmark size={20} fill={isScrapped ? "currentColor" : "none"} />
          </button>
          <button type="button" className="h-12 flex-1 rounded-xl bg-primary text-[19px] font-black text-white">이 이슈로 모의 면접 시작하기</button>
        </nav>
      </div>
    </AppShell>
  );
}
