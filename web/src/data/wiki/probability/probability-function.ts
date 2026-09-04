import type { WikiArticle } from "../types";

export const probabilityFunction: WikiArticle = {
  conceptId: "probability-function",
  summary:
    "A probability function is a map from events to numbers in $[0,1]$ satisfying Kolmogorov's axioms. What makes it worth naming separately from the axioms is the question of *which* function to use: the same sample space admits many valid probability measures, and choosing one is a modelling decision, not a mathematical one.",
  sections: [
    {
      heading: "The object",
      blocks: [
        {
          kind: "formula",
          latex: "P : \\mathcal{F} \\to [0,1], \\qquad P(\\Omega) = 1, \\qquad P\\!\\left(\\bigsqcup_{i} A_i\\right) = \\sum_{i} P(A_i)",
          caption: "A probability measure on the measurable space $(\\Omega, \\mathcal{F})$",
        },
        {
          kind: "prose",
          text: "The triple $(\\Omega, \\mathcal{F}, P)$ is a probability space: the outcomes, the events we can measure, and the assignment of probability to them. All three parts are choices, and disagreements about probability are usually disagreements about one of them rather than about arithmetic.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The axioms constrain but do not determine",
          text: "For a coin, both \"$P(H) = 0.5$\" and \"$P(H) = 0.9$\" are perfectly valid probability functions — the axioms permit either. Nothing in mathematics says which describes your coin. That is an empirical question, and the entire discipline of statistics exists to answer it from data.",
        },
      ],
    },
    {
      heading: "Ways of specifying one",
      blocks: [
        {
          kind: "table",
          headers: ["Approach", "How $P$ is assigned", "Where it fails"],
          rows: [
            [
              "Classical",
              "count equally likely outcomes: $|A|/|\\Omega|$",
              "requires symmetry, and a finite $\\Omega$",
            ],
            [
              "Frequentist",
              "long-run relative frequency",
              "needs repeatable trials; says nothing about one-off events",
            ],
            [
              "Subjective / Bayesian",
              "degree of belief, constrained to be coherent",
              "different people may legitimately disagree",
            ],
            [
              "Axiomatic",
              "any $P$ satisfying the axioms",
              "silent on which one is correct — deliberately",
            ],
          ],
        },
        {
          kind: "prose",
          text: "Kolmogorov's contribution was to separate the mathematics from the interpretation. The axioms hold whichever reading you take, so theorems proved from them apply to all of them — and arguments about interpretation, which are genuine, do not threaten the calculus.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "\"Equally likely\" is an assumption, not a default",
          text: "The classical definition is circular unless symmetry is justified independently — it defines probability in terms of equally *likely* outcomes. It also fails quietly: the sum of two dice has 11 outcomes, and treating them as equally likely gives $P(\\text{sum}=7) = 1/11$ rather than the correct $1/6$. The sample space must be chosen so that symmetry actually holds.",
        },
      ],
    },
    {
      heading: "Consequences worth having by heart",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "$P(\\varnothing) = 0$ and $P(A^{c}) = 1 - P(A)$.",
            "Monotonicity: $A \\subseteq B \\Rightarrow P(A) \\le P(B)$.",
            "Continuity: if $A_n \\uparrow A$ then $P(A_n) \\to P(A)$, and likewise for decreasing sequences. This is what countable additivity buys, and it is why limits of events behave.",
            "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$, extending to inclusion–exclusion.",
          ],
        },
        {
          kind: "prose",
          text: "Continuity deserves a mention because it is the property finite additivity would not give. It licenses statements like $P(\\text{the process eventually halts}) = \\lim_n P(\\text{halts by step } n)$, which is how almost every result about limiting behaviour is actually established.",
        },
      ],
    },
  ],
  references: [
    { source: "Kolmogorov, Foundations of the Theory of Probability", locator: "Ch. 1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.2" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
