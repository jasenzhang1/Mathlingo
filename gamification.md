# Gamification

What Mathlingo does to keep students answering questions, the evidence behind each choice, and what we have decided not to do. The bar for a mechanic is that it rewards **learning**: answering more, answering well, and coming back. A mechanic that only rewards clicking does not qualify.

## What the research says

- **Gamification helps learning, modestly.** Sailer & Homner's meta-analysis (*Educational Psychology Review*, 2020) found positive effects on cognitive, motivational and behavioural outcomes. Only the cognitive effect held up in the most rigorous studies. Social interaction and game fiction moderated the behavioural effects.
- **Visible progress sustains effort, and effort grows near the goal.** This is the goal-gradient effect (Hull, 1932; Kivetz, Urminsky & Zheng, *JMR* 2006). Showing *how close* the next goal is matters more than showing the total.
- **Progress feels better when it has already started.** This is the endowed-progress effect (Nunes & Drèze, *JCR* 2006). In that study, loyalty cards that came with 2 of 12 stamps were redeemed more often than cards needing 10 from empty.
- **Progress bars can backfire.** A bar shown up front with a long way to go can raise drop-off. Bars work best as feedback *after* an action.
- **Colour has thin evidence.** One preliminary Penn State study found that a bar's colour can motivate people, depending on how near they are to the goal. We found no study showing that a *gradient* fill on its own makes students do more problems. Treat that as a hypothesis to test (see below), not a known effect.
- **Streaks drive return visits.** Duolingo reports that users who reach about 7 days retain much better, and that streak freezes reduce churn. These figures are secondhand and measure engagement, not learning.

## Strategies in use

| Strategy | Where | Evidence it leans on |
|---|---|---|
| Tiered proficiency bar (Satisfactory 65 / Proficient 80 / Mastered 95) with labelled marks | `ProficiencyBar.tsx` | Goal gradient: nearby, concrete sub-goals |
| **Gradient fill** that runs violet → teal → blue → gold across the track, so the tip of the bar takes the colour of the tier being approached | `ProficiencyBar.tsx` (new) | Colour as progress feedback (hypothesis) |
| **"X to Proficient" next-milestone cue** | `ProficiencyBar.tsx` (new) | Goal gradient: show the remaining distance |
| **In-place gain after each answer** (`+2.40` next to the score) | `ProficiencyBar.tsx` (new) | Immediate feedback, shown *after* the action |
| **Tier-crossing highlight** ("Proficient reached.") | `ProficiencyBar.tsx` (new) | Marks reaching a milestone |
| **Daily goal**: 10 answers a day, as a filling ring that turns gold when met | `DailyGoal.tsx`, `lib/assessment/activity.ts` (new) | Small, achievable goal that resets daily |
| **Lesson day streak** | same (new) | Return visits (Duolingo) |
| Per-answer score band and proficiency change | `AssessmentPanel.tsx` Feedback | Immediate feedback |
| Ghost line for recoverable proficiency: "a refresh would restore you to …" | `ProficiencyBar.tsx` | Frames forgetting as recoverable, not lost (avoids loss aversion turning into quitting) |
| Spaced review due / grace / fading states | `exp.ts`, `ProficiencyBar.tsx` | Spaced repetition, with a reason to return |
| Unlock gating at 65 | `lessonLock.ts` | Mastery learning; unlocking acts as a reward |
| Concept map nodes that fill like water | `ConceptMap.tsx`, `proficiencyFill.ts` | Visible progress across the whole course |
| Achievements for unlock milestones and finished chapters | `achievements.ts`, `BadgeShelf.tsx` | Milestone rewards |
| Leaderboard | `Leaderboard.tsx` | Social comparison (a moderator in the meta-analysis) |
| Interview activity grid, streak and per-technique skill bars | `InterviewPage.tsx` | Visible progress, return visits |

## Considered and not adopted

- **Correct-in-a-row combos.** These reward speed and safe guessing over attempting hard questions, and the selector deliberately serves stretch items. Revisit only if combos can be weighted by difficulty.
- **Artificial endowed progress** (starting a goal partly filled). It works, but proficiency is a measurement, and padding it would make the bar dishonest. The daily goal starts from real answers.
- **Streak loss alarms and guilt messaging.** They raise visits but push loss aversion. Fading proficiency is already shown calmly with a recovery path.
- **Streak freezes.** These are worth adding once streaks are stored server-side. Right now the streak is derived from the answer log, so there is nowhere to record a freeze.

## Testing the gradient hypothesis

The gradient fill shipped to everyone, so its effect cannot be read off directly. To test it, gate the fill on a per-user flag (half get the previous solid tier colour) and compare **answers per session** and **sessions per week** over two to four weeks. `assessment_responses.created_at` already supports both measures. Expect a small effect if there is one; the goal-gradient cue and the daily goal are the better-supported levers.

## Sources

- Sailer & Homner (2020), [The gamification of learning: a meta-analysis](https://opus.bibliothek.uni-augsburg.de/opus4/frontdoor/index/index/docId/109056)
- [Goal pursuit (goal-gradient and endowed-progress summaries)](https://en.wikipedia.org/wiki/Goal_pursuit)
- Devine et al. (2025), [progress bar and gaze study](https://otto.lab.mcgill.ca/papers/devine_et_al_2025.pdf)
- Penn State, [Does green signal go for health app users?](https://www.psu.edu/news/research/story/does-green-signal-go-health-app-users)
- Irrational Labs, [When progress bars backfire](https://irrationallabs.com/blog/knowledge-cuts-both-ways-when-progress-bars-backfire/)
- [Behind the product: Duolingo streaks (podcast summary)](https://www.recall.it/summary/lennys-podcast/behind-the-product-duolingo-streaks-or-jackson-shuttleworth-group-pm-retention-team)
