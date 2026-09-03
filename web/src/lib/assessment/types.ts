/**
 * The data model the assessment framework is built on. See `assessment.md` at
 * the repo root for the design rationale behind each of these shapes.
 *
 * The one structural decision worth stating here, because everything else
 * follows from it: the unit of memory is the **concept**, not the item. Anki
 * schedules a card, because the card is the thing you memorised. We schedule a
 * concept and draw a *fresh* item from its pool at review time, because we want
 * the learner to re-derive the method rather than recall the answer they saw
 * three weeks ago.
 */

/** Where a problem came from, and what we are allowed to do with it. */
export type SourceTier =
  /** Openly licensed (OpenStax, MIT OCW, NIST handbook, free-PDF texts). May be used near-verbatim with attribution. */
  | "open"
  /** In copyright (Casella & Berger, Bishop, Shreve). Used only as a task *skeleton*; the item text must be freshly authored. */
  | "restricted"
  /** Authored from the concept + its prerequisites with no external seed. */
  | "generated";

export interface SourceRef {
  id: string;
  tier: SourceTier;
  /** e.g. "Statistical Inference (Casella & Berger, 2nd ed.)" */
  title: string;
  /** e.g. "Ex. 7.2.4" — precise enough for a human reviewer to find the seed. */
  locator?: string;
  url?: string;
  /** SPDX id or a plain-language grant, e.g. "CC-BY-4.0", "public domain". */
  license?: string;
  /**
   * Set when tier is "restricted": the item text is ours, and this records that
   * a reviewer confirmed no protected expression survived the rewrite.
   */
  rewriteApprovedBy?: string;
  retrievedAt?: number;
}

/**
 * The three tiers CLAUDE.md §1.4 asks for, plus plain recall underneath them.
 * A concept is not considered assessed until it has live items at "apply" and
 * "explain" — an exact-answer-only pool measures arithmetic, not understanding.
 */
export type CognitiveLevel =
  /** State the definition, name the assumption, recall the form of a density. */
  | "recall"
  /** Compute the thing. Single correct answer. */
  | "apply"
  /** Why does the method work? What breaks if an assumption is dropped? */
  | "explain"
  /** Reaches back to earlier concepts, or across domains. */
  | "transfer";

export type ItemFormat =
  | "numeric"
  | "symbolic"
  | "mcq"
  | "multi-select"
  | "short-answer"
  | "derivation"
  /** Multi-turn: the grader probes follow-ups, mock-interview style. */
  | "interview";

/** How the learner physically produced the answer. */
export type ResponseChannel = "typed" | "handwritten" | "spoken";

/**
 * A named wrong path. Distractors and rubric misses are tagged with these, so a
 * wrong answer says *which* idea failed rather than just "incorrect" — that is
 * what lets us push blame back onto a prerequisite instead of the concept the
 * learner was nominally being tested on.
 */
export interface Misconception {
  id: string;
  description: string;
  /** Concept id to debit when this misconception fires. Often a prerequisite. */
  blameConceptId: string;
}

export interface RubricElement {
  id: string;
  /** What a grader (human or model) is checking for, in one testable sentence. */
  description: string;
  /** Relative contribution to the score. Weights are normalised at grade time. */
  weight: number;
  /** If a required element is missed, the score is capped below the pass mark. */
  required?: boolean;
  /** Fires when this element is missed. */
  misconception?: Misconception;
}

export interface Rubric {
  elements: RubricElement[];
  /**
   * Moves that invalidate an otherwise-correct-looking answer — dividing by a
   * quantity that may be zero, swapping the order of a limit and an integral
   * without justification, assuming independence from uncorrelatedness.
   */
  forbiddenMoves?: RubricElement[];
}

export interface Choice {
  id: string;
  text: string;
  correct: boolean;
  /** Why a learner would pick this. Required on every incorrect choice. */
  misconception?: Misconception;
}

/**
 * A parameterised problem. `paramSpec` describes the sampling domain and
 * `answerKey` is *computed* from the drawn parameters rather than authored, so
 * a template can serve thousands of instances without an authoring pass each
 * time — and so the learner cannot memorise the number.
 */
export interface ParamSpec {
  name: string;
  /** Inclusive integer range, or an explicit set of allowed values. */
  range?: [number, number];
  choices?: (number | string)[];
  integer?: boolean;
  /**
   * Constraints across parameters, as expressions over the drawn values
   * (e.g. "n > k", "sigma > 0"). Rejected draws are resampled.
   */
  constraints?: string[];
}

export type ItemStatus =
  /** Authored but not yet verified. Never served. */
  | "draft"
  /** Served, but the response does not move the learner's EXP — we are collecting calibration data. */
  | "shadow"
  | "live"
  /** Pulled by item analysis or by learner appeals. Never served. */
  | "quarantined"
  | "retired";

export interface ItemStats {
  exposures: number;
  /** Proportion-correct. IRT calls this the p-value; below ~0.05 or above ~0.98 an item teaches us nothing. */
  meanScore: number;
  /**
   * Point-biserial: correlation between score on *this* item and the learner's
   * mastery of the concept. Near zero means the item is ambiguous, mis-keyed,
   * or measuring something else.
   */
  discrimination: number;
  medianLatencySeconds: number;
  /** Started and abandoned without submitting. High values usually mean "unclear". */
  abandonRate: number;
  /** Fraction of responses the learner disputed. */
  appealRate: number;
  /** Cohen's kappa between the model grader and human re-grades on the same responses. */
  judgeHumanAgreement?: number;
}

export interface Item {
  id: string;
  conceptId: string;
  format: ItemFormat;
  cognitive: CognitiveLevel;
  /** Channels this item can be answered through. A proof is a poor fit for voice. */
  channels: ResponseChannel[];

  /** Problem text, with `{param}` placeholders resolved from `params`. */
  stem: string;
  params?: ParamSpec[];
  /**
   * Name of a registered solver that computes the answer key from the drawn
   * parameters. Two independent solvers must agree before an item goes live.
   */
  solver?: string;
  /** Literal key, for items with no parameters. */
  answerKey?: string | number;
  /** Relative tolerance for `numeric` items. */
  tolerance?: number;
  choices?: Choice[];
  rubric?: Rubric;

  /**
   * IRT difficulty on the logit scale, in the same units as learner ability:
   * a learner with ability equal to `difficulty` has a 50% chance on this item.
   * Seeded from the source's level, then continuously re-estimated.
   */
  difficulty: number;
  /** IRT discrimination — how sharply the item separates learners around `difficulty`. */
  discrimination: number;
  /** Seconds a fluent learner should need. Drives the speed component of the grade. */
  expectedSeconds: number;

  /**
   * Every concept the item actually requires. Validated against the
   * prerequisite graph: an item for concept C may only draw on C and C's
   * ancestors, otherwise it is secretly testing something the learner has not
   * reached yet.
   */
  prereqClosure: string[];

  source: SourceRef;
  status: ItemStatus;
  stats?: ItemStats;
}

/**
 * Per-element verdict from a model judge.
 *
 * `credit` is continuous rather than a hit/miss flag because understanding is
 * not binary: "the variance is n times a single trial's" and "it's a sum of
 * independent trials, and variances of independent variables add, so it is n
 * times one trial's" are both non-zero, and grading them the same tells the
 * learner nothing about the difference. The `justification` is what the learner
 * actually reads — it must say why this credit and not full credit.
 */
export interface RubricVerdict {
  elementId: string;
  /** Copied from the rubric so the UI can render without re-joining. */
  description: string;
  weight: number;
  required: boolean;
  /** 0 = absent or wrong, 1 = fully present and justified. */
  credit: number;
  /** One sentence: what earned this credit, and what full credit needed. */
  justification: string;
  /** True when this is a forbidden move rather than a positive element. */
  forbidden?: boolean;
}

/**
 * What a grader returns, whatever the format or channel. Every adjudicator —
 * numeric comparison, CAS equivalence, model judge on a proof, transcribed
 * speech — produces this same shape so the scoring layer stays format-blind.
 */
export interface Grade {
  /** Partial credit in [0, 1]. */
  score: number;
  /**
   * Element-by-element detail, when a rubric was applied. Deterministic graders
   * leave this empty; the model judge always fills it.
   */
  breakdown?: RubricVerdict[];
  rubricElementsHit: string[];
  rubricElementsMissed: string[];
  /** Diagnosed wrong paths, used for prerequisite blame. */
  misconceptions: Misconception[];
  /** Grader's confidence in [0, 1]. Low confidence routes to human review. */
  confidence: number;
  latencySeconds: number;
  channel: ResponseChannel;
  adjudicator: "exact" | "tolerance" | "cas" | "key" | "model-judge" | "human";
  /** Shown to the learner. Must name the specific gap, not "incorrect". */
  feedback?: string;
  /** For handwritten/spoken: what we believed the learner wrote or said. */
  transcript?: string;
  transcriptConfidence?: number;
}

/**
 * Per-concept ability as a Gaussian belief on the logit scale, rather than a
 * point estimate. The variance is what lets a confident 0.8 and a one-lucky-
 * answer 0.8 show different EXP, and it sets the learning rate: early answers
 * move the estimate a lot, the fiftieth barely at all.
 */
export interface Ability {
  mean: number;
  variance: number;
  observations: number;
}

/** FSRS memory state for one (learner, concept) pair. */
export interface MemoryState {
  /** Days until retrievability decays to 0.9. */
  stability: number;
  /** Intrinsic difficulty of the concept *for this learner*, on FSRS's 1–10 scale. */
  difficulty: number;
  lastReviewedAt: number;
  reps: number;
  lapses: number;
}

export interface ConceptState {
  conceptId: string;
  ability: Ability;
  /** Undefined until the concept's first graded review. */
  memory?: MemoryState;
}

/** FSRS grade buckets, derived from accuracy and speed together. */
export type ReviewGrade = 1 | 2 | 3 | 4;
export const AGAIN = 1 as const;
export const HARD = 2 as const;
export const GOOD = 3 as const;
export const EASY = 4 as const;
