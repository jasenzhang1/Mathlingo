import type { WikiArticle } from "../types";

export const simultaneousConfidenceIntervalsWiki: WikiArticle = {
  conceptId: "simultaneous-confidence-intervals",

  summary:
    "Five separate 95% intervals do not make a 95% statement about all five: the chance that at least one " +
    "misses can be close to 23%. Simultaneous intervals widen each interval just enough that the whole " +
    "family covers jointly with probability 1 − α. Seber & Lee compare three constructions — Bonferroni, " +
    "maximum modulus, and Scheffé — and the right choice depends mostly on how many intervals you want " +
    "relative to the dimension of the space they live in.",

  sections: [
    {
      heading: "The three methods",
      blocks: [
        {
          kind: "prose",
          text: "Every interval has the form aᵢᵀβ̂ ± c · s√(aᵢᵀ(XᵀX)⁻¹aᵢ); only the multiplier c changes.",
        },
        {
          kind: "table",
          headers: ["Method", "Multiplier c", "Covers"],
          rows: [
            ["One-at-a-time", "t_{n−p}^{α/2}", "Each interval separately"],
            ["Bonferroni", "t_{n−p}^{α/(2k)}", "k pre-specified intervals"],
            ["Maximum modulus", "u^α_{k, n−p} (studentized maximum modulus)", "k intervals, exact when the k estimates are uncorrelated"],
            ["Scheffé", "√(d F^α_{d, n−p})", "Every aᵀβ with a in a d-dimensional space — infinitely many"],
          ],
        },
        {
          kind: "formula",
          latex: "P(\\text{all } k \\text{ cover}) ≥ 1 − Σ P(\\text{interval } i \\text{ misses}) = 1 − k · \\frac{α}{k} = 1 − α",
          caption: "Bonferroni's inequality, which is all the Bonferroni method uses.",
        },
      ],
    },

    {
      heading: "Why Scheffé works for infinitely many intervals",
      blocks: [
        {
          kind: "prose",
          text:
            "The F-based confidence ellipsoid for β contains the true β with probability 1 − α. Every " +
            "linear function aᵀβ attains its extreme values over that ellipsoid at the Scheffé interval's " +
            "endpoints. So the event 'β in the ellipsoid' is exactly the event 'every Scheffé interval " +
            "covers' — the maximum of the squared t-statistics over all a is d·F. That is why the coverage " +
            "is exact for the whole infinite family, and why it is conservative for any finite subset.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Scheffé agrees with the F-test",
          text:
            "The F-test of Aβ = 0 rejects if and only if at least one Scheffé interval for a combination " +
            "in the row space of A excludes zero. No other method has that exact duality with the overall " +
            "test.",
        },
      ],
    },

    {
      heading: "Choosing",
      blocks: [
        {
          kind: "list",
          items: [
            "For a few pre-planned intervals, Bonferroni is usually shorter than Scheffé.",
            "If the estimates are uncorrelated (orthogonal design), maximum modulus is shorter than Bonferroni.",
            "As k grows with d fixed, Bonferroni's multiplier grows without bound and Scheffé's stays fixed — Scheffé wins.",
            "For intervals chosen after looking at the data (data snooping), only Scheffé is valid.",
            "In practice: compute the multipliers for your k and d and use the smallest valid one.",
          ],
        },
        {
          kind: "example",
          title: "Comparing multipliers",
          problem:
            "Three coefficients are of interest in a model with n − p = 20. Use t_{20}^{0.025/3} ≈ 2.61 and " +
            "F^{0.05}_{3,20} ≈ 3.10. Which method gives shorter intervals?",
          steps: [
            "Bonferroni: c = t_{20}^{α/(2k)} with k = 3, ≈ 2.61.",
            "Scheffé over the 3-dimensional space: c = √(3 · 3.10) = √9.30 ≈ 3.05.",
          ],
          answer: "Bonferroni (2.61 < 3.05) for these three planned intervals.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.1.1, Simultaneous Inferences" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.1.2, Comparison of Methods" },
  ],
};
