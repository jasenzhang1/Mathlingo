import type { WikiArticle } from "../types";

export const highBreakdownRegressionWiki: WikiArticle = {
  conceptId: "high-breakdown-regression",

  summary:
    "To survive bad leverage points — clusters of wrong observations far out in x that pull any least-" +
    "squares-like fit toward themselves — an estimator must be able to ignore almost half the data. Least " +
    "median of squares and least trimmed squares do this by fitting the majority and letting the rest have " +
    "residuals as large as they like. They are computed by searching over many small 'elemental' fits, and " +
    "are usually followed by an efficient M-step to recover precision.",

  sections: [
    {
      heading: "LMS and LTS",
      blocks: [
        {
          kind: "formula",
          latex: "β̂_{LMS} = \\arg\\min_β \\; \\mathrm{median}_i \\, eᵢ(β)²",
        },
        {
          kind: "formula",
          latex: "β̂_{LTS} = \\arg\\min_β \\; Σ_{i=1}^{h} e_{(i)}(β)²,   h ≈ \\tfrac{n + p + 1}{2}",
          caption: "Sum of the h smallest squared residuals; the other n − h points are ignored entirely.",
        },
        {
          kind: "prose",
          text:
            "Both reach the maximum breakdown point of about 50%. LMS converges slowly (at rate n^{-1/3}) and " +
            "is very inefficient; LTS converges at the usual √n rate but with low efficiency under normal " +
            "errors (around 7% with h ≈ n/2). S-estimators minimise a robust M-scale of the residuals and " +
            "share the high breakdown point with somewhat better efficiency.",
        },
      ],
    },

    {
      heading: "MM-estimators: robustness and efficiency together",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Compute a high-breakdown initial fit (an S-estimator) and its robust residual scale.",
            "Holding that scale fixed, run an M-estimator with a redescending ψ (bisquare) tuned for 95% efficiency, starting from the initial fit.",
            "The result inherits the 50% breakdown point of step 1 and the high efficiency of step 2.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the start matters",
          text:
            "Redescending M-estimators have non-convex objectives with many local minima; started from least " +
            "squares they find the minimum near the contaminated fit. Started from a high-breakdown fit, they " +
            "find the one near the majority of the data.",
        },
      ],
    },

    {
      heading: "Computing by elemental subsets",
      blocks: [
        {
          kind: "prose",
          text:
            "The LMS and LTS objectives are not smooth, and exact minimisation is combinatorial. The standard " +
            "approach draws many random subsets of p observations, fits each exactly (an 'elemental " +
            "regression'), evaluates the robust objective on all n points, and keeps the best — often refined " +
            "with concentration steps (refit least squares to the h best-fitting points, repeat).",
        },
        {
          kind: "formula",
          latex: "m = \\frac{\\log(1 − P)}{\\log(1 − (1 − ε)^p)}",
          caption: "Subsets needed so that, with probability P, at least one is free of the fraction ε of contamination.",
        },
        {
          kind: "example",
          title: "How many subsets?",
          problem: "With p = 3 coefficients and 30% contamination, how many random elemental subsets give a 99% chance of at least one clean subset?",
          steps: [
            "A subset is clean with probability 0.7³ = 0.343.",
            "m = log(0.01)/log(1 − 0.343) = −4.605/−0.420 ≈ 10.96.",
          ],
          answer: "11 subsets. The count grows quickly with p: at p = 10 it is about 160, and at p = 20 about 5,800.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Use them to find structure, not to hide it",
          text:
            "A high-breakdown fit that disagrees with least squares is a signal that a subset of the data " +
            "behaves differently. Inspect those points — they may be errors, or a second population that " +
            "deserves its own model.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.13.2, Estimates Based on Robust Location and Scale; §3.13.4, Other Robust Estimates" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.12.3, Elemental Regressions" },
  ],
};
