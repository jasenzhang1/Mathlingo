import { conceptById } from "../../data/concepts";
import { prereqsOf } from "../prerequisiteGraph";
import type { Item, SourceTier } from "./types";

/**
 * Layer 1 — the gates a candidate problem has to clear before it can be served.
 *
 * The retrieval half of layer 1 (querying the source corpora, ranking, and
 * de-duplicating) runs offline; `assessment.md` §1 describes that pipeline. What
 * lives here is the part that has to be mechanical and re-runnable, because it
 * is what stops a bad item from reaching a learner: licence handling,
 * prerequisite-leakage detection, and the verification checklist.
 */

/** What each tier permits. Enforced at ingest, not left to an author's judgement. */
/**
 * Packages a `code` item may use beyond the standard library, and so the ones
 * worth checking are declared in `Item.codePackages`. Pyodide ships far more
 * than this; the list is what the Python bank actually teaches, kept short on
 * purpose so an unfamiliar import is a deliberate decision rather than a typo
 * that quietly works on the author's machine.
 */
const THIRD_PARTY_CODE_PACKAGES = ["numpy", "pandas"] as const;

export const tierPolicy: Record<
  SourceTier,
  { verbatimAllowed: boolean; attributionRequired: boolean; note: string }
> = {
  open: {
    verbatimAllowed: true,
    attributionRequired: true,
    note: "Openly licensed. Reproduce with attribution and a licence notice; check share-alike terms before mixing with restricted material.",
  },
  restricted: {
    verbatimAllowed: false,
    attributionRequired: false,
    note: "In copyright. Use only the task skeleton — what is being tested and in what form. Author fresh text, fresh numbers, fresh context; cite as 'in the style of' for internal traceability, not as a public attribution.",
  },
  generated: {
    verbatimAllowed: true,
    attributionRequired: false,
    note: "Authored from the concept and its prerequisites. Carries the highest verification burden because no editor has ever checked it.",
  },
};

export type CheckSeverity = "block" | "warn";

export interface CheckResult {
  check: string;
  passed: boolean;
  severity: CheckSeverity;
  detail?: string;
}

/**
 * Prerequisite leakage — the check that matters most, and the one a generic
 * question bank cannot do at all.
 *
 * An item for concept C may only require C itself and C's ancestors in the
 * prerequisite graph. If it also requires something that is *not* upstream of
 * C, then a learner who has legitimately reached C can fail it for a reason
 * that has nothing to do with C, and we would wrongly debit their mastery of C.
 * The classic case: a perfectly good MLE question that quietly needs the
 * multivariate chain rule.
 */
export function checkPrereqClosure(item: Item): CheckResult {
  const concept = conceptById.get(item.conceptId);
  if (!concept) {
    return {
      check: "prereq-closure",
      passed: false,
      severity: "block",
      detail: `Unknown concept id "${item.conceptId}".`,
    };
  }

  const allowed = new Set<string>([item.conceptId]);
  const frontier = [...(prereqsOf.get(item.conceptId) ?? [])];
  while (frontier.length > 0) {
    const id = frontier.pop()!;
    if (allowed.has(id)) continue;
    allowed.add(id);
    frontier.push(...(prereqsOf.get(id) ?? []));
  }

  const leaked = item.prereqClosure.filter((id) => !allowed.has(id));
  return {
    check: "prereq-closure",
    passed: leaked.length === 0,
    severity: "block",
    detail:
      leaked.length === 0
        ? undefined
        : `Requires concepts not upstream of ${concept.title}: ${leaked.join(", ")}. Either re-tag the item to a downstream concept, or add the missing prerequisite edge to concepts.ts if it is genuinely one.`,
  };
}

/**
 * Difficulty sanity: the seeded difficulty must land on the 1–10 level scale
 * learners see (logits −4.5 to +4.5; see difficultyLevel.ts).
 *
 * This used to also flag items far from a difficulty predicted by the
 * concept's depth in the graph, on the theory that a deep concept is not home
 * to a very easy item. The authoring rubric now says the opposite: restating a
 * definition is level 1 however advanced the topic, and each pool should span
 * the scale from 1 to 9 or 10. A per-item depth check would flag exactly the
 * items the rubric asks for, so only the range is checked.
 */
export function checkDifficultyPlausibility(item: Item): CheckResult {
  const level = item.difficulty + 5.5;
  const inRange = level >= 1 - 1e-9 && level <= 10 + 1e-9;
  return {
    check: "difficulty-plausibility",
    passed: inRange,
    severity: "warn",
    detail: inRange
      ? undefined
      : `Seeded difficulty ${item.difficulty.toFixed(2)} (level ${level.toFixed(1)}) is off the 1–10 level scale, where it would display clamped.`,
  };
}

export function checkLicence(item: Item): CheckResult {
  const policy = tierPolicy[item.source.tier];
  if (item.source.tier === "restricted" && !item.source.rewriteApprovedBy) {
    return {
      check: "licence",
      passed: false,
      severity: "block",
      detail:
        "Restricted-tier seed with no recorded rewrite approval. " + policy.note,
    };
  }
  if (policy.attributionRequired && !item.source.license) {
    return {
      check: "licence",
      passed: false,
      severity: "block",
      detail: "Open-tier item is missing its licence, so it cannot be attributed correctly.",
    };
  }
  return { check: "licence", passed: true, severity: "block" };
}

/**
 * Structural completeness per format. Cheap, and it catches the great majority
 * of authoring mistakes before a human reviewer spends time on the item.
 */
export function checkStructure(item: Item): CheckResult[] {
  const results: CheckResult[] = [];
  const fail = (check: string, detail: string, severity: CheckSeverity = "block") =>
    results.push({ check, passed: false, severity, detail });

  if (item.params?.length && !item.solver) {
    fail(
      "answer-key",
      "Parameterised item has no solver, so its answer key cannot be computed per instance.",
    );
  }
  if (
    !item.params?.length &&
    item.answerKey === undefined &&
    !item.rubric &&
    !item.choices &&
    !item.codeTests?.length
  ) {
    fail("answer-key", "Item has no answer key, rubric, choices, or codeTests — nothing to grade against.");
  }
  if (item.format === "numeric" && item.tolerance === undefined) {
    fail("tolerance", "Numeric item has no tolerance; exact float comparison will fail honest answers.");
  }

  if (item.format === "code") {
    if (!item.codeTests?.length) {
      fail("code-tests", "Code item has no codeTests — nothing for the sandbox to check.");
    }
    if (!item.referenceSolution) {
      fail(
        "reference-solution",
        "Code item has no referenceSolution, so tools/verifyTemplates.ts cannot confirm its tests are satisfiable.",
        "warn",
      );
    }
    // A third-party import that isn't declared in `codePackages` passes
    // verification — the authoring machine has the package installed — and then
    // fails in the browser, where Pyodide only has what it was told to load.
    // Catch the mismatch here, at authoring time, where it is cheap.
    const sources = [
      item.referenceSolution ?? "",
      item.starterCode ?? "",
      ...(item.codeTests ?? []).flatMap((t) => [t.run, t.check]),
    ].join("\n");
    const declared = new Set(item.codePackages ?? []);
    for (const pkg of THIRD_PARTY_CODE_PACKAGES) {
      const imported = new RegExp(`^\\s*(?:import|from)\\s+${pkg}\\b`, "m").test(sources);
      if (imported && !declared.has(pkg)) {
        fail(
          "code-packages",
          `Code item imports ${pkg} but does not list it in codePackages, so Pyodide will not load it and every test will fail in the browser.`,
        );
      }
    }
  }

  if (item.choices) {
    const correct = item.choices.filter((c) => c.correct);
    if (item.format === "mcq" && correct.length !== 1) {
      fail("choices", `MCQ has ${correct.length} correct choices; expected exactly 1.`);
    }
    const undiagnosed = item.choices.filter((c) => !c.correct && !c.misconception);
    if (undiagnosed.length > 0) {
      fail(
        "distractor-diagnosis",
        `Distractors without a named misconception: ${undiagnosed.map((c) => c.id).join(", ")}. An untagged distractor tells us the learner was wrong but not why, which is the only part worth knowing.`,
        "warn",
      );
    }
  }

  if ((item.format === "derivation" || item.format === "short-answer") && !item.rubric) {
    fail("rubric", "Open-response item needs a rubric; a model judge with no checklist is not reproducible.");
  }
  if (item.rubric && !item.rubric.elements.some((e) => e.required)) {
    fail(
      "rubric",
      "No rubric element is marked required, so an answer can pass while missing the point of the question.",
      "warn",
    );
  }
  if (item.channels.includes("spoken") && item.format === "derivation") {
    fail(
      "channel",
      "Multi-step derivations transcribe badly from speech; prefer handwritten or typed.",
      "warn",
    );
  }

  return results;
}

export interface VerificationReport {
  itemId: string;
  results: CheckResult[];
  /** Blocking failures. The item may not leave "draft" while this is non-empty. */
  blockers: CheckResult[];
  warnings: CheckResult[];
  /** True when the item is clear to be served in shadow mode for calibration. */
  readyForShadow: boolean;
}

/**
 * The automated half of the gate. Passing this earns an item shadow status, not
 * live status — going live additionally requires the two-solver agreement, a
 * human spot-review, and the exposure floor described in calibration.ts.
 */
export function verifyItem(item: Item): VerificationReport {
  const results: CheckResult[] = [
    checkPrereqClosure(item),
    checkLicence(item),
    checkDifficultyPlausibility(item),
    ...checkStructure(item),
  ].filter((r) => !r.passed || r.check === "prereq-closure" || r.check === "licence");

  const blockers = results.filter((r) => !r.passed && r.severity === "block");
  const warnings = results.filter((r) => !r.passed && r.severity === "warn");

  return {
    itemId: item.id,
    results,
    blockers,
    warnings,
    readyForShadow: blockers.length === 0,
  };
}
