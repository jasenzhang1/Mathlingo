import type { WikiArticle } from "../types";

export const modularArithmetic: WikiArticle = {
  conceptId: "modular-arithmetic",
  summary:
    "Modular arithmetic is clock arithmetic: numbers wrap around once they hit a fixed modulus n, so 13 o'clock is 1 o'clock again. Formally, a is congruent to b mod n when n divides their difference — and that single relation turns out to behave almost exactly like ordinary equality under addition, subtraction, and multiplication.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Congruence mod n",
              description: "a ≡ b (mod n) iff n | (a − b) — n divides a − b exactly, with no remainder.",
            },
            {
              term: "a mod n",
              description: "The unique remainder r ∈ {0, 1, …, n−1} when a is divided by n. a ≡ (a mod n) (mod n) always.",
            },
            {
              term: "Residue class [a]",
              description: "The set of all integers congruent to a mod n — everything that leaves the same remainder.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Congruence is an equivalence relation",
          text: "≡ (mod n) is reflexive, symmetric, and transitive — the same three properties behind any equivalence relation. It partitions the integers into exactly n residue classes: [0], [1], …, [n−1].",
        },
      ],
    },
    {
      heading: "Arithmetic properties",
      blocks: [
        {
          kind: "formula",
          latex: "a \\equiv b \\ (\\mathrm{mod}\\ n) \\ \\text{and} \\ c \\equiv d \\ (\\mathrm{mod}\\ n) \\ \\implies \\ a+c \\equiv b+d, \\quad a-c \\equiv b-d, \\quad ac \\equiv bd \\ (\\mathrm{mod}\\ n)",
          caption: "Congruent numbers stay congruent under addition, subtraction, and multiplication — you can reduce mod n at any point in a computation.",
        },
        {
          kind: "prose",
          text: "This is why huge computations mod n stay small: instead of computing 7^20 exactly and then reducing, you can reduce after every multiplication, keeping every intermediate value under n. Exponentiation extends the same way — a ≡ b (mod n) implies aᵏ ≡ bᵏ (mod n) for any nonnegative integer k, by repeated multiplication.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Basic reduction",
          problem: "Compute 47 mod 9.",
          steps: [
            "Divide: 47 = 9 × 5 + r.",
            "9 × 5 = 45, so r = 47 − 45 = 2.",
          ],
          answer: "47 mod 9 = 2. `[verified: 9×5+2=47]`",
        },
        {
          kind: "example",
          title: "Reducing before multiplying",
          problem: "Compute (23 × 31) mod 7 without first computing 23 × 31 exactly.",
          steps: [
            "23 mod 7 = 2 (since 7×3=21, remainder 2).",
            "31 mod 7 = 3 (since 7×4=28, remainder 3).",
            "By the multiplication property, (23 × 31) mod 7 = (2 × 3) mod 7 = 6 mod 7 = 6.",
            "Check directly: 23 × 31 = 713 = 7×101 + 6. ✓",
          ],
          answer: "6. `[verified: 713=7×101+6]`",
        },
      ],
    },
    {
      heading: "Where modular reasoning goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Division does not survive congruence for free",
          text: "Unlike +, −, and ×, dividing both sides of a congruence is only valid when the number you're dividing by shares no common factor with n — e.g. 6 ≡ 12 (mod 6) is not the same statement as 1 ≡ 2 (mod 6), even though 6 divides both 6 and 12. Safe division needs a modular inverse, covered separately.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Writing a mod n as a negative number — by convention a mod n is always taken in {0, …, n−1}, so −3 mod 5 is 2, not −3.",
            "Assuming ab ≡ 0 (mod n) forces a ≡ 0 or b ≡ 0 — true when n is prime, but false in general: 2 × 3 ≡ 0 (mod 6) even though neither 2 nor 3 is ≡ 0 (mod 6).",
            "Forgetting that congruence classes, not individual integers, are what modular arithmetic really operates on — 3 and 3+7n behave identically mod 7 for every integer n.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§4.1" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 8 (Number Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 8 (Number Theory)" },
  ],
};
