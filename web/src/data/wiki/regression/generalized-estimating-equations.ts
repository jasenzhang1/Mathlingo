import type { WikiArticle } from "../types";

export const generalizedEstimatingEquationsWiki: WikiArticle = {
  conceptId: "generalized-estimating-equations",
  summary:
    "GEE fits a `glm` mean structure to clustered or repeated-measures data — patients measured at " +
    "several visits, students nested in classrooms — where observations within a cluster are correlated " +
    "and treating them as independent would understate uncertainty. Rather than fully modeling that " +
    "correlation, GEE takes a working guess at it, and then uses a `sandwich-estimator` to get valid " +
    "standard errors even when the guess is wrong.",
  sections: [
    {
      heading: "The setup",
      blocks: [
        {
          kind: "prose",
          text: "Same mean structure as a GLM — g(𝔼[yᵢⱼ]) = xᵢⱼᵀβ for observation j in cluster i, with the same link functions (identity, logit, log, …). What's new is a *working correlation matrix* R(α), a guess at how observations within cluster i correlate with each other, parameterized by a small number of extra parameters α.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Independence", description: "R = I — assumes no within-cluster correlation. The simplest working guess, and often the most robust one." },
            { term: "Exchangeable", description: "Every pair of observations in a cluster has the same correlation ρ — reasonable when there's no natural ordering within a cluster." },
            { term: "AR(1)", description: "Correlation decays with distance in time — a natural guess for repeated measures collected over time." },
          ],
        },
      ],
    },
    {
      heading: "Why 'working'",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "β̂ stays consistent even if R(α) is the wrong shape",
          text: "This is the entire point of the method. β̂ solves an estimating equation built from R(α), but that equation is unbiased for β regardless of whether R(α) matches the true within-cluster correlation — the working correlation only has to be *plausible enough to be efficient*, not correct. What would be wrong under a misspecified R is the naive standard error computed as if R were exactly right, which is exactly the gap the sandwich estimator closes: it computes Var(β̂) from the actual empirical spread of the score contributions across clusters, not from R(α)'s assumed shape.",
        },
        {
          kind: "prose",
          text: "This mirrors `sandwich-estimator` precisely, one level up: there the unknown was the *variance* of each residual; here it's the *correlation* between residuals within a cluster. In both cases, getting the nuisance structure (variance function, or correlation structure) wrong costs efficiency, not validity, because the sandwich supplies a fallback that doesn't depend on it being right.",
        },
      ],
    },
    {
      heading: "GEE vs. mixed-effects models",
      blocks: [
        {
          kind: "table",
          headers: ["", "GEE", "Mixed-effects (`mixed-effect-models`)"],
          rows: [
            ["Models", "The population-average effect of x on y", "Subject-specific effects, via random effects"],
            ["Correlation", "A nuisance to be worked around", "An explicit part of the generative model"],
            ["Coefficient interpretation", "Same β for every cluster", "β can vary by cluster (random slopes)"],
          ],
        },
        {
          kind: "prose",
          text: "For a linear identity link the two population-average and subject-specific interpretations coincide; for a nonlinear link (logistic GEE vs. a mixed logistic model) they generally do not — a population-average odds ratio from GEE is not the same number as a subject-specific odds ratio from a random-effects logistic model, even fit to identical data.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Picking a working correlation",
          problem:
            "A study measures blood pressure at 4 visits per patient, spaced a month apart. Patients are otherwise independent of each other. Which working correlation structure is the more natural starting guess: exchangeable or AR(1) — and does the choice affect whether β̂ is still consistent?",
          steps: [
            "Visits are ordered in time and further-apart visits plausibly correlate less — AR(1) matches that structure more naturally than exchangeable, which assumes every pair of visits correlates equally regardless of spacing.",
            "But consistency of β̂ does not depend on getting this right: even an exchangeable (or independence) working guess yields a consistent β̂, just a less efficient one.",
          ],
          answer: "AR(1) is the better-motivated working guess here, but the choice only affects efficiency — β̂ (with sandwich SEs) stays consistent under either.",
        },
      ],
    },
  ],
  references: [
    { source: "Liang & Zeger (1986), Longitudinal Data Analysis Using Generalized Linear Models", locator: "Biometrika 73(1)" },
    { source: "Wooldridge, Econometric Analysis of Cross Section and Panel Data", locator: "Ch. 12" },
  ],
};
