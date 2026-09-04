import type { WikiArticle } from "../types";

export const axiomsOfProbability: WikiArticle = {
  conceptId: "axioms-of-probability",
  summary:
    "Kolmogorov's three axioms are the whole foundation: probabilities are non-negative, the certain event has probability one, and disjoint events add. Every other rule — complements, monotonicity, inclusion–exclusion, the union bound — is a consequence, not a separate fact. Knowing which statements are assumed and which are derived is what lets you reconstruct a forgotten formula instead of guessing at it.",
  sections: [
    {
      heading: "The axioms",
      blocks: [
        {
          kind: "prose",
          text: "A probability measure $P$ assigns a number to each event in a $\\sigma$-algebra $\\mathcal{F}$ on a sample space $\\Omega$, subject to exactly three requirements.",
        },
        {
          kind: "formula",
          latex: "\\textbf{(1)}\\ \\ P(A) \\ge 0 \\qquad \\textbf{(2)}\\ \\ P(\\Omega) = 1 \\qquad \\textbf{(3)}\\ \\ P\\!\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} P(A_i)",
          caption: "Non-negativity, normalisation, and countable additivity for pairwise disjoint $A_i$",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Countable, not finite — and not uncountable",
          text: "Axiom 3 is stated for countably infinite collections on purpose. Finite additivity alone is too weak to support limits, so results like continuity of probability and the law of large numbers would fail. Extending it to uncountable collections would be too strong: every single point on $[0,1]$ has probability zero, and uncountably many zeros could then be forced to sum to one.",
        },
      ],
    },
    {
      heading: "What follows immediately",
      blocks: [
        {
          kind: "prose",
          text: "Each of these is a theorem derived from the three axioms. It is worth being able to produce the two-line proof for any of them.",
        },
        {
          kind: "table",
          headers: ["Result", "Statement", "Where it comes from"],
          rows: [
            [
              "Complement",
              "$P(A^{c}) = 1 - P(A)$",
              "$A$ and $A^{c}$ are disjoint and cover $\\Omega$, so axioms 2 and 3 give $P(A) + P(A^{c}) = 1$.",
            ],
            [
              "Empty set",
              "$P(\\varnothing) = 0$",
              "Complement of $\\Omega$.",
            ],
            [
              "Monotonicity",
              "$A \\subseteq B \\Rightarrow P(A) \\le P(B)$",
              "Write $B = A \\sqcup (B \\setminus A)$; additivity gives $P(B) = P(A) + P(B \\setminus A)$, and the last term is $\\ge 0$ by axiom 1.",
            ],
            [
              "Bounded above",
              "$P(A) \\le 1$",
              "Monotonicity with $B = \\Omega$.",
            ],
            [
              "Inclusion–exclusion",
              "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$",
              "Split $A \\cup B$ into three disjoint pieces and recombine.",
            ],
            [
              "Union bound",
              "$P\\!\\left(\\bigcup_i A_i\\right) \\le \\sum_i P(A_i)$",
              "Overlaps are counted more than once on the right.",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Additivity requires disjointness",
          text: "$P(A \\cup B) = P(A) + P(B)$ holds only when $A$ and $B$ cannot both occur. Applying it to overlapping events double-counts the intersection and can produce a \"probability\" above 1 — which is usually how you notice the mistake.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Deriving from the axioms",
          problem:
            "A system fails if component $A$ fails or component $B$ fails. $P(A) = 0.10$, $P(B) = 0.15$, and $P(A \\cap B) = 0.04$. Find the probability the system fails, and the probability it does not.",
          steps: [
            "The events overlap, so additivity does not apply directly — use inclusion–exclusion.",
            "$P(A \\cup B) = 0.10 + 0.15 - 0.04 = 0.21$.",
            "Adding without subtracting would give $0.25$, counting the $0.04$ twice.",
            "By the complement rule, $P((A \\cup B)^{c}) = 1 - 0.21 = 0.79$.",
          ],
          answer: "$P(\\text{failure}) = 0.21$, $P(\\text{no failure}) = 0.79$.",
        },
      ],
    },
    {
      heading: "The union bound",
      blocks: [
        {
          kind: "prose",
          text: "Also called Boole's inequality, this is the crudest bound in probability and one of the most used. It needs no independence and no structure at all, which is exactly why it survives into settings where nothing else is known.",
        },
        {
          kind: "formula",
          latex: "P\\!\\left(\\bigcup_{i=1}^{n} A_i\\right) \\le \\sum_{i=1}^{n} P(A_i)",
          caption: "Boole's inequality — equality precisely when the $A_i$ are pairwise disjoint",
        },
        {
          kind: "prose",
          text: "It is most useful when each $A_i$ is a rare failure mode: if twenty independent-ish things could each go wrong with probability at most $0.001$, the chance that anything goes wrong is at most $0.02$, whatever their dependence structure. The bound becomes worthless when the right-hand side exceeds 1 — a true statement, but an empty one.",
        },
      ],
    },
  ],
  references: [
    { source: "Kolmogorov, Foundations of the Theory of Probability", locator: "Ch. 1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.2" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 1.4–1.6" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
