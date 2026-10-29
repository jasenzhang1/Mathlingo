import type { WikiArticle } from "../types";

export const caseDeletionDiagnosticsWiki: WikiArticle = {
  conceptId: "case-deletion-diagnostics",

  summary:
    "Influence is a counterfactual: how would the fit change without this observation? For least squares the " +
    "answer never requires refitting. The change in β̂, in the fitted values, and in the precision of the " +
    "estimates all have closed forms in the residual eᵢ and the leverage hᵢᵢ. DFBETAS, DFFITS, Cook's " +
    "distance and COVRATIO are those closed forms, each scaled to answer a slightly different question.",

  sections: [
    {
      heading: "The deletion formula",
      blocks: [
        {
          kind: "formula",
          latex: "β̂ − β̂_{(i)} = \\frac{(XᵀX)⁻¹xᵢ eᵢ}{1 − hᵢᵢ}",
          caption: "Derived from the Sherman–Morrison update of (XᵀX)⁻¹ when row xᵢᵀ is removed.",
        },
        {
          kind: "formula",
          latex: "yᵢ − ŷ_{i(i)} = \\frac{eᵢ}{1 − hᵢᵢ}",
          caption: "The deleted (PRESS) residual: the prediction error for case i from a fit that never saw it.",
        },
        {
          kind: "prose",
          text:
            "Both show the same structure: influence = residual × leverage-driven amplification. A point needs " +
            "both a non-trivial residual and non-trivial leverage to move the fit.",
        },
      ],
    },

    {
      heading: "The standard diagnostics",
      blocks: [
        {
          kind: "table",
          headers: ["Diagnostic", "Formula", "Measures", "Rough cut-off"],
          rows: [
            ["DFBETASⱼ₍ᵢ₎", "(β̂ⱼ − β̂ⱼ₍ᵢ₎) / (s₍ᵢ₎√(XᵀX)⁻¹ⱼⱼ)", "Change in one coefficient, in SE units", "2/√n"],
            ["DFFITSᵢ", "tᵢ √(hᵢᵢ/(1 − hᵢᵢ))", "Change in ŷᵢ, in SE units", "2√(p/n)"],
            ["Cook's Dᵢ", "rᵢ² hᵢᵢ / (p(1 − hᵢᵢ))", "Change in the whole fitted vector", "compare with F_{p,n−p} median, ≈ 1"],
            ["COVRATIOᵢ", "det[s₍ᵢ₎²(X₍ᵢ₎ᵀX₍ᵢ₎)⁻¹] / det[s²(XᵀX)⁻¹]", "Change in the precision of β̂", "|COVRATIO − 1| > 3p/n"],
          ],
        },
        {
          kind: "prose",
          text:
            "COVRATIO below 1 means deleting the case would make the estimates less precise (the case is " +
            "helping); above 1 means its presence is hurting precision, typically because it is an outlier that " +
            "inflates s². A high-leverage point that fits well has COVRATIO well above 1 — it is informative, " +
            "not harmful.",
        },
        {
          kind: "example",
          title: "DFFITS and Cook's D from one point's numbers",
          problem:
            "A fit with n = 30 and p = 3 has a case with hᵢᵢ = 0.2, internally studentized residual rᵢ = 2 and " +
            "externally studentized residual tᵢ = 2.1. Compute Cook's D and DFFITS.",
          steps: [
            "Cook's D = rᵢ²hᵢᵢ/(p(1 − hᵢᵢ)) = 4 × 0.2/(3 × 0.8) = 0.8/2.4 ≈ 0.333.",
            "DFFITS = 2.1 × √(0.2/0.8) = 2.1 × 0.5 = 1.05.",
            "DFFITS cut-off 2√(3/30) ≈ 0.63: flagged. Cook's D ≈ 0.33 is below 1.",
          ],
          answer: "D ≈ 0.33 and DFFITS = 1.05 — worth a look by the DFFITS rule, not alarming by Cook's.",
        },
      ],
    },

    {
      heading: "Using them well",
      blocks: [
        {
          kind: "list",
          items: [
            "Cut-offs are screening devices, not tests; look at the most extreme cases and ask why they are extreme.",
            "DFBETAS answers the question you usually care about — does my conclusion about this coefficient depend on one case?",
            "Single-case deletion can miss groups of influential cases that mask each other; delete-subset diagnostics or robust fits address this (§10.6.5).",
            "Leave-one-out quantities feed PRESS and cross-validation for model selection in Chapter 12.",
          ],
        },
      ],
    },
    {
      heading: "Further results from Ding",
      blocks: [
        {
          kind: "formula",
          latex: "y_i - \\mathbf{x}_i^{\\top}\\hat{\\boldsymbol{\\beta}}_{[-i]} = \\frac{\\hat{\\varepsilon}_i}{1 - h_{ii}}, \\qquad (n - p - 1)\\hat{\\sigma}^2_{[-i]} = (n - p)\\hat{\\sigma}^2 - \\frac{\\hat{\\varepsilon}_i^2}{1 - h_{ii}}",
          caption: "Every leave-one-out quantity follows from the full fit, with no refitting.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Jackknife and leverage facts",
          text: "$\\hat{\\boldsymbol{\\beta}}$ is not the plain average of the $\\hat{\\boldsymbol{\\beta}}_{[-i]}$, but it is their weighted average with weights $(1 - h_{ii})/(n - p)$. The externally studentized residual is a monotone function of the standardised one, $r_i\\sqrt{(n - p - 1)/(n - p - r_i^2)}$. And $\\det(X_{[-i]}^{\\top}X_{[-i]}) = (1 - h_{ii})\\det(X^{\\top}X)$, so a point with $h_{ii} = 1$ cannot be deleted without losing identification.",
        },
      ],
    },
  ],

  references: [
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 11, Leverage Scores and Leave-One-Out Formulas" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.6.1–10.6.3, Types of Outliers; High-Leverage Points; Leave-One-Out Case Diagnostics" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.6.5, Other Methods" },
  ],
};
