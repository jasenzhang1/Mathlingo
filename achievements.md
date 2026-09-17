# Achievements

A starting catalog of achievements that reward using Mathlingo, independent of the discussion-board
badges in `web/src/data/badges.ts` (those reward contributing questions to the community deck; these
reward the core learning loop). Each entry lists the stat it reads, whether that stat already exists
in the codebase, and where it would live if not.

Tiering follows the mastery thresholds already defined in `assessment.md` §3.3: **65 satisfactory,
80 proficient, 95 expert**, measured against `ceiling` (the un-decayed mastery), the same convention
`computeAchievements` in `web/src/lib/achievements.ts` uses for unlocking.

## 1. Tenure

Rewards for time on the platform, not activity level — shows up even for a slow, steady learner.

| Achievement | Threshold | Data needed |
|---|---|---|
| First Week | 7 days since account creation | `users.created_at` (exists) |
| One Month In | 30 days | same |
| Regular | 90 days | same |
| A Year of This | 365 days | same |

Purely a function of `created_at` vs. now — no new tracking required, just a UI surface.

## 2. Streaks

Consecutive-day activity, the classic retention hook. Requires a new `daily_activity` table (or a
`last_active_date` + `current_streak` + `longest_streak` column set) that a login/lesson-completion
event updates once per calendar day.

| Achievement | Threshold |
|---|---|
| Warm Up | 3-day streak |
| On a Roll | 7-day streak |
| Two Weeks Strong | 14-day streak |
| Habit Formed | 30-day streak |
| Longest Streak: N days | personal-best banner, always shown (not a one-time unlock) |

The "longest streak" stat should persist independently of the current streak so it survives a broken
chain — the number to be proud of is the record, not just today's count.

## 3. Karma / contribution volume

Already tracked by the discussion-board metrics behind `badges.ts` (`submissions`, `upvotes`,
`pinned`, `reputation`). This category promotes the same underlying numbers to top-level profile
achievements rather than only badge-shelf entries:

| Achievement | Metric | Threshold |
|---|---|---|
| First Contribution | submissions | 1 |
| Helpful | upvotes | 25 |
| Community Pillar | reputation | 150 |
| Prolific | submissions | 25 |

No new data — this is a presentation layer over `web/src/data/badges.ts` / `BadgeShelf.tsx`'s
existing metrics, surfaced alongside the learning achievements instead of only in the discussion UI.

## 4. Battles won

Placeholder for the head-to-head competition feature mentioned as forthcoming. Needs a `battles`
table (challenger, opponent, concept(s), winner, timestamp) once that feature exists.

| Achievement | Threshold |
|---|---|
| First Blood | 1 battle won |
| Duelist | 10 battles won |
| Undefeated (5) | 5-win streak with no losses |
| Champion | 100 battles won |
| Giant Slayer | beat an opponent with materially higher mastery on the contested concept |

`Giant Slayer` only works once battles record each side's `ceiling` at battle time — worth carrying
that field from the start so the achievement doesn't need a backfill later.

## 5. Analogy badges

The thesis-aligned category: an analogy is the optional, hardest layer of an assessment
(`claude.md` §1.4's "multidisciplinary question," graded by the LLM rubric in `grading.md`), and
these badges are the site's strongest competence signal — harder to fake than a multiple-choice
streak, because forming a good analogy requires actually understanding the structure being mapped.

Needs the grader to tag a submission as an analogy response (several `items.ts` rubrics already use
an `"analogy"` rubric id — e.g. `items.statistics-nonparametric.ts`) and log accepted ones per user.

| Achievement | Threshold |
|---|---|
| First Analogy | 1 analogy-question answer graded as sound |
| Everyday Physics | 10 accepted analogies |
| The Feynman Test | 50 accepted analogies |
| Cross-Pollinator | accepted analogies spanning 3+ domains (probability, linear algebra, ML, ...) |
| Analogy of the Week | community- or instructor-highlighted analogy (curation hook, not purely automatic) |

## 6. Topic mastery tiers

Directly extends the existing `computeAchievements` unlock-count and per-chapter-mastery logic in
`web/src/lib/achievements.ts`, which currently only tracks the 65 ("unlocked") line. This adds the
80/95 lines from `assessment.md` as their own named tiers per concept and per chapter:

| Tier | Ceiling | Achievement (per concept) | Achievement (per chapter, all concepts at tier) |
|---|---|---|---|
| Satisfactory | ≥ 65 | — (this is "unlocked," already shown) | `${chapter} Cleared` |
| Proficient | ≥ 80 | — | `${chapter} Proficient` |
| Expert | ≥ 95 | — | `${chapter} Mastered` |

Plus cross-chapter rollups mirroring `UNLOCK_MILESTONES`:

| Achievement | Threshold |
|---|---|
| Getting Proficient | 10 concepts at ≥ 80 |
| Expert Streak | 10 concepts at ≥ 95 |
| Domain Expert: {Probability, Linear Algebra, ML, ...} | every concept in that domain at ≥ 95 |

No new storage — `ConceptState[]` and `expFor(...).ceiling` already carry everything this needs;
it's a matter of adding the 80/95 milestone arrays alongside the existing 65-only `UNLOCK_MILESTONES`
in `achievements.ts`.

## 7. Other candidates

- **Comeback**: recover a concept's `retrievability` from below 50% back above the unlock line
  (rewards returning to decayed material instead of only chasing new ones).
- **Speedrun**: clear a concept's assessment items with time-to-answer in the fastest quartile
  (uses the timing data `assessment.md` §3.2 says is deliberately excluded from the score itself,
  so it isn't otherwise put to use anywhere).
- **No Blame**: pass an assessment with zero prerequisite blame propagated (§3.4) — a clean read on
  a concept that didn't cost any neighboring concept's stability.
- **Night Owl / Early Bird**: session-time-of-day flavor achievements, purely cosmetic.

## Implementation note

`Achievement` in `web/src/lib/achievements.ts` currently has no `category` or `tier` field and no
unlock timestamp, because everything it computes today is re-derived from `ConceptState[]` on every
render rather than stored. Streaks, tenure, karma, and battles all need a genuine event log (something
did or didn't happen on a given day) that mastery-derived achievements don't — so the natural home for
those is a new `user_achievements` table (`user_id`, `achievement_id`, `unlocked_at`) written once,
on unlock, while topic-mastery and analogy achievements can stay computed-on-read the way they are now.
