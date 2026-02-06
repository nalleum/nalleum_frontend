import { NotificationItem } from "@/types";

export const mockNotifications: NotificationItem[] = [
  {
    id: "noti-1",
    category: "면접 브리핑",
    title: "네이버 백엔드 직무 최신 AI 트렌드 업데이트",
    body: "지원하신 직무와 관련된 8개의 핵심 이슈가 브리핑에 추가되었습니다. 면접 전 꼭 확인하세요.",
    timeLabel: "방금 전",
    iconTone: "indigo",
    unread: true,
  },
  {
    id: "noti-2",
    category: "일정 알림",
    title: "삼성전자 DX부문 면접 D-1",
    body: "내일 오후 2시 면접 일정이 있습니다. 준비하신 클라우드 아키텍처 요약본을 다시 복습해보세요.",
    timeLabel: "2시간 전",
    iconTone: "amber",
  },
  {
    id: "noti-3",
    category: "활동",
    title: "스크랩한 이슈에 새로운 분석이 추가되었습니다",
    body: "스크랩한 이슈에 현직자 분석 링크가 연결되었습니다.",
    timeLabel: "어제",
    iconTone: "purple",
  },
  {
    id: "noti-4",
    category: "주간 트렌드",
    title: "이번 주 가장 많이 읽힌 기술 이슈 TOP 5",
    body: "카카오, 쿠팡 등 대기업 기술 면접에서 가장 많이 언급된 키워드를 확인하세요.",
    timeLabel: "2025.05.22",
    iconTone: "blue",
  },
  {
    id: "noti-5",
    category: "공지사항",
    title: "서비스 안정화를 위한 시스템 점검 안내",
    body: "05.25(일) 02:00 ~ 05:00 서비스 점검이 예정되어 있습니다.",
    timeLabel: "2025.05.20",
    iconTone: "slate",
  },
  {
    id: "noti-6",
    category: "커리어",
    title: "맞춤 추천: 현대자동차 하반기 채용 시작",
    body: "회원님의 관심 기술 스택에 맞는 공고가 등록되었습니다.",
    timeLabel: "2025.05.18",
    iconTone: "green",
  },
];
