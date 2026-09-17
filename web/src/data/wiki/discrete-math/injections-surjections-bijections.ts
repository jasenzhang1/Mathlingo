import type { WikiArticle } from "../types";

export const injectionsSurjectionsBijections: WikiArticle = {
  conceptId: "injections-surjections-bijections",
  summary:
    "Injective, surjective, and bijective describe three different ways a function can relate its domain to its codomain — no collisions on the way in, no gaps on the way out, or both at once. They sound like fine print, but they're what makes counting arguments rigorous, and \"a bijection exists\" is about to become the definition of \"same size\" that still works for infinite sets.",
  sections: [
    {
      heading: "The three properties",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Injective (one-to-one)",
              description: "Distinct inputs give distinct outputs: $f(a) = f(a') \\implies a = a'$. Nobody shares an image.",
            },
            {
              term: "Surjective (onto)",
              description: "Every element of the codomain is hit: for all $b \\in B$, there exists $a \\in A$ with $f(a) = b$.",
            },
            {
              term: "Bijective",
              description: "Both injective and surjective at once — a perfect pairing between $A$ and $B$.",
            },
          ],
        },
        {
          kind: "example",
          title: "Worked example",
          problem: "f: {1,2,3} → {a,b,c,d}, f(1)=a, f(2)=b, f(3)=c. Classify f.",
          steps: [
            "Injective? 1, 2, 3 map to a, b, c — all distinct. Yes, injective.",
            "Surjective? d ∈ codomain is never hit. No, not surjective.",
          ],
          answer: "f is injective but not surjective (and therefore not bijective).",
        },
      ],
    },
    {
      heading: "Counterexample worth memorizing: f(x) = x²",
      blocks: [
        {
          kind: "prose",
          text: "f: ℝ → ℝ, f(x) = x², is neither injective nor surjective — and both failures are worth seeing explicitly, because this function is the standard counterexample for both properties at once.",
        },
        {
          kind: "table",
          headers: ["Property", "Fails because"],
          rows: [
            ["Injective", "$f(1) = f(-1) = 1$ — two different inputs, same output"],
            ["Surjective", "no real $x$ gives $f(x) = -1$ — negative numbers in the codomain are never reached"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Passing the vertical-line test ≠ injective",
          text: "Every function passes the vertical-line test — that test only checks that f is well-defined (one output per input), which is the definition of *function*, not of *injective*. Injectivity is the horizontal-line test: no horizontal line should cross the graph twice. f(x)=x² fails that one, at height y=1, for instance.",
        },
      ],
    },
    {
      heading: "Bijections and counting",
      blocks: [
        {
          kind: "prose",
          text: "For finite sets, a bijection f: A → B forces |A| = |B|, and the proof splits cleanly along the two properties:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Injective ⟹ the |A| images $f(a)$ are all distinct elements of B, so B has at least |A| elements: $|A| \\le |B|$.",
            "Surjective ⟹ every element of B is some $f(a)$, so B has at most |A| elements: $|B| \\le |A|$.",
            "Both inequalities together force $|A| = |B|$.",
          ],
        },
        {
          kind: "formula",
          latex: "f: A \\to B \\text{ bijective} \\implies |A| = |B|",
          caption: "Proved from injectivity and surjectivity separately, not assumed.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Confusing \"every input has an output\" (the definition of function) with \"every output is used\" (surjectivity) — these are unrelated properties.",
            "Concluding injectivity from a small hand-checked sample rather than checking the general rule (a finite example that happens to avoid collisions doesn't rule out collisions elsewhere).",
            "Forgetting that injective/surjective/bijective are properties of a *specific* function *and* its stated codomain — the same rule, e.g. $f(x)=x^2$, is bijective from $[0,\\infty)$ to $[0,\\infty)$ even though it fails both properties as a function ℝ → ℝ.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where this is headed",
          text: "Counting finite sets by matching \"|A| = |B|\" to \"a bijection A → B exists\" costs nothing for finite sets, but it's the *only* version of \"same size\" that still makes sense once a set has no finite count at all. `cardinality` runs with exactly this idea.",
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 0 (Functions)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§2.3 (Functions)" },
    { source: "MIT 6.042J, Mathematics for Computer Science", locator: "Ch. 4 (Functions), Ch. 9 (Cardinality)" },
  ],
};
