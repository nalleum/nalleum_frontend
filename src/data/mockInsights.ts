import { InsightCard, Role, RoleContent } from "@/types";

export const companies = ["네이버", "카카오", "쿠팡", "삼성전자", "토스"];

const roleBase: Record<Role, RoleContent> = {
  Frontend: {
    question: "실시간 이슈 카드가 계속 추가될 때 렌더링 부하를 어떻게 줄이시겠습니까?",
    answerTip: "가상화, 이미지 지연 로딩, 상태 분리, 메모이제이션을 핵심으로 설명하세요.",
  },
  Backend: {
    question: "뉴스/분석 파이프라인의 지연 시간을 줄이기 위한 서버 설계는?",
    answerTip: "큐 기반 비동기 처리, 캐시 계층, 실패 재시도, 관측성 지표를 제시하세요.",
  },
  PM: {
    question: "이 브리핑 기능의 성공을 어떤 지표로 판단하시겠습니까?",
    answerTip: "활성률, 브리핑 열람률, 상세 전환율, 스크랩률을 단계별로 제시하세요.",
  },
  Design: {
    question: "핵심 요약과 질문 카드의 정보 우선순위를 어떻게 설계할까요?",
    answerTip: "위계, 강조 색상, 시선 동선, 접근성 대비 기준을 설명하세요.",
  },
};

export const insightCards: InsightCard[] = [
  {
    id: "samsung-hbm4",
    companyName: "삼성전자",
    companyIconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/512px-Samsung_Logo.svg.png",
    title: "차세대 HBM4 양산 계획 발표, 글로벌 시장 주도권 경쟁",
    summary: "삼성전자가 상반기 내 HBM4 양산 로드맵을 공식화하며 AI 반도체 경쟁이 가속화됐습니다.",
    summaryBullets: [
      "HBM4 양산 일정과 주요 고객사 협업 계획 공개",
      "AI 서버향 수요 급증에 맞춘 패키징 생산 라인 증설",
      "면접에서는 기술 격차와 공급망 리스크를 함께 설명하는 것이 핵심",
    ],
    originalLink: "https://news.samsung.com",
    date: "2025.05.20",
    badge: "TRENDING",
    category: "TECH TREND",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    roleSpecificContent: {
      ...roleBase,
      Backend: {
        question: "생성형 AI 도입 시 백엔드에서 가장 먼저 병목이 생기는 지점은 어디입니까?",
        answerTip: "SSE/웹소켓 스트리밍, 캐시 계층, 비동기 큐 전략을 같이 제시하면 설득력이 높습니다.",
      },
    },
    relatedIds: ["naver-cloud", "toss-security", "kakao-ai-search"],
  },
  {
    id: "naver-cloud",
    companyName: "네이버",
    companyIconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Naver_Logotype.svg/512px-Naver_Logotype.svg.png",
    title: "생성형 AI 도입 가속화에 따른 백엔드 아키텍처 변화",
    summary: "네이버는 검색/클라우드 전반에서 AI 처리량 증가에 대응하기 위한 아키텍처 재편을 진행 중입니다.",
    summaryBullets: [
      "RAG 파이프라인 표준화 추진",
      "벡터 DB 운영 자동화 비중 확대",
      "모놀리식에서 서비스 단위 분리 가속",
    ],
    originalLink: "https://www.naver.com",
    date: "2025.05.20",
    badge: "TECH TREND",
    category: "INFRA",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    roleSpecificContent: roleBase,
    relatedIds: ["samsung-hbm4", "kakao-ai-search"],
  },
  {
    id: "toss-security",
    companyName: "토스",
    companyIconUrl:
      "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=120&q=80",
    title: "금융권 제로 트러스트 보안 모델 도입 현황과 기술 과제",
    summary: "인증 체계 고도화와 내부망 분리 정책으로 개발/운영 파이프라인 설계가 달라지고 있습니다.",
    summaryBullets: [
      "권한 최소화 정책과 서비스 계정 분리 강화",
      "로그 감사 체계와 이상 탐지 규칙 운영 확대",
      "면접 답변에서는 보안성과 개발 생산성 균형이 관건",
    ],
    originalLink: "https://toss.tech",
    date: "2025.05.18",
    badge: "SECURITY",
    category: "SECURITY",
    coverImageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    roleSpecificContent: roleBase,
    relatedIds: ["samsung-hbm4", "coupang-msa"],
  },
  {
    id: "kakao-ai-search",
    companyName: "카카오",
    companyIconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Kakao_logo.svg/512px-Kakao_logo.svg.png",
    title: "카카오 AI 검색 고도화, 추천 정확도 중심 구조 개편",
    summary: "추천 정밀도 향상을 위해 피처 스토어와 실험 파이프라인을 재정비했습니다.",
    summaryBullets: [
      "실험군 분리 기반 모델 배포 자동화",
      "실시간 피처 적재 지연 시간 단축",
      "서비스 지표와 모델 지표 통합 대시보드 구축",
    ],
    originalLink: "https://www.kakaocorp.com",
    date: "2025.05.17",
    badge: "NEW",
    category: "DATA",
    coverImageUrl:
      "https://images.unsplash.com/photo-1573164574472-797cdf4a583a?auto=format&fit=crop&w=1200&q=80",
    roleSpecificContent: roleBase,
    relatedIds: ["naver-cloud", "samsung-hbm4"],
  },
  {
    id: "coupang-msa",
    companyName: "쿠팡",
    companyIconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Coupang_logo.svg/512px-Coupang_logo.svg.png",
    title: "대규모 트래픽 처리를 위한 분산 메시지 큐 설계 전략",
    summary: "배송/주문 이벤트의 폭증 구간에서 메시지 큐 파티셔닝 전략이 핵심으로 부상했습니다.",
    summaryBullets: [
      "파티션 키 설계와 consumer lag 모니터링 강화",
      "재처리 파이프라인을 위한 DLQ 전략 표준화",
      "아키텍처 면접에서 장애 전파 차단 설계를 강조하면 유리",
    ],
    originalLink: "https://www.coupang.com",
    date: "2025.05.15",
    badge: "SYSTEM DESIGN",
    category: "ARCH",
    coverImageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    roleSpecificContent: roleBase,
    relatedIds: ["toss-security", "naver-cloud"],
  },
];
