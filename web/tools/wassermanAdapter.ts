import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import type {
  Candidate,
  RetrievalBrief,
  SourceAdapter,
} from "../src/lib/assessment/retrieval.ts";
import type {
  CognitiveLevel,
  ItemFormat,
  SourceRef,
} from "../src/lib/assessment/types.ts";

/**
 * A `SourceAdapter` over Wasserman's *All of Statistics*, and the first real
 * retrieval backend.
 *
 * Wasserman was chosen to go first for reasons that are worth recording, since
 * they are the criteria any next adapter should be judged on:
 *
 *  - **Native text layer.** `pdftotext` returns clean prose. Casella & Berger in
 *    the same folder is an OCR'd scan ("Binolnial", "Po\ver", mangled formulae);
 *    it can tell us *which* exercise covers what, but its math cannot be read
 *    reliably enough to seed an item.
 *  - **Machine-findable exercises.** Every chapter ends in a single
 *    `N.M Exercises` section of sequentially numbered problems.
 *  - **Coverage.** Its 24 chapters map onto most of the probability and
 *    statistics half of `concepts.ts`.
 *
 * What this adapter does *not* do is decide that a problem is a good assessment
 * item. It locates plausible candidates and tags them heuristically; the
 * relevance classification and the rewrite into an original stem are a model's
 * job, and `ingestCandidates` treats everything returned here as unvetted.
 */

export const WASSERMAN: SourceRef = {
  id: "wasserman-all-of-statistics",
  /**
   * In copyright. Everything this adapter returns is a *task skeleton* — what is
   * being asked, at what level — and must be rewritten before it can be served.
   * `checkLicence` blocks any restricted-tier item lacking a recorded reviewer,
   * so nothing lifted verbatim can reach a learner by accident.
   */
  tier: "restricted",
  title: "All of Statistics: A Concise Course in Statistical Inference (Wasserman, 2004)",
};

/**
 * Chapter -> concepts, authored by hand against the book's table of contents.
 *
 * This is irreducibly manual and that is fine: it is 24 lines, it changes only
 * when the catalogue does, and the alternative — inferring chapter topics from
 * text — is far less reliable than simply reading the contents page once. The
 * mapping is deliberately *generous*: it narrows the search to the right
 * neighbourhood, and the per-problem scoring below picks within it.
 */
export const CHAPTER_CONCEPTS: Record<number, string[]> = {
  1: ["set-theory", "sigma-algebra", "axioms-of-probability", "probability-function",
      "counting-methods", "conditional-probability", "bayes-rule",
      "independence-set-theory", "mutual-independence", "pie-boole"],
  2: ["random-variables", "discrete-vs-continuous-random-variables", "cdf", "pmf", "pdf",
      "bernoulli-binomial", "poisson-distribution", "geometric-distribution",
      "normal-distribution", "uniform-distribution", "exponential-distribution",
      "gamma-distribution", "beta-distribution", "chi-square-distribution",
      "t-distribution", "f-distribution", "joint-distribution", "marginal-distribution",
      "conditional-distribution", "distribution-transformations"],
  3: ["expectation", "variance", "covariance", "correlation", "law-of-total-expectation",
      "law-of-total-variance", "mgf", "mgf-properties"],
  4: ["markov-inequality", "chebyshev-inequality", "jensen-inequality", "cauchy-schwarz"],
  5: ["modes-of-convergence", "law-of-large-numbers", "central-limit-theorem"],
  6: ["population-vs-sample", "parameter-vs-statistic", "sampling-distribution", "standard-error"],
  7: ["sample-mean", "sample-variance", "confidence-interval"],
  8: ["bootstrapping"],
  9: ["likelihood-vs-probability", "mle", "method-of-moments", "unbiased-estimator",
      "fisher-information", "cramer-rao-lower-bound", "sufficient-statistic", "exponential-family"],
  10: ["hypothesis-test", "p-value", "test-statistic", "rejection-region", "type-i-ii-error",
       "power", "one-sample-z-test", "chi-square-goodness-of-fit-test",
       "fischers-exact-test", "wilcoxon-rank-sum-test"],
  11: ["bayes-rule", "likelihood-vs-probability"],
  12: ["loss-functions"],
  13: ["simple-linear-regression", "multiple-linear-regression", "ordinary-least-squares",
       "logistic-regression", "r-squared", "aic-bic", "forward-backward-stepwise-selection"],
  14: ["multivariate-normal", "covariance-matrix", "bivariate-normal"],
  15: ["chi-square-test-of-independence", "pearson-correlation", "correlation"],
  16: [],
  17: ["graphs", "directed-vs-undirected-graphs", "conditional-independence-d-separation"],
  18: ["markov-random-fields"],
  19: ["glm"],
  20: ["loess-smoothing", "kernel"],
  21: [],
  22: ["classification-vs-regression", "lda", "naive-bayes", "knn", "decision-tree", "svm",
       "ensemble-methods", "bias-variance-tradeoff", "training-validation-test-set",
       "k-fold-cross-validation"],
  23: ["markov-chains"],
  24: [],
};

export interface ParsedProblem {
  chapter: number;
  section: string;
  number: number;
  text: string;
}

const FURNITURE = [
  /^\s*\d{1,3}\s+\d{1,2}\.\s+[A-Z]/, //  "44 2. Random Variables" running header
  /^\s*FIGURE\s/i,
  /^\s*TABLE\s/i,
  /^\s*\d{1,2}\.\d{1,2}\s+[A-Z][a-z]/, //  "3.1 Expectation of a Random Variable" header
];

function isFurniture(line: string): boolean {
  const trimmed = line.replace(/\f/g, "").trim();
  if (trimmed.length === 0) return false;
  return FURNITURE.some((re) => re.test(line));
}

/**
 * Split the extracted text into exercise blocks, one per chapter.
 *
 * The hard part is that page furniture is interleaved with the problems —
 * running headers, figure captions, and stray axis labels from plots all land
 * mid-problem — and that a chapter's body continues after its exercises, full of
 * numbered theorem parts that look exactly like problem numbers.
 *
 * The defence is the **strict increment rule**: a line only starts problem k+1
 * if it is numbered exactly k+1. Chapter 2's exercises run 1..21, and the "1."
 * and "2." that appear soon after (parts of Theorem 3.x) cannot be mistaken for
 * problem 22. That single constraint removes essentially all of the false
 * positives that a bare `^\d+\.` pattern produces.
 */
export function parseExercises(text: string): ParsedProblem[] {
  const lines = text.split(/\r?\n/);
  const problems: ParsedProblem[] = [];

  const headings: { chapter: number; section: string; line: number }[] = [];
  lines.forEach((line, i) => {
    const m = /^\s*(\d{1,2})\.(\d{1,2})\s+Exercises\s*$/.exec(line);
    if (m) {
      headings.push({
        chapter: Number(m[1]),
        section: `${m[1]}.${m[2]}`,
        line: i,
      });
    }
  });

  for (const heading of headings) {
    let expected = 1;
    let current: ParsedProblem | null = null;
    // Nothing to gain from scanning further than the next chapter's exercises.
    const limit = Math.min(lines.length, heading.line + 900);
    /** Give up once this many lines pass with no sign of the next problem. */
    let sinceLastHit = 0;

    for (let i = heading.line + 1; i < limit; i++) {
      const line = lines[i]!;

      /**
       * The next chapter opens with a form feed followed by its number alone on
       * a line ("\f\f4", then "Inequalities"). Without this terminator the last
       * problem of every block absorbs the opening paragraphs of the next
       * chapter, since there is nothing after the final problem to stop on.
       */
      const chapterBreak = /^\f*\s*(\d{1,2})\s*$/.exec(line);
      if (chapterBreak && Number(chapterBreak[1]) === heading.chapter + 1) break;

      // The final chapter has no chapter after it to stop at, so its last
      // problem would otherwise absorb the back matter.
      if (/^\f*\s*(Bibliography|Index|List of Symbols)\s*$/.test(line)) break;

      const m = /^\s*(\d{1,3})\.\s+(\S.*)$/.exec(line);

      if (m && Number(m[1]) === expected) {
        if (current) problems.push(current);
        current = {
          chapter: heading.chapter,
          section: heading.section,
          number: expected,
          text: m[2]!.trim(),
        };
        expected++;
        sinceLastHit = 0;
        continue;
      }

      if (!current) continue;
      sinceLastHit++;
      if (sinceLastHit > 120) break;

      if (isFurniture(line)) continue;
      const trimmed = line.replace(/\f/g, "").trim();
      if (trimmed.length > 0) current.text += " " + trimmed;
    }

    if (current) problems.push(current);
  }

  return problems
    .map((p) => ({ ...p, text: p.text.replace(/\s+/g, " ").trim() }))
    .filter((p) => !isUnusable(p.text));
}

/**
 * Problems that cannot become items on their own.
 *
 * The book is full of exercises like "Prove Lemma 2.15." — perfectly good
 * homework for someone holding the book, and useless to us, because the content
 * lives in a numbered result we are not going to reproduce. There were 28 of
 * them in the 257 parsed. They are dropped here rather than at ingest so they
 * never reach a model for rewriting, which is where the cost is.
 */
function isUnusable(text: string): boolean {
  if (text.length < 40) {
    return /^(prove|show|verify|derive)\s+(lemma|theorem|corollary|equation|formula|part|result)\b/i.test(
      text,
    );
  }
  return false;
}

/**
 * Infer the cognitive level from the problem's verb.
 *
 * A crude but surprisingly serviceable heuristic, and explicitly a placeholder:
 * the real classification is a model's job (§1.3 step 3). It is here so the
 * pipeline can be exercised end to end without a model in the loop, and so
 * there is a baseline to measure a classifier against.
 */
export function inferCognitive(text: string): CognitiveLevel {
  const t = text.toLowerCase();
  if (/^\s*(prove|show that|show, |derive|explain|why |justify)/.test(t)) return "explain";
  if (/\b(prove|derive|show that)\b/.test(t)) return "explain";
  if (/^\s*(state|define|what is|write down)/.test(t)) return "recall";
  return "apply";
}

export function inferFormat(text: string, cognitive: CognitiveLevel): ItemFormat {
  if (cognitive === "explain") return "derivation";
  if (/\bfind\b|\bcompute\b|\bcalculate\b|\bevaluate\b/i.test(text)) return "numeric";
  return "short-answer";
}

/**
 * Score a problem's relevance to the brief by term overlap with the concept's
 * queries. Deliberately simple — it is a *ranking* signal handed to the model
 * that does the real classification, not a decision.
 */
function relevance(text: string, brief: RetrievalBrief): number {
  const haystack = text.toLowerCase();
  let score = 0;
  for (const query of brief.queries) {
    const term = query.toLowerCase();
    if (term.length < 3) continue;
    if (haystack.includes(term)) score += term.split(/\s+/).length;
  }
  return score;
}

export interface WassermanOptions {
  /** Path to the PDF, or to a pre-extracted text file. */
  path: string;
  /** Minimum term-overlap score. Problems below this are not returned. */
  minRelevance?: number;
  /** Cap on candidates returned per brief. */
  limit?: number;
}

function loadText(path: string): string {
  if (!existsSync(path)) throw new Error(`No such file: ${path}`);
  if (path.toLowerCase().endsWith(".pdf")) {
    // `-layout` preserves the indentation the problem numbering relies on.
    return execFileSync("pdftotext", ["-layout", path, "-"], {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
    });
  }
  return readFileSync(path, "utf8");
}

export function createWassermanAdapter(options: WassermanOptions): SourceAdapter {
  let cache: ParsedProblem[] | null = null;

  const problems = () => (cache ??= parseExercises(loadText(options.path)));

  return {
    id: "wasserman",
    describe: () =>
      `${WASSERMAN.title} — exercises parsed from ${options.path}`,

    async search(brief: RetrievalBrief): Promise<Candidate[]> {
      const chapters = Object.entries(CHAPTER_CONCEPTS)
        .filter(([, ids]) => ids.includes(brief.conceptId))
        .map(([chapter]) => Number(chapter));

      if (chapters.length === 0) return [];

      const scored = problems()
        .filter((p) => chapters.includes(p.chapter))
        .map((p) => ({ problem: p, score: relevance(p.text, brief) }))
        .filter((s) => s.score >= (options.minRelevance ?? 1))
        .sort((a, b) => b.score - a.score)
        .slice(0, options.limit ?? brief.targetCount * 4);

      return scored.map(({ problem }): Candidate => {
        const cognitive = inferCognitive(problem.text);
        return {
          conceptId: brief.conceptId,
          /**
           * The source text, carried verbatim *only* as far as the ingest
           * pipeline. It is the skeleton to rewrite from, never the stem that
           * ships: the item stays restricted-tier and `checkLicence` blocks it
           * until a reviewer records the rewrite.
           */
          stem: problem.text,
          format: inferFormat(problem.text, cognitive),
          cognitive,
          source: {
            ...WASSERMAN,
            locator: `Exercise ${problem.section}.${problem.number}`,
          },
          // Conservative: claim only the concept itself. A model pass should
          // widen this, and `checkPrereqClosure` will catch it if it leaks.
          prereqClosure: [brief.conceptId],
        };
      });
    },
  };
}
