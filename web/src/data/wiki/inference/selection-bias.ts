import type { WikiArticle } from "../types";

export const selectionBiasWiki: WikiArticle = {
  conceptId: "selection-bias",

  summary:
    "Selection bias arises when the units you get to see are not a random draw from the units you want to learn about, and the " +
    "selection is related to the outcome. Survey non-response, survivorship, self-selected app users and labels collected only " +
    "for “interesting” cases are all versions of it. If you know (or can estimate) each unit's probability $\\pi_i$ of being " +
    "selected, weighting each observed unit by $\\frac{1}{\\pi_i}$ makes it stand in for the $\\frac{1}{\\pi_i}$ similar units you " +
    "did not see — the inverse probability weighting (IPW) idea that underlies survey estimation, causal inference, missing-data " +
    "methods and active statistical inference.",

  sections: [
    {
      heading: "The selection indicator",
      blocks: [
        {
          kind: "prose",
          text:
            "Attach to every unit a selection indicator $R_i \\in \\lbrace 0, 1 \\rbrace$: $Y_i$ is observed only when $R_i = 1$. The naive " +
            "estimate is the mean over selected units, which targets $\\mathbb{E}[Y \\mid R = 1]$, not $\\mathbb{E}[Y]$. They agree only when " +
            "selection is independent of $Y$.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[Y \\mid R = 1] - \\mathbb{E}[Y] = \\frac{\\text{Cov}(R, Y)}{\\mathbb{P}(R = 1)}",
          caption: "The bias of the selected-sample mean: zero exactly when selection is uncorrelated with the outcome",
        },
        {
          kind: "table",
          headers: ["Form", "What drives selection"],
          rows: [
            ["Non-response", "Unhappy customers ignore the satisfaction survey"],
            ["Survivorship", "Only funds that did not close appear in the database"],
            ["Self-selection", "Volunteers for a fitness study are already fitter"],
            ["Collider (Berkson)", "Conditioning on hospital admission makes two independent diseases look negatively related"],
            ["Labeling by design", "Only transactions flagged by a model get audited"],
          ],
        },
      ],
    },

    {
      heading: "Inverse probability weighting",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\mu}_{\\text{HT}} = \\frac{1}{N} \\sum_{i=1}^{N} \\frac{R_i Y_i}{\\pi_i}, \\qquad \\pi_i = \\mathbb{P}(R_i = 1 \\mid X_i)",
          caption: "Horvitz–Thompson estimator of the population mean",
        },
        {
          kind: "prose",
          text:
            "Unbiasedness is one line: if selection depends only on $X$ (not on $Y$ beyond $X$), then " +
            "$\\mathbb{E}\\left[\\frac{R Y}{\\pi(X)}\\right] = \\mathbb{E}\\left[\\frac{Y}{\\pi(X)} \\mathbb{E}[R \\mid X, Y]\\right] = \\mathbb{E}\\left[\\frac{Y \\pi(X)}{\\pi(X)}\\right] = \\mathbb{E}[Y]$. " +
            "The two requirements are visible in the algebra: $\\mathbb{E}[R \\mid X, Y] = \\pi(X)$ (selection ignorable given $X$) and $\\pi(X) > 0$ (positivity).",
        },
        {
          kind: "formula",
          latex: "\\hat{\\mu}_{\\text{Hájek}} = \\frac{\\sum_i R_i Y_i / \\pi_i}{\\sum_i R_i / \\pi_i}",
          caption: "Normalised (Hájek) version: a weighted mean, slightly biased but usually lower variance",
        },
        {
          kind: "example",
          title: "Reweighting an unbalanced survey",
          problem:
            "A town has $100$ urban and $100$ rural households. Urban households respond with probability $0.5$, rural with $0.1$. " +
            "You get $50$ urban responses averaging $4$ and $10$ rural responses averaging $8$. Estimate the town mean.",
          steps: [
            "Naive mean: $\\frac{50 \\times 4 + 10 \\times 8}{60} = \\frac{280}{60} \\approx 4.67$ — dominated by the urban group.",
            "Urban weight $\\frac{1}{0.5} = 2$, rural weight $\\frac{1}{0.1} = 10$.",
            "$\\hat{\\mu}_{\\text{HT}} = \\frac{1}{200}(50 \\times 4 \\times 2 + 10 \\times 8 \\times 10) = \\frac{400 + 800}{200} = 6$.",
          ],
          answer: "$6$, the average of the two strata means — each stratum is restored to its true size.",
        },
      ],
    },

    {
      heading: "The price of weighting",
      blocks: [
        {
          kind: "prose",
          text:
            "Small $\\pi_i$ means huge weights, and a few heavily weighted units then dominate the estimate. Kish's effective sample size " +
            "summarises the loss:",
        },
        {
          kind: "formula",
          latex: "n_{\\text{eff}} = \\frac{\\left(\\sum_i w_i\\right)^{2}}{\\sum_i w_i^{2}}",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "IPW cannot fix selection on the outcome",
          text:
            "If selection depends on $Y$ itself even after conditioning on $X$ — sicker patients skip follow-up because they are sick — " +
            "then $\\pi$ depends on the unobserved $Y$ and cannot be estimated from the data. That is the missing-not-at-random problem, " +
            "and it needs extra data (double sampling) or untestable assumptions (sensitivity analysis).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Selection you control",
          text:
            "When the analyst chooses who gets selected — which survey respondents to chase, which points to label — $\\pi_i$ is known " +
            "exactly, so IPW is exactly unbiased. Active statistical inference exploits this: label where the model is uncertain, then weight by $\\frac{1}{\\pi_i}$.",
        },
      ],
    },
  ],

  references: [
    { source: "Horvitz, Thompson, A Generalization of Sampling Without Replacement from a Finite Universe (JASA 1952)", locator: "the Horvitz–Thompson estimator" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 16, Causal Inference" },
    { source: "Little, Rubin, Statistical Analysis with Missing Data", locator: "Ch. 3, Complete-Case Analysis and Weighting" },
  ],
};
