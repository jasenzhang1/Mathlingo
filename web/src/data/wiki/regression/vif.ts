import type { WikiArticle } from "../types";

export const vifWiki: WikiArticle = {
  conceptId: "vif",

  summary:
    "The variance inflation factor answers one precise question: by what multiple is the variance " +
    "of β̂ⱼ larger than it would have been if Xⱼ were uncorrelated with the other predictors? The " +
    "answer is 1/(1 − R²ⱼ), where R²ⱼ comes from regressing Xⱼ on all the others. The name is " +
    "literal — VIF is the inflation factor, not a proxy for it — and reading it that way makes the " +
    "usual thresholds interpretable rather than arbitrary.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "VIFⱼ = 1 / (1 − R²ⱼ)",
          caption: "R²ⱼ is from the auxiliary regression of Xⱼ on every other predictor — y is not involved.",
        },
        {
          kind: "prose",
          text:
            "Computing all p VIFs means running p auxiliary regressions, each with a different " +
            "predictor as the temporary response. The response variable y appears in none of them: " +
            "collinearity is a property of the design matrix alone, so VIF can be computed before " +
            "any outcome data is collected. That makes it a design tool as much as a diagnostic.",
        },
        {
          kind: "table",
          headers: ["R²ⱼ", "VIFⱼ", "SE multiplier √VIFⱼ", "Reading"],
          rows: [
            ["0.00", "1.0", "1.00", "Orthogonal to the others — no inflation at all"],
            ["0.50", "2.0", "1.41", "Mild"],
            ["0.75", "4.0", "2.00", "Standard errors doubled"],
            ["0.80", "5.0", "2.24", "The common warning threshold"],
            ["0.90", "10.0", "3.16", "The common action threshold"],
            ["0.99", "100.0", "10.0", "Severe — coefficients essentially uninterpretable"],
            ["1.00", "∞", "∞", "Exact collinearity; XᵀX is singular"],
          ],
        },
      ],
    },

    {
      heading: "Why it is called variance inflation",
      blocks: [
        {
          kind: "formula",
          latex: "Var(β̂ⱼ) = [σ² / ((n − 1)·s²_{Xⱼ})] · VIFⱼ",
          caption: "The bracketed term is the variance Xⱼ would have on its own; VIF is exactly the multiplier.",
        },
        {
          kind: "prose",
          text:
            "The bracket is the variance β̂ⱼ would have in a simple regression of y on Xⱼ alone, or " +
            "equivalently in a multiple regression where Xⱼ happened to be orthogonal to every other " +
            "predictor. VIFⱼ multiplies it. So a VIF of 4 does not mean 'somewhat collinear' — it " +
            "means the variance is exactly four times larger and the standard error exactly twice " +
            "as wide, which in turn means the confidence interval is twice as wide and the " +
            "t-statistic half as large as it would otherwise have been.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The rules of thumb are just square roots",
          text:
            "VIF > 5 means standard errors are more than doubled; VIF > 10 means more than tripled. " +
            "The thresholds are conventional rather than derived, and they are best used as prompts " +
            "to look rather than as tests to pass. What matters is whether the inflated interval is " +
            "still narrow enough to answer the question you are asking.",
        },
        {
          kind: "example",
          title: "Computing and interpreting a VIF",
          problem:
            "Regressing X₃ on the other four predictors gives R²₃ = 0.75. What is VIF₃, and what " +
            "does it imply for a coefficient reported as β̂₃ = 2.4 with SE = 1.1?",
          steps: [
            "VIF₃ = 1/(1 − 0.75) = 1/0.25 = 4.",
            "The SE multiplier is √4 = 2.",
            "So without the collinearity the SE would have been roughly 1.1/2 = 0.55.",
            "The t-statistic is 2.4/1.1 ≈ 2.18 as reported, versus roughly 4.4 in the orthogonal case.",
          ],
          answer:
            "VIF₃ = 4. Three-quarters of the variation in X₃ is already explained by the other predictors, doubling its standard error. The coefficient is still significant at 5%, but its interval is twice as wide as the sample size alone would suggest.",
        },
      ],
    },

    {
      heading: "What to do about a high VIF",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Nothing, if you only care about prediction",
              description:
                "Collinearity does not bias predictions or damage them within the observed range of X. It damages the interpretation of individual coefficients. If the model is a black box for forecasting, a VIF of 30 is not a problem.",
            },
            {
              term: "Drop one of the offenders",
              description:
                "Simple and often right when two predictors are near-duplicates (height in cm and in inches; revenue and log-revenue). Choose on subject-matter grounds, not on which has the smaller p-value.",
            },
            {
              term: "Combine them",
              description:
                "Average the correlated variables into an index, or take principal components. This trades interpretability of the individual variables for stability of the composite.",
            },
            {
              term: "Centre before forming polynomial or interaction terms",
              description:
                "x and x² are strongly correlated over a positive range, as are x₁ and x₁x₂. Centring each variable at its mean removes most of that correlation with no effect on the model's fit or predictions — this is structural collinearity, an artefact of parameterisation rather than of the data.",
            },
            {
              term: "Regularise",
              description:
                "Ridge regression is the principled answer: it accepts a little bias to shrink exactly the variance that VIF is measuring. Elastic net handles correlated groups better than LASSO, which tends to pick one arbitrarily.",
            },
            {
              term: "Collect data that breaks the correlation",
              description:
                "The only fix that actually adds information. In an experiment, design the predictor levels to be orthogonal; in observational work this usually is not available.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Do not drop variables for high VIF alone",
          text:
            "Removing a predictor that belongs in the model causes omitted variable bias in every " +
            "remaining coefficient — trading a variance problem for a bias problem, which is " +
            "usually a bad trade. Collinearity makes coefficients imprecise; omitting a confounder " +
            "makes them wrong. Precise and wrong is worse than imprecise and honest.",
        },
      ],
    },

    {
      heading: "Limitations",
      blocks: [
        {
          kind: "list",
          items: [
            "VIF is per-predictor and pairwise-blind: it catches a variable that is a linear combination of several others, which a correlation matrix misses entirely, but it does not tell you which others.",
            "The intercept has no meaningful VIF, and software reports for it should be ignored.",
            "For a categorical predictor with several levels, per-dummy VIFs are misleading; the generalised VIF (GVIF), scaled as GVIF^(1/2df), is the right quantity.",
            "High VIF on a polynomial or interaction term is usually an artefact of not centring, not a data problem.",
            "A low VIF does not certify a model. It says nothing about omitted variables, nonlinearity, or whether the predictors belong in the model at all.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The condition number is the matrix-level view",
          text:
            "VIF looks at one predictor at a time. The condition number of the scaled design matrix — " +
            "the ratio of its largest to smallest singular value — summarises the whole matrix, with " +
            "values above about 30 conventionally indicating serious collinearity. It is also the " +
            "quantity that governs numerical accuracy, which is why solvers factor X directly rather " +
            "than forming XᵀX: squaring the matrix squares the condition number and doubles the " +
            "digits of precision lost.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.3.3, Collinearity" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.5.2, Multicollinearity Diagnostics" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 12, Ill-Conditioning in the Linear Model" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-03-model-fit-and-diagnostics.md" },
  ],
};
