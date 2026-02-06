export type Role = "Frontend" | "Backend" | "PM" | "Design";

export type UserProfile = {
  nickname: string;
  targetCompanies: string[];
  targetRole: Role;
  targetIndustries: string[];
  major?: string;
  certifications?: string;
  interestKeywords: string[];
  pushTime: string;
  pushEnabled: boolean;
  onboardingCompleted: boolean;
  ddayDate?: string;
};

export type RoleContent = {
  question: string;
  answerTip: string;
};

export type InsightCard = {
  id: string;
  companyName: string;
  companyIconUrl: string;
  title: string;
  summary: string;
  summaryBullets: string[];
  originalLink: string;
  date: string;
  roleSpecificContent: Record<Role, RoleContent>;
  secondaryQuestion: string;
  secondaryAnswerTip: string;
  relatedIds: string[];
  coverImageUrl?: string;
  thumbnailUrl?: string;
  badge?: string;
  category?: string;
};

export type PushSource = "mock-system";

export type PushHistoryEntry = {
  id: string;
  title: string;
  body: string;
  insightId?: string;
  receivedAt: string;
  source: PushSource;
  category?: "면접 브리핑" | "활동" | "공지사항" | "일정 알림" | "커리어";
};

export type NotificationCategory = "전체" | "면접 브리핑" | "활동" | "공지사항";

export type NotificationItem = {
  id: string;
  category: Exclude<NotificationCategory, "전체"> | "일정 알림" | "주간 트렌드" | "커리어";
  title: string;
  body: string;
  timeLabel: string;
  iconTone: "indigo" | "amber" | "purple" | "blue" | "slate" | "green";
  unread?: boolean;
};

export type ScrapBriefing = {
  id: string;
  label: string;
  title: string;
  itemCountText: string;
  tone: "indigo" | "slate";
};

export type InterviewSchedule = {
  id: string;
  companyName: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
};
