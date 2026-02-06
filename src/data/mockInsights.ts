import { InsightCard, Role, RoleContent } from '@/types';

export const companies = ['삼성전자', '네이버', '카카오', '토스', '쿠팡'];

const roleBase: Record<Role, RoleContent> = {
  Frontend: {
    question: '실시간 이슈 카드가 계속 추가될 때 UI 지연을 어떻게 줄이시겠습니까?',
    answerTip: '가상 스크롤, 이미지 지연 로딩, 상태 분리, React memo/useMemo 적용 순서로 설명하면 좋습니다.',
  },
  Backend: {
    question: '생성형 AI 기능 도입 시 백엔드에서 지연 시간이 커질 때 어떤 구조로 대응하시겠습니까?',
    answerTip: 'SSE 스트리밍, Semantic Cache, 비동기 큐, 타임아웃 및 재시도 정책을 함께 제시하세요.',
  },
  PM: {
    question: '브리핑 기능의 성과를 어떤 지표로 추적하고 개선하시겠습니까?',
    answerTip: '열람률, 상세 전환율, 스크랩률, 재방문율을 퍼널로 나눠서 설명하세요.',
  },
  Design: {
    question: '핵심 요약과 면접 질문 카드의 정보 우선순위는 어떻게 설계하시겠습니까?',
    answerTip: '시선 흐름, 대비, 타이포 위계, 터치 타겟 크기를 근거로 제시하세요.',
  },
};

const fallback = '/placeholders/card-placeholder.jpg';

export const insightCards: InsightCard[] = [
  {
    id: 'naver-ai-backend',
    companyName: '네이버',
    companyIconUrl: './naver_icon.png',
    title: '생성형 AI 도입 가속화에 따른 백엔드 아키텍처의 변화와 대응',
    summary: 'AI 기능 확산으로 실시간 추론, 벡터 검색, 서비스 분리가 핵심 아키텍처 이슈로 부상했습니다.',
    summaryBullets: [
      'LLM 연동을 위한 비동기 스트리밍 처리가 백엔드 설계의 핵심이 됐습니다.',
      'Vector DB 활용 기반 RAG 구조 도입이 빠르게 증가하고 있습니다.',
      '모놀리식에서 MSA 전환 가속으로 서비스 확장성과 장애 격리가 중요해졌습니다.',
    ],
    originalLink: 'https://www.naver.com',
    date: '2025.05.20',
    roleSpecificContent: roleBase,
    secondaryQuestion: 'RAG 아키텍처를 설계할 때 Vector DB 선택 기준은 무엇입니까?',
    secondaryAnswerTip: '인덱싱 속도, 검색 정확도(Recall), 운영 복잡도, 기존 인프라 통합성을 기준으로 비교하세요.',
    relatedIds: ['samsung-hbm', 'toss-zero-trust', 'kakao-mq'],
    coverImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=480&q=80',
    badge: 'TECH TREND',
    category: 'TRENDING',
  },
  {
    id: 'samsung-hbm',
    companyName: '삼성전자',
    companyIconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/512px-Samsung_Logo.svg.png',
    title: '차세대 HBM4 양산 계획 발표, 메모리 시장 주도권 강화',
    summary: '삼성전자가 HBM4 양산 로드맵을 발표하며 AI 반도체 경쟁이 본격화됐습니다.',
    summaryBullets: [
      'HBM4 양산 로드맵 공개로 고대역 메모리 경쟁이 가속화됐습니다.',
      '패키징 라인 확장과 수율 안정화 전략이 핵심 과제로 부상했습니다.',
      '면접에서는 기술 격차와 공정 효율화 관점으로 답변을 구성하는 것이 유리합니다.',
    ],
    originalLink: 'https://news.samsung.com',
    date: '2025.05.19',
    roleSpecificContent: roleBase,
    secondaryQuestion: '대규모 생산 전환 시 공급망 리스크를 어떻게 관리하시겠습니까?',
    secondaryAnswerTip: '다중 벤더 전략, 리드타임 버퍼, 지표 기반 조기 경보 체계를 함께 제시하세요.',
    relatedIds: ['naver-ai-backend', 'kakao-mq'],
    coverImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&w=480&q=80',
    badge: 'TRENDING',
    category: 'AI & CHIP',
  },
  {
    id: 'toss-zero-trust',
    companyName: '토스',
    companyIconUrl: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=120&q=80',
    title: '금융권 제로 트러스트 보안 모델 도입 현황과 기술 과제',
    summary: '권한 최소화와 감사 로그 강화로 금융 서비스 아키텍처가 재설계되고 있습니다.',
    summaryBullets: [
      '서비스 계정 권한 분리와 네트워크 분리가 표준화되고 있습니다.',
      '로그 기반 이상 탐지와 대응 자동화 체계가 강화되고 있습니다.',
      '보안성과 개발 생산성의 균형을 설계 관점에서 설명하면 좋습니다.',
    ],
    originalLink: 'https://toss.tech',
    date: '2025.05.18',
    roleSpecificContent: roleBase,
    secondaryQuestion: '제로 트러스트 환경에서 배포 파이프라인을 어떻게 설계하시겠습니까?',
    secondaryAnswerTip: '서명 검증, 비밀정보 분리, 단계별 승인, 감사 추적까지 포함해 설명하세요.',
    relatedIds: ['naver-ai-backend', 'kakao-mq'],
    coverImageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=480&q=80',
    badge: 'SECURITY',
    category: 'SECURITY',
  },
  {
    id: 'kakao-mq',
    companyName: '카카오',
    companyIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Kakao_logo.svg/512px-Kakao_logo.svg.png',
    title: '대규모 트래픽 처리를 위한 분산 메시지 큐 설계 전략',
    summary: '메시지 큐 파티셔닝과 재처리 전략이 서비스 안정성의 핵심으로 강조되고 있습니다.',
    summaryBullets: [
      '파티션 키 설계와 consumer lag 관측 체계가 중요합니다.',
      'DLQ와 재처리 파이프라인 표준화가 운영 난이도를 줄입니다.',
      '장애 격리와 데이터 정합성 전략을 함께 제시하면 설득력이 높습니다.',
    ],
    originalLink: 'https://www.kakaocorp.com',
    date: '2025.05.15',
    roleSpecificContent: roleBase,
    secondaryQuestion: '메시지 중복 처리와 순서 보장을 동시에 만족시키는 방법은?',
    secondaryAnswerTip: '멱등키, 파티션 설계, exactly-once 대안 비교를 기준으로 설명하세요.',
    relatedIds: ['naver-ai-backend', 'toss-zero-trust'],
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1537432376769-00aabc3b8b8e?auto=format&fit=crop&w=480&q=80',
    badge: 'SYSTEM DESIGN',
    category: 'ARCH',
  },
  {
    id: 'coupang-career',
    companyName: '쿠팡',
    companyIconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Coupang_logo.svg/512px-Coupang_logo.svg.png',
    title: '2025년 상반기 IT 대기업 기술 면접 빈출 질문 리스트',
    summary: '클라우드/AI/분산시스템 중심 질문이 상반기 기술 면접의 핵심 키워드로 집계됐습니다.',
    summaryBullets: [
      '대규모 트래픽 설계, 캐시 전략, 장애 복구 질문 비중이 증가했습니다.',
      'AI 기능 도입 시 latency, 비용, 품질 균형 관련 질문이 빈번합니다.',
      '경험 기반 의사결정 근거를 수치와 함께 설명하는 답변이 유리합니다.',
    ],
    originalLink: 'https://www.coupang.com',
    date: '2025.05.12',
    roleSpecificContent: roleBase,
    secondaryQuestion: '면접에서 아키텍처 의사결정 근거를 어떻게 설득력 있게 전달하겠습니까?',
    secondaryAnswerTip: '요구사항, 대안, 트레이드오프, 측정 지표 순서로 구조화하세요.',
    relatedIds: ['naver-ai-backend', 'samsung-hbm'],
    coverImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=480&q=80',
    badge: 'CAREER',
    category: 'CAREER',
  },
];

export const imageFallback = fallback;
