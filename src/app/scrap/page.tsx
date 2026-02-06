"use client";

import { Bookmark, ChevronDown, FileText, Search, Settings } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import BottomNav from "@/components/BottomNav";
import { companies, imageFallback } from "@/data/mockInsights";
import { mockScrapBriefings } from "@/data/mockScrapBriefings";
import { useInsightStore } from "@/store/useInsightStore";

export default function ScrapPage() {
  const router = useRouter();
  const insights = useInsightStore((state) => state.insights);
  const scrappedIds = useInsightStore((state) => state.scrappedIds);
  const toggleScrap = useInsightStore((state) => state.toggleScrap);
  const [companyFilter, setCompanyFilter] = useState("전체");

  const scrappedItems = useMemo(() => insights.filter((item) => scrappedIds.includes(item.id)), [insights, scrappedIds]);
  const filtered = useMemo(() => {
    if (companyFilter === "전체") return scrappedItems;
    return scrappedItems.filter((item) => item.companyName === companyFilter);
  }, [scrappedItems, companyFilter]);

  return (
    <AppShell className="page-enter" padded={false}>
      <div className="mx-auto min-h-screen w-full max-w-[430px] pb-24">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/95 px-5 py-4">
          <h1 className="text-[28px] font-black text-text">스크랩</h1>
          <div className="flex items-center gap-1 text-[#586995]">
            <button type="button" className="rounded-full p-2"><Search size={20} /></button>
            <button type="button" onClick={() => router.push("/settings")} className="rounded-full p-2"><Settings size={20} /></button>
          </div>
        </header>

        <section className="border-b border-line bg-white px-5 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {["전체", ...companies].map((company) => (
              <button
                key={company}
                type="button"
                onClick={() => setCompanyFilter(company)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-bold whitespace-nowrap ${companyFilter === company ? "bg-primary text-white" : "bg-[#f0f3fa] text-[#61739c]"}`}
              >
                {company}
              </button>
            ))}
          </div>
        </section>

        <main className="px-5 py-6">
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[23px] font-black text-text">면접 전 필수 브리핑</h2>
              <span className="text-[11px] font-semibold text-muted">전체보기</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {mockScrapBriefings.map((brief) => (
                <article key={brief.id} className={`min-w-[260px] rounded-3xl p-4 text-white ${brief.tone === "indigo" ? "bg-gradient-to-br from-[#5c37ff] to-[#632df8]" : "bg-gradient-to-br from-[#1f273b] to-[#0f1526]"}`}>
                  <span className="rounded bg-white/20 px-2 py-1 text-[10px] font-bold">{brief.label}</span>
                  <p className="mt-4 whitespace-pre-line text-[21px] font-black leading-[1.25]">{brief.title}</p>
                  <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold"><FileText size={14} />{brief.itemCountText}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[23px] font-black text-text">저장한 이슈 <span className="text-primary">{filtered.length}</span></h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted">최신순 <ChevronDown size={14} /></span>
            </div>
            <div className="space-y-3">
              {filtered.map((item) => (
                <article key={item.id} className="rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
                  <div className="flex gap-3">
                  <div className="h-20 w-20 overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumbnailUrl ?? imageFallback} alt={item.title} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.src = imageFallback; }} />
                  </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[9px] font-bold text-primary uppercase">{item.badge}</span>
                        <button type="button" onClick={() => toggleScrap(item.id)} className="text-primary"><Bookmark size={16} fill="currentColor" /></button>
                      </div>
                      <button type="button" onClick={() => router.push(`/detail/${item.id}`)} className="text-left">
                        <p className="text-[14px] font-black leading-snug text-text">{item.title}</p>
                      </button>
                      <p className="mt-1 text-[10px] font-medium text-muted">{item.date} · {item.companyName}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </AppShell>
  );
}
