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
