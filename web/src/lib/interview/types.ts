/**
 * The interview-prep databank. Deliberately separate from the learning side's
 * `Item`/`Concept` model: these are problems as an interviewer asks them —
 * free-form answers, several parts, no rubric — and a learner's performance on
 * them moves interview skill bars only, never lesson proficiency.
 *
 * The data lives in `web/src/data/interview/*.json`.
 */

/**
 * A technique, e.g. `234 · Combinatorics › Reflection Principle`. The unit an
 * interview skill bar is kept for, and what "train on a topic" drills.
 */
export interface InterviewSection {
  /** `${number}-${slug(subtopic)}` — the number alone is not unique (230 is both "Recursion" and "Recursion (Fibonacci)"). */
  id: string;
  number: number;
  topic: string;
  subtopic: string;
}

/**
 * A scenario: the setup a candidate has to recognise ("Lattice Walk — can only
 * go U and R"), which stays fixed while the question, and the technique it
 * needs, changes.
 */
export interface InterviewFamily {
  id: string;
  name: string;
  /** Related families share a group number (Divisibility, Digits, Bases are all 3). */
  group: number | null;
  meaning: string;
}

export interface InterviewQuestion {
  id: string;
  /**
   * The main technique: the most efficient solution, and the one an
   * interviewer is looking for. Mock interviews credit this bar.
   */
  section: string | null;
  /**
   * Other techniques that also solve the question, usually less efficiently
   * (a Markov chain where symmetry is the intended trick). The question is
   * also served when training these, and credits whichever one is trained.
   */
  otherSections?: string[];
  family: string | null;
  /** 0–10; 11–12 is "they are trying to end you". null when not yet rated. */
  difficulty: number | null;
  question: string;
  /** The key exactly as authored — may be several parts, a proof, or "Alice". */
  answer: string;
  /** Worked solution. */
  notes: string;
  tags: string[];
  source: string;
  /**
   * Set when `answer` is one number (possibly written two ways, "21/4 = 5.25"),
   * which makes the question auto-gradable. Otherwise the learner self-grades
   * against the revealed answer.
   */
  numericAnswer?: number;
  instructional?: string;
  /** Drafts are never served. */
  status?: "draft";
  /**
   * Free to everyone, subscription or not. A question in any free bundle is
   * free regardless of this flag (see `isFreeQuestion`); this marks the free
   * ones that live only in locked bundles, or in none.
   */
  free?: boolean;
  reviewNote?: string;
}

/**
 * A mock-interview chain: questions on one scenario, asked in order, each
 * usually building on the last and generally harder.
 */
export interface Bundle {
  id: string;
  title: string;
  family: string | null;
  questions: string[];
  /**
   * True once a person has designed or checked the chain. The starter bundles
   * were generated per family by sorting on difficulty and are marked false
   * until someone curates them in `/dev/bundles`.
   */
  curated: boolean;
  /** A free bundle is playable without the subscription, and makes every question in it free. */
  free?: boolean;
}
