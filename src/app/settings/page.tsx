"use client";

import { Camera, ChevronLeft, EllipsisVertical, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import BottomNav from "@/components/BottomNav";
import Chip from "@/components/Chip";
import ProfileAvatar from "@/components/ProfileAvatar";
import { companies } from "@/data/mockInsights";
import { mockSchedules } from "@/data/mockSchedules";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { requestNotificationPermission, sendMockSystemNotification } from "@/lib/mockSystemPush";
import { useInsightStore } from "@/store/useInsightStore";
import { useProfileStore } from "@/store/useProfileStore";
import { Role } from "@/types";

const roles: { label: string; value: Role }[] = [
  { label: "프론트엔드", value: "Frontend" },
  { label: "백엔드 개발", value: "Backend" },
  { label: "서비스 기획", value: "PM" },
  { label: "디자인", value: "Design" },
];

export default function SettingsPage() {
  const router = useRouter();
  const hydrated = useHydratedStore();
  const profile = useProfileStore((state) => state.profile);
  const pushEnabled = useProfileStore((state) => state.pushEnabled);
  const pushPermission = useProfileStore((state) => state.pushPermission);
  const pushHistory = useProfileStore((state) => state.pushHistory);
  const updateRole = useProfileStore((state) => state.updateRole);
  const toggleCompany = useProfileStore((state) => state.toggleCompany);
  const togglePush = useProfileStore((state) => state.togglePush);
  const setPushPermission = useProfileStore((state) => state.setPushPermission);
  const setPushTime = useProfileStore((state) => state.setPushTime);
  const addPushHistory = useProfileStore((state) => state.addPushHistory);
  const insights = useInsightStore((state) => state.insights);

  const [status, setStatus] = useState("");

  const primaryInsight = useMemo(
    () => insights.find((item) => profile.targetCompanies.includes(item.companyName)) ?? insights[0],
    [insights, profile.targetCompanies]
  );

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  const handlePushToggle = async () => {
    if (pushEnabled) {
      togglePush(false);
      setStatus("푸시 알림을 껐습니다.");
      return;
    }

    const permission = await requestNotificationPermission();
    if (permission !== "unsupported") setPushPermission(permission);

    if (permission === "granted") {
      togglePush(true);
      setStatus("푸시 알림이 활성화되었습니다.");
    } else {
      togglePush(false);
      setStatus(permission === "unsupported" ? "이 브라우저는 알림을 지원하지 않습니다." : "알림 권한이 필요합니다.");
    }
  };

  const handleSendTestPush = async () => {
    if (!primaryInsight) return;
    if (!pushEnabled) {
      setStatus("푸시 토글을 먼저 켜주세요.");
      return;
    }

    setStatus("10초 후 테스트 푸시를 보냅니다.");

    window.setTimeout(async () => {
      const result = await sendMockSystemNotification({
        title: `[${primaryInsight.companyName}] 이슈 업데이트`,
        body: `${primaryInsight.title} (탭해서 상세 보기)`,
        url: `/detail/${primaryInsight.id}`,
        icon: "/main_icon.png",
      });

      if (result.permission !== "unsupported") setPushPermission(result.permission);

      if (!result.ok) {
        setStatus(result.message ?? "테스트 알림 전송 실패");
        return;
      }

      addPushHistory({
        title: `[${primaryInsight.companyName}] 이슈 업데이트`,
        body: `${primaryInsight.title} (탭해서 상세 보기)`,
        insightId: primaryInsight.id,
        category: "면접 브리핑",
      });

      setStatus("테스트 알림을 전송했습니다.");
    }, 10000);
  };

  return (
    <AppShell className="page-enter" padded={false}>
      <div className="mx-auto min-h-screen w-full max-w-[430px] pb-24">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/95 px-5 py-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => router.back()} className="rounded-full p-1 text-text"><ChevronLeft /></button>
            <h1 className="text-[22px] font-black text-text">설정 및 서류</h1>
          </div>
          <button type="button" className="text-[14px] font-bold text-primary">저장</button>
        </header>

        <main className="space-y-3 bg-[#f8faff] pb-5">
          <section className="bg-white px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ProfileAvatar nickname={profile.nickname} size={66} className="h-16 w-16 rounded-2xl border border-line" />
                <button type="button" className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border border-line bg-white text-muted"><Camera size={12} /></button>
              </div>
              <div>
                <p className="text-[20px] font-black text-text">{profile.nickname}님</p>
                <p className="text-[14px] font-medium text-muted">mock.user@nalleum.dev</p>
              </div>
            </div>
          </section>

          <section className="bg-white px-5 py-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[22px] font-black text-text">관심 분야 및 기업</h2>
              <button type="button" className="inline-flex items-center gap-1 text-[14px] font-semibold text-muted"><Plus size={15} />추가</button>
            </div>
            <p className="mb-2 text-[13px] font-semibold text-muted">관심 직무</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {roles.map((role) => (
                <Chip key={role.value} label={role.label} active={profile.targetRole === role.value} onClick={() => updateRole(role.value)} />
              ))}
            </div>
            <p className="mb-2 text-[13px] font-semibold text-muted">관심 기업</p>
            <div className="flex flex-wrap gap-2">
              {companies.map((company) => (
                <Chip key={company} label={company} active={profile.targetCompanies.includes(company)} onClick={() => toggleCompany(company)} />
              ))}
            </div>
          </section>

          <section className="bg-white px-5 py-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[22px] font-black text-text">푸시 알림 시간 설정</h2>
              <button type="button" onClick={handlePushToggle} className={`h-8 w-14 rounded-full p-1 transition ${pushEnabled ? "bg-primary" : "bg-line"}`}>
                <span className={`block h-6 w-6 rounded-full bg-white transition ${pushEnabled ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
            <div className="rounded-2xl bg-[#f7f9ff] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#4f628f]">시작 시간</span>
                <input
                  type="time"
                  value={profile.pushTime}
                  onChange={(event) => setPushTime(event.target.value)}
                  className="rounded-xl border border-line bg-white px-3 py-2 text-[14px] font-bold text-text"
                />
              </div>
              <p className="text-[12px] font-medium text-muted">설정 권한: {pushPermission}</p>
              <p className="mt-2 text-[12px] font-medium text-[#9aa8c8]">설정한 시간 외에는 mock 알림만 동작합니다.</p>
              <p className="mt-1 text-[12px] font-medium text-[#9aa8c8]">안드로이드는 Chrome에서 알림 권한을 허용하면 테스트 알림이 즉시 도착합니다.</p>
            </div>
            <button type="button" onClick={handleSendTestPush} className="mt-3 h-12 w-full rounded-xl bg-primary text-[15px] font-black text-white">
              테스트 푸시 보내기 (mock)
            </button>
            {status ? <p className="mt-2 text-[13px] font-semibold text-primary">{status}</p> : null}
          </section>

          <section className="bg-white px-5 py-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[22px] font-black text-text">면접 일정 관리</h2>
              <button type="button" className="grid h-8 w-8 place-items-center rounded-lg bg-[#111a37] text-white"><Plus size={15} /></button>
            </div>
            <div className="space-y-3">
              {mockSchedules.map((schedule) => (
                <article key={schedule.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3">
                  <div className="w-12 rounded-xl bg-[#fff6df] py-2 text-center text-[#f59e0b]">
                    <p className="text-[11px] font-black">{schedule.dateLabel.split(" ")[0]}</p>
                    <p className="text-[19px] font-black">{schedule.dateLabel.split(" ")[1]}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-black text-text">{schedule.companyName} {schedule.title}</p>
                    <p className="text-[13px] font-medium text-[#5f729c]">{schedule.timeLabel}</p>
                  </div>
                  <button type="button" className="text-muted"><EllipsisVertical size={16} /></button>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white px-5 py-5">
            <h2 className="mb-3 text-[22px] font-black text-text">알림 히스토리</h2>
            <div className="space-y-2">
              {pushHistory.slice(0, 6).map((item) => (
                <article key={item.id} className="rounded-xl border border-line bg-white p-3">
                  <p className="text-[11px] font-semibold text-muted">{new Date(item.receivedAt).toLocaleString()}</p>
                  <p className="mt-1 text-[15px] font-black text-text">{item.title}</p>
                  <p className="mt-1 text-[13px] font-medium text-[#5f729c]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white px-5 py-6">
            <button type="button" className="block text-[14px] font-semibold text-muted">로그아웃</button>
            <button type="button" className="mt-3 block text-[14px] font-semibold text-red-400">회원 탈퇴</button>
          </section>
        </main>

        <BottomNav />
      </div>
    </AppShell>
  );
}
