---
name: quant-bank-sync
description: Daily review of new quant-interview questions from the Google Sheet — verify each answer, assign scenario/variation/concepts, file accepted rows into the Question Bank, leave review notes on the rest, and commit the repo mirror. Use when asked to sync, review, or ingest the quant question sheet, or when a scheduled run says "run the quant bank sync".
---

# Quant bank sync

The sheet layout, labels, and setup are in `assessments/quant-interview/README.md`. Read it
first if this is your first run in the session. The code is in `web/tools/quantBank/`.

The script handles the mechanical steps. Your job is the judgement: is the answer right, which
scenario does the problem belong to, what changed relative to that scenario, and which concepts does
the solution use.

## 1. Pull

```sh
cd web && npm ci --silent   # if node_modules is missing
npm run quant:pull
```

If this fails because `QUANT_SHEET_ID` or `GOOGLE_SERVICE_ACCOUNT_JSON` is unset, or because Google
returns 403/404, stop and report the exact error. Don't try to reach the sheet another way.

Read `.quant-sync/inbox.json`. It has `warnings` (structural problems already in the sheet),
`concepts`, `scenarios`, `families` (existing bank problems in every scenario the new rows might
belong to) and `entries` (the new rows). If `entries` is empty, skip to step 5.

## 2. Review each entry

Work through these checks in order. A row that fails a check gets **held** with a note. Don't
guess to get past a check.

**a. Complete?** Anything in `issues` (no answer, no solution, unreadable difficulty) means hold.
The exception is a blank difficulty: you may propose one in the decision, but only if the sheet
has none.

**b. Correct?** Solve the problem yourself, independently, before reading the author's solution
closely. When the problem is finite and small (counting paths, dice, small permutations, coin
strings), brute-force it with a throwaway Python script in the scratchpad. That check is cheap and
removes doubt. For expectations and probabilities that can't be enumerated, simulate with at least
10⁶ trials and compare to the stated answer. Hold if:
- your answer differs from the author's. The note gives your answer and the specific step where the
  two derivations diverge, e.g. "the runs can start with R or U, so ×2".
- the answer is right but the solution has a real gap or error. The note names the gap.
- the question is ambiguous in a way that changes the answer ("between" inclusive or exclusive,
  paths "through" a point vs. "touching" it). The note names both readings and both answers.

Don't hold over typos or style. Never rewrite the author's text: the script can't change it, and
it shouldn't.

**c. Duplicate?** Check `alreadyInBank` and `similarBank`. An identical problem (same setup, same
numbers, same ask) means hold with "duplicate of QI-xxxx — delete this row if you agree". The same
setup with different numbers and the same method is also a duplicate in substance, unless the new
numbers break the method, e.g. a grid large enough that brute force stops working. Hold those too
and name the existing problem. A different ask on the same setup is **not** a duplicate. That is a
variation, which is what the bank is for.

**d. Scenario.** Choose it by the *setup the candidate must recognize*, not by the method used.
"Paths from (0,0) to (5,5) avoiding (2,2)" belongs to `lattice-paths`, even though it's solved by
complementary counting.
- If the author's label resolved (`scenarioLabel.slug`), use it unless it is clearly wrong. If it
  is wrong, hold and explain; don't override silently.
- If it didn't resolve, look for an existing scenario whose `setup` covers the problem, possibly
  after renaming the objects (a random walk on a grid is `lattice-paths`; a shuffled deck is
  `random-permutations`). When one fits, use it, and add the author's label through
  `scenarioUpdates[].addAliases` so the label resolves by itself next time. Don't create a
  duplicate scenario.
- Create a **new scenario** only when no existing setup covers the problem. Give it a short
  kebab-case slug, a name, a one-sentence `setup` that states the base situation without any
  variation, and initial `levers`. If it is a special case of an existing scenario, set `parent`.

**e. Variation and parent.** `variation` is the one thing this problem changes relative to the base
setup, written as a **lever** name that can be reused: `diagonal barrier`, `forbidden point`,
`number of direction changes`, `biased coin`. Use an existing lever from the scenario's `levers`
list when one fits. When a new kind of change appears, add it through `scenarioUpdates`. Leave
`variation` empty for the plain base problem. `parent` is the closest problem in `families` that
this one modifies, usually the base problem. When the parent is being ingested in the same run, use
`"fp:<its fingerprint>"`.

**f. Concepts.** List the one to three tools that a *good* solution actually relies on. Leave out
tools that are merely mentioned. Use the resolved slugs where they are correct. Map unresolved
labels to existing concepts by meaning ("n choose k" → `binomial-coefficients`). Add a **new
concept** only for a technique that is genuinely distinct, with a description and `graphConcepts`
ids from `web/src/data/concepts.ts` (check that each one exists). A missing concept is not a
reason to hold a problem, because you can add the concept.

## 3. Write `.quant-sync/decisions.json`

```json
{
  "newConcepts":   [{ "slug": "", "name": "", "description": "", "aliases": [], "graphConcepts": [] }],
  "newScenarios":  [{ "slug": "", "name": "", "setup": "", "levers": [], "aliases": [], "parent": "" }],
  "scenarioUpdates": [{ "slug": "lattice-paths", "addLevers": ["number of direction changes"], "addAliases": ["staircase walks"] }],
  "problems": [
    { "fingerprint": "…", "action": "ingest", "concepts": ["…"], "scenario": "…",
      "variation": "…", "parent": "QI-0004 or fp:… or empty", "difficulty": 3 },
    { "fingerprint": "…", "action": "hold", "note": "…" }
  ]
}
```

Every entry needs exactly one decision. Include `difficulty` only when the sheet's value is blank.
Hold notes are addressed to the author, so keep them short and specific, and say what to change.

## 4. Apply

```sh
npm run quant:apply -- --dry-run   # read the plan
npm run quant:apply
```

If validation fails, nothing was written. Fix `decisions.json` and run it again. If a row was
edited between the pull and the apply, it is skipped and will come back tomorrow. That is expected.

## 5. Commit

Run `npm run quant:pull` once more to refresh the mirror, even when nothing new was filed, so any
hand edits to the bank get recorded. Then commit only `assessments/quant-interview/*.json` with a
message like `Quant bank: +3 problems (lattice-paths ×2, dice-sums), 1 held`, and push to the branch
this session was told to use. Never commit `.quant-sync/`.

## 6. Report

Finish with a short summary: what was filed (id, scenario / variation), what was held and why,
any new scenarios or concepts, and any sheet `warnings`. When the inbox was empty and the mirror
was unchanged, say so in one line.
