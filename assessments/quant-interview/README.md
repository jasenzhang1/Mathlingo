# Quant Interview Question Bank

Brainteaser and olympiad-style questions for quant interview prep. They live in the author's
Google Sheet, *Quant Interview Prep*, which is edited by hand. Once a day a Claude session reads
the new rows, checks them, and files them into the bank. The narrative write-up in
[`../quant-finance-interview-questions.md`](../quant-finance-interview-questions.md) explains why
problems are grouped by scenario (here called a **family**) as well as by technique.

- **The sheet is the source of truth.** Questions are only ever edited there.
- **This directory is a mirror.** Every sync rewrites `sections.json` and `families.json` from the
  sheet, and these two files are committed. It also writes `bank.json`, which is **not committed**
  (see `.gitignore`): it contains the full text of every question, and many of those come from
  copyrighted books and paid sites (see [`assessment.md`](../../assessment.md) §1.2).
- **The code** is in [`web/tools/quantBank/`](../../web/tools/quantBank/). The daily review
  playbook is [`.claude/skills/quant-bank-sync/SKILL.md`](../../.claude/skills/quant-bank-sync/SKILL.md).

## The two labels

**Section**: the technique used to solve the problem. It is a number from `Classifications`, and
that number fixes the Topic and Subtopic. For example, `230 · Combinatorics › Recursion (Fibonacci)`
or `321 · Probability › Geometric Probability`. Every filed problem has exactly one section.
Additional techniques go in `Tags` as free text.

**Family**: the scenario, meaning the setup a candidate has to recognize. It is a `Category` from
`Category Classifications`, and it comes with a group `Number` that related families share
(Divisibility, Digits, Modular Arithmetic and Bases are all 3). Changing the question inside a family
often changes the technique needed. For example, each of these questions is in the `Lattice Walk`
family:

| Question | Section |
|---|---|
| paths (0,0) → (5,5) | 206 Combinations › Definition |
| …never below y = x | 234 Combinatorics › Reflection Principle |
| …not through (2,2) | 211 Combinatorics › Complementary Counting |
| …exactly 3 direction changes | 216 Counting Tricks › Stars and Bars |

## Tabs

The sync matches column headers loosely (case and spacing don't matter). Column order doesn't
matter, and it never touches columns it doesn't know about.

| Tab | Columns the sync uses |
|---|---|
| **New Questions** | Question, Answer, Notes, Difficulty (required); Tags, Family, Source, Instructional, Section (optional); Review Note (written by the sync) |
| **Question Bank** | Section, Topic, Subtopic, Question, Answer, Notes, Difficulty, Instructional, Tags, Family, Family Num, Source; Review Note is added the first time a bank row is held |
| **Classifications** | Section, Topic, Subtopic, Example, Notes |
| **Category Classifications** | Category, Number, Meaning |

**Difficulty** uses 0–10. Anything above 10 means the interviewer is out to murder you.

**Answers that look like dates.** When you type `3/4` into Google Sheets, it stores the date
4 March and displays it as `3/4`. More than 200 answers in the bank are stored this way. The sync
reads what the cell *displays*, so it gets `3/4` back, and every value it writes is stored as plain
text. The dates only cause trouble if someone changes the column's number format. To stop new
answers being converted, type them with a leading apostrophe (`'3/4`), or set the Answer column to
*Format → Number → Plain text*.

## What the daily run does

It reviews two kinds of rows:

- every row in **New Questions**. A filed row is appended to the bank and deleted from New Questions.
- every **Question Bank** row that has a question but no Section, meaning a problem added straight
  to the bank. These rows are labelled in place, and the sync only fills cells that are blank. A
  Family or Tags value you typed yourself is never overwritten.

Each run has these steps:

1. `npm run quant:pull` reads the four tabs and writes `.quant-sync/inbox.json`. For each row to
   review, that file lists the most similar filed problems and how they were labelled, plus
   *sheet warnings*: problems it found in the workbook, such as a section number used twice or a
   Family missing from Category Classifications. It reports these warnings and never fixes them.
2. Claude reviews each row. It re-derives the answer, brute-forcing it when the problem is small,
   then picks a section and family and checks for duplicates. The result goes in
   `.quant-sync/decisions.json`.
3. `npm run quant:apply` checks every decision against the sheet as it is at that moment. If any
   decision fails, it writes nothing. Otherwise it adds any new Classifications or Category rows,
   files or labels the reviewed rows, and writes a dated **Review Note** on each row it holds back:
   a wrong answer, a duplicate, or a missing solution. A held row is reviewed again every day, so
   once you fix it, the next run files it.
4. The updated `sections.json` and `families.json` are committed.

The sync never changes your Question, Answer, or Notes text.

## Setup

1. In Google Cloud, create a service account, enable the **Google Sheets API**, and download a
   JSON key.
2. Share the sheet with the service account's `client_email` as an **Editor**. View-only access
   is not enough, because the sync moves rows and writes review notes.
3. Add two environment variables to the Claude Code environment that runs the daily job:
   `QUANT_SHEET_ID`, which is the id in the sheet URL, and `GOOGLE_SERVICE_ACCOUNT_JSON`, which is
   the key file's contents as raw JSON or base64.
4. Add a **New Questions** tab with at least the headers Question, Answer, Notes and Difficulty.

Tab names default to the four above. To use different names, set `QUANT_TAB_INBOX`,
`QUANT_TAB_BANK`, `QUANT_TAB_CONCEPTS`, and `QUANT_TAB_FAMILIES`.

### Without credentials

You can run everything against a directory of CSVs, one per tab. To get one from a downloaded
copy of the sheet:

```sh
cd web
pip install openpyxl
python3 tools/quantBank/xlsx_to_csv.py ~/Downloads/Quant_Interview_Prep.xlsx /tmp/quant-csv
npm run quant:pull -- --csv /tmp/quant-csv
npm run quant:apply -- --csv /tmp/quant-csv --dry-run
```

[`fixtures/`](../../web/tools/quantBank/fixtures/) is a small sheet in the same format. Point real
(non-dry-run) applies at a *copy* of it, because apply rewrites the CSVs.
