"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import BottomNav from "@/components/BottomNav";
import Chip from "@/components/Chip";
import { companies } from "@/data/mockInsights";
import { mockSchedules } from "@/data/mockSchedules";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { requestNotificationPermission, sendMockSystemNotification } from "@/lib/mockSystemPush";
import { useInsightStore } from "@/store/useInsightStore";
import { useProfileStore } from "@/store/useProfileStore";
import { Role } from "@/types";

const roles: Role[] = ["Frontend", "Backend", "PM", "Design"];

export default function SettingsPage() {
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

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  const handlePushToggle = async () => {
    if (pushEnabled) {
      togglePush(false);
      setStatus("푸시 알림을 끄셨습니다.");
      return;
    }

    const permission = await requestNotificationPermission();
    if (permission !== "unsupported") {
      setPushPermission(permission);
    }

    if (permission === "granted") {
      togglePush(true);
      setStatus("푸시 알림이 활성화되었습니다.");
    } else {
      togglePush(false);
      setStatus(permission === "unsupported" ? "이 환경은 알림을 지원하지 않습니다." : "알림 권한이 필요합니다.");
    }
  };

  const handleSendTestPush = async () => {
    if (!primaryInsight) {
      setStatus("발송할 mock 이슈가 없습니다.");
      return;
    }

    if (!pushEnabled) {
      setStatus("푸시가 꺼져 있습니다. 먼저 활성화해 주세요.");
      return;
    }

    const result = await sendMockSystemNotification({
      title: `[${primaryInsight.companyName}] 이슈 업데이트`,
      body: `${primaryInsight.title} (탭해서 상세 보기)`,
      url: `/detail/${primaryInsight.id}`,
    });

    if (result.permission !== "unsupported") {
      setPushPermission(result.permission);
    }

    if (!result.ok) {
      setStatus(result.message ?? "알림 전송에 실패했습니다.");
      return;
    }

    addPushHistory({
      title: `[${primaryInsight.companyName}] 이슈 업데이트`,
      body: `${primaryInsight.title} (탭해서 상세 보기)`,
      insightId: primaryInsight.id,
      source: "mock-system",
    });

    setStatus("테스트 알림을 보냈습니다.");
  };

  return (
    <AppShell className="page-enter">
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-[44px] font-black tracking-[-0.03em] text-text">설정</h1>
          <button className="text-[16px] font-extrabold text-primary">저장</button>
        </header>

        <section className="rounded-[28px] border border-line bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
              alt="profile"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-2xl object-cover"
            />
            <div>
              <p className="text-[30px] font-black text-text">{profile.nickname || "회원"}님</p>
              <p className="text-[18px] font-semibold text-muted">mock.user@nalleum.dev</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-[28px] border border-line bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="text-[30px] font-black text-text">관심 분야 및 기업</h2>
          <div>
            <p className="text-[14px] font-bold text-muted">관심 직무</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {roles.map((role) => (
                <Chip key={role} label={role} active={profile.targetRole === role} onClick={() => updateRole(role)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[14px] font-bold text-muted">관심 기업</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {companies.map((company) => (
                <Chip
                  key={company}
                  label={company}
                  active={profile.targetCompanies.includes(company)}
                  onClick={() => toggleCompany(company)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-[28px] border border-line bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-black text-text">푸시 알림 시간 설정</h2>
            <button
              type="button"
              onClick={handlePushToggle}
              className={`h-8 w-14 rounded-full p-1 transition ${pushEnabled ? "bg-primary" : "bg-line"}`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white transition ${
                  pushEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="rounded-2xl bg-[#f9fbff] p-4">
            <p className="text-[13px] font-bold text-muted">현재 권한: {pushPermission}</p>
            <label className="mt-3 block text-[14px] font-bold text-muted">발송 시간</label>
            <input
              type="time"
              value={profile.pushTime}
              onChange={(event) => setPushTime(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-line px-4 py-3 text-[22px] font-black text-text"
            />
            <p className="mt-2 text-[12px] font-semibold text-muted">설정된 시간은 mock 알림 테스트 기준으로만 사용됩니다.</p>
          </div>

          <button
            type="button"
            onClick={handleSendTestPush}
            className="w-full rounded-2xl bg-primary py-4 text-[20px] font-black text-white"
          >
            테스트 푸시 보내기 (mock)
          </button>
          {status ? <p className="text-[13px] font-bold text-primary">{status}</p> : null}
        </section>

        <section className="space-y-3 rounded-[28px] border border-line bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="text-[30px] font-black text-text">면접 일정 관리</h2>
          <div className="space-y-3">
            {mockSchedules.map((schedule) => (
              <article key={schedule.id} className="rounded-2xl border border-line bg-white px-4 py-3">
                <p className="text-[13px] font-extrabold text-primary">{schedule.dateLabel}</p>
                <p className="mt-1 text-[20px] font-black text-text">{schedule.companyName} {schedule.title}</p>
                <p className="mt-1 text-[15px] font-semibold text-muted">{schedule.timeLabel}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-[28px] border border-line bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-black text-text">알림 히스토리</h2>
            <span className="text-[12px] font-extrabold text-muted">최근 {Math.min(pushHistory.length, 10)}건</span>
          </div>
          <div className="space-y-3">
            {pushHistory.slice(0, 10).map((history) => (
              <article key={history.id} className="rounded-2xl border border-line bg-white p-3">
                <p className="text-[11px] font-bold text-muted">{new Date(history.receivedAt).toLocaleString()}</p>
                <p className="mt-1 text-[18px] font-black text-text">{history.title}</p>
                <p className="mt-1 text-[14px] font-semibold leading-relaxed text-[#5a6f9d]">{history.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </AppShell>
  );
}
