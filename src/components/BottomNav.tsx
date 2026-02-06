"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Bookmark, House, UserRound } from "lucide-react";

const itemBase = "flex min-w-[56px] flex-col items-center gap-1 text-[11px] font-semibold";

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-white/95 shadow-[0_-6px_18px_rgba(18,29,61,0.08)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-[430px] items-center justify-around px-5 pb-[calc(0.65rem+env(safe-area-inset-bottom))] pt-2.5">
        <Link href="/home" className={`${itemBase} ${isActive("/home") ? "text-primary" : "text-muted"}`}>
          <House size={18} strokeWidth={2.2} />
          홈
        </Link>
        <Link href="/notifications" className={`${itemBase} ${isActive("/notifications") ? "text-primary" : "text-muted"}`}>
          <Bell size={18} strokeWidth={2.2} />
          알림
        </Link>
        <Link href="/scrap" className={`${itemBase} ${isActive("/scrap") ? "text-primary" : "text-muted"}`}>
          <Bookmark size={18} strokeWidth={2.2} />
          스크랩
        </Link>
        <Link href="/settings" className={`${itemBase} ${isActive("/settings") ? "text-primary" : "text-muted"}`}>
          <UserRound size={18} strokeWidth={2.2} />
          마이
        </Link>
      </div>
    </nav>
  );
}
