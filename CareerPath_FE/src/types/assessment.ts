export interface Choice {
  choiceId: number;
  content: string;
  scoreValue: number;
}

export interface Question {
  questionId: number;
  content: string;
  dimension: string;
  choices: Choice[];
}

export interface TraitScores {
  logic: number;
  creativity: number;
  communication: number;
  discipline: number;
  teamwork: number;
  selfLearning: number;
}

export interface CareerMatch {
  careerId: number;
  name: string;
  description: string;
  matchScore: number;
}

export interface AssessmentInsight {
  headline: string;
  summary: string;
  recommendation: string;
}

export interface AssessmentResult {
  traitScores: TraitScores;
  preTestResult: TraitScores | null;
  biasPercentage: number;
  factorScores: Record<string, number>;
  insight: AssessmentInsight;
  recommendedCareers: CareerMatch[];
}

export interface AssessmentAnswerRequest {
  questionId: number;
  choiceId: number;
}
