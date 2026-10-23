import type { WikiArticle } from "../types";

export const doubleSamplingMnarWiki: WikiArticle = {
  conceptId: "double-sampling-mnar",

  summary:
    "When outcomes are missing not at random, the observed data cannot identify the target, and a sensitivity analysis may leave the " +
    "answer undetermined. Double sampling changes the data instead of the assumptions: from the units whose outcome is missing, draw a " +
    "random subsample and make the extra effort — a phone call, a chart review, a clinic visit — to measure their outcome. Because the " +
    "analyst chooses that subsample at random, it is a fair picture of all the non-respondents, and the MNAR problem becomes an identified " +
    "one. In an EHR study of weight after bariatric surgery, it means actively following up a random fraction of patients who never " +
    "returned for a weigh-in.",

  sections: [
    {
      heading: "The design and its assumptions",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "$R$", description: "Stage-one indicator: $R = 1$ if the outcome is in the record." },
            { term: "$S$", description: "Stage-two indicator, defined for $R = 0$: $S = 1$ if the unit is selected for follow-up and its outcome obtained." },
            { term: "$\\rho(A, X)$", description: "$\\mathbb{P}(S = 1 \\mid R = 0, A, X)$, the double-sampling probability — set by the investigator, so known." },
          ],
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The usual causal assumptions: consistency, no unmeasured confounding $A \\perp Y(a) \\mid X$, and positivity of treatment.",
            "Double sampling at random: $S \\perp Y \\mid R = 0, A, X$. Stage one may be MNAR; stage two is MAR by design.",
            "Positivity of follow-up: $\\rho(A, X) > 0$, and every unit selected for follow-up actually yields its outcome.",
          ],
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[Y \\mid A = a, X] = \\lambda_a(X)\\,\\mathbb{E}[Y \\mid R = 1, a, X] + \\left(1 - \\lambda_a(X)\\right)\\mathbb{E}[Y \\mid R = 0, S = 1, a, X]",
          caption: "Identification: $\\lambda_a(X) = \\mathbb{P}(R = 1 \\mid A = a, X)$. The non-respondents' mean comes from the follow-up sample",
        },
        {
          kind: "prose",
          text:
            "Averaging over $X$ gives $\\mathbb{E}[Y(a)]$, and the difference over $a$ gives the average causal effect. Nothing in the formula requires " +
            "the non-respondents to resemble the respondents.",
        },
      ],
    },

    {
      heading: "Weighting estimators",
      blocks: [
        {
          kind: "prose",
          text:
            "A unit seen at stage one represents itself; a unit seen at stage two represents $\\frac{1}{\\rho}$ non-respondents. So within each treatment arm the weight is",
        },
        {
          kind: "formula",
          latex: "w = R + \\frac{(1 - R)\\,S}{\\rho(A, X)}, \\qquad \\mathbb{E}[w\\,Y \\mid A, X] = \\mathbb{E}[Y \\mid A, X]",
        },
        {
          kind: "example",
          title: "Chasing a quarter of the missing",
          problem:
            "$1{,}000$ patients had surgery. $600$ have a recorded weight loss averaging $30$ kg. Of the $400$ without one, a random $100$ ($\\rho = 0.25$) are " +
            "followed up and lost $22$ kg on average. Estimate the mean weight loss.",
          steps: [
            "Complete cases (what MAR without covariates would give): $30$ kg.",
            "Weighted: $\\frac{600 \\times 30 + 4 \\times 100 \\times 22}{1{,}000} = \\frac{18{,}000 + 8{,}800}{1{,}000} = 26.8$ kg.",
            "Equivalently $0.6 \\times 30 + 0.4 \\times 22 = 26.8$.",
          ],
          answer: "$26.8$ kg. The $3.2$ kg gap is MNAR bias that no analysis of the record alone could have detected.",
        },
        {
          kind: "prose",
          text:
            "An efficient, robust version augments the weighting with outcome models $m_1(a, X) = \\mathbb{E}[Y \\mid R = 1, a, X]$ and " +
            "$m_0(a, X) = \\mathbb{E}[Y \\mid R = 0, S = 1, a, X]$:",
        },
        {
          kind: "formula",
          latex: "\\varphi_a = \\mu_a(X) + \\frac{\\mathbb{I}\\lbrace A = a \\rbrace}{\\mathbb{P}(A = a \\mid X)}\\left[ R\\,Y + (1 - R)\\left( m_0 + \\frac{S\\left(Y - m_0\\right)}{\\rho} \\right) - \\mu_a(X) \\right]",
          caption: "$\\mu_a = \\lambda_a m_1 + (1 - \\lambda_a) m_0$; averaging $\\varphi_1 - \\varphi_0$ estimates the ATE",
        },
      ],
    },

    {
      heading: "MAR versus nonparametric, testing and quantiles",
      blocks: [
        {
          kind: "table",
          headers: ["Estimator", "Assumes", "Trade-off"],
          rows: [
            ["Nonparametric (double-sampling)", "Only the design assumptions", "Valid under MNAR; variance driven by the small follow-up sample"],
            ["MAR-based", "Stage-one missingness is MAR: $m_0 = m_1$", "Pools follow-up and record data, so more efficient — but biased if MAR fails"],
            ["Adaptive", "Chooses or blends based on evidence of MAR violation", "Near the MAR efficiency when MAR holds, protected when it does not"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "MNAR becomes testable",
          text:
            "Without follow-up, MAR is untestable. With it, the null $H_0: \\mathbb{E}[Y \\mid R = 1, A, X] = \\mathbb{E}[Y \\mid R = 0, A, X]$ compares two estimable " +
            "quantities — record outcomes against followed-up outcomes at the same $(A, X)$ — and can be tested with a Wald statistic.",
        },
        {
          kind: "prose",
          text:
            "Quantile treatment effects use the same weights in an estimating equation: the weighted $p$-th quantile $q_a$ of $Y(a)$ solves " +
            "$\\sum_i \\frac{\\mathbb{I}\\lbrace A_i = a \\rbrace}{\\mathbb{P}(A_i = a \\mid X_i)} w_i \\left( \\mathbb{I}\\lbrace Y_i \\le q_a \\rbrace - p \\right) = 0$, " +
            "and the effect is $q_1 - q_0$ — useful for weight loss, where the tails (failure to lose weight, extreme loss) matter clinically.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Design matters",
          text:
            "Follow-up is costly, so $\\rho$ is small and the $\\frac{1}{\\rho}$ weights are large. The variance of the nonparametric estimator falls " +
            "roughly in proportion to the number followed up; budgets can be targeted (larger $\\rho$ in strata where non-respondents are most uncertain) as long as $\\rho$ is recorded.",
        },
      ],
    },
  ],

  references: [
    { source: "Hansen, Hurwitz, The Problem of Non-Response in Sample Surveys (JASA 1946)", locator: "the original double-sampling design" },
    { source: "Levis, Mukherjee, Wang, Fischer, Haneuse, Double Sampling for Informatively Missing Data in Electronic Health Record-Based Comparative Effectiveness Research", locator: "identification, efficient and MAR-based estimators" },
    { source: "Frangakis, Rubin, Addressing an Idiosyncrasy in Estimating Survival Curves Using Double Sampling in the Presence of Self-Selected Right Censoring (Biometrics 2001)", locator: "double sampling for informative dropout" },
  ],
};
