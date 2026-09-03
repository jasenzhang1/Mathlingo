import { conceptById } from "../../data/concepts";
import { ancestorCountOf, prereqsOf, unlocksOf } from "../prerequisiteGraph";
import { auditCoverage, MIN_LIVE_ITEMS } from "./calibration";
import { clamp } from "./numeric";
import { verifyItem } from "./sourcing";
import type {
  CognitiveLevel,
  Item,
  ItemFormat,
  SourceRef,
} from "./types";

/**
 * Layer 1's missing half: turning "this concept's pool is thin" into a concrete
 * search, and folding what comes back into the existing pool.
 *
 * `verifyItem` in sourcing.ts judges one item in isolation and `auditCoverage`
 * in calibration.ts reports what a pool lacks, but nothing connected them —
 * so retrieval could not be aimed at the gaps, and a candidate that merely
 * restated an item already in the bank had nothing to be checked against. This
 * module is that connection.
 *
 * Everything here is pure and browser-safe. Reaching an actual corpus is the
 * `SourceAdapter`'s job, and adapters live outside this module precisely so
 * that the parts worth testing can be tested without one.
 */

// ---------------------------------------------------------------------------
// The brief
// ---------------------------------------------------------------------------

export interface RetrievalNeed {
  cognitive: CognitiveLevel;
  /** How many more live items this level wants. */
  count: number;
  /** Difficulty window worth searching, in logits. */
  difficultyBand: [number, number];
}

export interface RetrievalBrief {
  conceptId: string;
  conceptTitle: string;
  /**
   * The prerequisite closure a candidate is allowed to draw on: this concept
   * plus all its ancestors. Handed to the adapter so it can discard leaking
   * candidates during retrieval rather than paying to author them first.
   */
  allowedConcepts: string[];
  /**
   * Concepts immediately downstream. A candidate that needs one of these is
   * not a hard question about this concept — it is a question about that one.
   */
  downstreamConcepts: string[];
  needs: RetrievalNeed[];
  /** Search terms, most specific first. */
  queries: string[];
  /** Total items wanted across all needs. */
  targetCount: number;
}

/**
 * Difficulty a typical item for this concept should sit at, inferred from how
 * deep the concept is in the graph. Shared with `checkDifficultyPlausibility`
 * so the seeding and the validation agree on what "normal" means.
 */
export function expectedDifficulty(conceptId: string): number {
  return Math.log1p(ancestorCountOf.get(conceptId) ?? 0) / 2 - 0.5;
}

/** Cognitive level shifts the expected difficulty within a concept. */
const LEVEL_OFFSET: Record<CognitiveLevel, number> = {
  recall: -1,
  apply: -0.2,
  explain: 0.5,
  transfer: 1,
};

/** Levels a concept must carry live items at before its pool counts as sound. */
const REQUIRED_LEVELS: CognitiveLevel[] = ["recall", "apply", "explain"];

function ancestorsOf(conceptId: string): string[] {
  const seen = new Set<string>();
  const frontier = [...(prereqsOf.get(conceptId) ?? [])];
  while (frontier.length > 0) {
    const id = frontier.pop()!;
    if (seen.has(id)) continue;
    seen.add(id);
    frontier.push(...(prereqsOf.get(id) ?? []));
  }
  return [...seen];
}

/**
 * Derive search terms from the concept itself. Callers with a curated alias
 * table (notation, the name a particular text uses) should pass it in — a good
 * alias list is worth more than any amount of cleverness here, because the
 * name a textbook uses is frequently not the name we use.
 */
function deriveQueries(conceptId: string, aliases: string[]): string[] {
  const concept = conceptById.get(conceptId);
  if (!concept) return aliases;

  const queries = [concept.title, ...aliases];

  // A parenthesised abbreviation in the title is nearly always the term a text
  // actually indexes under: "Probability Mass Function (PMF)" -> "PMF".
  const abbreviation = /\(([^)]+)\)/.exec(concept.title)?.[1];
  if (abbreviation) queries.push(abbreviation);

  // The title without its parenthetical, for concepts like
  // "Independence (Set Theory)" where the qualifier is ours, not the field's.
  const bare = concept.title.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  if (bare && bare !== concept.title) queries.push(bare);

  return [...new Set(queries.filter(Boolean))];
}

export interface BriefOptions {
  /** Extra search terms — notation, alternative names used by particular texts. */
  aliases?: string[];
  /** Target pool size. Defaults to `MIN_LIVE_ITEMS`. */
  targetPoolSize?: number;
}

/**
 * Turn a concept's current pool into a search specification.
 *
 * The point of making this a value rather than a prompt is reproducibility: the
 * same pool state yields the same brief, so a retrieval run can be replayed,
 * diffed, and attributed when the resulting items turn out to be bad.
 */
export function buildRetrievalBrief(
  conceptId: string,
  pool: Item[],
  options: BriefOptions = {},
): RetrievalBrief {
  const concept = conceptById.get(conceptId);
  if (!concept) throw new Error(`Unknown concept id "${conceptId}"`);

  const target = options.targetPoolSize ?? MIN_LIVE_ITEMS;
  const coverage = auditCoverage(conceptId, pool);
  const base = expectedDifficulty(conceptId);

  // Spread the shortfall across levels, weighted toward the ones with nothing.
  const perLevel = Math.max(1, Math.round(target / REQUIRED_LEVELS.length));
  const needs: RetrievalNeed[] = [];

  for (const level of REQUIRED_LEVELS) {
    const have = coverage.byLevel[level] ?? 0;
    const want = Math.max(0, perLevel - have);
    if (want === 0) continue;
    const centre = base + LEVEL_OFFSET[level];
    needs.push({
      cognitive: level,
      count: want,
      difficultyBand: [
        clamp(centre - 0.75, -4, 4),
        clamp(centre + 0.75, -4, 4),
      ],
    });
  }

  // A concept with no downstream dependents does not need transfer items —
  // there is nothing yet to transfer to.
  const downstream = unlocksOf.get(conceptId) ?? [];
  if (downstream.length > 0 && (coverage.byLevel["transfer"] ?? 0) === 0) {
    const centre = base + LEVEL_OFFSET.transfer;
    needs.push({
      cognitive: "transfer",
      count: 1,
      difficultyBand: [clamp(centre - 0.75, -4, 4), clamp(centre + 0.75, -4, 4)],
    });
  }

  return {
    conceptId,
    conceptTitle: concept.title,
    allowedConcepts: [conceptId, ...ancestorsOf(conceptId)],
    downstreamConcepts: downstream,
    needs,
    queries: deriveQueries(conceptId, options.aliases ?? []),
    targetCount: needs.reduce((sum, n) => sum + n.count, 0),
  };
}

// ---------------------------------------------------------------------------
// Deduplication
// ---------------------------------------------------------------------------

/**
 * Normalise a stem for comparison.
 *
 * Digits collapse to `#` deliberately. Two instances of the same template — the
 * same question with n = 8 rather than n = 12 — are *the same problem*, and a
 * comparison that treats them as distinct will happily let a hundred clones
 * into the pool. Notation is stripped for the same reason: `f_X(x)` and `fX(x)`
 * are the same question spelled by two different typesetters.
 */
export function normaliseStem(text: string): string {
  return text
    .toLowerCase()
    .replace(/\d+(\.\d+)?/g, "#")
    .replace(/[^a-z#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(text: string, size = 4): Set<string> {
  const words = normaliseStem(text).split(" ").filter(Boolean);
  const out = new Set<string>();
  if (words.length < size) {
    if (words.length > 0) out.add(words.join(" "));
    return out;
  }
  for (let i = 0; i + size <= words.length; i++) {
    out.add(words.slice(i, i + size).join(" "));
  }
  return out;
}

/**
 * Jaccard similarity over word shingles, in [0, 1].
 *
 * Chosen over embeddings because it needs no model, no network, and no index —
 * it runs in the browser and in a test. It catches the case that actually
 * matters (the same problem re-skinned or re-parameterised) and misses genuine
 * paraphrase, which is where an embedding backend should be plugged in later
 * via `IngestOptions.similarity`.
 */
export function similarity(a: string, b: string): number {
  const A = shingles(a);
  const B = shingles(b);
  if (A.size === 0 || B.size === 0) return 0;
  let intersection = 0;
  for (const s of A) if (B.has(s)) intersection++;
  return intersection / (A.size + B.size - intersection);
}

export const DUPLICATE_THRESHOLD = 0.6;

// ---------------------------------------------------------------------------
// Ingest
// ---------------------------------------------------------------------------

/** What an adapter returns: an item-shaped thing that has not been vetted. */
export interface Candidate {
  conceptId: string;
  stem: string;
  format: ItemFormat;
  cognitive: CognitiveLevel;
  source: SourceRef;
  /** Concepts the candidate appears to require. Adapters should over-report. */
  prereqClosure?: string[];
  difficulty?: number;
  discrimination?: number;
  expectedSeconds?: number;
  channels?: Item["channels"];
  answerKey?: string | number;
  tolerance?: number;
  choices?: Item["choices"];
  rubric?: Item["rubric"];
  params?: Item["params"];
  solver?: string;
}

export type RejectionReason =
  | "duplicate"
  | "verification-blocked"
  | "not-needed"
  | "wrong-concept";

export interface Rejection {
  candidate: Candidate;
  reason: RejectionReason;
  detail: string;
  /** For duplicates, the item it collided with. */
  collidesWith?: string;
}

export interface IngestReport {
  brief: RetrievalBrief;
  accepted: Item[];
  rejected: Rejection[];
  /** Existing pool plus accepted items. */
  pool: Item[];
  /** Coverage after the ingest, so the caller knows whether to search again. */
  remainingNeed: RetrievalNeed[];
}

export interface IngestOptions {
  /** Override the similarity function — e.g. with an embedding backend. */
  similarity?: (a: string, b: string) => number;
  duplicateThreshold?: number;
  /** Generates ids. Defaults to `<conceptId>--<cognitive>-<n>`. */
  makeId?: (candidate: Candidate, index: number) => string;
}

function seedDifficulty(candidate: Candidate): number {
  if (candidate.difficulty !== undefined) return candidate.difficulty;
  return clamp(
    expectedDifficulty(candidate.conceptId) + LEVEL_OFFSET[candidate.cognitive],
    -4,
    4,
  );
}

/** Rough default, scaled by cognitive level. Re-fit from observed medians (§4.2). */
const DEFAULT_SECONDS: Record<CognitiveLevel, number> = {
  recall: 30,
  apply: 90,
  explain: 180,
  transfer: 210,
};

function seedExpectedSeconds(candidate: Candidate): number {
  return candidate.expectedSeconds ?? DEFAULT_SECONDS[candidate.cognitive];
}

function toItem(candidate: Candidate, id: string): Item {
  return {
    id,
    conceptId: candidate.conceptId,
    format: candidate.format,
    cognitive: candidate.cognitive,
    channels: candidate.channels ?? ["typed"],
    stem: candidate.stem,
    params: candidate.params,
    solver: candidate.solver,
    answerKey: candidate.answerKey,
    tolerance: candidate.tolerance,
    choices: candidate.choices,
    rubric: candidate.rubric,
    difficulty: seedDifficulty(candidate),
    discrimination: candidate.discrimination ?? 1.2,
    expectedSeconds: seedExpectedSeconds(candidate),
    prereqClosure: candidate.prereqClosure ?? [],
    source: candidate.source,
    /**
     * Never "live". Everything enters shadow at best and earns its way up
     * through the exposure floor in calibration.ts — the property that stops an
     * unvetted question from costing a learner EXP they earned.
     */
    status: "draft",
  };
}

/**
 * Fold retrieved candidates into a concept's pool.
 *
 * Order matters and is deliberate: cheap structural rejections first, then
 * duplicate detection against both the existing pool *and* the candidates
 * already accepted in this batch (retrieval runs routinely return the same
 * problem from two sources), then the full verification gate.
 */
export function ingestCandidates(
  conceptId: string,
  candidates: Candidate[],
  pool: Item[],
  options: IngestOptions = {},
): IngestReport {
  const brief = buildRetrievalBrief(conceptId, pool);
  const sim = options.similarity ?? similarity;
  const threshold = options.duplicateThreshold ?? DUPLICATE_THRESHOLD;

  const accepted: Item[] = [];
  const rejected: Rejection[] = [];

  // How many of each level this run still wants. Extras are not discarded —
  // they are accepted as draft, since a deep pool is only ever an asset — but
  // they stop counting against the brief.
  const wanted = new Map<string, number>(
    brief.needs.map((n) => [n.cognitive, n.count]),
  );

  const comparisonPool = pool.filter((i) => i.conceptId === conceptId);
  let index = 0;

  for (const candidate of candidates) {
    if (candidate.conceptId !== conceptId) {
      rejected.push({
        candidate,
        reason: "wrong-concept",
        detail: `Candidate is filed under "${candidate.conceptId}" but this brief is for "${conceptId}".`,
      });
      continue;
    }

    const collision = [...comparisonPool, ...accepted].find(
      (item) => sim(item.stem, candidate.stem) >= threshold,
    );
    if (collision) {
      rejected.push({
        candidate,
        reason: "duplicate",
        detail: `Similarity ${sim(collision.stem, candidate.stem).toFixed(2)} against an item already in the pool.`,
        collidesWith: collision.id,
      });
      continue;
    }

    const id =
      options.makeId?.(candidate, index) ??
      `${conceptId}--${candidate.cognitive}-${index + 1}`;
    index++;

    const item = toItem(candidate, id);
    const report = verifyItem(item);
    if (!report.readyForShadow) {
      rejected.push({
        candidate,
        reason: "verification-blocked",
        detail: report.blockers
          .map((blocker) => blocker.detail)
          .filter(Boolean)
          .join(" | "),
      });
      continue;
    }

    item.status = "shadow";
    accepted.push(item);

    const remaining = wanted.get(candidate.cognitive);
    if (remaining !== undefined && remaining > 0) {
      wanted.set(candidate.cognitive, remaining - 1);
    }
  }

  const mergedPool = [...pool, ...accepted];

  return {
    brief,
    accepted,
    rejected,
    pool: mergedPool,
    remainingNeed: brief.needs
      .map((n) => ({ ...n, count: wanted.get(n.cognitive) ?? 0 }))
      .filter((n) => n.count > 0),
  };
}

// ---------------------------------------------------------------------------
// Adapters
// ---------------------------------------------------------------------------

/**
 * A retrieval backend. Implementations may read a local corpus, hit a search
 * API, or ask a model to author from the brief; `ingestCandidates` does not
 * care which, and treats everything they return as unvetted.
 */
export interface SourceAdapter {
  id: string;
  /** Human-readable, for provenance in the ingest log. */
  describe(): string;
  search(brief: RetrievalBrief): Promise<Candidate[]>;
}

/** Run several adapters and pool their candidates for a single ingest. */
export async function gatherCandidates(
  brief: RetrievalBrief,
  adapters: SourceAdapter[],
): Promise<Candidate[]> {
  const batches = await Promise.all(
    adapters.map(async (adapter) => {
      try {
        return await adapter.search(brief);
      } catch (error) {
        // One broken adapter must not sink a retrieval run.
        console.error(`adapter "${adapter.id}" failed:`, error);
        return [] as Candidate[];
      }
    }),
  );
  return batches.flat();
}
