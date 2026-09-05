import type { WikiArticle } from "../types";

export const olsPropertiesWiki: WikiArticle = {
  conceptId: "ols-properties",

  summary:
    "Four properties carry most of the weight in applied regression: β̂ is unbiased, it is " +
    "consistent, its variance is σ²(XᵀX)⁻¹, and it is normally distributed — exactly under normal " +
    "errors and approximately otherwise. The variance formula is the one worth studying hardest, " +
    "because reading it tells you how to design a study that estimates a coefficient precisely: " +
    "reduce noise, collect more data, and above all spread the predictors out.",

  sections: [
    {
      heading: "Unbiasedness",
      blocks: [
        {
          kind: "formula",
          latex: "E[β̂ | X] = β",
          caption: "Averaged over repeated samples, OLS lands on the truth.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "β̂ = (XᵀX)⁻¹Xᵀy, and the model says y = Xβ + ε.",
            "Substitute: β̂ = (XᵀX)⁻¹Xᵀ(Xβ + ε) = (XᵀX)⁻¹(XᵀX)β + (XᵀX)⁻¹Xᵀε.",
            "The first term collapses to β, so β̂ = β + (XᵀX)⁻¹Xᵀε — the estimator equals the truth plus a linear function of the errors.",
            "Take expectations given X: E[β̂ | X] = β + (XᵀX)⁻¹XᵀE[ε | X] = β, since E[ε | X] = 0.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Only exogeneity was used",
          text:
            "The derivation never mentioned normality, homoskedasticity, or independence of the " +
            "errors. Unbiasedness rests on E[ε | X] = 0 and nothing else, which is why " +
            "heteroskedasticity and serial correlation do not bias coefficients — and why omitted " +
            "variable bias, which breaks exactly this condition, does.",
        },
      ],
    },

    {
      heading: "The variance of β̂",
      blocks: [
        {
          kind: "formula",
          latex: "Var(β̂ | X) = σ²(XᵀX)⁻¹",
          caption: "Noise level times the inverse of the predictor cross-product matrix.",
        },
        {
          kind: "prose",
          text:
            "From β̂ = β + (XᵀX)⁻¹Xᵀε, the variance is (XᵀX)⁻¹Xᵀ Var(ε) X(XᵀX)⁻¹. Under " +
            "Var(ε) = σ²I the middle collapses to σ²XᵀX, and one factor of (XᵀX)⁻¹ cancels. In the " +
            "simple-regression case the formula reduces to something very readable:",
        },
        {
          kind: "formula",
          latex: "Var(β̂₁) = σ² / Σᵢ(xᵢ − x̄)²",
          caption: "Simple linear regression: noise over the total spread of the predictor.",
        },
        {
          kind: "table",
          headers: ["Change", "Effect on Var(β̂₁)", "Design implication"],
          rows: [
            ["Halve the noise σ", "Divided by 4", "Better measurement is worth a lot"],
            ["Quadruple n at fixed spread", "Divided by 4", "SE improves as 1/√n, the usual rate"],
            ["Double the spread of x", "Divided by 4", "Free precision, at no extra sample cost"],
            ["Add a collinear predictor", "Multiplied by its VIF", "Redundant predictors are not free"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Spreading out X is the cheapest precision there is",
          text:
            "Σ(xᵢ − x̄)² sits in the denominator, so an experiment that tests doses of 1 and 9 mg " +
            "estimates the slope far more precisely than one testing 4 and 6 mg with the same " +
            "number of subjects. This is the core insight of experimental design: within the range " +
            "where linearity holds, push the predictor to its extremes. The catch is that " +
            "linearity is exactly what gets harder to check when you only observe the endpoints.",
        },
      ],
    },

    {
      heading: "Normality of β̂",
      blocks: [
        {
          kind: "prose",
          text:
            "β̂ = β + (XᵀX)⁻¹Xᵀε writes the estimator as a fixed linear map applied to the error " +
            "vector. Two separate arguments then give normality, under different conditions and " +
            "with different strength.",
        },
        {
          kind: "table",
          headers: ["Route", "Requires", "Gives"],
          rows: [
            ["Closure of the normal family under linear maps", "ε exactly normal", "β̂ exactly normal, at any n"],
            ["Central limit theorem", "ε with finite variance, and no single observation dominating", "β̂ approximately normal, for large n"],
          ],
        },
        {
          kind: "prose",
          text:
            "The second route is what makes regression inference usable in practice, since errors " +
            "are essentially never exactly normal. Its condition is worth stating carefully: the " +
            "CLT applies here because β̂ is a weighted sum of the observations, and it needs no " +
            "single weight to dominate the total. That fails precisely when one observation has " +
            "leverage close to 1 — in which case the normal approximation can be poor no matter how " +
            "large n is.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Consistency and unbiasedness are different guarantees",
          text:
            "Unbiased means correct on average across hypothetical repetitions of the study at any " +
            "fixed n. Consistent means converging to the truth as n → ∞. Neither implies the other: " +
            "σ̂²_MLE = SSE/n is biased but consistent, and there are unbiased estimators whose " +
            "variance never shrinks. OLS happens to be both, provided Σ(xᵢ − x̄)² grows without " +
            "bound — which fails if new observations pile up at the same x value.",
        },
      ],
    },

    {
      heading: "Estimating σ² and the standard errors",
      blocks: [
        {
          kind: "formula",
          latex: "σ̂² = SSE / (n − p − 1),   SE(β̂ⱼ) = σ̂ · √[(XᵀX)⁻¹]ⱼⱼ",
          caption: "The reported standard error, with the degrees-of-freedom correction.",
        },
        {
          kind: "prose",
          text:
            "Dividing by n − p − 1 rather than n is what makes σ̂² unbiased. The reason is " +
            "geometric: the residual vector is confined to the (n − p − 1)-dimensional space " +
            "orthogonal to C(X), so it has that many free coordinates, not n. Fitting more " +
            "parameters shrinks the residuals mechanically, and the correction compensates exactly.",
        },
        {
          kind: "example",
          title: "Reading the standard error backwards",
          problem:
            "A study reports β̂₁ = 3.2 with SE = 1.6. A colleague wants the interval to be half as " +
            "wide. What are their options?",
          steps: [
            "SE(β̂₁) = σ/√(Σ(xᵢ − x̄)²), so halving it means quadrupling the denominator's square.",
            "Option 1: collect 4× the data at the same predictor spread.",
            "Option 2: double the standard deviation of the predictor values, at the same n.",
            "Option 3: halve the measurement noise σ.",
            "Option 4: remove a collinear predictor whose VIF is inflating this coefficient's variance by a factor of 4.",
          ],
          answer:
            "All four halve the SE. Option 1 is the expensive one, and is usually the only one anybody considers.",
        },
      ],
    },

    {
      heading: "Summary of what holds under what",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Exogeneity", "Homoskedastic + independent", "Normal errors", "Large n"],
          rows: [
            ["Unbiased", "Required", "—", "—", "—"],
            ["Var(β̂) = σ²(XᵀX)⁻¹", "Required", "Required", "—", "—"],
            ["BLUE (Gauss–Markov)", "Required", "Required", "—", "—"],
            ["β̂ exactly normal", "Required", "Required", "Required", "—"],
            ["β̂ approximately normal", "Required", "Required", "—", "Required"],
            ["Exact t and F tests", "Required", "Required", "Required", "—"],
          ],
          caption:
            "Read down a column to see what each assumption is buying. Normality buys only the last two rows.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, Properties of Least Squares Estimators" },
    { source: "Wasserman, All of Statistics", locator: "§13.4, Properties of the Least Squares Estimators" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 11, Distribution Theory for the Linear Model" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-03-model-fit-and-diagnostics.md" },
  ],
};
