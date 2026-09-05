export type QuestionType =
  | "multiple-choice"
  | "predict-output"
  | "fill-in-blank"
  | "true-false";

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  /** The question shown to the learner. */
  prompt: string;
  /** Optional code snippet displayed above the prompt. */
  code?: string;
  /** Answer options for multiple-choice / true-false questions. */
  choices?: string[];
  /** Exact-match correct answer (a choice's text, or the expected output / fill-in value). */
  answer: string;
  /** Shown after the learner answers, regardless of correctness. */
  explanation: string;
}

export interface CodeExample {
  code: string;
  /** What the code prints or evaluates to, if relevant. */
  output?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  /** Position within the unit, starting at 1. */
  order: number;
  title: string;
  /** One-line description shown on lesson cards. */
  summary: string;
  /** Teaching content, rendered as a sequence of short paragraphs. */
  explanation: string[];
  codeExample: CodeExample;
  /** The 2-4 things a learner should walk away remembering. */
  keyPoints: string[];
  practice: PracticeQuestion[];
  xp: number;
}

export interface Unit {
  id: string;
  /** Position within the topic, starting at 1. */
  order: number;
  title: string;
  description: string;
}
