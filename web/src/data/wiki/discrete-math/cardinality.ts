import type { WikiArticle } from "../types";

export const cardinality: WikiArticle = {
  conceptId: "cardinality",
  summary:
    "For finite sets, comparing sizes means counting. That stops working for infinite sets — there's no number to count up to — so cardinality replaces counting with pairing: two sets have the same cardinality exactly when a bijection connects them. The payoff is startling: ℕ, ℤ, and ℚ all turn out to be the *same* size, while ℝ is a strictly bigger infinity, provably.",
  sections: [
    {
      heading: "Same size, generalized",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Same cardinality",
              description: "$A$ and $B$ have the same cardinality iff there exists a bijection $f: A \\to B$.",
            },
            {
              term: "Countably infinite",
              description: "A set with the same cardinality as $\\mathbb{N} = \\{0, 1, 2, \\ldots\\}$ — its elements can be listed as a sequence $a_1, a_2, a_3, \\ldots$ hitting every element exactly once.",
            },
            {
              term: "Uncountable",
              description: "Infinite, but *not* countably infinite — too large to be listed in any single sequence.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This costs nothing on finite sets",
          text: "`injections-surjections-bijections` proved that for finite A and B, a bijection exists exactly when |A| = |B|. So \"same cardinality\" defined via bijections isn't a new idea replacing counting — it's a generalization that agrees with counting wherever counting applies, and keeps working where counting has nothing to say.",
        },
      ],
    },
    {
      heading: "ℤ is countable — an explicit bijection",
      blocks: [
        {
          kind: "example",
          title: "Worked example: a zigzag bijection ℕ → ℤ",
          problem: "Exhibit an explicit bijection between ℕ = {0,1,2,...} and ℤ.",
          steps: [
            "Define f(n) = n/2 if n is even, and f(n) = −(n+1)/2 if n is odd.",
            "f(0) = 0.",
            "f(1) = −(2)/2 = −1.",
            "f(2) = 1.",
            "f(3) = −(4)/2 = −2.",
            "f(4) = 2. The pattern 0, −1, 1, −2, 2, ... alternates through every integer exactly once.",
          ],
          answer: "f is a bijection ℕ → ℤ, so ℤ is countably infinite — the same size as ℕ, despite feeling \"twice as big.\"",
        },
        {
          kind: "prose",
          text: "The same diagonal-style trick counts ℕ × ℕ: enumerate pairs (i,j) diagonal by diagonal, in order of increasing $i+j$. Each diagonal has finitely many pairs, so every pair is eventually reached, giving an explicit sequence that hits every element of ℕ × ℕ exactly once. This is also how one shows ℚ is countable — every rational is (numerator, denominator), a pair of integers, riding on the same enumeration.",
        },
      ],
    },
    {
      heading: "ℝ is uncountable — Cantor's diagonal argument",
      blocks: [
        {
          kind: "prose",
          text: "This is the informal, intuition-level version — the full rigor around decimal representation (e.g. $0.4999\\ldots = 0.5$) is a real subtlety, but the core contradiction survives without it.",
        },
        {
          kind: "example",
          title: "The diagonal argument",
          problem: "Show the real numbers in [0,1] cannot be listed as a sequence x₁, x₂, x₃, ….",
          steps: [
            "Suppose, for contradiction, that such a list exists — every real in [0,1] appears somewhere as some xₙ, written as an infinite decimal.",
            "Build a new number y by choosing its n-th decimal digit to differ from xₙ's n-th digit (e.g. \"5 unless xₙ's n-th digit is 5, in which case 6\").",
            "y differs from x₁ in the 1st digit, from x₂ in the 2nd digit, and so on — y differs from every xₙ in at least one digit, so y ≠ xₙ for every n.",
            "But y is a real number in [0,1], so it should have appeared somewhere on the list. Contradiction.",
          ],
          answer: "No such list can contain every real number in [0,1] — [0,1] (and hence ℝ) is uncountable.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Density is not the same as uncountability",
          text: "ℚ is dense — between any two rationals there's another — and yet ℚ is countable. Uncountability is a genuinely different, stronger fact about ℝ; \"packed densely\" and \"too big to list\" are unrelated properties that happen to both hold for ℝ but not for ℚ.",
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
            "Assuming ℚ must be uncountable because it's dense — density and countability are independent properties.",
            "Gesturing at \"some reals are always missing from any list\" without constructing the specific diagonal number that provably isn't on the proposed list — that construction *is* the proof.",
            "Treating \"infinite\" as a single size — ℕ and ℝ are both infinite, but provably different sizes of infinite.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 0 (Cardinality)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§2.5 (Cardinality of Sets)" },
    { source: "MIT 6.042J, Mathematics for Computer Science", locator: "Ch. 9 (Infinite Sets)" },
  ],
};
