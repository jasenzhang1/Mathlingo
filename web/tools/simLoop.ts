import { loadItemBank } from "../src/data/items.ts";
import {
  applyReview,
  blankState,
  selectNextItem,
  type SessionContext,
} from "../src/lib/assessment/review.ts";
import { expFor } from "../src/lib/assessment/exp.ts";
import { probabilityCorrect } from "../src/lib/assessment/mastery.ts";
import type { ConceptState, Grade } from "../src/lib/assessment/types.ts";

const CONCEPT = "bernoulli-binomial";
const itemsByConcept = await loadItemBank();
const pool = itemsByConcept.get(CONCEPT) ?? [];
console.log(`pool: ${pool.length} items (${pool.filter((i) => i.status === "live").length} live)`);
console.log("levels:", [...new Set(pool.map((i) => i.cognitive))].join(", "));
console.log("formats:", [...new Set(pool.map((i) => i.format))].join(", "));

function simulate(trueTheta: number, n: number) {
  let state: ConceptState = blankState(CONCEPT);
  const recent: string[] = [];
  const covered = new Set<string>();
  const session: SessionContext = { anchor: undefined, grades: [] };
  let now = Date.now();

  for (let k = 0; k < n; k++) {
    const item = selectNextItem(pool, state, { recentItemIds: recent, coveredLevels: covered });
    if (!item) break;

    const p = probabilityCorrect(trueTheta, item);
    const score = Math.random() < p ? 1 : 0;
    const grade: Grade = {
      score,
      rubricElementsHit: [],
      rubricElementsMissed: [],
      misconceptions: [],
      confidence: 1,
      latencySeconds: item.expectedSeconds,
      channel: "typed",
      adjudicator: "tolerance",
    };

    const outcome = applyReview(new Map([[CONCEPT, state]]), item, grade, now, session);
    state = outcome.states.get(CONCEPT)!;
    if (item.status === "live") session.grades.push(outcome.reviewGrade);
    covered.add(item.cognitive);
    recent.unshift(item.id);
    if (recent.length > 10) recent.pop();
    now += 90_000; // 90s per question
  }
  return { state, exp: expFor(state, now) };
}

for (const theta of [-1, 0, 1, 2]) {
  const runs = Array.from({ length: 200 }, () => simulate(theta, 20));
  const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const exps = runs.map((r) => r.exp.value);
  const thetas = runs.map((r) => r.state.ability.mean);
  const unlocked = runs.filter((r) => r.exp.unlocked).length;
  console.log(
    `θ=${theta.toString().padStart(2)}  after 20 items → EXP ${mean(exps).toFixed(1).padStart(5)}` +
      `  est θ ${mean(thetas).toFixed(2).padStart(5)}  unlocked ${((unlocked / runs.length) * 100).toFixed(0)}%`,
  );
}

// Decay check: a mastered learner left alone.
const { state } = simulate(2, 25);
const day = 24 * 60 * 60 * 1000;
const t0 = state.memory!.lastReviewedAt;
console.log("\ndecay for a θ=2 learner after 25 items:");
for (const d of [0, 1, 3, 7, 14, 30, 90]) {
  const e = expFor(state, t0 + d * day);
  console.log(`  +${d.toString().padStart(2)}d  EXP ${e.value.toFixed(1).padStart(5)}  R ${e.retrievability.toFixed(3)}  due ${e.due}`);
}
console.log(`  next review: ${new Date(expFor(state, t0).dueAt!).toISOString().slice(0, 10)}`);


// Multi-session: does the interval actually expand when the learner reviews on time?
console.log("\nrepeated sessions for a θ=1.5 learner, each at the due date:");
{
  let state: ConceptState = blankState(CONCEPT);
  let now = Date.now();
  for (let s = 1; s <= 6; s++) {
    const session: SessionContext = { anchor: state.memory, grades: [] };
    const recent: string[] = [];
    const covered = new Set<string>();
    for (let k = 0; k < 8; k++) {
      const item = selectNextItem(pool, state, { recentItemIds: recent, coveredLevels: covered })!;
      const score = Math.random() < probabilityCorrect(1.5, item) ? 1 : 0;
      const outcome = applyReview(new Map([[CONCEPT, state]]), item, {
        score, rubricElementsHit: [], rubricElementsMissed: [], misconceptions: [],
        confidence: 1, latencySeconds: item.expectedSeconds, channel: "typed", adjudicator: "tolerance",
      }, now, session);
      state = outcome.states.get(CONCEPT)!;
      if (item.status === "live") session.grades.push(outcome.reviewGrade);
      covered.add(item.cognitive);
      recent.unshift(item.id);
      now += 90_000;
    }
    const e = expFor(state, now);
    const days = (e.dueAt! - now) / (24 * 3600 * 1000);
    console.log(
      `  session ${s}: EXP ${e.value.toFixed(1).padStart(5)}  S ${state.memory!.stability.toFixed(1).padStart(6)}d  next in ${days.toFixed(1).padStart(6)}d`,
    );
    now = e.dueAt!;
  }
}
