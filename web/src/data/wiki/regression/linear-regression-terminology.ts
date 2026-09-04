import type { WikiArticle } from "../types";

export const linearRegressionTerminologyWiki: WikiArticle = {
  conceptId: "linear-regression-terminology",

  summary:
    "Regression has more synonyms per idea than almost any other topic in this curriculum, because " +
    "economics, statistics, and machine learning each named the same objects independently. This " +
    "page fixes the vocabulary used throughout the domain, and flags the two pieces of terminology " +
    "that actively mislead: 'independent variable', which has nothing to do with probabilistic " +
    "independence, and 'error', which is not the same object as 'residual'.",

  sections: [
    {
      heading: "The model and its parts",
      blocks: [
        {
          kind: "formula",
          latex: "Yᵢ = β₀ + β₁X_{i1} + ⋯ + β_p X_{ip} + εᵢ,   i = 1, …, n",
          caption: "The linear regression model, written for observation i.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Response Yᵢ",
              description:
                "The outcome being modelled. Synonyms: dependent variable, target, regressand, endogenous variable, label.",
            },
            {
              term: "Predictor X_{ij}",
              description:
                "Input j for observation i. Synonyms: independent variable, feature, covariate, regressor, exogenous variable, explanatory variable.",
            },
            {
              term: "Intercept β₀",
              description:
                "The fitted mean response when every predictor is zero. Often meaningless on its own (nobody has zero square footage) but almost always worth including.",
            },
            {
              term: "Slope coefficient βⱼ",
              description:
                "The change in E[Y] per one-unit change in Xⱼ, holding the other predictors fixed. Carries the units of Y divided by the units of Xⱼ.",
            },
            {
              term: "Error εᵢ",
              description:
                "The unobservable deviation of Yᵢ from the true regression line. A population quantity — it involves the true β, which nobody knows.",
            },
            {
              term: "Design matrix X",
              description:
                "The n × (p+1) matrix whose first column is all ones (for the intercept) and whose remaining columns are the predictors.",
            },
          ],
        },
      ],
    },

    {
      heading: "Error versus residual — the distinction that matters",
      blocks: [
        {
          kind: "prose",
          text:
            "These two are used interchangeably in casual speech and are genuinely different " +
            "objects. Almost every diagnostic in this domain is computed on residuals in order to " +
            "learn about errors, and the gap between them is why the diagnostics are approximate.",
        },
        {
          kind: "table",
          headers: ["", "Error εᵢ", "Residual eᵢ"],
          rows: [
            ["Definition", "Yᵢ − (β₀ + β₁X_{i1} + ⋯)", "Yᵢ − Ŷᵢ"],
            ["Uses", "The true, unknown β", "The fitted β̂"],
            ["Observable?", "No, never", "Yes, once the model is fitted"],
            ["Independent?", "Assumed so", "Not quite — they satisfy p+1 linear constraints"],
            ["Sum", "Not exactly zero", "Exactly zero when an intercept is included"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Residuals are constrained, errors are not",
          text:
            "Fitting p+1 coefficients forces p+1 linear constraints on the n residuals: Σeᵢ = 0 " +
            "and Σeᵢx_{ij} = 0 for each predictor. That is why the residual degrees of freedom is " +
            "n − p − 1 rather than n, and it is the reason SSE/(n − p − 1) — not SSE/n — is the " +
            "unbiased estimator of σ². The residuals are also slightly correlated with each other " +
            "even when the errors are perfectly independent, which is why serious diagnostics use " +
            "standardised or studentised residuals rather than raw ones.",
        },
      ],
    },

    {
      heading: "Fitted values and hats",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "β̂ⱼ",
              description:
                "An estimate of βⱼ from data. The hat always means 'estimated from the sample', never 'true'.",
            },
            {
              term: "Ŷᵢ = β̂₀ + β̂₁X_{i1} + ⋯",
              description: "The fitted value: the model's prediction at observation i's own predictors.",
            },
            {
              term: "eᵢ = Yᵢ − Ŷᵢ",
              description: "The residual — the vertical gap between the observed point and the fitted line.",
            },
            {
              term: "σ̂² = SSE / (n − p − 1)",
              description:
                "The estimated error variance. Its square root is the residual standard error, reported in the units of Y.",
            },
          ],
        },
        {
          kind: "example",
          title: "Reading a fitted equation",
          problem: "sales = 12.3 + 0.47·advertising + ε, with sales in $1000s and advertising in $1000s.",
          steps: [
            "Response: sales. Predictor: advertising. Intercept β̂₀ = 12.3. Slope β̂₁ = 0.47.",
            "Units of β̂₁: ($1000 of sales) per ($1000 of advertising) — dimensionless here, but only by coincidence.",
            "Interpretation of β̂₁: an extra $1000 of advertising is associated with $470 more sales on average.",
            "Interpretation of β̂₀: $12,300 of sales is predicted at zero advertising — an extrapolation if no observed campaign spent nothing.",
          ],
          answer:
            "β̂₁ = 0.47 is a rate of change; β̂₀ = 12.3 is a level. Neither is a causal claim without a design that supports one.",
        },
      ],
    },

    {
      heading: "'Independent variable' is a false friend",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Predictors are routinely dependent on each other",
          text:
            "Calling X the 'independent variable' means only that it sits on the right-hand side. " +
            "It says nothing about probabilistic independence, which is what the same word means " +
            "everywhere else in this curriculum. In practice predictors are usually correlated — a " +
            "house's square footage and its number of bedrooms move together — and that correlation " +
            "is important enough to have its own name (multicollinearity), its own diagnostic (VIF), " +
            "and its own set of remedies (ridge, elastic net). The vocabulary asserts the opposite " +
            "of the usual situation.",
        },
        {
          kind: "prose",
          text:
            "The safest habit is to say predictor and response, which are unambiguous and travel " +
            "well between fields. When reading, translate whatever the source uses into that pair " +
            "before doing anything else.",
        },
        {
          kind: "table",
          headers: ["Statistics", "Econometrics", "Machine learning"],
          rows: [
            ["Dependent variable", "Endogenous variable", "Target / label"],
            ["Independent variable", "Exogenous variable / regressor", "Feature / input"],
            ["Coefficient β", "Parameter / elasticity (in logs)", "Weight"],
            ["Intercept", "Constant term", "Bias"],
            ["Fitting", "Estimation", "Training / learning"],
            ["Error variance σ²", "Disturbance variance", "Irreducible error"],
          ],
          caption:
            "One row per concept. The translation problem is real: papers in three fields can describe the same model and share almost no words.",
        },
      ],
    },

    {
      heading: "Vocabulary you will meet later in this domain",
      blocks: [
        {
          kind: "list",
          items: [
            "Simple regression — exactly one predictor. Multiple regression — several. Multivariate regression — several responses, which is a different thing entirely and is often said when 'multiple' was meant.",
            "Nested models — one model's predictors are a subset of another's. Required for the partial F-test to be valid.",
            "Full model / reduced model — the larger and smaller members of a nested pair.",
            "Leverage — how unusual an observation's predictor values are, independent of its response.",
            "Influence — how much the fit would change if the observation were deleted. High leverage plus a large residual gives high influence.",
            "Link function — the transformation connecting the linear predictor xᵀβ to the mean of Y. The identity link is the one linear regression uses silently.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.1–3.2, Simple and Multiple Linear Regression" },
    { source: "Wasserman, All of Statistics", locator: "§13.1, Simple Linear Regression" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 10, The Linear Model" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-01-foundations.md" },
  ],
};
