import type { WikiArticle } from "../types";

export const leastSquaresViaQrWiki: WikiArticle = {
  conceptId: "least-squares-via-qr",

  summary:
    "The QR decomposition X = QR, with Q having orthonormal columns and R upper triangular, solves least " +
    "squares without ever forming XᵀX. Multiplying by Qᵀ preserves lengths, so the problem collapses to a " +
    "triangular system Rβ = Qᵀy. Householder reflections compute the factorisation stably, and every " +
    "regression quantity — residual sum of squares, fitted values, hat-matrix diagonals, standard errors — " +
    "can be read off Q and R. It is the default in serious statistical software.",

  sections: [
    {
      heading: "Solving least squares with QR",
      blocks: [
        {
          kind: "formula",
          latex: "X = QR,\\; QᵀQ = I_p  ⟹  ‖y − Xβ‖² = ‖Qᵀy − Rβ‖² + ‖(I − QQᵀ)y‖²",
        },
        {
          kind: "formula",
          latex: "β̂ = R^{-1}Qᵀy,   ŷ = QQᵀy,   RSS = yᵀy − ‖Qᵀy‖²",
          caption: "The hat matrix is simply H = QQᵀ.",
        },
        {
          kind: "prose",
          text:
            "Since RᵀR = RᵀQᵀQR = XᵀX, the R from QR is the Cholesky factor of XᵀX (up to signs of rows) — " +
            "obtained without squaring the condition number. The accuracy of β̂ now depends on κ(X) rather " +
            "than κ(X)², apart from a term involving the size of the residuals.",
        },
      ],
    },

    {
      heading: "Regression quantities from Q and R",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "From the QR factors"],
          rows: [
            ["Coefficients", "back-solve Rβ̂ = Qᵀy"],
            ["Hat diagonals hᵢᵢ", "squared length of row i of Q"],
            ["(XᵀX)⁻¹ for standard errors", "R⁻¹R⁻ᵀ"],
            ["Sequential (Type I) sums of squares", "squares of the successive elements of Qᵀy"],
            ["RSS", "sum of squares of the last n − p elements of the full Q̃ᵀy"],
          ],
        },
        {
          kind: "example",
          title: "Hat diagonals from Q",
          problem: "Row 3 of the n × 2 matrix Q is (0.5, −0.3). What is h₃₃?",
          steps: ["h₃₃ = 0.5² + (−0.3)² = 0.25 + 0.09 = 0.34."],
          answer: "h₃₃ = 0.34.",
        },
      ],
    },

    {
      heading: "Algorithms",
      blocks: [
        {
          kind: "list",
          items: [
            "Householder reflections: p reflections I − 2vvᵀ/vᵀv each zero out a column below the diagonal. About 2np² − 2p³/3 flops, roughly twice the normal equations when n ≫ p, and backward stable.",
            "Givens rotations: zero one element at a time; convenient when X is sparse or rows arrive one at a time (updating).",
            "Modified Gram–Schmidt: orthogonalises columns in sequence; numerically fine for least squares if applied to the augmented matrix [X, y], though Q can lose orthogonality.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Classical Gram–Schmidt is the one to avoid",
          text:
            "Mathematically identical to the modified version, classical Gram–Schmidt loses orthogonality " +
            "badly in floating point when columns are nearly dependent. The difference is only the order in " +
            "which projections are subtracted — a reminder that 'the same formula' is not the same algorithm.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.3, QR Decomposition" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.10, Computing the Hat Matrix Diagonals" },
  ],
};
