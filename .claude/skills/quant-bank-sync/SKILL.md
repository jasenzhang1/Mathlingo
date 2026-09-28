---
name: quant-bank-sync
description: Daily review of new quant-interview questions from the Google Sheet — verify each answer, choose its Section and Family, file it into the Question Bank (or label unfiled bank rows in place), leave review notes on the rest, and commit the section/family mirror. Use when asked to sync, review, or ingest the quant question sheet, or when a scheduled run says "run the quant bank sync".
---

# Quant bank sync

Read `assessments/quant-interview/README.md` first if this is your first run in the session. It
covers the sheet layout, what Section and Family mean, and the 0–10 difficulty scale. The code is
in `web/tools/quantBank/`.

The script handles the mechanical steps. Your job is the judgement: is the answer right, which
section does the solution rely on, and which family does the setup belong to.

## 1. Pull

```sh
cd web && npm ci --silent   # if node_modules is missing
npm run quant:pull
```

If `QUANT_SHEET_ID` or `GOOGLE_SERVICE_ACCOUNT_JSON` is unset, or Google returns 403/404, stop
and report the exact error. Don't try to reach the sheet another way.

Read `.quant-sync/inbox.json`. It contains:

- `entries`: the rows to review. `location: "inbox"` is a New Questions row, and
  `location: "bank"` is a Question Bank row with no Section.
- `sections` and `families`: the two label catalogs.
- `familyMembers`: the filed problems in each family an entry might join.
- `warnings`: workbook problems. Report them and never try to fix them.

If there are no entries, skip to step 5.

## 2. Review each entry

Work through these checks in order. When a row fails a check, **hold** it with a note. Don't guess
to get past a check.

**a. Complete?** Anything listed in `issues` means hold: no answer, no Notes, or no difficulty.
The one exception is a missing difficulty. You may propose one (0–10) in the decision, judged
against filed problems of similar difficulty in the same section.

**b. Correct?** Solve the problem yourself before reading the author's Notes closely. When the
problem is finite and small (counting, dice, digits, subsets, small permutations), brute-force it
with a throwaway Python script in the scratchpad. For probabilities and expectations that can't be
enumerated, simulate with at least 10⁵–10⁶ trials. Check every part of a multi-part question.
Hold the row if:
- your answer differs from the author's. The note gives your answer and the step where the two
  derivations diverge.
- a part has no real answer, or the Notes contain a real error. The note says what to add or fix.
- the question is ambiguous in a way that changes the answer. The note names both readings.

Don't hold over typos, and never rewrite the author's text. Mention typos in your summary instead.
When a problem refers to a figure you can't see, file it if the answer is plausible, and say in
the summary that you couldn't verify it.

**c. Duplicate?** Look at `similar` (score 1.0 means identical text) and `familyMembers`. Hold the
row if it is the same setup with the same ask and the same numbers, even when the wording differs.
The note names the existing row. The same setup with a *different* ask is not a duplicate: that is
a new member of the family.

**d. Section.** Choose the technique a good solution actually hinges on, not everything the solution
mentions. `sectionVotes` (how the nearest filed problems were labelled) is a starting point.
Similar wording doesn't mean the same technique.
- When a section number appears twice in `sections` (e.g. 230 is both "Recursion" and "Recursion
  (Fibonacci)"), set `subtopic` to choose between them.
- If the author already typed a Section, keep it unless it is clearly wrong. If it is wrong, hold
  and explain.
- Add a **new section** only for a technique no existing subtopic covers. Take an unused number in
  the right hundred (1xx brainteasers and proofs, 2xx counting, 3xx probability, 4xx expectation,
  5xx random variables and variance, 7xx games and strategy, 8xx collisions and graphs), next to its
  closest relatives.

**e. Family.** Choose the setup a candidate would pattern-match, regardless of technique. A random
walk on a grid is `Grid Walk` or `Lattice Walk`, even when the problem is solved by reflection.
- If the author typed a Family, `author.familyMatch` is its canonical Category name. Use that. If
  the author's spelling is new ("Dice Rolls" for `Dice Rolls Till Criteria`), use the canonical
  name. Don't create a variant.
- Add a **new family** only when no existing Category's setup fits. Give it a Number that matches
  its relatives if it belongs to a group, or the next unused number otherwise. When a family you
  use has a blank Meaning, fill it through `familyMeanings`.
- Leave `family` empty only when no scenario genuinely fits, such as a pure identity proof.

**f. Tags and difficulty.** `tags` replaces the author's list, so include their tags plus anything
important they left out. On bank rows, Tags are only written when the cell is empty. Only include
`difficulty` when the sheet's cell is blank.

## 3. Write `.quant-sync/decisions.json`

```json
{
  "newSections":    [{ "section": 235, "topic": "Combinatorics", "subtopic": "…", "example": "…" }],
  "newFamilies":    [{ "category": "…", "number": 93, "meaning": "…" }],
  "familyMeanings": [{ "category": "Triangles", "meaning": "…" }],
  "problems": [
    { "fingerprint": "…", "action": "file", "section": 230, "subtopic": "Recursion (Fibonacci)",
      "family": "Tiling", "tags": ["Fibonacci", "Recursion"], "difficulty": 3 },
    { "fingerprint": "…", "action": "hold", "note": "…" }
  ]
}
```

Every entry needs exactly one decision. Hold notes are read by the author in the sheet, so keep
them short and specific, and say what to change.

## 4. Apply

```sh
npm run quant:apply -- --dry-run   # read the plan
npm run quant:apply
```

If validation fails, nothing was written. Fix `decisions.json` and run it again. If a row was
edited after the pull, it is skipped and comes back tomorrow. That is expected.

## 5. Commit

Run `npm run quant:pull` once more so the mirror reflects any hand edits. Commit only
`assessments/quant-interview/sections.json` and `families.json`, and only if they changed.
**Never** commit `bank.json` or `.quant-sync/`: the question text includes copyrighted material,
and the repository is public. Use a commit message like `Quant bank: new section 235, family
"Card Shuffle"`. Push to the branch this session was told to use.

## 6. Report

Finish with a short summary:
- what was filed: sheet row, section, family.
- what was held and why.
- any new sections or families.
- typos you noticed.
- sheet `warnings` whose counts changed since the last run.

When nothing was new, say so in one line.
