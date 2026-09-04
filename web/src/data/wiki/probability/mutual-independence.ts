import type { WikiArticle } from "../types";

export const mutualIndependence: WikiArticle = {
  conceptId: "mutual-independence",
  summary:
    "For three or more events, checking every pair is not enough. Mutual independence requires the multiplication rule to hold for every subset, and there are events that are pairwise independent while being jointly determined — the third is a function of the other two. This is why 'independent' in a theorem's hypotheses means mutually independent, not pairwise.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "P\\!\\left(\\bigcap_{i \\in S} A_i\\right) = \\prod_{i \\in S} P(A_i) \\qquad \\text{for every subset } S \\subseteq \\{1, \\ldots, n\\}",
          caption: "Mutual independence — the product rule for every subset, not just pairs",
        },
        {
          kind: "prose",
          text: "For three events that is four conditions: the three pairwise products, plus $P(ABC) = P(A)P(B)P(C)$. In general there are $2^{n} - n - 1$ conditions, so the requirement grows quickly and is genuinely stronger than pairwise independence.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Neither condition implies the other",
          text: "Pairwise independence does not imply mutual independence — the example below shows why. And the triple condition alone does not imply the pairwise ones either: it is possible to construct events with $P(ABC) = P(A)P(B)P(C)$ while some pair is dependent. All the conditions have to be checked, which is why the definition quantifies over every subset rather than listing a few.",
        },
      ],
    },
    {
      heading: "The standard counterexample",
      blocks: [
        {
          kind: "example",
          title: "Pairwise independent, jointly determined",
          problem:
            "Flip two fair coins. Let $A$ = \"first is heads\", $B$ = \"second is heads\", $C$ = \"the two match\". Check pairwise and mutual independence.",
          steps: [
            "Each event has probability $1/2$: $A$ and $B$ obviously, and $C$ because two of the four equally likely outcomes match.",
            "$P(A \\cap B) = P(\\text{HH}) = 1/4 = P(A)P(B)$. ✓",
            "$P(A \\cap C) = P(\\text{HH}) = 1/4 = P(A)P(C)$. ✓",
            "$P(B \\cap C) = P(\\text{HH}) = 1/4 = P(B)P(C)$. ✓ All three pairs independent.",
            "$P(A \\cap B \\cap C) = P(\\text{HH}) = 1/4$, but $P(A)P(B)P(C) = 1/8$. ✗",
          ],
          answer:
            "Pairwise independent, not mutually independent. Any two of the events determine the third exactly — knowing the first coin and whether they match tells you the second with certainty.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What went wrong",
          text: "Pairwise checks only ever look at two events at a time, and each pair genuinely carries no information about the other. The dependence lives at the level of the triple, where it is invisible to any pairwise test. This is the same structural blind spot as correlation missing non-linear relationships: a low-order check cannot detect a higher-order structure.",
        },
      ],
    },
    {
      heading: "Independence of random variables",
      blocks: [
        {
          kind: "formula",
          latex: "F_{X_1,\\ldots,X_n}(x_1,\\ldots,x_n) = \\prod_{i=1}^{n} F_{X_i}(x_i) \\qquad \\text{for all } x_1, \\ldots, x_n",
          caption: "Mutual independence of random variables — the joint CDF factorises fully",
        },
        {
          kind: "prose",
          text: "The same distinction applies. Pairwise uncorrelated random variables need not be mutually independent, and pairwise independent ones need not be either. For jointly normal vectors, however, a zero covariance *matrix* does give full mutual independence — one of the reasons the multivariate normal is so tractable.",
        },
      ],
    },
    {
      heading: "Why the distinction matters",
      blocks: [
        {
          kind: "table",
          headers: ["Result", "What it needs"],
          rows: [
            [
              "$\\operatorname{Var}\\!\\left(\\sum X_i\\right) = \\sum \\operatorname{Var}(X_i)$",
              "pairwise uncorrelated — this one is fine",
            ],
            [
              "$M_{\\sum X_i}(t) = \\prod M_{X_i}(t)$",
              "**mutual** independence",
            ],
            [
              "Joint density factorises",
              "**mutual** independence",
            ],
            [
              "Likelihood is a product: $L(\\theta) = \\prod f(x_i \\mid \\theta)$",
              "**mutual** independence",
            ],
            [
              "Law of large numbers, CLT",
              "**mutual** independence (or weaker mixing conditions)",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The variance result is the exception worth noting",
          text: "Variances add under pairwise uncorrelatedness alone — no mutual independence, and not even independence, required. That is a genuinely weaker hypothesis than the others, and it is why the weak law of large numbers can be proved for pairwise uncorrelated sequences. Most other results, especially anything involving a product of likelihoods or MGFs, need the full condition.",
        },
        {
          kind: "prose",
          text: "In practice the most consequential appearance is the likelihood. Writing $L(\\theta) = \\prod_i f(x_i \\mid \\theta)$ assumes the observations are mutually independent. If they are clustered, serially correlated, or share a latent cause, that product is wrong and every standard error derived from it is too small.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 2.5" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.3.4, §4.6" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
