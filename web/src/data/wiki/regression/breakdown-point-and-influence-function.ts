import type { WikiArticle } from "../types";

export const breakdownPointAndInfluenceFunctionWiki: WikiArticle = {
  conceptId: "breakdown-point-and-influence-function",

  summary:
    "'Robust' needs a definition before estimators can be compared. Two complementary ones dominate. The " +
    "breakdown point asks a global question: what fraction of the data can be replaced by arbitrary " +
    "garbage before the estimate can be dragged anywhere? The influence function asks a local one: how " +
    "much does a single, infinitesimal contamination at a point z move the estimate? Least squares scores " +
    "as badly as possible on both.",

  sections: [
    {
      heading: "Breakdown point",
      blocks: [
        {
          kind: "formula",
          latex: "ε^* = \\min\\left\\{\\frac{m}{n} : \\sup_{\\text{replace } m \\text{ points}} ‖β̂(\\text{corrupted}) − β̂(\\text{clean})‖ = ∞\\right\\}",
        },
        {
          kind: "table",
          headers: ["Estimator", "Finite-sample breakdown", "Asymptotic"],
          rows: [
            ["Sample mean / least squares", "1/n", "0%"],
            ["Sample median", "about ½", "50%"],
            ["M-estimators in regression (unbounded in x)", "1/n", "0%"],
            ["L1 regression", "1/n (bad leverage points)", "0%"],
            ["LMS, LTS, S- and MM-estimators", "about ½", "50%"],
          ],
        },
        {
          kind: "prose",
          text:
            "50% is the ceiling for equivariant estimators: with more than half the data bad, there is no way " +
            "to tell which half is the 'real' data.",
        },
      ],
    },

    {
      heading: "Influence function",
      blocks: [
        {
          kind: "formula",
          latex: "IF(z; T, F) = \\lim_{ε→0} \\frac{T((1 − ε)F + εδ_z) − T(F)}{ε}",
          caption: "The derivative of the estimator's functional T in the direction of a point mass at z = (x, y).",
        },
        {
          kind: "formula",
          latex: "IF_{LS}(x, y) = E(xxᵀ)^{-1} \\, x \\, (y − xᵀβ)",
          caption: "Unbounded in the residual and unbounded in x.",
        },
        {
          kind: "prose",
          text:
            "For an M-estimator the residual enters through ψ, so a bounded ψ bounds the influence of a large " +
            "residual — but the factor x remains, so the influence of a high-leverage point is still unbounded. " +
            "The supremum of |IF| over z is the gross-error sensitivity; an estimator with a finite value is " +
            "called B-robust.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The empirical influence function is case deletion",
          text:
            "Replacing ε by 1/n and F by the empirical distribution turns the influence function into " +
            "(n − 1)(β̂ − β̂₍ᵢ₎) — the DFBETA diagnostics of Chapter 10. Influence diagnostics measure the " +
            "influence function of least squares at the observed points.",
        },
      ],
    },

    {
      heading: "The trade-offs",
      blocks: [
        {
          kind: "list",
          items: [
            "Efficiency: how precise the estimator is when the model (normal errors) holds. Least squares is fully efficient; LMS has essentially zero efficiency.",
            "Local robustness: a bounded influence function, so small contamination has a small effect.",
            "Global robustness: a high breakdown point, so even heavy contamination cannot destroy the estimate.",
            "No simple estimator excels at all three; MM-estimators combine a 50% breakdown start with a 95%-efficient M-step.",
          ],
        },
        {
          kind: "example",
          title: "How many bad points can the median take?",
          problem: "A location estimate from n = 11 values. How many can be moved to +∞ before the sample median follows?",
          steps: [
            "The median is the 6th ordered value.",
            "Moving 5 values to +∞ leaves the 6th smallest among the original values — still finite.",
            "Moving 6 values makes the 6th value one of the infinite ones.",
          ],
          answer: "5 of 11 — breakdown point 6/11 ≈ 55%, approaching 50% as n grows.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.13.3, Measuring Robustness" },
  ],
};
