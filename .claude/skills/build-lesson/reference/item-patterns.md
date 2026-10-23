# Item patterns

## Shared builders (one per batch of modules)

```ts
// web/src/data/items/<prefix>-shared.ts
import type { SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-<prefix>",
  tier: "generated",
  title: "Mathlingo authored item (<Course name>)",
};

export const { mcq, short, num } = makeBuilders(AUTHORED);

export const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug, cognitive, level, seconds, stem });
```

`cognitive` is `"recall" | "apply" | "explain" | "transfer"`. Typical seconds: 15 (L1), 20–25 (L2–3), 30–45 (L4–6), 60–90 (L7–10), 90–180 for `short`.

## Module skeleton

```ts
import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./<prefix>-shared";

const XX = "concept-id";
const lessonName: Item[] = [
  // level 1
  ...
  // level 2
  ...
];

export const prefix01Items: Item[] = [...lessonName /*, ...more lessons */];
```

Keep `// level N` comments so counts are easy to audit.

## Multiple choice

```ts
mcq(m(XX, "recall-definition", "recall", 1, 15, "A convex set is one where:"),
  "The segment between any two points of the set lies in the set",   // correct
  [
    ["It contains the origin", "set-origin", "Convex sets needn't contain $0$."],
    ["It is bounded", "set-bounded", "Half-planes are convex and unbounded."],
    ["Its boundary is smooth", "set-smooth", "Polygons are convex with corners."],
  ]),
```

Each distractor: `[text, misconceptionId, why it's wrong]` (optional 4th element: a prerequisite concept id to blame). Distractors should be plausible mistakes, not jokes.

## Numeric

```ts
num(m(XX, "apply-newton-step", "apply", 2, 20, "Apply one Newton–Raphson step to $f(x) = x^{2} - 2$ from $x_0 = 1$."), 1.5),
num(m(XX, "apply-sqrt", "apply", 3, 25, "… Give $4$ decimal places."), 1.4167),
```

Integers or short decimals need no rounding instruction; anything with more than 2 decimals must say "Give $N$ decimal places." with a key of exactly N decimals.

## Short answer (rubric-graded)

```ts
short(m(XX, "explain-why", "explain", 6, 120, "Why does … ?"),
  [
    ["mechanism", "States the key mechanism: …", 2, true],
    ["consequence", "Draws the consequence: …", 2, true],
  ]),
```

Each element: `[id, what a good answer contains, weight, required?]`. Two to three elements, written so a lenient grader can credit an answer that clearly shows understanding (see the grader-leniency memory note).

## Level ladder (40-question lesson)

| Level | ×4 | Typical mix |
|---|---|---|
| 1 | recall mcqs on definitions | 4 mcq |
| 2 | one-step computations | 3 num + 1 mcq |
| 3 | short computations / recognising cases | 3 num + 1 mcq |
| 4 | multi-step computations | 3 num + 1 mcq |
| 5 | explain + apply | 1 short + 2 mcq + 1 num |
| 6 | explain why / combine ideas | 1 short + 2 num + 1 mcq |
| 7–8 | derivations, unfamiliar settings | 1 short + 2 num + 1 mcq |
| 9–10 | judgement, design, connections to other topics | 2 short + 1 num + 1 mcq |

## Numeric checks file (for `check-numeric.py`)

```python
import math
def k(c, s): return f"{c}--{s}"     # item id = concept--slug
XX = "concept-id"

C = {
    k(XX, "apply-newton-step"): 1 - (1**2 - 2) / (2 * 1),   # compute, don't copy the key
    k(XX, "apply-sqrt"): 1.5 - (1.5**2 - 2) / 3,
}
```

Every numeric item needs an entry and every entry must match an item. The checker allows half a unit in the key's last decimal place.
