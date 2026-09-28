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
| `questions.json` | Every question: text, answer, worked solution (`notes`), difficulty, tags, source, and its **section** and **family**. |
| `sections.json` | **Techniques**, e.g. `234 · Combinatorics › Reflection Principle`. The id is `number-subtopic`, because some numbers are shared (230 is both "Recursion" and "Recursion (Fibonacci)"). |
| `families.json` | **Scenarios**: the setup a candidate recognizes, e.g. *Lattice Walk*, *Dice Rolls Till Criteria*. `group` links related families. |
| `bundles.json` | **Mock-interview chains**: an ordered list of question ids on one scenario. |

A question has exactly one **section** (the technique it hinges on) and at most one **family**
(its scenario). The two labels are independent, because the same scenario needs different
techniques depending on what is asked:

| Lattice Walk bundle | Section |
|---|---|
| 1. Paths (0,0) → (5,5) moving up and right? | 206 Combinations › Definition |
| 2. …how many make an even number of turns? | 232 Combinatorics › Bijection |
| 3. Given an even number of turns, P(exactly 2)? | 350 Probability › Conditional Probability |
| 4. …not through (2, 2)? | 211 Combinatorics › Complementary Counting |
| 5. …never below y = x? | 234 Combinatorics › Reflection Principle |

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

The bank was imported once from the *Quant Interview Prep* workbook. The 18 rows that had no
section were labelled and their answers checked. One row that exactly duplicated another was
dropped.

## Mock interviews

`/interview/mock` picks a bundle and asks its questions in order. The clock runs on every
question, and section labels stay hidden until the candidate answers, because recognizing the
technique is part of the test. The summary lists each result and time, shows how each section's
bar moved, and links to **Train** for anything missed.

Bundles are chosen at random, with curated bundles three times as likely as the rest, and the
last few bundles done are skipped. Candidates can also pick a scenario.

Of the 181 bundles, only *Lattice walk to (5, 5)* is curated. The other 180 were generated
per family: its questions sorted by difficulty and dealt into chains of up to five, so each chain
still gets harder as it goes. They are a starting point, and each one should be curated in
`/dev/bundles`.

## Training

`/interview/train/:sectionId` drills a single technique. Each next question is the unseen one
whose difficulty sits just above the candidate's current level, and questions only repeat once
the pool is exhausted.

## Skill bars

Each section has one bar, stored per user in `interview_skills` (migration 0008) and mirrored to
localStorage. The math reuses the learning side's model: a Gaussian ability belief updated by a
2PL IRT response, quoted at the conservative end (`lib/assessment/mastery.ts`). It uses none of
that side's state. The pieces, all in [`scoring.ts`](web/src/lib/interview/scoring.ts):

- **Difficulty → logit:** `(difficulty − 4) / 1.6`, clamped to [−3, 4].
- **Score:** correctness (1, 0.5, or 0) × a speed factor.
- **Speed factor:** full credit up to the expected time (`60 + 40 × difficulty` seconds), then
  20% less per doubling of that time, never below 60%. A slow right answer is still worth most of
  a right answer.
- **Attempt log:** every answer is also written to `interview_attempts`, so question difficulty
  can later be re-estimated from real response data.

## Access

Interview Prep is its own Stripe product (`STRIPE_PRICE_INTERVIEW`) and not a rung on the
free < graded < tutored ladder. A customer can hold it alongside a learning plan, as a second
subscription on the same Stripe customer:

- **Webhook and sync:** they route it to `interview_subscriptions` by price id and never let it
  change `subscriptions.tier`.
- **Access check:** `has_interview_access()` applies the same "paying, with a 3-day grace" rule as
  `effective_tier()`.
- **Developers:** always get in.

The gate is presentation, not protection. The questions ship in the site's JavaScript (in their
own lazily loaded chunk), so the paywall controls what the app shows, not what a determined
visitor could read. It would only be real protection if the bank moved to a table readable only
by subscribers.

## Dev view: `/dev/bundles`

This page is for developers (the `useIsDeveloper` allowlist) to see every bundle and reshape it:

- **Edit:** reorder, add, or remove questions, retitle, change the scenario, create or delete
  bundles, and mark a bundle curated.
- **Pick questions:** search by text, tag, technique, or id, filtered to the bundle's scenario by
  default.
- **Warnings:** a step that gets easier than the one before it, draft or missing questions, and
  chains shorter than two.
- **Local first:** edits are saved in the browser, and that browser's mock interviews serve them,
  so a chain can be played with *Play it* before it ships.
- **Publish as PR:** sends the full list to `publish-item-edits`, which opens a PR replacing
  `bundles.json`. Question text itself is edited in the JSON.
