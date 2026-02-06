
Nalleum (낼름) - 취준생을 위한 개인 맞춤형 기업 분석 & 면접 대비 서비스
"시간 없는 취준생을 위해, 관심 기업의 최신 이슈를 면접 예상 질문으로 변환하여 떠먹여 주는 서비스"

**Nalleum(낼름)**은 바쁜 취업 준비생들이 물리적인 시간 부족으로 인해 기업 분석을 소홀히 하거나, 뉴스를 봐도 면접에 적용하지 못하는 문제를 해결하기 위해 기획되었습니다. 사용자가 설정한 관심 기업과 직무를 기반으로 맞춤형 최신 뉴스를 수집하고, 이를 면접 질문과 답변 가이드로 변환하여 제공합니다.

🎯 핵심 가치 (Core Value)
이 서비스의 핵심은 단순한 정보 전달이 아닌, **철저한 맞춤형(Personalization)**과 **실전 활용성(Practicality)**에 있습니다.

1. 맞춤형 기업 정보 제공 (Hyper-Personalized Information)
사용자가 온보딩 단계에서 설정한 관심 기업, 직무, 산업군 데이터를 기반으로, 불필요한 정보는 걸러내고 사용자에게 꼭 필요한 '나만의 기업 뉴스'만을 큐레이션합니다.

2. 관심사 기반 맞춤형 면접 대비 (Tailored Interview Prep)
단순히 뉴스를 요약하는 것을 넘어, RAG(검색 증강 생성) 기술을 활용해 해당 이슈가 내 직무 면접에서 어떻게 질문으로 나올지 예측합니다.

맞춤형 예상 질문: "이 이슈에 대해 어떻게 생각하나요?"와 같은 일반적인 질문이 아닌, 지원 직무(예: 백엔드 개발, 마케팅 등)와 연관된 구체적인 질문을 생성합니다.

답변 가이드: 지원자의 강점 역량과 해당 이슈를 엮어서 어필할 수 있는 답변 키워드 및 가이드를 함께 제공합니다.

3. 루틴화된 학습 경험 (Routine Push)
사용자가 설정한 자투리 시간(등하교, 잠들기 전 등)에 핵심 정보를 푸시 알림으로 전달하여, 별도의 시간을 내지 않고도 습관적으로 기업 분석과 면접 대비를 할 수 있도록 돕습니다.

🛠 기술 스택 (Tech Stack)
Frontend
Framework: Next.js 16 (App Router)

Language: TypeScript

Styling: Tailwind CSS v4

State Management: Zustand

PWA: next-pwa (모바일 앱 경험 제공)

Icons: Lucide React

Avatars: DiceBear

📱 주요 기능 및 페이지 구성
0. 온보딩 (Onboarding) - 개인화의 시작
사용자의 관심 기업, 희망 직무, 선호 산업을 선택합니다.

면접 D-Day를 설정하여 일정에 맞춘 알림 강도를 조절합니다.

1. 메인 홈 (Main Feed)
Today's Hot Issue: 내가 설정한 산업/기업의 가장 뜨거운 이슈를 1~2개 엄선하여 보여줍니다.

맞춤 동향: 관심 분야와 관련된 최신 동향 뉴스를 카드 형태로 요약 제공합니다.

2. 이슈 상세 (Detail & Interview Prep)
뉴스 요약: 긴 기사를 읽을 필요 없이 핵심 내용만 빠르게 파악합니다.

★ 면접 대비 질문: 해당 뉴스 내용을 바탕으로 생성된 직무별 예상 면접 질문을 확인합니다.

이상적인 답변 가이드: 면접관의 의도를 파악하고, 내 역량을 녹여낼 수 있는 답변 팁을 제공합니다.

연관 추천: 해당 이슈와 관련된 다른 뉴스나 정보를 추천합니다.

3. 스크랩 & 브리핑 (Scrap & Briefing)
저장한 이슈: 나중에 다시 보고 싶은 이슈를 모아봅니다.

면접 전 필수 브리핑: 면접 직전, 저장해둔 이슈 중 꼭 봐야 할 내용을 기업별로 묶어 제공합니다.

4. 알림 히스토리 (Notification History)
푸시 알림으로 도착했던 지난 소식들을 타임라인 형태로 모아보며 놓친 정보를 확인합니다.

🚀 시작하기 (Getting Started)
프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

1. 레포지토리 클론
Bash

git clone https://github.com/your-username/nalleum_frontend.git
cd nalleum_frontend
2. 의존성 설치
Bash

npm install
# or
yarn install
# or
pnpm install
3. 개발 서버 실행
Bash

npm run dev
# or
yarn dev
브라우저에서 http://localhost:3000을 열어 결과를 확인하세요.

📂 프로젝트 구조 (Project Structure)
src/
├── app/                  # Next.js App Router 페이지
│   ├── detail/[id]/      # 이슈 상세 및 면접 질문 페이지
│   ├── home/             # 메인 피드
│   ├── onboarding/       # 개인 맞춤 설정 (기업/직무 선택)
│   ├── scrap/            # 스크랩 및 브리핑 페이지
│   ├── settings/         # 설정 페이지
│   └── notifications/    # 알림 히스토리
├── components/           # 재사용 가능한 UI 컴포넌트
├── data/                 # Mock Data (초기 개발용)
├── store/                # Zustand 상태 관리 (User Profile, Insight 등)
├── types/                # TypeScript 타입 정의 (Role, InsightCard 등)
└── lib/                  # 유틸리티 함수