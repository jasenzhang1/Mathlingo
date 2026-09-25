import type { WikiArticle } from "../types";

export const analysisOfCovarianceWiki: WikiArticle = {
  conceptId: "analysis-of-covariance",

  summary:
    "Analysis of covariance compares group means after adjusting for a continuous covariate — baseline " +
    "blood pressure in a drug trial, prior test scores in a teaching study. It is one-way ANOVA with a " +
    "shared regression slope added: parallel lines, one per group. The adjustment removes covariate-driven " +
    "variation from the error, which sharpens the comparison, and corrects for chance imbalance in the " +
    "covariate between groups.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "y_{ij} = μ + αᵢ + γ(x_{ij} − x̄) + ε_{ij}",
          caption: "One slope γ shared by all groups: the lines are parallel.",
        },
        {
          kind: "formula",
          latex: "γ̂ = \\frac{E_{xy}}{E_{xx}} = \\frac{ΣᵢΣⱼ(x_{ij} − x̄ᵢ)(y_{ij} − ȳᵢ)}{ΣᵢΣⱼ(x_{ij} − x̄ᵢ)²}",
          caption: "The slope is estimated from within-group variation only — Frisch–Waugh–Lovell with the group indicators partialled out.",
        },
        {
          kind: "formula",
          latex: "ȳᵢ^{adj} = ȳᵢ − γ̂(x̄ᵢ − x̄)",
          caption: "Adjusted means: each group's mean moved to what it would be at the common covariate value x̄.",
        },
      ],
    },

    {
      heading: "What the adjustment does",
      blocks: [
        {
          kind: "example",
          title: "Adjusting for a baseline imbalance",
          problem:
            "Two teaching methods give mean final scores 78 and 74. The groups' mean prior scores were 65 and " +
            "60, the overall mean prior score is 62.5, and the within-group slope is γ̂ = 0.8. Compute the adjusted means.",
          steps: [
            "Method 1: 78 − 0.8(65 − 62.5) = 78 − 2 = 76.",
            "Method 2: 74 − 0.8(60 − 62.5) = 74 + 2 = 76.",
          ],
          answer: "Both adjusted means are 76: the raw 4-point difference is entirely explained by the groups' different starting points.",
        },
        {
          kind: "list",
          items: [
            "Precision: the error sum of squares drops from E_yy to E_yy − E_xy²/E_xx, at the cost of one df (n − k − 1 remain).",
            "Bias correction: in observational comparisons, adjusted means correct for covariate differences between groups — provided the linear model is right.",
            "The test for groups is a general linear hypothesis: compare the ANCOVA model with the single-line model y = μ + γx + ε.",
          ],
        },
      ],
    },

    {
      heading: "Assumptions to check",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Parallel slopes",
          text:
            "ANCOVA assumes a common slope. Test it first by adding group × covariate interaction terms (the " +
            "parallelism test from comparing straight lines). If slopes differ, the treatment effect depends " +
            "on x and a single adjusted difference is misleading.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The covariate must not be affected by treatment",
          text:
            "Adjusting for a variable measured after treatment — one the treatment itself can change — " +
            "removes part of the treatment effect. Covariates should be measured before assignment, or be " +
            "logically unaffected by it.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "In a randomised trial the adjustment is for precision",
          text:
            "Randomisation makes groups comparable on the covariate in expectation, so adjusted and unadjusted " +
            "estimates target the same effect; ANCOVA's gain is a smaller standard error. In observational " +
            "data the adjustment also removes bias, but only for the covariates you measured.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.8, Analysis of Covariance" },
  ],
};
