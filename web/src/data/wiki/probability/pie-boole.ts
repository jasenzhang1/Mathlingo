import type { WikiArticle } from "../types";

export const pieBoole: WikiArticle = {
  conceptId: "pie-boole",
  summary:
    "Inclusion–exclusion computes the probability of a union exactly, by adding the pieces and correcting for every overlap. Boole's inequality throws the corrections away and keeps only the first term, giving an upper bound that needs no knowledge of the overlaps at all. One is exact and expensive; the other is crude and free.",
  sections: [
    {
      heading: "Inclusion–exclusion",
      blocks: [
        {
          kind: "formula",
          latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
          caption: "Two events",
        },
        {
          kind: "formula",
          latex: "P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(AB) - P(AC) - P(BC) + P(ABC)",
          caption: "Three events — subtract the pairs, add back the triple",
        },
        {
          kind: "formula",
          latex: "P\\!\\left(\\bigcup_{i=1}^{n} A_i\\right) = \\sum_{i} P(A_i) - \\sum_{i<j} P(A_iA_j) + \\sum_{i<j<k} P(A_iA_jA_k) - \\cdots + (-1)^{n+1}P(A_1 \\cdots A_n)",
          caption: "The general form — signs alternate by the size of the intersection",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the signs alternate",
          text: "Track a single outcome lying in exactly $m$ of the events. It is counted $\\binom{m}{1}$ times in the first sum, subtracted $\\binom{m}{2}$ times in the second, added $\\binom{m}{3}$ times in the third, and so on. The alternating sum $\\sum_{k=1}^{m}(-1)^{k+1}\\binom{m}{k}$ equals exactly 1 for every $m \\ge 1$ — a consequence of the binomial theorem applied to $(1-1)^{m} = 0$. So every outcome in the union is counted precisely once.",
        },
      ],
    },
    {
      heading: "Boole's inequality",
      blocks: [
        {
          kind: "formula",
          latex: "P\\!\\left(\\bigcup_{i=1}^{n} A_i\\right) \\ \\le \\ \\sum_{i=1}^{n} P(A_i)",
          caption: "The union bound — keep the first term, discard the rest",
        },
        {
          kind: "prose",
          text: "Equality holds exactly when the events are pairwise disjoint, since then there is nothing to correct for. The more the events overlap, the looser the bound becomes — and once the right-hand side exceeds 1 the statement is true but empty.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why a crude bound is worth having",
          text: "Inclusion–exclusion needs $2^{n} - 1$ terms, and every intersection probability. Boole needs $n$ terms and no knowledge of dependence whatsoever. When each $A_i$ is a rare failure mode, that trade is overwhelmingly favourable: twenty components each failing with probability at most $0.001$ give at most $0.02$ chance of any failure, however they are correlated. This is the standard tool in multiple-testing corrections — the Bonferroni correction is Boole's inequality — and throughout probabilistic algorithm analysis.",
        },
        {
          kind: "formula",
          latex: "P\\!\\left(\\bigcup_{i} A_i\\right) \\ \\ge \\ \\sum_{i} P(A_i) - \\sum_{i<j} P(A_iA_j)",
          caption: "Bonferroni's inequality — truncating at an even term gives a lower bound",
        },
        {
          kind: "prose",
          text: "Truncating the inclusion–exclusion series alternately over- and under-shoots. Stopping after an odd-numbered group of terms gives an upper bound; stopping after an even-numbered one gives a lower bound. Boole's inequality is simply the first of these.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Exact, by inclusion–exclusion",
          problem:
            "Of 100 students, 60 take statistics, 45 take linear algebra, 30 take computing; 25 take stats and algebra, 15 stats and computing, 10 algebra and computing, and 5 take all three. How many take at least one?",
          steps: [
            "Singles: $60 + 45 + 30 = 135$.",
            "Subtract pairs: $135 - (25 + 15 + 10) = 135 - 50 = 85$.",
            "Add back the triple: $85 + 5 = 90$.",
          ],
          answer: "$90$ take at least one; $10$ take none.",
        },
        {
          kind: "example",
          title: "Bounded, by Boole",
          problem:
            "A system has 30 components, each failing during a mission with probability $0.002$, with unknown dependence. Bound the probability of at least one failure.",
          steps: [
            "Inclusion–exclusion is unusable — the joint failure probabilities are unknown.",
            "Boole: $P(\\text{any failure}) \\le 30 \\times 0.002 = 0.06$.",
            "If failures were independent the exact answer would be $1 - 0.998^{30} \\approx 0.0583$.",
            "The bound is within about 3% of the independent case, and it holds no matter how the failures are correlated.",
          ],
          answer:
            "At most $6\\%$ — a guarantee requiring no assumption about dependence.",
        },
      ],
    },
    {
      heading: "Practical notes",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**The complement is usually easier.** For \"at least one\", computing $1 - P(\\text{none})$ avoids the whole expansion, and is exact whenever the events are independent.",
            "**Boole is tightest for rare, nearly-disjoint events** — precisely the situation where it is most often needed.",
            "**Bonferroni's multiple-testing correction** divides $\\alpha$ by the number of tests. That is Boole applied to the events \"test $i$ gives a false positive\", and its conservatism for many correlated tests is exactly the looseness of the bound under overlap.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 1.6" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.2.3, Thm 1.2.11" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
