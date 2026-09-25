import type { WikiArticle } from "../types";

export const responseSurfaceMethodologyWiki: WikiArticle = {
  conceptId: "response-surface-methodology",

  summary:
    "When the goal is to find the settings of several inputs that maximise a yield or minimise a cost, a " +
    "full second-order polynomial in those inputs is the standard local model. Its stationary point comes " +
    "from one linear solve, and the eigenvalues of its quadratic part — the canonical analysis — say " +
    "whether that point is a maximum, a minimum, a saddle, or the middle of a ridge along which the " +
    "response barely changes.",

  sections: [
    {
      heading: "The second-order model",
      blocks: [
        {
          kind: "formula",
          latex: "y = β₀ + xᵀb + xᵀBx + ε",
          caption: "b holds the linear coefficients; the symmetric B holds the pure quadratics on its diagonal and half of each cross-product coefficient off it.",
        },
        {
          kind: "prose",
          text:
            "With k inputs this has 1 + k + k(k + 1)/2 parameters — 10 for three inputs — and is still a " +
            "linear model in the coefficients. Inputs are usually coded to [−1, 1] so the coefficients are " +
            "comparable and the design (central composite, Box–Behnken) is roughly orthogonal.",
        },
      ],
    },

    {
      heading: "Stationary point",
      blocks: [
        {
          kind: "formula",
          latex: "∇ŷ = b + 2Bx = 0  ⟹  x_s = −\\tfrac12 B^{-1}b,   ŷ_s = β₀ + \\tfrac12 x_sᵀ b",
        },
        {
          kind: "example",
          title: "A one-variable check",
          problem: "The fitted model is ŷ = 50 + 8x − 2x². Find the stationary point and the response there.",
          steps: [
            "Here b = 8 and B = −2, so x_s = −½ · (−1/2) · 8 = 2.",
            "ŷ_s = 50 + ½ · 2 · 8 = 58 (check: 50 + 16 − 8 = 58).",
            "B < 0, so this is a maximum.",
          ],
          answer: "x_s = 2 with ŷ_s = 58, a maximum.",
        },
      ],
    },

    {
      heading: "Canonical analysis",
      blocks: [
        {
          kind: "prose",
          text:
            "Diagonalise B = PΛPᵀ and shift to the stationary point: with w = Pᵀ(x − x_s), the fitted surface " +
            "becomes ŷ = ŷ_s + Σλᵢwᵢ². Each eigenvalue says how the response changes moving along one " +
            "principal axis.",
        },
        {
          kind: "table",
          headers: ["Eigenvalues of B", "Stationary point is"],
          rows: [
            ["All negative", "A maximum"],
            ["All positive", "A minimum"],
            ["Mixed signs", "A saddle point"],
            ["Some near zero", "A ridge — many settings give almost the same response"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Ridges are good news in practice",
          text:
            "A near-zero eigenvalue means you can move along that axis almost freely without losing response, " +
            "which lets you choose the operating point on other grounds — cost, safety, robustness.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The stationary point may be outside the data",
          text:
            "If x_s lies far outside the design region, it is an extrapolation of a local quadratic " +
            "approximation and should not be trusted. The usual response is to move the experiment in the " +
            "promising direction (steepest ascent) and fit again.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§7.3.1, Response Surfaces" },
  ],
};
