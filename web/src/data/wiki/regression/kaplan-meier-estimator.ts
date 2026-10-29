import type { WikiArticle } from "../types";

export const kaplanMeierEstimatorWiki: WikiArticle = {
  conceptId: "kaplan-meier-estimator",

  summary:
    "Time-to-event outcomes (survival after diagnosis, weeks until a new job) are usually censored: for some units we only know " +
    "the event had not happened by the end of follow-up. The Kaplan–Meier curve estimates the survival function anyway, by " +
    "multiplying the conditional survival probabilities at each observed event time, and the log-rank test compares two such " +
    "curves. Both rely on one key assumption: censoring is independent of the event time.",

  sections: [
    {
      heading: "Survival and hazard",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Survival function", description: "$S(t) = \\Pr(T > t) = 1 - F(t)$. For non-negative $T$, $\\mathbb{E}(T) = \\int_0^\\infty S(t)\\,dt$, the area under the curve." },
            { term: "Hazard", description: "$\\lambda(t) = \\lim_{\\Delta t \\to 0}\\Pr(t \\le T < t + \\Delta t \\mid T \\ge t)/\\Delta t = f(t)/S(t)$, the event rate among those still at risk." },
            { term: "Discrete time", description: "With mass at $t_1 < t_2 < \\cdots$, the discrete hazard is $\\lambda_k = \\Pr(T = t_k \\mid T \\ge t_k)$ and $S(t) = \\prod_{t_k \\le t}(1 - \\lambda_k)$." },
          ],
        },
        {
          kind: "formula",
          latex: "\\lambda(t) = -\\frac{d}{dt}\\log S(t), \\qquad S(t) = \\exp\\left\\{-\\int_0^t \\lambda(s)\\,ds\\right\\}",
          caption: "The hazard and the survival function determine each other.",
        },
        {
          kind: "table",
          headers: ["Distribution", "Survival $S(t)$", "Hazard $\\lambda(t)$"],
          rows: [
            ["$\\text{Exponential}(\\lambda)$", "$e^{-\\lambda t}$", "$\\lambda$, constant (memoryless)"],
            ["$\\text{Weibull}(a, b)$", "$\\exp\\{-(t/b)^a\\}$", "$\\frac{a}{b}(t/b)^{a-1}$: rising if $a > 1$, falling if $a < 1$"],
            ["Gamma, log-Normal", "No closed form", "Gamma monotone; log-Normal rises then falls"],
          ],
        },
      ],
    },
    {
      heading: "The Kaplan–Meier curve",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{S}(t) = \\prod_{k:\\, t_k \\le t}\\left(1 - \\frac{d_k}{r_k}\\right), \\qquad \\widehat{\\text{Var}}\\{\\log\\hat{S}(t)\\} = \\sum_{k:\\, t_k \\le t}\\frac{d_k}{r_k(r_k - d_k)}",
          caption: "At each event time $t_k$, $d_k$ events among $r_k$ at risk; Greenwood’s formula gives the variance.",
        },
        {
          kind: "prose",
          text:
            "A censored unit stays in the risk set until it leaves, so it counts in every $r_k$ for exactly as long as it was observed. " +
            "With no censoring the product telescopes to the empirical survival function. Greenwood’s formula comes from the delta method, treating " +
            "each $d_k/r_k$ as a Binomial proportion. Confidence intervals are usually built on the $\\log\\{-\\log S(t)\\}$ scale, with variance " +
            "$\\widehat{\\text{Var}}\\{\\log\\hat{S}\\}/(\\log\\hat{S})^2$, so that they stay inside $[0, 1]$.",
        },
        {
          kind: "example",
          title: "Six patients with censoring",
          problem: "Follow-up times are $2, 3^{+}, 4, 4, 6^{+}, 7$ months, where $^{+}$ marks censoring. Find $\\hat{S}(t)$ and the restricted mean survival up to $5$ months.",
          steps: [
            "$t = 2$: $r = 6$, $d = 1$, so $\\hat{S} = 5/6$.",
            "$t = 3$ is censored: the risk set drops to $4$ with no change to $\\hat{S}$.",
            "$t = 4$: $r = 4$, $d = 2$, so $\\hat{S} = \\frac{5}{6} \\times \\frac{1}{2} = \\frac{5}{12} \\approx 0.4167$.",
            "$t = 7$: $r = 1$, $d = 1$, so $\\hat{S} = 0$.",
            "Up to $5$: $\\int_0^5 \\hat{S} = 2 \\times 1 + 2 \\times \\frac{5}{6} + 1 \\times \\frac{5}{12} \\approx 4.0833$.",
          ],
          answer: "$\\hat{S}$ steps $1 \\to 0.8333 \\to 0.4167 \\to 0$; the restricted mean survival to $5$ months is about $4.08$ months.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Censoring must be non-informative",
          text:
            "With $T$ and the censoring time independent, the hazard is identified as $\\lambda_T(t) = \\Pr(y = t, \\delta = 1)/\\Pr(y \\ge t)$, with the censoring distribution cancelling. Administrative end of follow-up is fine; dropping out because of side effects, or dying of another cause, is not, and the latter calls for a competing-risks analysis.",
        },
      ],
    },
    {
      heading: "Comparing curves: the log-rank test",
      blocks: [
        {
          kind: "formula",
          latex: "Z_{\\text{LR}} = \\frac{\\sum_k \\left(x_k - r_{k1}/r_k\\right)}{\\sqrt{\\sum_k \\frac{r_{k1}}{r_k}\\left(1 - \\frac{r_{k1}}{r_k}\\right)}} \\ \\overset{a}{\\sim}\\ \\mathcal{N}(0, 1)",
          caption: "Observed minus expected treated events at each event time ($x_k = 1$ if the event was treated), without ties.",
        },
        {
          kind: "prose",
          text:
            "Ding derives the log-rank statistic as the score test of $b = 0$ in a Cox model with a binary treatment, so it is most powerful against proportional-hazards alternatives. " +
            "When the curves cross, early and late differences cancel and the test can miss real differences.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Compare survival, not hazards",
          text:
            "Hernán’s critique: the hazard at $t$ compares survivors to $t$, and if treatment works those survivors differ between arms, so a hazard ratio is not a randomised comparison. Differences in survival at fixed times, or in restricted mean survival time, keep the randomisation and stay interpretable when proportional hazards fails.",
        },
      ],
    },
  ],

  references: [
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 27, §27.2–27.4 Time-to-event data and the Kaplan–Meier curve" },
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 27, §27.5.4 Log-rank test as a score test, and §27.7 Critiques on survival analysis" },
  ],
};
