"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const itemBase = "flex min-w-[58px] flex-col items-center gap-1 text-[11px] font-semibold";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[460px] items-center justify-around px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
        <Link href="/home" className={`${itemBase} ${pathname === "/home" ? "text-primary" : "text-muted"}`}>
          <span className="text-[14px]">⌂</span>
          홈
        </Link>
        <span className={`${itemBase} text-muted opacity-80`}>
          <span className="text-[14px]">◎</span>
          탐색
        </span>
        <span className={`${itemBase} text-muted opacity-80`}>
          <span className="text-[14px]">▣</span>
          스크랩
        </span>
        <Link
          href="/settings"
          className={`${itemBase} ${pathname === "/settings" ? "text-primary" : "text-muted"}`}
        >
          <span className="text-[14px]">◉</span>
          마이
        </Link>
      </div>
    </div>
  );
}
