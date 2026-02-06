"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Check, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Chip from "@/components/Chip";
import { companies } from "@/data/mockInsights";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { requestNotificationPermission } from "@/lib/mockSystemPush";
import { useProfileStore } from "@/store/useProfileStore";
import { Role } from "@/types";

const roles: { label: string; value?: Role }[] = [
  { label: "프론트엔드", value: "Frontend" },
  { label: "백엔드 개발", value: "Backend" },
  { label: "서비스 기획", value: "PM" },
  { label: "디자인", value: "Design" },
  { label: "데이터 분석" },
  { label: "마케팅" },
  { label: "경영지원" },
  { label: "영업" },
];

const industries = ["IT/플랫폼", "금융/핀테크", "커머스", "모빌리티", "바이오/헬스"];

export default function OnboardingPreferencesPage() {
  const router = useRouter();
  const hydrated = useHydratedStore();
  const profile = useProfileStore((state) => state.profile);
  const completeOnboarding = useProfileStore((state) => state.completeOnboarding);
  const setPushPermission = useProfileStore((state) => state.setPushPermission);

  const [nickname, setNickname] = useState(profile.nickname || "권순재");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(profile.targetCompanies);
  const [selectedRole, setSelectedRole] = useState<Role | null>(profile.targetRole ?? null);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(profile.targetIndustries ?? ["금융/핀테크"]);
  const [pushTime, setPushTime] = useState(profile.pushTime || "09:00");
  const [ddayDate, setDdayDate] = useState(profile.ddayDate || "");
  const [error, setError] = useState("");

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) => {
      if (prev.includes(company)) return prev.filter((item) => item !== company);
      if (prev.length >= 5) return prev;
      return [...prev, company];
    });
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) => (prev.includes(industry) ? prev.filter((item) => item !== industry) : [...prev, industry]));
  };

  const handleComplete = async () => {
    if (!selectedRole) {
      setError("관심 직무를 선택해 주세요.");
      return;
    }

    const permission = await requestNotificationPermission();
    if (permission !== "unsupported") {
      setPushPermission(permission);
    }

    completeOnboarding({
      nickname: nickname.trim() || "권순재",
      targetCompanies: selectedCompanies,
      targetRole: selectedRole,
      targetIndustries: selectedIndustries,
      interestKeywords: selectedIndustries,
      pushTime,
      pushEnabled: permission === "granted",
      ddayDate: ddayDate || undefined,
    });

    router.replace("/home");
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] page-enter">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/95 px-5 py-4">
          <button type="button" onClick={() => router.back()} className="h-10 w-10 text-[#0f1738]">
            <ChevronLeft />
          </button>
          <h1 className="text-[22px] font-black text-text">맞춤 정보 설정</h1>
          <button type="button" onClick={() => router.replace("/home")} className="text-[14px] font-semibold text-muted">
            건너뛰기
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-32 pt-7">
          <section className="mb-9">
            <h2 className="text-[30px] font-black leading-[1.2] tracking-[-0.02em] text-text">
              회원님에게 꼭 맞는
              <br />
              공고와 정보를 추천해 드릴게요.
            </h2>
            <p className="mt-2 text-[15px] font-medium text-[#6d80ab]">관심 키워드를 선택하시면 맞춤형 홈을 구성합니다.</p>
          </section>

          <section className="mb-8">
            <p className="text-[13px] font-bold text-text">닉네임</p>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-[14px] font-semibold text-text"
            />
          </section>

          <section className="mb-9">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[22px] font-black text-text">관심 기업</h3>
              <span className="text-[12px] font-semibold text-primary">최대 5개</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {companies.map((company) => {
                const active = selectedCompanies.includes(company);
                return (
                  <button
                    key={company}
                    type="button"
                    onClick={() => toggleCompany(company)}
                    className={`relative rounded-2xl border bg-white px-2 py-4 text-[13px] font-semibold shadow-[var(--shadow-card)] ${
                      active ? "border-primary" : "border-line"
                    }`}
                  >
                    {active ? (
                      <span className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                        <Check size={12} />
                      </span>
                    ) : null}
                    <span>{company}</span>
                  </button>
                );
              })}
              <button
                type="button"
                className="rounded-2xl border border-dashed border-line bg-white px-2 py-4 text-[13px] font-semibold text-muted shadow-[var(--shadow-card)]"
              >
                <span className="mx-auto mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f3f6ff]">
                  <Search size={13} />
                </span>
                검색
              </button>
            </div>
          </section>

          <section className="mb-9">
            <h3 className="mb-4 text-[22px] font-black text-text">관심 직무</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => {
                const value = role.value;
                return (
                  <Chip
                    key={role.label}
                    label={role.label}
                    active={value ? selectedRole === value : false}
                    onClick={value ? () => setSelectedRole(value) : undefined}
                  />
                );
              })}
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-line bg-white px-3 py-2 text-[12px] font-semibold text-muted"
              >
                <Search size={13} />
                검색
              </button>
            </div>
          </section>

          <section className="mb-9">
            <h3 className="mb-4 text-[22px] font-black text-text">관심 산업</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Chip key={industry} label={industry} active={selectedIndustries.includes(industry)} onClick={() => toggleIndustry(industry)} />
              ))}
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-line bg-white px-3 py-2 text-[12px] font-semibold text-muted"
              >
                <Search size={13} />
                검색
              </button>
            </div>
          </section>

          <section className="mb-9">
            <h3 className="mb-3 text-[22px] font-black text-text">
              면접 D-Day <span className="text-[14px] font-medium text-muted">(선택)</span>
            </h3>
            <div className="rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <CalendarDays size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-text">다가오는 면접일</p>
                  <p className="text-[12px] font-medium text-muted">날짜를 선택하면 알림을 드려요</p>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </div>
              <input
                type="date"
                value={ddayDate}
                onChange={(event) => setDdayDate(event.target.value)}
                className="mt-3 w-full rounded-xl border border-line px-3 py-2 text-[13px] font-semibold text-text"
              />
              <label className="mt-3 block text-[11px] font-semibold text-muted">푸시 시간</label>
              <input
                type="time"
                value={pushTime}
                onChange={(event) => setPushTime(event.target.value)}
                className="mt-2 w-full rounded-xl border border-line px-3 py-2 text-[13px] font-semibold text-text"
              />
            </div>
          </section>

          {error ? <p className="mb-6 text-[13px] font-semibold text-red-500">{error}</p> : null}
        </main>

        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] bg-gradient-to-t from-white via-white to-transparent px-5 pb-6 pt-8">
          <button type="button" onClick={handleComplete} className="h-14 w-full rounded-2xl bg-[#111a37] text-[21px] font-black text-white">
            설정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
