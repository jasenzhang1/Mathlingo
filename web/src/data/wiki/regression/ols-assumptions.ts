import type { WikiArticle } from "../types";

export const olsAssumptionsWiki: WikiArticle = {
  conceptId: "ols-assumptions",

  summary:
    "OLS makes a short list of assumptions, and the single most useful thing to know about them is " +
    "that they are not equally important. Linearity and exogeneity govern whether the coefficients " +
    "mean anything at all; homoskedasticity and independent errors govern whether the standard " +
    "errors are right; normality governs only whether the t- and F-tests are exact in small " +
    "samples. Violations of the first kind are fatal, of the second fixable, of the third usually " +
    "harmless.",

  sections: [
    {
      heading: "The assumptions, ranked by consequence",
      blocks: [
        {
          kind: "table",
          headers: ["Assumption", "What breaks if violated", "Severity"],
          rows: [
            ["Linearity of E[Y|X] in β", "Coefficients estimate a misspecified quantity; predictions systematically wrong", "Fatal"],
            ["Exogeneity: E[ε|X] = 0", "β̂ is biased and inconsistent — more data does not help", "Fatal"],
            ["No perfect collinearity", "XᵀX singular; β̂ not uniquely defined", "Fatal but obvious"],
            ["Homoskedasticity", "β̂ still unbiased, but standard errors and OLS's efficiency claim are wrong", "Fixable"],
            ["Independent errors", "Same — standard errors, usually badly understated", "Fixable"],
            ["Normal errors", "Exact t/F inference lost; CLT restores it for large n", "Mild"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two different failure modes",
          text:
            "Linearity and exogeneity failures corrupt the estimate itself. Homoskedasticity and " +
            "independence failures leave the estimate alone and corrupt the uncertainty around it. " +
            "The distinction is worth internalising, because the second kind has cheap repairs " +
            "(robust or clustered standard errors) while the first kind requires a different model.",
        },
      ],
    },

    {
      heading: "Linearity",
      blocks: [
        {
          kind: "prose",
          text:
            "The assumption is that E[Y | X] is linear in the coefficients, not that the " +
            "relationship between Y and each raw predictor looks like a straight line on a " +
            "scatterplot. Adding x², log(x), or an interaction term keeps the model linear in β " +
            "and is fitted by exactly the same normal equations. What is genuinely ruled out is a " +
            "nonlinearity in the parameters, such as β₀exp(β₁x).",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Why this is the most serious failure",
          text:
            "If the true relationship curves and a line is fitted, the residuals are not noise — " +
            "they contain the omitted curvature. Predictions are systematically too high in some " +
            "regions and too low in others, and the bias does not shrink as n grows: with infinite " +
            "data you converge precisely to the best-fitting wrong model. Every other assumption " +
            "failure on this page is either fixable by a different standard error or cured by a " +
            "large sample. This one is neither.",
        },
        {
          kind: "prose",
          text:
            "Detection: plot residuals against fitted values and against each predictor. Systematic " +
            "curvature — a U shape, an arch — is the signature. Remedies in increasing order of " +
            "commitment: transform Y or X, add polynomial or spline terms, or move to a " +
            "nonparametric fit such as LOESS.",
        },
      ],
    },

    {
      heading: "Exogeneity",
      blocks: [
        {
          kind: "formula",
          latex: "E[ε | X] = 0",
          caption: "The errors carry no information about the predictors.",
        },
        {
          kind: "prose",
          text:
            "This is the assumption that makes β̂ unbiased, and it is the one that observational " +
            "data most often violates. Its usual failure mode is omitted variable bias: a variable " +
            "that affects Y and is correlated with an included predictor gets absorbed into ε, " +
            "which is then correlated with X by construction.",
        },
        {
          kind: "formula",
          latex: "E[β̂₁] = β₁ + β₂ · (coefficient from regressing the omitted X₂ on X₁)",
          caption: "The omitted-variable bias formula: its sign is the product of the two signs.",
        },
        {
          kind: "example",
          title: "Signing the bias before collecting data",
          problem:
            "Wages are regressed on years of education; innate ability is omitted. Ability plausibly " +
            "raises wages (β₂ > 0) and is positively correlated with education. Which way is the " +
            "education coefficient biased?",
          steps: [
            "β₂ > 0: ability raises wages.",
            "The regression of ability on education has a positive slope.",
            "The product of two positives is positive.",
          ],
          answer:
            "Upward. The estimated return to education overstates the causal return, because part of what is credited to schooling is ability. The formula lets you sign a bias from subject-matter reasoning alone, before seeing any data.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "No sample size fixes endogeneity",
          text:
            "Bias from a violated exogeneity assumption is not sampling error; it is convergence to " +
            "the wrong number. A million observations gives a very precise estimate of a biased " +
            "quantity, with a confidence interval that confidently excludes the truth. The remedies " +
            "are design-based — randomisation, instrumental variables, fixed effects, natural " +
            "experiments — not statistical.",
        },
      ],
    },

    {
      heading: "Homoskedasticity and independent errors",
      blocks: [
        {
          kind: "prose",
          text:
            "Together these say Var(ε | X) = σ²I: constant variance down the diagonal and zeros " +
            "off it. Both are assumptions about the error covariance matrix, and both have the same " +
            "consequence when violated — β̂ stays unbiased, but the usual formula " +
            "Var(β̂) = σ²(XᵀX)⁻¹ is derived from σ²I and is therefore simply the wrong formula.",
        },
        {
          kind: "list",
          items: [
            "Heteroskedasticity: variance changes with X. Classic in income, expenditure, and firm-size data. Detect with a funnel shape in residuals vs fitted; repair with robust (White) standard errors.",
            "Serial correlation: errors correlated over time. Detect with a Durbin–Watson statistic or an autocorrelation plot of residuals; repair with Newey–West standard errors or an explicit time-series model.",
            "Clustering: errors correlated within groups (students within schools, measurements within patients). Repair with cluster-robust standard errors or a mixed-effects model.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Clustered data understates uncertainty most dramatically",
          text:
            "Thirty measurements on one patient are not thirty independent observations. Treating " +
            "them as such can shrink standard errors by a factor of several, turning noise into " +
            "publishable significance. Of all the assumption violations on this page, ignoring " +
            "clustering is the one most likely to produce a confidently wrong result.",
        },
      ],
    },

    {
      heading: "Normality",
      blocks: [
        {
          kind: "prose",
          text:
            "The weakest assumption, and the one most often worried about first. It is needed for " +
            "exact t- and F-tests in small samples and for prediction intervals. It is not needed " +
            "for unbiasedness, for consistency, or for the Gauss–Markov efficiency result.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It is the errors, not Y, that should be normal",
          text:
            "A histogram of Y being skewed says nothing. Y is a mixture across all the different " +
            "values of X, and can be strongly bimodal or skewed while the errors around the " +
            "regression line are perfectly normal. Check a Q–Q plot of the residuals, never a " +
            "histogram of the response.",
        },
      ],
    },

    {
      heading: "The diagnostic workflow",
      blocks: [
        {
          kind: "table",
          headers: ["Plot", "What it checks", "Bad sign"],
          rows: [
            ["Residuals vs fitted", "Linearity, homoskedasticity", "Curvature; a funnel widening to the right"],
            ["Q–Q plot of residuals", "Normality", "Points bending away from the line in the tails"],
            ["Scale–location (√|standardised residual| vs fitted)", "Homoskedasticity", "An upward-trending band"],
            ["Residuals vs leverage, with Cook's distance", "Influential points", "Points outside the Cook's distance contours"],
            ["Residuals vs time or order", "Independence", "Runs of same-signed residuals"],
          ],
        },
        {
          kind: "prose",
          text:
            "Plots beat formal tests here for a practical reason: a Breusch–Pagan or Shapiro–Wilk " +
            "test with n = 100,000 rejects on a deviation far too small to matter, and with n = 20 " +
            "fails to reject a violation large enough to invalidate everything. Plots show the size " +
            "and the shape of the violation, which is what determines whether it matters.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.3.3, Potential Problems" },
    { source: "Wasserman, All of Statistics", locator: "§13.5, Model Checking" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, Assumptions of the Linear Model" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-02-ols-geometry-and-multiple-regression.md" },
  ],
};
