import type { WikiArticle } from "../types";

export const lessThanFullRankModelsWiki: WikiArticle = {
  conceptId: "less-than-full-rank-models",

  summary:
    "When the columns of X are linearly dependent — rank r < p — XᵀX is singular and the normal " +
    "equations have infinitely many solutions. This is not a numerical accident: it is built into every " +
    "ANOVA model written with an overall mean plus one effect per group. The fitted vector ŷ is still " +
    "unique (the column space has not changed), but β̂ is not, and the theory of the full-rank case has " +
    "to be rebuilt around generalized inverses and the question of what the data can actually estimate.",

  sections: [
    {
      heading: "Where rank deficiency comes from",
      blocks: [
        {
          kind: "prose",
          text:
            "The one-way model yᵢⱼ = μ + αᵢ + εᵢⱼ with k groups has k + 1 parameters, but the intercept " +
            "column equals the sum of the k group-indicator columns. So rank(X) = k < k + 1. Adding any " +
            "constant to μ and subtracting it from every αᵢ produces identical fitted values: the data " +
            "cannot distinguish them.",
        },
        {
          kind: "formula",
          latex: "rank(X) = r < p  ⟹  XᵀX singular,  dim N(X) = p − r",
          caption: "Every vector in the null space of X can be added to a solution without changing Xβ.",
        },
      ],
    },

    {
      heading: "Solving with a generalized inverse",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Generalized inverse",
              description: "Any matrix G with AGA = A. Every matrix has one; it is unique only when A is square and invertible.",
            },
            {
              term: "Moore–Penrose inverse A⁺",
              description: "The unique g-inverse that is also reflexive and makes AA⁺ and A⁺A symmetric. β̂ = (XᵀX)⁺Xᵀy is the minimum-norm least-squares solution.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "β̂ = (XᵀX)⁻Xᵀy  solves  XᵀXβ = Xᵀy  for any g-inverse (XᵀX)⁻",
        },
        {
          kind: "prose",
          text:
            "The general solution is β̂ + (I − GXᵀX)z for arbitrary z — a particular solution plus anything " +
            "in the null space. Different software packages return different particular solutions (one " +
            "sets the last group's effect to zero, another the first, another uses the minimum-norm " +
            "solution), which is why printed ANOVA 'effects' disagree across programs while fitted values, " +
            "residuals, and F-tests agree exactly.",
        },
      ],
    },

    {
      heading: "What is invariant",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "Depends on the choice of g-inverse?"],
          rows: [
            ["β̂ itself", "Yes"],
            ["Fitted values ŷ = X(XᵀX)⁻Xᵀy", "No — P = X(XᵀX)⁻Xᵀ is the unique projection onto C(X)"],
            ["Residuals and RSS", "No"],
            ["s² = RSS/(n − r)", "No — note the divisor uses the rank r, not p"],
            ["aᵀβ̂ for estimable aᵀβ", "No"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Degrees of freedom count rank, not columns",
          text:
            "An unbiased estimator of σ² divides RSS by n − r. Dividing by n − p when X is rank-deficient " +
            "undercounts the residual space's dimension by p − r and biases s² upward. Software that drops " +
            "aliased columns automatically is doing exactly this bookkeeping.",
        },
      ],
    },

    {
      heading: "Two ways out",
      blocks: [
        {
          kind: "list",
          items: [
            "Reparametrise to full rank: drop columns (a baseline group), or re-express the effects as contrasts.",
            "Impose identifiability constraints, e.g. Σαᵢ = 0; the constraints must be non-estimable conditions, so they select a solution without changing the fit.",
            "Keep the rank-deficient model and restrict attention to estimable functions — the approach Seber & Lee develop next.",
          ],
        },
        {
          kind: "example",
          title: "Counting rank in a two-group design",
          problem:
            "A model has an intercept and indicators for two groups, with n = 10 observations (5 per group). " +
            "State p, r, and the divisor for s².",
          steps: [
            "Columns: intercept, indicator for group 1, indicator for group 2, so p = 3.",
            "Intercept = indicator₁ + indicator₂, so only two columns are independent: r = 2.",
            "s² = RSS/(n − r) = RSS/8.",
          ],
          answer: "p = 3, r = 2, and s² = RSS/8.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.9.1, Design Matrix of Less Than Full Rank: Least Squares Estimation" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "Appendix A, generalized inverses" },
  ],
};
