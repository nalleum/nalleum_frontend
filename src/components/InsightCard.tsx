import Image from "next/image";
import React from "react";
import { Bookmark } from "lucide-react";
import { imageFallback } from "@/data/mockInsights";
import { InsightCard } from "@/types";

export default function InsightCardView({ item, onClick, scrapped, onToggleScrap }: { item: InsightCard; onClick?: () => void; scrapped?: boolean; onToggleScrap?: () => void; }) {
  return (
    <article className="rounded-3xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
      <button type="button" onClick={onClick} className="w-full text-left">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-xl border border-line bg-white p-1">
            <Image src={item.companyIconUrl} alt={item.companyName} width={36} height={36} className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#4f628f]">{item.companyName}</p>
            <p className="text-[11px] font-medium text-muted">{item.date}</p>
          </div>
          {item.badge ? <span className="ml-auto rounded-full bg-primary-soft px-2 py-1 text-[10px] font-bold text-primary">{item.badge}</span> : null}
        </div>
        <h3 className="mt-3 text-[17px] font-black leading-[1.3] text-text">{item.title}</h3>
      </button>
      {item.thumbnailUrl ? (
        <div className="mt-3 overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="h-32 w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = imageFallback;
            }}
          />
        </div>
      ) : null}
      {onToggleScrap ? (
        <button type="button" onClick={onToggleScrap} className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold text-primary">
          <Bookmark size={14} fill={scrapped ? "currentColor" : "none"} />
          {scrapped ? "저장됨" : "저장"}
        </button>
      ) : null}
    </article>
  );
}
