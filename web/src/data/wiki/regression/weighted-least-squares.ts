import type { WikiArticle } from "../types";

export const weightedLeastSquaresWiki: WikiArticle = {
  conceptId: "weighted-least-squares",

  summary:
    "Weighted least squares is what OLS becomes once you stop pretending every observation is equally " +
    "noisy. Give each observation a weight inversely proportional to its variance and minimise the " +
    "weighted sum of squared residuals instead of the plain one. Under exactly known heteroskedasticity " +
    "this restores every guarantee OLS had under homoskedasticity — it is BLUE again, not merely " +
    "unbiased — and it is the origin point both robust standard errors and GLM fitting generalise " +
    "away from.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "β̂_WLS = argmin_β Σᵢ wᵢ(yᵢ − xᵢᵀβ)²,   wᵢ = 1/σᵢ²",
          caption: "Each squared residual is scaled by the reciprocal of that observation's own error variance.",
        },
        {
          kind: "formula",
          latex: "β̂_WLS = (XᵀWX)⁻¹XᵀWy,   W = diag(w₁, …, wₙ)",
          caption: "The closed-form solution — the normal equations with a diagonal weight matrix inserted.",
        },
        {
          kind: "prose",
          text:
            "Every formula from ordinary least squares has a weighted counterpart obtained by inserting " +
            "W in the same three places: between the two X's, and between X and y. Setting W = I " +
            "recovers OLS exactly, so WLS is not a different method so much as OLS's one hidden " +
            "assumption — that every wᵢ equals 1 — made explicit and then relaxed.",
        },
      ],
    },

    {
      heading: "Why weighting restores efficiency",
      blocks: [
        {
          kind: "prose",
          text:
            "An observation with large error variance is a noisy witness to the true relationship; one " +
            "with small variance is a precise witness. OLS listens to both equally. WLS listens to the " +
            "precise witnesses more, and by exactly the right amount.",
        },
        {
          kind: "formula",
          latex: "Var(β̂_WLS) = (XᵀWX)⁻¹",
          caption: "With the correct weights, this is the smallest attainable variance among linear unbiased estimators.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is Gauss–Markov's generalisation, not an exception to it",
          text:
            "Gauss–Markov proves OLS is BLUE under Var(ε) = σ²I. The Aitken theorem is the same proof " +
            "carried through for a general — but known — error covariance Σ: the BLUE estimator is " +
            "(XᵀΣ⁻¹X)⁻¹XᵀΣ⁻¹y. When Σ is diagonal, that is exactly WLS with wᵢ = 1/σᵢ². OLS is the " +
            "special case Σ = σ²I; WLS is what BLUE looks like once that special case is dropped.",
        },
      ],
    },

    {
      heading: "Where the weights come from",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "Natural weight"],
          rows: [
            ["Each yᵢ is itself an average of nᵢ raw measurements", "wᵢ = nᵢ (Var of a mean is σ²/nᵢ)"],
            ["Variance is known to scale with a predictor, Var(εᵢ) = σ²xᵢ", "wᵢ = 1/xᵢ"],
            ["Variance grows with the mean, Var(εᵢ) = σ²μᵢ²  (proportional errors)", "wᵢ = 1/ŷᵢ²  — refit iteratively"],
            ["Measurement instruments with different, documented precisions", "wᵢ = 1/(instrument's known variance)"],
          ],
        },
        {
          kind: "prose",
          text:
            "The second and third rows are estimated rather than known outright, which is what makes " +
            "feasible WLS (FWLS) an iterative procedure in practice: fit OLS, use the residuals to " +
            "estimate how variance depends on x or on ŷ, refit weighted, and often repeat once more " +
            "since the new fit changes the residuals the variance model was estimated from.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Feasible WLS trades a known problem for an estimated one",
          text:
            "Plugging in an estimated variance function makes the weights themselves random, which the " +
            "Aitken theorem's guarantee does not cover. In large samples this is usually a minor issue " +
            "and FWLS still outperforms OLS decisively — but in small samples a badly estimated " +
            "variance function can make FWLS worse than doing nothing, since the weights can end up " +
            "systematically wrong in a way plain OLS at least avoids.",
        },
      ],
    },

    {
      heading: "A group-averages example",
      blocks: [
        {
          kind: "example",
          title: "Weighting by how many measurements went into each point",
          problem:
            "Five factories report their average defect rate. Factory sample sizes are 20, 20, 20, 80, and " +
            "80 units. Set up the WLS weights for a regression of defect rate on a factory-level predictor.",
          steps: [
            "Each observation is itself a sample mean, so Var(ȳᵢ) = σ²/nᵢ for the individual-unit variance σ².",
            "The correct weight is the reciprocal: wᵢ = nᵢ/σ² — and since σ² is a shared constant, it drops out of the relative weights entirely.",
            "So the three small factories each get weight proportional to 20, and the two large ones weight proportional to 80.",
            "In relative terms, each of the 80-unit factories counts 4 times as much as each 20-unit factory.",
          ],
          answer:
            "wᵢ ∝ nᵢ — weight each factory's average by its own sample size. This is exactly what a naive pooled-OLS fit on the five averages would get wrong: it would treat a 20-unit average and an 80-unit average as equally informative, when the second is four times more precise.",
        },
      ],
    },

    {
      heading: "WLS versus its neighbours",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "What it assumes about Var(ε)", "What it does about it"],
          rows: [
            ["OLS", "Constant (possibly wrongly)", "Ignores it"],
            ["OLS + robust SEs", "Unknown, possibly non-constant", "Corrects the standard errors only; β̂ unchanged"],
            ["WLS", "Known up to a constant, of a specific form", "Reweights the fit itself, changing β̂"],
            ["GLS", "A known general covariance, possibly with off-diagonal correlation", "The full Aitken solution; WLS is its diagonal special case"],
            ["GLM (e.g. Poisson)", "Determined by the assumed response distribution's mean-variance link", "Refits iteratively with weights recomputed at each step (IRLS)"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "WLS is a genuine estimator change, not just a reporting fix",
          text:
            "Robust standard errors keep β̂_OLS and only repair the uncertainty attached to it — cheap, " +
            "and valid under unknown heteroskedasticity of any shape. WLS changes β̂ itself, which is " +
            "strictly more efficient when the weights are right but strictly worse when they are wrong: " +
            "misspecified weights make WLS both biased in small samples through the estimation of those " +
            "weights and needlessly committal about a variance structure that robust SEs never had to " +
            "assume in the first place.",
        },
      ],
    },

    {
      heading: "The IRLS connection",
      blocks: [
        {
          kind: "prose",
          text:
            "Iteratively reweighted least squares — the algorithm that fits every generalized linear " +
            "model — is WLS run to convergence with the weights recomputed after each step from the " +
            "current fit. For logistic regression the weights are p̂ᵢ(1 − p̂ᵢ); for Poisson regression " +
            "they are μ̂ᵢ. WLS with fixed, pre-specified weights is the special case of IRLS where the " +
            "weight function does not depend on the fit at all, so it converges in a single step.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The same idea, three times over",
          text:
            "Weight by 1/σᵢ² to fix known heteroskedasticity, weight by p̂ᵢ(1 − p̂ᵢ) to fit a Bernoulli " +
            "response, weight by μ̂ᵢ to fit a Poisson response — in every case a weighted least-squares " +
            "step is what 'account for how much variance this observation actually carries' turns into " +
            "algebraically. WLS is the simplest member of that family and the one whose weights are " +
            "known in advance rather than discovered by iterating.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "§13.5, Weighted Least Squares" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.5.1, Accounting for Non-Constant Variance Across the Data" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, The General Linear Model" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-02-ols-geometry-and-multiple-regression.md" },
  ],
};
