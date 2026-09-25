import type { WikiArticle } from "../types";

export const studentizedResidualsWiki: WikiArticle = {
  conceptId: "studentized-residuals",

  summary:
    "Raw residuals are not all on the same scale: Var(eᵢ) = σ²(1 − hᵢᵢ), so high-leverage points have " +
    "systematically small residuals. Dividing by the estimated standard deviation puts them on a common " +
    "footing. Internally studentized residuals use s; externally studentized residuals use s₍ᵢ₎, the " +
    "estimate with case i deleted, which makes them follow an exact t distribution and turns them into a " +
    "formal outlier test.",

  sections: [
    {
      heading: "Two kinds of scaled residual",
      blocks: [
        {
          kind: "formula",
          latex: "rᵢ = \\frac{eᵢ}{s\\sqrt{1 − hᵢᵢ}}   \\text{(internally studentized / standardized)}",
        },
        {
          kind: "formula",
          latex: "tᵢ = \\frac{eᵢ}{s_{(i)}\\sqrt{1 − hᵢᵢ}} ~ t_{n−p−1}   \\text{(externally studentized)}",
        },
        {
          kind: "formula",
          latex: "(n − p − 1)s_{(i)}² = (n − p)s² − \\frac{eᵢ²}{1 − hᵢᵢ},   tᵢ = rᵢ\\sqrt{\\frac{n − p − 1}{n − p − rᵢ²}}",
          caption: "s₍ᵢ₎ and tᵢ come from the full fit — no refitting needed.",
        },
        {
          kind: "prose",
          text:
            "rᵢ is bounded (rᵢ² ≤ n − p) because an outlier inflates the s it is divided by — it partly " +
            "masks itself. tᵢ uses an s₍ᵢ₎ that the suspect point did not contribute to, so a gross outlier " +
            "shows up as a gross tᵢ. Because eᵢ and s₍ᵢ₎ are independent under normality, tᵢ is exactly t.",
        },
      ],
    },

    {
      heading: "Testing for an outlier",
      blocks: [
        {
          kind: "prose",
          text:
            "tᵢ is the t-statistic for adding an indicator of case i to the model — a mean-shift outlier model. " +
            "Testing one pre-specified case uses t_{n−p−1}. But in practice you test the most extreme case, " +
            "which is the maximum of n statistics, so the reference must be adjusted: compare max|tᵢ| with " +
            "the Bonferroni value t_{n−p−1}^{α/(2n)}.",
        },
        {
          kind: "example",
          title: "From r to t",
          problem:
            "A fit with n = 25 and p = 4 has a point with internally studentized residual rᵢ = 2.5. Compute tᵢ.",
          steps: [
            "n − p = 21, n − p − 1 = 20.",
            "tᵢ = 2.5 × √(20/(21 − 6.25)) = 2.5 × √(20/14.75) = 2.5 × 1.1645 ≈ 2.91.",
          ],
          answer: "tᵢ ≈ 2.91 — larger than rᵢ, since the point is removed from the scale estimate.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "One outlier can hide another",
          text:
            "Two outliers close together can each look ordinary when deleted one at a time, because the other " +
            "still inflates s₍ᵢ₎ and pulls the fit. Single-case diagnostics are vulnerable to this masking; " +
            "high-breakdown fits are the systematic answer.",
        },
      ],
    },

    {
      heading: "Using scaled residuals in plots",
      blocks: [
        {
          kind: "list",
          items: [
            "Plot rᵢ or tᵢ against fitted values to look for curvature and non-constant variance — the scaling removes the leverage-induced pattern that raw residuals show.",
            "Use them on the normal probability plot, since they have (approximately) equal variance.",
            "Values of |tᵢ| beyond about 3 in moderate samples deserve a look; formal testing needs the Bonferroni cut-off.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.2, Residuals and Hat Matrix Diagonals" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.6.4, Test for Outliers" },
  ],
};
