export type Role = "Frontend" | "Backend" | "PM" | "Design";

export type UserProfile = {
  nickname: string;
  targetCompanies: string[];
  targetRole: Role;
  interestKeywords: string[];
  pushTime: string;
  pushEnabled: boolean;
  onboardingCompleted: boolean;
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
  relatedIds: string[];
  coverImageUrl?: string;
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
};

export type InterviewSchedule = {
  id: string;
  companyName: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
};
