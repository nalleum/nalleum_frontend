"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";

export default function OnboardingIntroPage() {
  const router = useRouter();

  return (
    <AppShell className="page-enter min-h-screen bg-[radial-gradient(circle_at_15%_10%,#edefff_0%,#f8edff_46%,#e7eeff_100%)]" padded={false}>
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden px-8 pb-10 pt-6">
        <div className="flex justify-end">
          <button type="button" className="text-[14px] font-semibold text-[#8b99b8]" onClick={() => router.push("/onboarding/preferences")}>건너뛰기</button>
        </div>

        <div className="mt-auto space-y-7 pb-6">
          <div className="h-16 w-16 overflow-hidden rounded-[20px] bg-white p-1 shadow-[0_16px_32px_rgba(64,53,165,0.18)]">
            <Image src="/main_icon.png" alt="main icon" width={64} height={64} className="h-full w-full rounded-[16px] object-cover" />
          </div>

          <div className="space-y-4">
            <h1 className="text-[48px] font-black leading-[1.13] tracking-[-0.03em] text-[#111b39]">
              지금 바로
              <br />
              <span className="text-primary">시작합니다</span>
            </h1>
            <p className="text-[19px] font-medium leading-[1.45] text-[#4f628f]">
              더 스마트하고 편리한 일상의 변화,
              <br />
              우리가 함께 만들어갑니다.
            </p>
          </div>

          <div className="flex gap-2">
            <span className="h-1.5 w-8 rounded-full bg-primary" />
            <span className="h-1.5 w-2 rounded-full bg-[#d6dcf0]" />
            <span className="h-1.5 w-2 rounded-full bg-[#d6dcf0]" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => router.push("/onboarding/preferences")}
              className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-[#111a37] text-[28px] font-black text-white shadow-[0_16px_26px_rgba(17,26,55,0.24)]"
            >
              시작하기
              <ChevronRight size={20} />
            </button>
            <button type="button" className="h-16 w-full rounded-2xl border border-[#e1e7fb] bg-white/80 text-[28px] font-black text-[#131f41]">
              로그인
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-[13px] font-medium text-[#9aa8c8]">
          계속 진행함으로써 <span className="underline">이용약관</span> 및 <span className="underline">개인정보처리방침</span>에 동의하게 됩니다.
        </p>
      </div>
    </AppShell>
  );
}
