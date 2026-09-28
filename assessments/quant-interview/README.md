# Quant Interview Question Bank

Brainteaser and olympiad-style questions for quant interview prep, kept in a Google Sheet that the
author edits by hand. Once a day a Claude session reads the new rows, checks them, and files them
into the bank. The narrative write-up in
[`../quant-finance-interview-questions.md`](../quant-finance-interview-questions.md) explains why
this bank is organized by **scenario** rather than by concept.

- **The sheet is the source of truth.** Edit questions there, not here.
- **This directory is a mirror.** `bank.json`, `concepts.json` and `scenarios.json` are rewritten
  from the sheet on every sync, so the git history records every change to the bank, including edits
  made directly in the "Question Bank" tab.
- **The code** is in [`web/tools/quantBank/`](../../web/tools/quantBank/). The daily review
  playbook is [`.claude/skills/quant-bank-sync/SKILL.md`](../../.claude/skills/quant-bank-sync/SKILL.md).

## Two labels per problem

**Concepts** are the mathematical tools a solution uses: *binomial coefficients*, *reflection
principle*, *linearity of expectation*. A problem usually has one to three.

**Scenario** is the setup a candidate has to recognize, which stays the same while the question
changes. Each problem has exactly one. A problem that changes one thing about its scenario records
that change as its **variation**, and points at the problem it varies as its **parent**:

| id | question | scenario | variation | parent | concepts |
|---|---|---|---|---|---|
| QI-0004 | Paths (0,0) → (5,5)? | lattice-paths | | | binomial-coefficients |
| QI-0005 | …never below y = x? | lattice-paths | diagonal barrier | QI-0004 | reflection-principle, catalan-numbers |
| QI-0006 | …not through (2,2)? | lattice-paths | forbidden point | QI-0004 | complementary-counting, multiplication-principle |
| — | …exactly 3 direction changes? | lattice-paths | number of direction changes | QI-0004 | stars-and-bars |

One scenario can require completely different tools depending on the variation. That is why a
problem's scenario and its concepts are recorded separately. A scenario's **levers** column lists
the ways it has been varied so far, and the daily review adds new ones as they appear.

## Sheet layout

The sheet has four tabs. Header names are matched loosely: case, spacing and underscores don't
matter, and the alternatives in parentheses are also recognized. Column order doesn't matter, and
columns the sync doesn't know about are left alone.

### 1. `New Questions`: where you add questions

| column | required | notes |
|---|---|---|
| question | yes | |
| answer | yes | Exact form, e.g. `252`, `C(10,5)`, `1/2`. Stored as plain text, never as a formula or date. |
| solution (*how to get to the answer*) | yes | |
| difficulty | yes | `1`–`5`, `3/5`, or `easy` / `medium` / `hard`. |
| concepts (*mathematical concept(s)*) | yes | Comma-separated, written however you like. The review matches them to concept metadata by slug, name, or alias, and adds new concepts when needed. |
| scenario | yes | Written however you like, matched the same way. |
| variation | no | What changed relative to the base scenario. The review fills it in if you leave it blank. |
| parent | no | Bank id of the problem this varies, e.g. `QI-0004`. |
| source | no | Where you found it. |
| review note | written by the sync | If the review can't file a row, it leaves the row here and explains why in this column. |

When a row is accepted, it moves to the bank and is deleted from this tab. When a row is held, it
stays here with a dated review note, such as "answer should be 32, not 16: the runs can start with R
or U". Held rows are reviewed again every day, so once you fix the row, the next run files it.

### 2. `Question Bank`

This tab has the same columns as `New Questions` plus `id` (`QI-0001`, …) and `added`. The sync
appends to it. You can edit rows by hand, and the next sync mirrors your edits. Concept and scenario
cells in this tab hold **slugs** such as `lattice-paths`, not free text.

### 3. `Classifications`: mathematical concepts

| slug | name | description | aliases | graph concepts |
|---|---|---|---|---|
| reflection-principle | Reflection principle | Paths that touch a barrier biject with… | reflection, reflection trick | combinations |

The `graph concepts` column lists ids from [`web/src/data/concepts.ts`](../../web/src/data/concepts.ts).
It connects each interview concept to the lesson graph, so a future course page can send a learner
who misses a problem to the lesson that teaches the concept.

### 4. `Category Classifications`: scenarios

| slug | name | setup | levers | aliases | parent |
|---|---|---|---|---|---|
| lattice-paths | Lattice paths on a grid | Unit steps R and U from (0,0) to (m,n). | endpoint, diagonal barrier, forbidden point, … | grid paths, moving on a grid | |

`parent` is optional and lets one scenario be a special case of another.

### Starting the sheet

[`seed/`](seed/) has one CSV per tab. Each has the headers plus a starter set of 13 concepts,
9 scenarios, and 3 lattice-path problems taken from the narrative bank. Import each file into the
tab with the matching name (*File → Import → Replace current sheet*), or copy only the header rows
if you already have content.

## What the daily run does

1. `npm run quant:pull` reads all four tabs and writes `.quant-sync/inbox.json`. For each new row,
   this file contains how its labels resolved, any similar bank problems, and every existing problem
   in the scenarios the row might belong to. The pull also refreshes the mirror.
2. Claude reviews each new row using the skill: it re-derives the answer independently (and
   brute-forces it when the problem is small enough), picks or creates the scenario and concepts,
   names the variation and parent, and checks for duplicates. It then writes
   `.quant-sync/decisions.json`.
3. `npm run quant:apply` validates the decisions against the sheet as it is at that moment. If any
   decision fails, it writes nothing. Otherwise it adds new metadata rows, appends to the bank,
   leaves review notes on held rows, deletes the accepted rows from `New Questions`, and refreshes
   the mirror.
4. The mirror changes are committed and pushed.

The sync never rewrites your question, answer, or solution text. When it disagrees with you, it
holds the row and explains why.

## Setup

1. In Google Cloud, create a service account, enable the **Google Sheets API**, and download a
   JSON key.
2. Share the spreadsheet with the service account's `client_email` as an **Editor**.
3. In the Claude Code environment that runs the daily job, add two environment variables:
   - `QUANT_SHEET_ID`: the long id in the sheet URL, `docs.google.com/spreadsheets/d/<id>/edit`.
   - `GOOGLE_SERVICE_ACCOUNT_JSON`: the key file's contents, either as raw JSON or base64.
4. If your tab titles are different from the ones above, set `QUANT_TAB_INBOX`, `QUANT_TAB_BANK`,
   `QUANT_TAB_CONCEPTS`, and `QUANT_TAB_SCENARIOS`.

Everything can also run against a directory of CSVs named after the tabs, without credentials:

```sh
cd web
npm run quant:pull -- --csv tools/quantBank/fixtures
npm run quant:apply -- --csv tools/quantBank/fixtures --dry-run
```

Only use a copy of `fixtures/` for a real (non-dry-run) apply, because apply rewrites the CSVs.
