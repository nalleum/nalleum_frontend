import { PushHistoryEntry } from "@/types";

export const mockPushHistorySeed: PushHistoryEntry[] = [
  {
    id: "seed-1",
    title: "네이버 백엔드 직무 최신 AI 트렌드 업데이트",
    body: "지원 직무와 연관된 핵심 이슈가 브리핑에 추가되었습니다.",
    insightId: "naver-cloud",
    receivedAt: "2025-05-22T08:30:00.000Z",
    source: "mock-system",
  },
  {
    id: "seed-2",
    title: "삼성전자 DX부문 면접 D-1",
    body: "내일 오후 2시 면접 일정이 있습니다. 준비한 요약을 다시 확인해보세요.",
    insightId: "samsung-hbm4",
    receivedAt: "2025-05-21T22:30:00.000Z",
    source: "mock-system",
  },
];
