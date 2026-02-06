'use client';

import {
  Bot,
  Building2,
  Camera,
  ChevronLeft,
  EllipsisVertical,
  FilePlus2,
  FileText,
  Info,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import BottomNav from '@/components/BottomNav';
import ProfileAvatar from '@/components/ProfileAvatar';
import { mockSchedules } from '@/data/mockSchedules';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { requestNotificationPermission, sendMockSystemNotification } from '@/lib/mockSystemPush';
import { useInsightStore } from '@/store/useInsightStore';
import { useProfileStore } from '@/store/useProfileStore';

export default function SettingsPage() {
  const router = useRouter();
  const hydrated = useHydratedStore();
  const profile = useProfileStore((state) => state.profile);
  const pushEnabled = useProfileStore((state) => state.pushEnabled);
  const setPushPermission = useProfileStore((state) => state.setPushPermission);
  const addPushHistory = useProfileStore((state) => state.addPushHistory);
  const togglePush = useProfileStore((state) => state.togglePush);
  const setPushTime = useProfileStore((state) => state.setPushTime);
  const insights = useInsightStore((state) => state.insights);
  const [status, setStatus] = useState('');

  const primaryInsight = useMemo(
    () => insights.find((item) => profile.targetCompanies.includes(item.companyName)) ?? insights[0],
    [insights, profile.targetCompanies]
  );

  if (!hydrated) return <div className='min-h-screen bg-background' />;

  const handlePushToggle = async () => {
    if (pushEnabled) {
      togglePush(false);
      setStatus('푸시 알림을 껐습니다.');
      return;
    }

    const permission = await requestNotificationPermission();
    if (permission !== 'unsupported') setPushPermission(permission);

    if (permission === 'granted') {
      togglePush(true);
      setStatus('푸시 알림이 활성화되었습니다.');
    } else {
      togglePush(false);
      setStatus(permission === 'unsupported' ? '이 브라우저는 알림을 지원하지 않습니다.' : '알림 권한이 필요합니다.');
    }
  };

  const handleSendTestPush = async () => {
    if (!primaryInsight) return;
    if (!pushEnabled) {
      setStatus('푸시 토글을 먼저 켜주세요.');
      return;
    }

    setStatus('10초 후 테스트 푸시를 보냅니다.');

    window.setTimeout(async () => {
      const result = await sendMockSystemNotification({
        title: `[${primaryInsight.companyName}] 면접 대비 질문`,
        body: `${primaryInsight.secondaryQuestion}`,
        url: `/detail/${primaryInsight.id}`,
        icon: '/main_icon.png',
      });

      if (result.permission !== 'unsupported') setPushPermission(result.permission);

      if (!result.ok) {
        setStatus(result.message ?? '테스트 알림 전송 실패');
        return;
      }

      addPushHistory({
        title: `[${primaryInsight.companyName}] 면접 질문`,
        body: `${primaryInsight.secondaryQuestion}`,
        insightId: primaryInsight.id,
        category: '면접 브리핑',
      });

      setStatus('테스트 알림을 전송했습니다.');
    }, 10000);
  };

  return (
    <AppShell className='page-enter' padded={false}>
      <div className='mx-auto min-h-screen w-full max-w-[430px] bg-[#f8faff] pb-24'>
        <header className='sticky top-0 z-30 flex items-center justify-between border-b border-[#edf1fb] bg-white/95 px-5 py-4 backdrop-blur'>
          <div className='flex items-center gap-2'>
            <button type='button' onClick={() => router.back()} className='rounded-full p-1 text-[#0f1738]'>
              <ChevronLeft size={20} />
            </button>
            <h1 className='text-[22px] font-black text-[#0f1738]'>설정 및 서류</h1>
          </div>
          <button type='button' className='text-[14px] font-bold text-primary'>
            저장
          </button>
        </header>

        <main className='space-y-2'>
          <section className='border-b border-[#edf1fb] bg-white px-5 py-6'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <ProfileAvatar
                  nickname={profile.nickname}
                  size={64}
                  className='h-16 w-16 rounded-2xl border border-[#edf1fb]'
                />
                <button
                  type='button'
                  className='absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border border-[#edf1fb] bg-white text-[#9aa8c8]'
                >
                  <Camera size={12} />
                </button>
              </div>
              <div>
                <h2 className='text-[18px] font-bold text-[#0f1738]'>{profile.nickname}님</h2>
                <p className='text-[14px] font-medium text-[#7f8fb1]'>jisuk.kim@vinsign.com</p>
              </div>
            </div>
          </section>

          <section className='border-b border-[#edf1fb] bg-white px-5 py-6'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-[15px] font-bold text-[#0f1738]'>서류 관리</h3>
              <span className='rounded bg-[#eef2ff] px-2 py-0.5 text-[11px] font-bold text-primary'>
                업데이트 2025.05
              </span>
            </div>

            <div className='space-y-3'>
              <article className='flex items-center gap-3 rounded-2xl border border-[#edf1fb] bg-[#f8faff] p-4'>
                <div className='grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-sm'>
                  <FileText size={18} />
                </div>
                <div className='flex-1'>
                  <p className='text-[13px] font-bold text-[#0f1738]'>{`이력서_${profile.nickname}.pdf`}</p>
                  <p className='text-[11px] text-[#9aa8c8]'>2.4MB • 첨부 완료</p>
                </div>
                <button type='button' className='text-[#c3cce0]'>
                  <Trash2 size={16} />
                </button>
              </article>

              <article className='flex items-center gap-3 rounded-2xl border-2 border-dashed border-[#e5eaf8] p-4'>
                <div className='grid h-10 w-10 place-items-center rounded-xl bg-[#f8faff] text-[#9aa8c8]'>
                  <FilePlus2 size={18} />
                </div>
                <div className='flex-1'>
                  <p className='text-[13px] font-bold text-[#9aa8c8]'>자기소개서 첨부</p>
                  <p className='text-[11px] text-[#c0c9de]'>PDF, DOCX 파일 (최대 10MB)</p>
                </div>
                <button type='button' className='rounded-lg bg-[#111a37] px-3 py-1.5 text-[11px] font-bold text-white'>
                  파일 선택
                </button>
              </article>
            </div>
          </section>

          <section className='border-b border-[#edf1fb] bg-white px-5 py-6'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-tr from-primary to-[#7b63ff] text-white'>
                <Sparkles size={12} />
              </div>
              <h3 className='text-[15px] font-bold text-[#0f1738]'>AI 서류 분석 및 기업 추천</h3>
            </div>

            <div className='rounded-2xl border border-[#dfe7ff] bg-[#eef3ff] p-5'>
              <div className='mb-4 flex items-start justify-between'>
                <div>
                  <h4 className='mb-1 text-[14px] font-bold text-[#273f84]'>분석 리포트 준비 완료</h4>
                  <p className='text-[12px] leading-relaxed text-[#4e69a8]'>
                    첨부된 이력서를 바탕으로
                    <br />
                    지석님께 최적화된 기업을 찾았습니다.
                  </p>
                </div>
                <div className='grid h-12 w-12 place-items-center rounded-full bg-white text-primary shadow-sm'>
                  <Bot size={20} />
                </div>
              </div>

              <div className='mb-5 flex flex-wrap gap-2'>
                <span className='rounded-full border border-[#dfe7ff] bg-white px-2.5 py-1 text-[11px] font-bold text-primary'>
                  #백엔드_숙련도_상
                </span>
                <span className='rounded-full border border-[#dfe7ff] bg-white px-2.5 py-1 text-[11px] font-bold text-primary'>
                  #AWS_경험보유
                </span>
                <span className='rounded-full border border-[#dfe7ff] bg-white px-2.5 py-1 text-[11px] font-bold text-primary'>
                  #대규모_트래픽
                </span>
              </div>

              <div className='space-y-2'>
                <p className='text-[11px] font-black uppercase tracking-widest text-[#9aadde]'>추천 매칭 기업</p>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='rounded-xl border border-[#dfe7ff] bg-white p-3'>
                    <div className='mb-2 flex items-center gap-2'>
                      <span className='grid h-6 w-6 place-items-center rounded bg-[#f5f8ff] text-[#9aa8c8]'>
                        <Building2 size={12} />
                      </span>
                      <span className='text-[12px] font-bold text-[#0f1738]'>토스</span>
                    </div>
                    <p className='text-[10px] text-[#7f8fb1]'>매칭률 98%</p>
                  </div>
                  <div className='rounded-xl border border-[#dfe7ff] bg-white p-3'>
                    <div className='mb-2 flex items-center gap-2'>
                      <span className='grid h-6 w-6 place-items-center rounded bg-[#f5f8ff] text-[#9aa8c8]'>
                        <Building2 size={12} />
                      </span>
                      <span className='text-[12px] font-bold text-[#0f1738]'>배달의민족</span>
                    </div>
                    <p className='text-[10px] text-[#7f8fb1]'>매칭률 94%</p>
                  </div>
                </div>
              </div>

              <button
                type='button'
                className='mt-4 w-full rounded-xl bg-primary py-3 text-[14px] font-bold text-white shadow-[0_10px_18px_rgba(79,45,255,0.2)]'
              >
                상세 매칭 리포트 보기
              </button>
            </div>
          </section>

          <section className='border-b border-[#edf1fb] bg-white px-5 py-6'>
            <div className='mb-5 flex items-center justify-between'>
              <h3 className='text-[15px] font-bold text-[#0f1738]'>푸시 알림 시간 설정</h3>
              <button
                type='button'
                onClick={handlePushToggle}
                className={`relative h-5 w-10 rounded-full transition ${pushEnabled ? 'bg-primary' : 'bg-[#dfe6f7]'}`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${pushEnabled ? 'right-0.5' : 'left-0.5'}`}
                />
              </button>
            </div>

            <div className='space-y-4 rounded-2xl bg-[#f8faff] p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-[14px] font-semibold text-[#5d6f98]'>시작 시간</span>
                <input
                  type='time'
                  value={profile.pushTime}
                  onChange={(event) => setPushTime(event.target.value)}
                  className='rounded-xl border border-[#edf1fb] bg-white px-4 py-2 text-[14px] font-bold text-[#0f1738]'
                />
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[14px] font-semibold text-[#5d6f98]'>종료 시간</span>
                <button
                  type='button'
                  className='rounded-xl border border-[#edf1fb] bg-white px-4 py-2 text-[14px] font-bold text-[#0f1738]'
                >
                  오후 10:00
                </button>
              </div>
              <p className='flex items-start gap-2 text-[12px] font-medium text-[#9aa8c8]'>
                <Info size={14} className='mt-0.5' />
                설정한 시간 외에는 긴급 공지사항을 제외한 모든 푸시 알림이 발송되지 않습니다.
              </p>
            </div>
            <button
              type='button'
              onClick={handleSendTestPush}
              className='mt-3 w-full rounded-xl bg-primary py-3 text-[14px] font-bold text-white shadow-[0_10px_18px_rgba(79,45,255,0.2)]'
            >
              데모 테스트 푸시 보내기
            </button>
            {status ? <p className='mt-2 text-[12px] font-semibold text-primary'>{status}</p> : null}
          </section>

          <section className='border-b border-[#edf1fb] bg-white px-5 py-6'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-[15px] font-bold text-[#0f1738]'>면접 일정 관리</h3>
              <button type='button' className='grid h-7 w-7 place-items-center rounded-lg bg-[#111a37] text-white'>
                <Plus size={14} />
              </button>
            </div>

            <div className='space-y-3'>
              {mockSchedules.map((schedule, idx) => (
                <article
                  key={schedule.id}
                  className='flex items-center gap-4 rounded-2xl border border-[#edf1fb] bg-white p-4'
                >
                  <div
                    className={`w-12 rounded-xl py-2 text-center ${idx === 0 ? 'bg-[#fff6df] text-[#f59e0b]' : 'bg-[#ecf3ff] text-[#3b82f6]'}`}
                  >
                    <p className='text-[10px] font-black leading-none'>{schedule.dateLabel.split(' ')[0]}</p>
                    <p className='text-[20px] font-black leading-tight'>{schedule.dateLabel.split(' ')[1]}</p>
                  </div>
                  <div className='flex-1'>
                    <p className='text-[15px] font-bold text-[#0f1738]'>
                      {schedule.companyName} {schedule.title}
                    </p>
                    <p className='text-[13px] text-[#7f8fb1]'>{schedule.timeLabel}</p>
                  </div>
                  <button type='button' className='text-[#c3cce0]'>
                    <EllipsisVertical size={16} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className='space-y-4 px-5 py-8'>
            <button
              type='button'
              onClick={() => router.push('/onboarding')}
              className='block text-[14px] font-semibold text-[#9aa8c8]'
            >
              로그아웃
            </button>
            <button type='button' className='block text-[14px] font-semibold text-[#ff6b6b]'>
              회원 탈퇴
            </button>
          </section>
        </main>

        <BottomNav />
      </div>
    </AppShell>
  );
}
