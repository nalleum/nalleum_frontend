import Image from "next/image";
import React from "react";
import { InsightCard } from "@/types";

export default function InsightCardView({
  item,
  onClick,
}: {
  item: InsightCard;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-3xl border border-line bg-card p-4 text-left shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-xl border border-line bg-white p-1">
          <Image
            src={item.companyIconUrl}
            alt={item.companyName}
            width={32}
            height={32}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#6f7fa6]">{item.companyName}</p>
          <p className="text-[11px] font-semibold text-muted">{item.date}</p>
        </div>
        {item.badge ? (
          <span className="ml-auto rounded-full bg-primary-soft px-2 py-1 text-[11px] font-bold text-primary">
            {item.badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-[14px] font-extrabold leading-[1.35] text-text">{item.title}</h3>
    </button>
  );
}
