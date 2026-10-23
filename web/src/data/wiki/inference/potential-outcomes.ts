import type { WikiArticle } from "../types";

export const potentialOutcomesWiki: WikiArticle = {
  conceptId: "potential-outcomes",

  summary:
    "The potential-outcomes (Neyman–Rubin) framework defines a causal effect as a comparison between the outcome a unit would have " +
    "under treatment, $Y(1)$, and under control, $Y(0)$. Each unit reveals at most one of the two, so causal inference is a missing-data " +
    "problem: the unobserved potential outcome is missing, and the treatment assignment is the missingness mechanism. Three assumptions — " +
    "consistency, no unmeasured confounding and positivity — let the average treatment effect be computed from observed data, by " +
    "regression or by inverse propensity weighting.",

  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Treatment", description: "$A \\in \\lbrace 0, 1 \\rbrace$, e.g. bariatric surgery versus usual care." },
            { term: "Potential outcomes", description: "$Y(1)$ and $Y(0)$: the outcome the same unit would have under each treatment." },
            { term: "Average treatment effect (ATE)", description: "$\\tau = \\mathbb{E}[Y(1) - Y(0)] = \\mathbb{E}[Y(1)] - \\mathbb{E}[Y(0)]$, a contrast of mean counterfactuals." },
            { term: "ATT", description: "$\\mathbb{E}[Y(1) - Y(0) \\mid A = 1]$, the effect among those actually treated." },
            { term: "Quantile treatment effect", description: "$q_p\\left(Y(1)\\right) - q_p\\left(Y(0)\\right)$: the difference of the $p$-th quantiles of the two marginal distributions — not the quantile of individual effects." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The fundamental problem",
          text:
            "Individual effects $Y_i(1) - Y_i(0)$ are never observed, because no one is both treated and untreated. Averages can still be identified; " +
            "individual effects and their distribution (e.g. the share who are harmed) generally cannot.",
        },
      ],
    },

    {
      heading: "Identification",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Consistency (with no interference, together called SUTVA): $Y = A\\,Y(1) + (1 - A)\\,Y(0)$ — the observed outcome is the potential outcome of the treatment received.",
            "No unmeasured confounding (conditional exchangeability): $A \\perp Y(a) \\mid X$ for $a = 0, 1$.",
            "Positivity: $0 < e(X) < 1$, where $e(X) = \\mathbb{P}(A = 1 \\mid X)$ is the propensity score.",
          ],
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[Y(a)] = \\mathbb{E}\\left[ \\mathbb{E}[Y \\mid A = a, X] \\right] = \\mathbb{E}\\left[ \\frac{\\mathbb{I}\\lbrace A = a \\rbrace\\, Y}{\\mathbb{P}(A = a \\mid X)} \\right]",
          caption: "The g-formula (outcome regression) and inverse propensity weighting",
        },
        {
          kind: "prose",
          text:
            "Compare with missing data: $Y(1)$ is “observed” exactly when $A = 1$, and no unmeasured confounding is MAR for that missingness. " +
            "In a randomized trial $e(X)$ is a known constant, so the difference in group means is unbiased.",
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Confounding by severity",
          problem:
            "$\\mathbb{P}(X = 1) = 0.4$ (severe). Propensities: $e(0) = 0.2$, $e(1) = 0.7$. Mean outcomes: treated $5$ ($X = 0$) and $9$ ($X = 1$); " +
            "control $3$ ($X = 0$) and $6$ ($X = 1$). Find the naive difference and the ATE.",
          steps: [
            "Treated mix: $0.6 \\times 0.2 = 0.12$ mild and $0.4 \\times 0.7 = 0.28$ severe, so $\\mathbb{E}[Y \\mid A = 1] = \\frac{0.12 \\times 5 + 0.28 \\times 9}{0.4} = 7.8$.",
            "Control mix: $0.48$ mild and $0.12$ severe, so $\\mathbb{E}[Y \\mid A = 0] = \\frac{0.48 \\times 3 + 0.12 \\times 6}{0.6} = 3.6$.",
            "Naive difference: $7.8 - 3.6 = 4.2$.",
            "g-formula: $0.6 \\times (5 - 3) + 0.4 \\times (9 - 6) = 1.2 + 1.2 = 2.4$.",
          ],
          answer: "ATE $= 2.4$. The naive $4.2$ is inflated because severe patients, who have higher outcomes anyway, are more often treated.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two models, one target",
          text:
            "The g-formula needs a model for $\\mathbb{E}[Y \\mid A, X]$; IPW needs a model for $e(X)$. Each is biased if its model is wrong. " +
            "Doubly robust estimation combines them so only one has to be right.",
        },
      ],
    },
  ],

  references: [
    { source: "Hernán, Robins, Causal Inference: What If", locator: "Ch. 1–3 (potential outcomes, randomization, observational studies), Ch. 12–13 (IP weighting, standardization)" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 16, Causal Inference" },
    { source: "Imbens, Rubin, Causal Inference for Statistics, Social, and Biomedical Sciences", locator: "Ch. 1, Causality: The Basic Framework" },
  ],
};
