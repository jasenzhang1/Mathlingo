import type { WikiArticle } from "../types";

export const mixedEffectModelsWiki: WikiArticle = {
  conceptId: "mixed-effect-models",

  summary:
    "Mixed-effect models handle data that arrives in groups — repeated measurements on the same " +
    "patient, students within schools, sales within stores. Observations inside a group are " +
    "correlated, which violates ordinary regression's independence assumption and causes it to " +
    "report standard errors that can be far too small. The fix is to give each group its own " +
    "random deviation drawn from a distribution, which both models the correlation and splits the " +
    "variance into a between-group and a within-group part.",

  sections: [
    {
      heading: "Fixed and random effects",
      blocks: [
        {
          kind: "formula",
          latex: "Yᵢⱼ = β₀ + β₁Xᵢⱼ + uⱼ + εᵢⱼ,   uⱼ ~ N(0, τ²),  εᵢⱼ ~ N(0, σ²)",
          caption: "A random-intercept model: observation i within group j gets the group's own offset uⱼ.",
        },
        {
          kind: "table",
          headers: ["", "Fixed effect", "Random effect"],
          rows: [
            ["What it is", "A single coefficient shared by everyone", "A group-specific deviation"],
            ["Estimated as", "A parameter", "A draw from a distribution whose variance is the parameter"],
            ["Parameters used", "One per level", "One variance, however many groups"],
            ["Levels of interest", "Exactly these ones", "A sample from a wider population of groups"],
            ["New group at prediction time", "Cannot be handled", "Handled — predict with uⱼ = 0"],
          ],
        },
        {
          kind: "prose",
          text:
            "The practical difference in parameter count is large. Forty schools as fixed effects " +
            "costs thirty-nine indicator coefficients; as a random effect it costs one variance " +
            "parameter τ². And the random-effects version generalises to schools not in the sample, " +
            "because it treats the observed schools as a draw from a population of schools rather " +
            "than as the entire universe of interest.",
        },
      ],
    },

    {
      heading: "Why ignoring clustering understates uncertainty",
      blocks: [
        {
          kind: "prose",
          text:
            "Ten blood-pressure readings from one patient are not ten independent observations. The " +
            "patient's own baseline shifts all ten in the same direction, so the readings carry far " +
            "less new information than ten readings from ten different patients would. Ordinary " +
            "regression counts them as ten, and its standard errors are computed as if the " +
            "effective sample size were the row count.",
        },
        {
          kind: "formula",
          latex: "ICC = τ² / (τ² + σ²),   n_eff ≈ n / (1 + (m − 1)·ICC)",
          caption: "The intraclass correlation, and the design effect it produces for groups of size m.",
        },
        {
          kind: "example",
          title: "Effective sample size under clustering",
          problem:
            "500 observations: 50 patients with 10 readings each. The ICC is 0.6. How much " +
            "independent information is there really?",
          steps: [
            "The design effect is 1 + (m − 1)·ICC = 1 + 9(0.6) = 6.4.",
            "n_eff = 500/6.4 ≈ 78.",
            "Standard errors scale as 1/√n, so the naive ones are too small by a factor of √6.4 ≈ 2.5.",
          ],
          answer:
            "About 78 independent observations, not 500. Ordinary regression would report standard errors 2.5 times too narrow, turning a t of 1.2 into a t of 3.0 — a null result presented as a strong finding.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "This is the assumption violation that causes the most false positives",
          text:
            "Heteroskedasticity typically distorts standard errors by tens of percent. Ignored " +
            "clustering can distort them by factors of two, three, or more, and always in the " +
            "direction of overconfidence. It is also invisible in the usual residual plots, because " +
            "the residuals look perfectly well behaved — the problem is in their correlation " +
            "structure, not their spread.",
        },
      ],
    },

    {
      heading: "Partial pooling",
      blocks: [
        {
          kind: "prose",
          text:
            "There are three ways to handle grouped data, and mixed models sit between the other " +
            "two — which is exactly what makes them useful.",
        },
        {
          kind: "table",
          headers: ["Approach", "What it does", "Failure mode"],
          rows: [
            ["Complete pooling (ignore groups)", "One model for everyone", "Understates uncertainty; misses real group differences"],
            ["No pooling (group as fixed effect)", "A separate estimate per group", "Noisy for small groups; cannot generalise to new groups"],
            ["Partial pooling (random effects)", "Group estimates shrunk toward the overall mean", "Requires the random-effect distribution to be roughly right"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Shrinkage again, in a new setting",
          text:
            "A group's estimated effect is pulled toward the overall mean by an amount that depends " +
            "on how much data that group has and how large τ² is. A school with 500 students barely " +
            "moves; a school with 4 students is shrunk almost all the way to the average. This is " +
            "the same shrinkage idea that drives ridge regression, and the same recognition that " +
            "drives regression to the mean: a small-sample extreme is mostly noise, so the best " +
            "estimate is not the raw group mean.",
        },
      ],
    },

    {
      heading: "Variance decomposition",
      blocks: [
        {
          kind: "formula",
          latex: "Var(Yᵢⱼ) = τ² + σ²",
          caption: "Between-group variance plus within-group variance.",
        },
        {
          kind: "prose",
          text:
            "This is the law of total variance made explicit and estimable: τ² is the variance of " +
            "the group means around the grand mean, and σ² is the variance of observations around " +
            "their own group's mean. Their ratio is the ICC, which is often the scientifically " +
            "interesting quantity in its own right — 'how much of the variation in outcomes is " +
            "between hospitals rather than between patients?' is a question about τ²/(τ² + σ²), " +
            "not about any regression coefficient.",
        },
        {
          kind: "list",
          items: [
            "Random intercept: each group gets its own baseline. The most common specification.",
            "Random slope: each group also gets its own effect of a predictor — appropriate when the relationship itself plausibly varies by group.",
            "Crossed random effects: two grouping factors that are not nested, such as students and test items.",
            "Nested random effects: students within classes within schools, each level contributing its own variance component.",
          ],
        },
      ],
    },

    {
      heading: "Practical notes",
      blocks: [
        {
          kind: "list",
          items: [
            "Fitting is by maximum likelihood or, preferably, REML — restricted maximum likelihood, which corrects the downward bias in ML's variance-component estimates in the same way n − p − 1 corrects σ̂² in OLS.",
            "Models fitted by REML cannot be compared on fixed effects by likelihood ratio; refit with full ML for that comparison.",
            "Degrees of freedom for tests on fixed effects are not exactly determined, which is why some software reports no p-values by default. Satterthwaite or Kenward–Roger approximations are the usual remedy.",
            "Estimating a variance component well needs a reasonable number of groups — around five is a common minimum, and with fewer than that a fixed effect is usually the safer choice.",
            "Cluster-robust standard errors are a lighter alternative when the correlation structure is a nuisance rather than an object of interest; they fix the inference without modelling the groups.",
            "Cluster-sampled surveys produce exactly this data structure by design, which is why survey analysis and mixed models are so often discussed together.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The paired t-test is the simplest mixed model",
          text:
            "Two measurements per subject, before and after: taking differences within subject " +
            "removes the subject's own baseline, which is precisely a random intercept eliminated " +
            "by differencing. The reason the paired test beats the unpaired one is the reason mixed " +
            "models beat ordinary regression on clustered data — both are refusing to treat " +
            "correlated observations as independent.",
        },
      ],
    },
  ],

  references: [
    { source: "Verbeke & Molenberghs, Linear Mixed Models for Longitudinal Data", locator: "Ch. 3–5, The Linear Mixed Model" },
    { source: "Singer & Willett, Applied Longitudinal Data Analysis", locator: "Ch. 3–4, Multilevel Models for Change" },
    { source: "Gelman, Carlin, Stern, Dunson, Vehtari & Rubin, Bayesian Data Analysis", locator: "Ch. 5, Hierarchical Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-05-generalized-and-special-regression.md" },
  ],
};
