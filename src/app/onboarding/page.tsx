"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Chip from "@/components/Chip";
import { companies } from "@/data/mockInsights";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { requestNotificationPermission } from "@/lib/mockSystemPush";
import { useProfileStore } from "@/store/useProfileStore";
import { Role } from "@/types";

const roleOptions: Role[] = ["Frontend", "Backend", "PM", "Design"];

export default function OnboardingPage() {
  const router = useRouter();
  const hydrated = useHydratedStore();
  const profile = useProfileStore((state) => state.profile);
  const completeOnboarding = useProfileStore((state) => state.completeOnboarding);
  const setPushPermission = useProfileStore((state) => state.setPushPermission);

  const [nickname, setNickname] = useState(profile.nickname);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(profile.targetCompanies);
  const [selectedRole, setSelectedRole] = useState<Role | null>(
    profile.onboardingCompleted ? profile.targetRole : null
  );
  const [keywords, setKeywords] = useState(profile.interestKeywords.join(", "));
  const [pushTime, setPushTime] = useState(profile.pushTime || "09:00");
  const [error, setError] = useState("");

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((item) => item !== company) : [...prev, company]
    );
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError("직무를 선택해 주세요.");
      return;
    }

    const permission = await requestNotificationPermission();
    if (permission !== "unsupported") {
      setPushPermission(permission);
    }

    completeOnboarding({
      nickname: nickname.trim() || "회원",
      targetCompanies: selectedCompanies,
      targetRole: selectedRole,
      interestKeywords: keywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      pushTime,
      pushEnabled: permission === "granted",
    });

    router.replace("/home");
  };

  return (
    <AppShell className="page-enter bg-[radial-gradient(circle_at_20%_15%,#eef2ff_0%,#f8ebff_45%,#eaf2ff_100%)]">
      <div className="space-y-8 pt-4">
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-muted">맞춤 정보 설정</p>
          <h1 className="text-[42px] font-black leading-[1.08] tracking-[-0.03em] text-text">
            회원님에게 꼭 맞는
            <br />
            공고와 이슈를 추천할게요.
          </h1>
          <p className="text-[15px] font-semibold text-[#6e7fa9]">관심 키워드를 선택하면 맞춤 홈을 구성합니다.</p>
        </div>

        <section className="space-y-5 rounded-[28px] border border-line bg-white p-5 shadow-[var(--shadow-card)]">
          <div>
            <p className="text-[11px] font-bold text-muted">닉네임</p>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="이름 또는 닉네임"
              className="mt-2 w-full rounded-2xl border border-line px-4 py-3 text-[13px] font-semibold text-text"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-muted">관심 기업</p>
              <span className="text-[11px] font-extrabold text-primary">최대 5개</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {companies.map((company) => (
                <Chip
                  key={company}
                  label={company}
                  active={selectedCompanies.includes(company)}
                  onClick={() => toggleCompany(company)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-muted">관심 직무 (필수)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {roleOptions.map((role) => (
                <Chip key={role} label={role} active={selectedRole === role} onClick={() => setSelectedRole(role)} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-muted">관심 키워드</p>
            <input
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
              placeholder="예: AI, 클라우드, 아키텍처"
              className="mt-2 w-full rounded-2xl border border-line px-4 py-3 text-[13px] font-semibold text-text"
            />
          </div>

          <div>
            <p className="text-[11px] font-bold text-muted">알림 시간</p>
            <input
              type="time"
              value={pushTime}
              onChange={(event) => setPushTime(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-line px-4 py-3 text-[13px] font-semibold text-text"
            />
          </div>

          {error ? <p className="text-[11px] font-bold text-red-500">{error}</p> : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedRole}
            className="w-full rounded-2xl bg-navy py-4 text-[21px] font-black text-white disabled:opacity-45"
          >
            설정 완료
          </button>
        </section>
      </div>
    </AppShell>
  );
}
