import type { WikiArticle } from "../types";

export const updatingAndSweepOperatorWiki: WikiArticle = {
  conceptId: "updating-and-sweep-operator",

  summary:
    "Model building and diagnostics constantly ask for fits that differ from the current one by one case or " +
    "one variable. Refitting from scratch each time is wasteful. The Sherman–Morrison formula updates " +
    "(XᵀX)⁻¹ when a row is added or removed; the sweep operator adds or removes a variable in O(p²) work " +
    "and can undo itself. Together they are the engine behind leave-one-out diagnostics, stepwise " +
    "selection, and all-subsets search.",

  sections: [
    {
      heading: "Adding and deleting cases",
      blocks: [
        {
          kind: "formula",
          latex: "(A + uvᵀ)^{-1} = A^{-1} − \\frac{A^{-1}uvᵀA^{-1}}{1 + vᵀA^{-1}u}",
          caption: "Sherman–Morrison: the inverse after a rank-one change, in O(p²) operations.",
        },
        {
          kind: "formula",
          latex: "(XᵀX − xᵢxᵢᵀ)^{-1} = (XᵀX)^{-1} + \\frac{(XᵀX)^{-1}xᵢxᵢᵀ(XᵀX)^{-1}}{1 − hᵢᵢ}",
          caption: "Deleting case i. The denominator 1 − hᵢᵢ is where every leave-one-out formula gets its leverage factor.",
        },
        {
          kind: "example",
          title: "Updating a scalar case",
          problem: "In a one-parameter model, XᵀX = Σxᵢ² = 50. A new observation with x = 5 arrives. Use Sherman–Morrison to find the new (XᵀX)⁻¹.",
          steps: [
            "A⁻¹ = 1/50 = 0.02; u = v = 5.",
            "Correction: (0.02 × 5)² / (1 + 25 × 0.02) = 0.01/1.5 ≈ 0.006667.",
            "New inverse: 0.02 − 0.006667 = 0.013333 = 1/75.",
          ],
          answer: "1/75, matching 1/(50 + 25) directly.",
        },
      ],
    },

    {
      heading: "The sweep operator",
      blocks: [
        {
          kind: "prose",
          text:
            "Arrange the cross-products in one symmetric matrix and sweep on diagonal position k — a pivot " +
            "operation that regresses everything else on variable k:",
        },
        {
          kind: "formula",
          latex: "M = \\begin{pmatrix} XᵀX & Xᵀy \\\\ yᵀX & yᵀy \\end{pmatrix};\\quad \\text{sweep}_k: \\; a_{kk} ← −\\frac{1}{a_{kk}},\\; a_{ik} ← \\frac{a_{ik}}{a_{kk}},\\; a_{kj} ← \\frac{a_{kj}}{a_{kk}},\\; a_{ij} ← a_{ij} − \\frac{a_{ik}a_{kj}}{a_{kk}}",
          caption: "On the right-hand sides, a_kk, a_ik and a_kj denote the values before the sweep.",
        },
        {
          kind: "list",
          items: [
            "After sweeping on a set S of predictors, the y column holds β̂_S and the bottom-right corner holds RSS_S.",
            "The swept block holds −(X_SᵀX_S)⁻¹, so standard errors are available too.",
            "Sweeping the same position again undoes it (the reverse sweep), so a variable can be removed as cheaply as it was added.",
            "Each sweep costs O(p²), versus O(p³) for refitting.",
          ],
        },
        {
          kind: "example",
          title: "One sweep",
          problem: "For a single predictor, M = [[Σx², Σxy], [Σxy, Σy²]] = [[10, 20], [20, 50]]. Sweep on position 1 and read off β̂ and RSS.",
          steps: [
            "a₁₂ ← 20/10 = 2: this is β̂.",
            "a₂₂ ← 50 − 20·20/10 = 10: this is RSS.",
            "a₁₁ ← −1/10: minus (XᵀX)⁻¹.",
          ],
          answer: "β̂ = 2 and RSS = 10.",
        },
      ],
    },

    {
      heading: "Doing it stably",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Sweeping works on the cross-product matrix",
          text:
            "Like the normal equations, the sweep operator works with XᵀX and inherits its squared condition " +
            "number. For ill-conditioned problems Seber & Lee (§11.6.3) describe the same additions and " +
            "deletions carried out on a QR factorisation with Givens rotations, which is slower per step but " +
            "far more accurate.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.6.1, Updating Formulas" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.6.2–11.6.3, Sweep Operator; Adding and Deleting Using QR" },
  ],
};
