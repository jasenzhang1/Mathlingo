import type { WikiArticle } from "../types";

export const leastSquaresViaCholeskyWiki: WikiArticle = {
  conceptId: "least-squares-via-cholesky",

  summary:
    "The most direct way to compute β̂ is to form the normal equations XᵀXβ = Xᵀy and solve them. Because " +
    "XᵀX is symmetric positive definite, the right solver is the Cholesky factorisation XᵀX = RᵀR with R " +
    "upper triangular, followed by two triangular solves. It is the fastest method and needs the least " +
    "storage — and forming XᵀX squares the problem's condition number, which is its one serious weakness.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Form A = XᵀX and b = Xᵀy (about np² flops, exploiting symmetry).",
            "Factor A = RᵀR by Cholesky (about p³/3 flops).",
            "Solve Rᵀz = b by forward substitution.",
            "Solve Rβ̂ = z by back substitution.",
          ],
        },
        {
          kind: "formula",
          latex: "RSS = yᵀy − zᵀz,   (XᵀX)^{-1} = R^{-1}R^{-ᵀ}",
          caption: "The residual sum of squares and the covariance matrix fall out of the same factor.",
        },
        {
          kind: "example",
          title: "A 2 × 2 Cholesky solve",
          problem: "Solve XᵀXβ = Xᵀy with XᵀX = [[4, 2], [2, 5]] and Xᵀy = (8, 9).",
          steps: [
            "r₁₁ = √4 = 2, r₁₂ = 2/2 = 1, r₂₂ = √(5 − 1²) = 2, so R = [[2, 1], [0, 2]].",
            "Rᵀz = b: 2z₁ = 8 ⇒ z₁ = 4; z₁ + 2z₂ = 9 ⇒ z₂ = 2.5.",
            "Rβ = z: 2β₂ = 2.5 ⇒ β₂ = 1.25; 2β₁ + β₂ = 4 ⇒ β₁ = 1.375.",
          ],
          answer: "β̂ = (1.375, 1.25). Check: 4(1.375) + 2(1.25) = 8 and 2(1.375) + 5(1.25) = 9.",
        },
      ],
    },

    {
      heading: "Why it can lose accuracy",
      blocks: [
        {
          kind: "formula",
          latex: "κ(XᵀX) = κ(X)²",
          caption: "The condition number (ratio of largest to smallest singular value) is squared by forming the cross-product matrix.",
        },
        {
          kind: "prose",
          text:
            "A rough rule: solving a system with condition number κ loses about log₁₀ κ significant digits. If " +
            "X has κ = 10⁵, the normal equations have κ = 10¹⁰ and lose about ten of double precision's " +
            "sixteen digits; methods that work with X directly lose about five. Forming XᵀX in floating point " +
            "can also destroy information outright — small differences between nearly collinear columns are " +
            "rounded away before the solver ever sees them.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "When Cholesky is the right choice",
          text:
            "For well-conditioned problems with n much larger than p, the normal-equations approach is fast, " +
            "accurate enough, and lets XᵀX be accumulated in one pass through data too large to hold in " +
            "memory. Centering and scaling the columns first (§11.7) can remove much of the ill-conditioning " +
            "that comes from the intercept.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.2, Direct Solution of the Normal Equations" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.7, Centering the Data" },
  ],
};
