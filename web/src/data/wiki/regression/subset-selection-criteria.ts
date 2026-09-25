import type { WikiArticle } from "../types";

export const subsetSelectionCriteriaWiki: WikiArticle = {
  conceptId: "subset-selection-criteria",

  summary:
    "RSS always falls when a variable is added, so it cannot choose among subsets of different sizes. Every " +
    "useful criterion adds a price for size, and the cleanest way to set the price is to estimate what we " +
    "actually care about — the error of predictions for new data. Mallows' Cp estimates it from the full " +
    "model's σ̂²; PRESS estimates it by leave-one-out prediction; adjusted R², AIC and BIC are close " +
    "relatives with different prices.",

  sections: [
    {
      heading: "Mallows' Cp",
      blocks: [
        {
          kind: "formula",
          latex: "C_p = \\frac{RSS_p}{σ̂²} − n + 2p",
          caption: "RSS_p from a subset with p parameters; σ̂² = s² from the full model with all candidates.",
        },
        {
          kind: "prose",
          text:
            "Cp estimates the total mean squared error of the subset's fitted values, scaled by σ², " +
            "Σ E(ŷᵢ − μᵢ)²/σ². For a subset that includes every relevant variable (no bias), E(RSS_p) ≈ " +
            "(n − p)σ², so Cp ≈ p. Subsets that omit something important have Cp well above p. Good subsets " +
            "have small Cp, close to p; the full model always has Cp = p exactly.",
        },
        {
          kind: "example",
          title: "Comparing two subsets",
          problem:
            "n = 50 and the full model gives σ̂² = 4. Subset A (p = 3) has RSS = 200; subset B (p = 5) has " +
            "RSS = 180. Compute Cp for each.",
          steps: [
            "A: 200/4 − 50 + 6 = 50 − 50 + 6 = 6. That is well above p = 3: A is probably missing something.",
            "B: 180/4 − 50 + 10 = 45 − 50 + 10 = 5. That equals p = 5: consistent with no bias.",
          ],
          answer: "Cp(A) = 6 and Cp(B) = 5; B is preferred.",
        },
      ],
    },

    {
      heading: "PRESS and cross-validation",
      blocks: [
        {
          kind: "formula",
          latex: "PRESS = Σᵢ \\left(\\frac{eᵢ}{1 − hᵢᵢ}\\right)²",
          caption: "The sum of squared leave-one-out prediction errors, from a single fit per subset.",
        },
        {
          kind: "prose",
          text:
            "PRESS needs no estimate of σ² and makes no assumption that the full model is right. It penalises " +
            "subsets whose fit depends on high-leverage points, because those have large 1/(1 − hᵢᵢ) " +
            "multipliers. Generalised cross-validation replaces each hᵢᵢ with p/n.",
        },
      ],
    },

    {
      heading: "The family of criteria",
      blocks: [
        {
          kind: "table",
          headers: ["Criterion", "Form", "Price per parameter"],
          rows: [
            ["Adjusted R²", "1 − (1 − R²)(n − 1)/(n − p)", "Mild: maximising it is minimising s²"],
            ["Mallows' Cp", "RSS_p/σ̂² − n + 2p", "2σ̂², estimating prediction error"],
            ["AIC (Gaussian)", "n log(RSS_p/n) + 2p", "About 2 — equivalent to Cp for large n"],
            ["BIC", "n log(RSS_p/n) + p log n", "log n, heavier for n ≥ 8; approximates posterior model probability"],
            ["PRESS", "Σ[eᵢ/(1 − hᵢᵢ)]²", "Implicit, via leverage"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two different goals",
          text:
            "Cp, AIC and cross-validation aim at good prediction and tend to keep a few extra variables. BIC " +
            "aims at identifying the true subset (if one exists among the candidates) and is consistent for " +
            "that goal. Choose the criterion by the question, not by habit.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Minimising a criterion is itself selection",
          text:
            "The criterion value of the winning subset is optimistically biased, and the more subsets are " +
            "compared, the larger the bias. Reported fit statistics for a selected model should be checked on " +
            "fresh data.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.2, Why Select?; §12.3.1–12.3.2, Goodness-of-Fit and Prediction-Error Criteria" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.3.3–12.3.4, Distributional Discrepancies (AIC) and Posterior Probabilities (BIC)" },
  ],
};
