---
name: build-lesson
description: Build or extend a Mathlingo lesson topic end to end — the concept entry and prerequisites, its chapter section, the wiki article, and the assessment question bank (levels 1–10), then verify and register everything. Use when the user asks to add a lesson, topic, concept, chapter or course; to write or fix a wiki article; to add questions to a lesson or bring lessons up to N questions; or to audit what a lesson is missing.
---

# Building a Mathlingo lesson

A lesson is one **concept**. Its full build has four layers the app reads, plus the slides a human makes:

| Layer | Where it lives | Who makes it |
|---|---|---|
| Concept (id, title, blurb, prerequisites) | `web/src/data/concepts.ts` | you |
| Section (chapter inside the course) | `web/src/data/sections.ts` | you |
| Wiki article | `web/src/data/wiki/<area>/<concept-id>.ts` | you |
| Question bank | `web/src/data/items/<module>.ts`, registered in `web/src/data/items.ts` | you |
| Slides (`embedUrl`) | Canva | **the user** — never invent one |

All paths below are relative to `web/`; run every command from `web/`.

## Step 0 — Take stock

Before writing anything, see what already exists:

```bash
npx tsx ../.Codex/skills/build-lesson/scripts/lesson-status.ts <concept-id> [more ids]
npx tsx ../.Codex/skills/build-lesson/scripts/lesson-status.ts --domain <domain>
```

It prints, per lesson: domain, section, whether a wiki exists, question count, formats, and the level histogram (count at levels 1…10). Then read 2–3 neighbouring lessons' wiki articles and items so the new work matches their voice. Skim existing stems for the target lesson so you don't duplicate questions.

Decide the scope with the user if it's unclear: new lesson vs. extending one, and the question target (see the memory note on targets — recently 40 for new courses, 60 for established ones).

## Step 1 — Concept and section (new lessons only)

Add to `concepts.ts`, grouped with its domain:

```ts
{
  id: "kebab-case-id",            // unique across ALL domains — grep first
  title: "Title Case Name",
  domain: "optimization",         // an existing Domain
  blurb: "One sentence a learner reads on the map.",
  prerequisites: ["direct-prereq-ids"],   // direct only; never create a cycle
},
```

- Prerequisites gate unlocking **only within the same domain** (`lib/lessonLock.ts`); cross-domain ones are informational. A lesson with no in-domain prerequisite is open from the start.
- Add the id to exactly one section's `conceptIds` in `sections.ts` (order of sections = teaching order).
- **New domain (course)?** Also: add it to the `Domain` union and `domainMeta` (position = chapter order, pick an unused colour), add a summary in `lib/courses.ts` `SUMMARIES`, a loader in `data/wiki/index.ts`, a section list in `sections.ts`, and a row group in the root `concepts.md`; list its books in `textbooks.md`. `tsc` will flag any `Record<Domain, …>` you missed.
- Never rename or delete existing concept ids — saved student progress is keyed on them.

## Step 2 — Wiki article

One file per concept exporting a `WikiArticle`; follow `reference/wiki-template.md`. Shape:

- `summary`: one orienting paragraph.
- 3–4 `sections`, each with `blocks` of kinds `prose`, `formula` (display LaTeX), `definitions`, `example` (problem → steps → answer), `callout` (`insight` | `warning`), `table`, `list`, `code`.
- At least one fully worked `example` with numbers you have checked.
- `references`: real textbook chapters (see `textbooks.md`); don't invent locators you're unsure of.

Register it in that area's `index.ts` array (create the folder + index + loader for a new domain). Then check every formula renders:

```bash
npx tsx ../.Codex/skills/build-lesson/scripts/check-wiki.ts src/data/wiki/<area>/<file>.ts
```

## Step 3 — Question bank

Write items in a module file with the builders from `data/items/authoring.ts`; patterns and the shared-builder file are in `reference/item-patterns.md`. Rules:

- **Levels 1–10, spread evenly** (e.g. 4 per level for 40 questions). 1 = recall a definition; 2–3 = one-step application; 4–5 = multi-step calculation; 6–7 = explain why / combine ideas; 8–9 = derivation or unfamiliar setting; 10 = genuinely hard judgement.
- **Mix formats**: `mcq` (recall/apply), `num` (calculations), `short` (explain/transfer, graded by rubric). Every distractor names the misconception it diagnoses and why it's wrong.
- **Slugs** unique within the concept (`id` becomes `concept--slug`).
- **Formatting standard** (see the memory note and `AGENTS.md`): LaTeX for all numbers and variables (`$3$`, `$x$`), `\\$` for currency, `{,}` thousands separators (`$10{,}000$`), bold vectors (`\\mathbf{x}`), `\\mathbb{E}`, `\\text{Var}`, square brackets for vectors, curly quotes, backticks for code.
- **Rounding**: if a numeric key has more than 2 decimals, the stem must say "Give $N$ decimal places." and the key must have N decimals.
- **No placeholders by accident**: `{word}` after a space or quote is read as a template variable; write `\\lbrace … \\rbrace` for literal set braces in prose-like spots.
- In TS strings every LaTeX backslash is doubled (`\\frac`). Edit backslash-heavy text with the Edit tool, not sed.

Register the module: import it in `data/items.ts` and spread it into the `items` array next to its siblings.

## Step 4 — Verify (don't skip any)

1. **Structure, counts, KaTeX, placeholders, rounding**:
   ```bash
   EXPECT=40 npx tsx ../.Codex/skills/build-lesson/scripts/check-module.ts src/data/items/<module>.ts
   ```
   Prints per-lesson counts (flagging any ≠ EXPECT), the level histogram, and every problem it finds.
2. **Independent numeric check** — recompute every numeric key yourself in Python, not by copying the key. Write a checks file (template in `reference/item-patterns.md`), then:
   ```bash
   npx tsx ../.Codex/skills/build-lesson/scripts/check-module.ts --dump-numeric src/data/items/<module>.ts \
     | py -3.13 ../.Codex/skills/build-lesson/scripts/check-numeric.py <checks>.py
   ```
   Fix every `MISMATCH` (usually the key is wrong), `NOCHECK` and `EXTRA`. Keys with too few decimals can slip past the tolerance — eyeball those.
3. **Repo gates**: `npx tsc --noEmit -p .`, `npm run -s verify:wiki`, `npm run -s verify:grading`, `npx oxlint <changed files>`. For code items run `verify:items` (needs a working `python3`; see the memory note on the shim).
   `verify:grading` currently has 6 pre-existing failures (bivariate-normal, multivariate-normal, CLT items) — report them, don't count them as yours.
4. Re-run `lesson-status.ts` to confirm the final counts and level spread.

## Step 5 — Report

Tell the user what was built (lessons, articles, question counts), what the checks found and fixed, and what's left — always including that the Canva slides are theirs to make. Don't commit unless asked.

## Don'ts

- Don't run `npm run ingest` (it would pull in thousands of unreviewed items); edit modules directly.
- Don't change assessment/persistence code as part of lesson work; it can reset student progress.
- Don't add subtitles or flavour text to UI pages.
