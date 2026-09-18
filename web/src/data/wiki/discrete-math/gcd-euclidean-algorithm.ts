import type { WikiArticle } from "../types";

export const gcdEuclideanAlgorithm: WikiArticle = {
  conceptId: "gcd-euclidean-algorithm",
  summary:
    "The greatest common divisor of a and b is the largest integer dividing both — and rather than factoring either number, the Euclidean algorithm finds it by repeatedly replacing the pair with a smaller one that shares the same gcd. It's one of the oldest algorithms on record and still the fastest practical way to compute a gcd.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "gcd(a, b)",
              description: "The largest positive integer that divides both a and b.",
            },
            {
              term: "Coprime",
              description: "a and b are coprime (relatively prime) when gcd(a, b) = 1 — no common factor beyond 1.",
            },
            {
              term: "Euclidean algorithm",
              description: "gcd(a, b) = gcd(b, a mod b), applied repeatedly until the second argument reaches 0; the first argument at that point is the gcd.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the replacement is valid",
          text: "Any common divisor of a and b also divides a − qb for any integer q, and a mod b is exactly a − qb for the right q — so a and b share the same set of common divisors as b and a mod b. Shrinking the pair never changes the gcd, only how fast it's found.",
        },
      ],
    },
    {
      heading: "Bézout's identity",
      blocks: [
        {
          kind: "formula",
          latex: "\\gcd(a, b) = ax + by \\ \\text{for some integers} \\ x, y",
          caption: "The extended Euclidean algorithm runs the same recursion in reverse to recover x and y explicitly.",
        },
        {
          kind: "prose",
          text: "Running the Euclidean algorithm forward produces a sequence of remainders; running the same steps backward, substituting each remainder as a combination of the two before it, expresses the final gcd as a combination of the original a and b. Those coefficients x and y are exactly what's needed to build a modular inverse.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Running the algorithm",
          problem: "Compute gcd(252, 105).",
          steps: [
            "252 = 105 × 2 + 42, so gcd(252, 105) = gcd(105, 42).",
            "105 = 42 × 2 + 21, so gcd(105, 42) = gcd(42, 21).",
            "42 = 21 × 2 + 0, so gcd(42, 21) = 21.",
          ],
          answer: "gcd(252, 105) = 21. `[verified: 252=105×2+42, 105=42×2+21, 42=21×2+0]`",
        },
        {
          kind: "example",
          title: "Extended Euclidean, back-substitution",
          problem: "Express gcd(252, 105) = 21 as 252x + 105y for integers x, y, using the steps above.",
          steps: [
            "From step 2: 21 = 105 − 42×2.",
            "From step 1: 42 = 252 − 105×2, substitute: 21 = 105 − (252 − 105×2)×2 = 105 − 252×2 + 105×4 = 105×5 − 252×2.",
            "So 21 = 252×(−2) + 105×5.",
            "Check: 252×(−2) = −504, 105×5 = 525, sum = 21. ✓",
          ],
          answer: "x = −2, y = 5. `[verified: 252×(−2)+105×5=−504+525=21]`",
        },
      ],
    },
    {
      heading: "Where gcd computations go wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Factoring first is the slow trap",
          text: "It's tempting to find gcd(a,b) by factoring both numbers and comparing — but factoring large numbers is itself hard, while the Euclidean algorithm needs no factoring at all, just repeated division. Its running time is bounded by roughly log(min(a,b)) steps, regardless of how large the factors are.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Swapping which number gets reduced — always replace the *larger* number with its remainder mod the smaller, keeping the smaller number in place for the next step.",
            "Stopping one step too early — the algorithm ends when the remainder hits 0, and the gcd is the *previous* nonzero remainder, not the last nonzero divisor skipped over.",
            "Assuming Bézout coefficients x, y are unique — they aren't; infinitely many pairs work, and back-substitution finds just one of them.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§4.3" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 8 (Number Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 8 (Number Theory)" },
  ],
};
