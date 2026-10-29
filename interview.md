# Interview Prep

A separate section of the site, at `/interview`, sold as its own monthly subscription. Everything
else in Mathlingo is for *learning* a concept. This section is a **databank** of quant interview
questions (brainteasers, olympiad-style counting, probability, expected value) asked the way
interviewers ask them.

Interview Prep shares no state with the learning side. Its skill bars are separate from lesson
proficiency, its questions are not `Item`s, and nothing done here moves an EXP bar on a lesson
page.

## The data

Everything lives in [`web/src/data/interview/`](web/src/data/interview/) and ships with the site.
There is no database copy and no external sync: to change a question, edit the JSON and open a PR.

| File | What it holds |
|---|---|
| `questions.json` | Every question: a short **title** (the name lists show), text, answer, worked solution (`notes`), difficulty, tags, source, its **section** and **family**, and optionally the **lessons** that teach it. |
| `sections.json` | **Techniques**, e.g. `234 · Combinatorics › Reflection Principle`. The id is `number-subtopic`, because some numbers are shared (230 is both "Recursion" and "Recursion (Fibonacci)"). |
| `families.json` | **Scenarios**: the setup a candidate recognizes, e.g. *Lattice Walk*, *Dice Rolls Till Criteria*. `group` links related families. |
| `bundles.json` | **Mock-interview chains**: an ordered list of question ids on one scenario. |
| `order.json` | **List order** of the problem list: classics first. The first 50 are the free tier. |

A question has one main **section** (the technique it hinges on: the most efficient solution, and
the one an interviewer is looking for) and at most one **family** (its scenario). It may also list
`otherSections`, techniques that solve it too but less directly. For example, the die-parity
question's main technique is *Symmetry (Stealing)*, but a Markov chain also works. Training any
of a question's techniques serves it and moves that technique's bar. Mock interviews credit the
main one, and the solution names both after the candidate answers. The two labels are independent, because the same scenario needs different
techniques depending on what is asked:

| Lattice Walk bundle | Section |
|---|---|
| 1. Paths (0,0) → (5,5) moving up and right? | 206 Combinations › Definition |
| 2. …how many make an even number of turns? | 232 Combinatorics › Bijection |
| 3. Given an even number of turns, P(exactly 2)? | 350 Probability › Conditional Probability |
| 4. …not through (2, 2)? | 211 Combinatorics › Complementary Counting |
| 5. …never below y = x? | 234 Combinatorics › Reflection Principle |

**Formatting.** Question and answer text follow the course formatting standard: numbers and
variables in `$…$` LaTeX, `\mathbb{E}`, `\text{Var}`, `\sim`, curly quotes, and so on. Question
cards render it with the same `CodeText` as lesson items, and a literal dollar sign is written `\$`.
Worked solutions (`notes`) render the same way but have not been converted yet. Titles stay plain
text.

**Difficulty** is 0–10. 11–12 means "they are going to murder you in the interview." Unrated
questions are treated as 4.

**Answers.** When a key is one number, even one written two ways ("21/4 = 5.25"), the question
carries `numericAnswer` and is graded automatically. The candidate can type `1/14`, `0.0714`,
`7.1%`, `C(10,5)`, `10c5`, `sqrt`, `ln`, `!` and so on (see
[`evaluate.ts`](web/src/lib/interview/evaluate.ts)). Every other key (multi-part answers, proofs,
"Alice") is shown after the attempt, and the candidate marks themselves *Got it*, *Partly*, or
*Missed it*.

**Drafts.** A question with `"status": "draft"` is never served. Four are drafts at import: three
held for review (a duplicate, a part without an answer, one with no answer at all) and one with no
answer in the source. Their `reviewNote` says why.

**Study lessons.** A question may list `lessons`: concept ids of the lessons that teach what it
needs. Once the answer is revealed, the card links to them under *Study* (opening in a new tab).
They are links only and move no lesson bar. Developers edit them in the question editor.

The bank was imported once from the *Quant Interview Prep* workbook. The 18 rows that had no
section were labelled and their answers checked. One row that exactly duplicated another was
dropped.

**Regression problems (iq-1055 to iq-1172).** The 118 problems of Liu's *Quantitative Interview
Questions and Solutions: Linear Regression* (`textbooks/interview prep/regression.pdf`; the PDF
repeats problems 56–57 as 58–59, so 120 numbers give 118 questions). Their source reads
`Liu, Quantitative Interview Questions (Regression) #N`.

- **Labels:** they brought techniques 900–924 (topic *Regression*) and 930–934 (*Time Series
  Regression*), and scenario groups 100–105, each with starter chains in `bundles.json`.
- **Solutions:** the PDF's solutions were condensed into `notes`, in LaTeX like the questions.
- **Corrections:** where a PDF solution was wrong or a part could not be answered as posed, the
  answer was corrected and the `reviewNote` says what changed (problems 57, 65, 93, 94, 98, 104,
  109, 116, 118, 119 and 120).
- **Lessons:** every question links to its lessons. Nine lessons were added to cover the gaps:
  partial correlation and suppression, Chow tests, Newey–West errors, partial least squares, and
  LARS in Linear Models; unit-root tests, Stambaugh bias, Granger causality, and Fama–MacBeth in
  Time Series.

**Core regression identities (iq-1173 to iq-1192).** Twenty short derivations interviewers expect
on the spot: derive $\hat{\boldsymbol{\beta}}$, $\text{tr}(\mathbf{H}) = p$, $\mathbf{H}^2 = \mathbf{H}$,
$\mathbf{X}^T\mathbf{e} = \mathbf{0}$, SST = SSR + SSE, $R^2 = \text{Corr}(y, \hat{y})^2$,
$\text{Cov}(\hat{\boldsymbol{\beta}}) = \sigma^2(\mathbf{X}^T\mathbf{X})^{-1}$, $\mathbb{E}[\text{SSE}] = (n - p)\sigma^2$, and so
on. They form the *Core Regression Identities* scenario (source `Mathlingo`), with four starter chains.

**OLS sampling theory and data perturbations (iq-1193 to iq-1228).** Two more `Mathlingo` scenarios.
*OLS Sampling Distributions* (22 questions) asks for the proofs behind regression inference. They
cover $\text{SSE}/\sigma^2 \sim \chi^2_{n-p}$, the independence of $\hat{\boldsymbol{\beta}}$ and $\hat{\sigma}^2$, the $t$ and $F$
pivots, Cochran’s theorem for the overall $F$, $\text{Var}(\hat{\sigma}^2)$, the MSE-optimal divisor, the
bias of $\hat{\sigma}$, studentized residuals, noncentrality, and the Wald, LR and score ordering.
*Perturb the Data* (14 questions) asks what moves when the data change: duplicating rows (the exact
$t$-inflation, a follow-up to iq-1122), copying one row $k$ times, duplicating a column, dropping
an orthogonal or a correlated regressor, adding points at $\bar{x}$ or on the fitted line, deleting
a zero-residual point, changing units, regressing $y - x$, adding the residuals as a regressor,
and selecting on $x$ versus $y$. They come with five and three starter chains. The course carries
matching drills in `web/src/data/items/linear-models-interview.ts`.

## Mock interviews

`/interview/mock` picks a bundle and asks its questions in order. The clock runs on every
question, and section labels stay hidden until the candidate answers, because recognizing the
technique is part of the test. The summary lists each result and time, shows how each section's
bar moved, and links to **Train** for anything missed.

Bundles are chosen at random, with curated bundles three times as likely as the rest, and the
last few bundles done are skipped. Candidates can also pick a scenario.

Of the 216 bundles, only *Lattice walk to (5, 5)* is curated. The other 215 were generated
per family: its questions sorted by difficulty and dealt into chains of up to five, so each chain
still gets harder as it goes. They are a starting point, and each one should be curated in
`/dev/bundles`.

## Training

`/interview/train/:sectionId` drills a single technique. Each next question is the unseen one
whose difficulty sits just above the candidate's current level, and questions only repeat once
the pool is exhausted.

## Problem list

`/interview/problems` lists every question in one LeetCode-style list, in the order of
[`order.json`](web/src/data/interview/order.json): about 70 hand-picked classics first (birthday
problem, two eggs, coupon collector, HH vs HT, and so on), then the rest shuffled once with a
fixed seed. A problem's number is its position in that order, not its id. Questions missing from
`order.json` (new ones) go at the end, by id.

- **Filters:** search, **Concepts** (techniques, matching a question's main section or any of its
  `otherSections`), **Scenario** (family), **Difficulty**, and **Status** (Todo, Solved, Attempted).
  Concepts and Scenario take one option at a time; picking another switches to it. Filters live in the
  query string, so Back and shared links keep them.
- **Acceptance** is the percentage of students who got the question right on their first try.
  Each student is one vote: only their first answer counts, and only a fully right answer
  ("Partly" does not). It shows a dash until 10 students have answered (`MIN_STUDENTS`). The
  numbers come from `interview_question_stats()` (migration 0019), because `interview_attempts`
  is readable only by its owner. (LeetCode's acceptance counts every submission instead, so
  retries pull it down. Here a retry after seeing the key says nothing about the question.)
- **Difficulty** shows *Easy*, *Medium*, or *Hard*, cut on the acceptance rate: Easy at 60% or
  more, Medium at 30–60%, Hard under 30%. Until 10 students have answered, it uses the rated
  difficulty instead (0–3 Easy, 4–6 Medium, 7+ Hard).
- **Sort:** click the Difficulty header, or use **Sort**, for easiest or hardest first.
- **Concept tags** are hidden by default, since recognising the technique is part of the
  question. *Show concept tags* turns them on, and the choice is remembered in the browser.
- **Pages** of 25, with Google-style page links at the bottom and a *Go to page* box once some page
  numbers are hidden. The page is in the query string (`?page=`), and changing a filter goes back
  to page 1.
- **Pick one** opens a random unsolved question from the filtered list.
- **Locked questions** show a lock on the free tier and open to the upgrade card.

Opening a question (`/interview/problems/:id`) works like training: timed, technique hidden
until answered, and it moves the main technique's bar. Answers are logged with mode `problems`.
*Next problem* follows the filtered list the student came from.

## Skill bars

Each section has one bar, stored per user in `interview_skills` (migration 0008) and mirrored to
localStorage. The math reuses the learning side's model: a Gaussian ability belief updated by a
2PL IRT response, quoted at the conservative end (`lib/assessment/mastery.ts`). It uses none of
that side's state. The pieces, all in [`scoring.ts`](web/src/lib/interview/scoring.ts):

- **Difficulty → logit:** `(difficulty − 4) / 1.6`, clamped to [−3, 4]. That is only the starting
  point: every answer also moves the question's difficulty, exactly as on the learning side
  (`assessment.md` §4.6), and skill updates and training picks use the live value.
- **Score:** correctness (1, 0.5, or 0) × a speed factor.
- **Speed factor:** full credit up to the expected time (`60 + 40 × difficulty` seconds), then
  20% less per doubling of that time, never below 60%. A slow right answer is still worth most of
  a right answer.
- **Attempt log:** every answer is also written to `interview_attempts`, so question difficulty
  can also be re-fitted in batch from real response data.

## Access

Interview Prep is its own Stripe product (`STRIPE_PRICE_INTERVIEW`) and not a rung on the
free < graded < tutored ladder. A customer can hold it alongside a learning plan, as a second
subscription on the same Stripe customer:

- **Webhook and sync:** they route it to `interview_subscriptions` by price id and never let it
  change `subscriptions.tier`.
- **Access check:** `has_interview_access()` applies the same "paying, with a 3-day grace" rule as
  `effective_tier()`.
- **Developers:** always get in.
- **Free tier:** any signed-in user without the subscription gets the free questions in the
  problem list, and nothing else. Signed-out visitors see the sales page. Pages read the access level through
  `useInterviewAccess()`.
  - **Free questions** are the first 50 problems of the list (`FREE_PROBLEMS`), which are the
    classics, plus any question with `"free": true` (`isFreeQuestion` in
    [`bank.ts`](web/src/lib/interview/bank.ts)). Reordering `order.json` changes which are free.
  - **Mock interviews and training** are subscriber-only. On the free tier both show the upgrade
    card. Bundles no longer have a `free` flag that does anything.

The Plans page shows interview prep as its own row (Free and Interview Prep), separate from the
learning plans.

The gate is presentation, not protection. The questions ship in the site's JavaScript (in their
own lazily loaded chunk), so the paywall controls what the app shows, not what a determined
visitor could read. It would only be real protection if the bank moved to a table readable only
by subscribers.

## Dev view: `/dev/bundles`

This page is for developers (the `useIsDeveloper` allowlist). It has two views.

**Bundles** shows every mock-interview chain:

- **Edit:** reorder, add, or remove questions, retitle, change the scenario, create or delete
  bundles, and mark a bundle curated or free. Each step shows whether its question is free or
  locked, and *Edit* opens it in the Questions view.
- **Pick questions:** search by text, tag, technique, or id, filtered to the bundle's scenario by
  default.
- **Warnings:** a step that gets easier than the one before it, draft or missing questions, and
  chains shorter than two.

**Questions** (`/dev/bundles?view=questions`) shows every question individually:

- **Find:** search titles, text, answers, tags, techniques, and ids. Filter by free, locked, draft, or
  edited, and by technique or scenario.
- **Edit:** change the title, question, answer, numeric answer, solution, main technique, other
  techniques, scenario, difficulty, tags, source, and review note. Set it free or locked, and draft
  or live. The editor shows which bundles hold the question and whether a free bundle makes it free
  regardless of its own flag.
- **Add:** *New question* creates the next `iq-NNNN` id as a draft, so nothing half-written is
  served.
- **Delete:** removes the question and takes it out of every bundle that holds it.

**On an interview question.** Developers see *Edit question (dev)* and *Question bank (dev)* on every
question in a mock interview or in training, as on a lesson's assessment. *Edit* opens the same
editor in a dialog. Changes save to the same browser draft as `/dev/bundles` and show on the card
straight away. *Question bank* opens the question in `/dev/bundles?view=questions&q=<id>`, which
is also where edits are published.

**Find duplicates** (header button) checks all questions, including unpublished edits, for
duplicates and near-duplicates. The logic is in
[`duplicates.ts`](web/src/lib/interview/duplicates.ts).

- **Matching:** each question becomes a set of normalised words, with LaTeX and punctuation
  stripped and numbers kept. Pairs are scored by word overlap (Jaccard) at a chosen threshold
  (90%, 75%, or 60%), and overlapping pairs merge into groups.
- **Labels:** *Exact copy* means the text is identical. *Same words* means the questions differ
  only in symbols or punctuation (`=` vs `<=`), so compare them carefully before deleting.
- **Review:** the words that differ are highlighted. Each question can be edited or deleted.
- **Not duplicates:** hides the group. This is remembered in this browser only, and *Show
  dismissed* brings dismissed groups back.

Both views share how edits are saved and published:

- **Local first:** edits are saved in the browser, and that browser's interview pages serve them.
  Bundle edits apply immediately, so a chain can be played with *Play it* before it ships.
  Question edits apply after a reload.
- **Publish as PR:** one PR to `publish-item-edits`. The full bundle list replaces
  `bundles.json`. Only edited or new questions are merged into `questions.json` by id, and
  deleted questions are removed from it.
  Both files are written as one-space JSON, so the diff shows only real changes.
