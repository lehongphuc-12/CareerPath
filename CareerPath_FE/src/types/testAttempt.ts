export interface TestAttemptListItem {
  attemptId: number;
  testId: number;
  testName: string;
  mbtiType: string;
  totalQuestions: number;
  completedQuestions: number;
  completedAt: string;
  resultSummary: string;
  hasFeedback: boolean;
}

export interface TestAttemptAnswer {
  questionId: number;
  questionContent: string;
  choiceId: number;
  choiceContent: string;
  answerScore: number;
}

export interface TestFeedback {
  feedbackId: number;
  attemptId: number;
  rating: number;
  feedback: string;
  createdAt: string;
}

export interface TestAttemptDetail {
  attemptId: number;
  testId: number;
  testName: string;
  mbtiType: string;
  totalQuestions: number;
  completedQuestions: number;
  scoreE: number;
  scoreI: number;
  scoreS: number;
  scoreN: number;
  scoreT: number;
  scoreF: number;
  scoreJ: number;
  scoreP: number;
  completedAt: string;
  resultSummary: string;
  feedback: TestFeedback | null;
  answers: TestAttemptAnswer[];
}

export interface TestFeedbackRequest {
  rating: number;
  feedback?: string;
}

export interface MbtiCount {
  mbtiType: string;
  count: number;
}

export interface PeriodCount {
  period: string;
  count: number;
}

export interface AdminTestAttemptListItem {
  attemptId: number;
  userId: number;
  userName: string;
  userEmail: string;
  testId: number;
  testName: string;
  mbtiType: string;
  totalQuestions: number;
  completedQuestions: number;
  completedAt: string;
  resultSummary: string;
  hasFeedback: boolean;
  rating: number | null;
  feedback: string | null;
}

export interface AdminTestAttemptDetail {
  attemptId: number;
  userId: number;
  userName: string;
  userEmail: string;
  testId: number;
  testName: string;
  mbtiType: string;
  totalQuestions: number;
  completedQuestions: number;
  scoreE: number;
  scoreI: number;
  scoreS: number;
  scoreN: number;
  scoreT: number;
  scoreF: number;
  scoreJ: number;
  scoreP: number;
  completedAt: string;
  resultSummary: string;
  feedback: TestFeedback | null;
  answers: TestAttemptAnswer[];
}

export interface TestDashboardStats {
  totalAttempts: number;
  totalUsersWhoTookTest: number;
  mostCommonMbtiType: string;
  mbtiDistribution: MbtiCount[];
  attemptsByDay: PeriodCount[];
  attemptsByMonth: PeriodCount[];
  completionRate: number;
  averageRating: number;
  totalFeedbacks: number;
}
